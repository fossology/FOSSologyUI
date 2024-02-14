/*
 Copyright (C) 2024 Nillanshu Saini (nillanshusaini738@gmail.com)
 SPDX-License-Identifier: GPL-2.0
 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 version 2 as published by the Free Software Foundation.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License along
 with this program; if not, write to the Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

import { render, act } from '@testing-library/react';
import { getFossologyVersion } from 'services/info';
import { getSessionStorage, setSessionStorage } from 'shared/storageHelper';
import Footer from './index';

jest.mock('services/info');
jest.mock('shared/storageHelper');

describe('Footer', () => {
  it('should display version information', async () => {
    const versionInfo = {
      version: '3.10.0',
      branchName: 'master',
      commitHash: 'a1b2c3',
      commitDate: '2024-02-14',
      buildDate: '2024-02-15',
    };

    getFossologyVersion.mockResolvedValue(versionInfo);
    getSessionStorage.mockReturnValue(null);
    setSessionStorage.mockImplementation(() => {});

    let getByText;
    await act(async () => {
      ({ getByText } = render(<Footer />));
    });

    expect(getByText(`Version: [${versionInfo.version}], Branch: [${versionInfo.branchName}], Commit: [#${versionInfo.commitHash}] ${versionInfo.commitDate} built @ ${versionInfo.buildDate}`)).toBeInTheDocument();
  });
});
