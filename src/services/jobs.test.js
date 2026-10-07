/*
 SPDX-FileCopyrightText: 2026 FOSSology contributors

 SPDX-License-Identifier: GPL-2.0-only

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
*/

import { scheduleAnalysis } from "@/services/jobs";
import { scheduleAnalysisApi } from "@/api/jobs";
import messages from "@/constants/messages";

jest.mock("@/api/jobs");

/**
 * Build a scanData object shaped exactly like the one the Schedule Agents /
 * upload forms hand to `scheduleAnalysis`.
 */
const buildScanData = ({ analysis = {}, decider = {}, reuse = {}, scancode = {} } = {}) => ({
  analysis: {
    bucket: false,
    copyrightEmailAuthor: false,
    ecc: false,
    ipra: false,
    keyword: false,
    mime: false,
    monk: false,
    nomos: false,
    ojo: false,
    pkgagent: false,
    reso: false,
    softwareHeritage: false,
    ...analysis,
  },
  decider: {
    nomosMonk: false,
    bulkReused: false,
    newScanner: false,
    ojoDecider: false,
    autoConclude: false,
    autoConcludeType: "permissive",
    copyrightDeactivation: false,
    copyrightClutterRemoval: false,
    ...decider,
  },
  reuse: {
    reuseUpload: [],
    reuseGroup: "fossy",
    reuseMain: false,
    reuseEnhanced: false,
    reuseReport: false,
    reuseCopyright: false,
    reuseChecked: false,
    ...reuse,
  },
  scancode: {
    license: false,
    copyright: false,
    email: false,
    url: false,
    ...scancode,
  },
});

const okResponse = (jobId) => ({ code: 201, message: jobId, type: "INFO" });

describe("scheduleAnalysis", () => {
  describe("Test A - normal scheduling (reuse disabled)", () => {
    it("creates a real job: forwards the selected agents and returns the job id", async () => {
      scheduleAnalysisApi.mockResolvedValue(okResponse(352));

      const result = await scheduleAnalysis(
        3,
        42,
        buildScanData({ analysis: { monk: true, nomos: true, ojo: true } })
      );

      expect(scheduleAnalysisApi).toHaveBeenCalledTimes(1);
      const payload = scheduleAnalysisApi.mock.calls[0][0];

      // Correct upload / folder association
      expect(payload.folderId).toBe(3);
      expect(payload.uploadId).toBe(42);

      // Requested agents are actually transmitted
      expect(payload.body.analysis.monk).toBe(true);
      expect(payload.body.analysis.nomos).toBe(true);
      expect(payload.body.analysis.ojo).toBe(true);

      // No reuse block is sent when the user did not enable reuse
      expect(payload.body).not.toHaveProperty("reuse");

      // The resolved value exposes the persisted job id
      expect(result.jobId).toBe(352);
      expect(result.code).toBe(201);
    });
  });

  describe("Test B - reuse scheduling", () => {
    it("sends the reuse configuration using the API v2 (camelCase) keys", async () => {
      scheduleAnalysisApi.mockResolvedValue(okResponse(346));

      const result = await scheduleAnalysis(
        1,
        99,
        buildScanData({
          analysis: { nomos: true },
          reuse: {
            reuseChecked: true,
            reuseUpload: [{ id: 7, uploadName: "prev" }],
            reuseGroup: "fossy",
            reuseMain: true,
          },
        })
      );

      const payload = scheduleAnalysisApi.mock.calls[0][0];

      expect(payload.body.reuse).toEqual({
        reuseUpload: 7,
        reuseGroup: "fossy",
        reuseMain: true,
        reuseEnhanced: false,
        reuseReport: false,
        reuseCopyright: false,
      });

      // The v1 snake_case keys (which API v2 silently ignores) must be gone
      const serialized = JSON.stringify(payload.body);
      expect(serialized).not.toMatch(/reuse_upload|reuse_group|reuse_main/);

      expect(result.jobId).toBe(346);
    });
  });

  describe("Test C - job creation / scheduling failure", () => {
    it("rejects when the scheduler request itself fails", async () => {
      scheduleAnalysisApi.mockRejectedValue({
        status: 500,
        ok: false,
        message: "Internal error",
      });

      await expect(
        scheduleAnalysis(3, 42, buildScanData({ analysis: { nomos: true } }))
      ).rejects.toBeDefined();
    });

    it("does not turn a non-201 response into a success", async () => {
      scheduleAnalysisApi.mockResolvedValue({
        code: 500,
        message: "Scheduling of Agent(s) failed",
        type: "ERROR",
      });

      await expect(
        scheduleAnalysis(3, 42, buildScanData({ analysis: { nomos: true } }))
      ).rejects.toThrow("Scheduling of Agent(s) failed");
    });
  });

  describe("Test D - regression: HTTP 201 must mean a real job exists", () => {
    it("rejects a 201-style response that carries no persisted job id", async () => {
      // Request accepted + 'successful' response, but no actual job was created.
      scheduleAnalysisApi.mockResolvedValue({ code: 201, message: 0, type: "INFO" });

      await expect(
        scheduleAnalysis(3, 42, buildScanData({ analysis: { nomos: true } }))
      ).rejects.toThrow(messages.scheduleAnalysisFailed);
    });

    it("never emits the legacy snake_case reuse payload that API v2 drops", async () => {
      scheduleAnalysisApi.mockResolvedValue(okResponse(500));

      await scheduleAnalysis(
        1,
        99,
        buildScanData({
          analysis: { monk: true },
          reuse: {
            reuseChecked: true,
            reuseUpload: [{ id: 12 }],
            reuseGroup: "fossy",
          },
        })
      );

      const payload = scheduleAnalysisApi.mock.calls[0][0];
      expect(payload.body.reuse.reuseUpload).toBe(12);
      expect(payload.body.reuse).not.toHaveProperty("reuse_upload");
      expect(payload.body.reuse).not.toHaveProperty("reuse_group");
    });
  });
});
