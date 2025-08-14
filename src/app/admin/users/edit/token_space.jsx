/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)
 SPDX-FileCopyrightText: 2025 Tiyasa Kundu (tiyasakundu20@gmail.com)

SPDX-License-Identifier: GPL-2.0-only

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

"use client";

import React, { useState, useEffect } from "react";

// widgets
import { Button, InputContainer, Spinner } from "@/components/Widgets";
import Modal from "@/components/Widgets/Modal";
import PropTypes from "prop-types";

// utils
import formatDate from "@/utils";

// css
import "./token_space.css";
import { createToken, getTokens } from "@/services/users";
import { Col, Form, Row } from "react-bootstrap";

const TokenSpace = ({ setMessage, setShowMessage }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currTokenVal, setCurrTokenVal] = useState("");

  const CHILD_IDS = {
    TOKEN: "token_val",
    VALIDATE: "validate",
  };
  const [modalChildId, setModalChildId] = useState(CHILD_IDS.TOKEN);

  const [newTokenInfo, setNewTokenInfo] = useState({
    username: "", // Initialized as empty
    password: "",
    tokenName: "",
    accessScope: "read",
    tokenExpDate: formatDate(new Date()),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.name) {
        setNewTokenInfo((prev) => ({
          ...prev,
          username: user.name,
        }));
      }
    }
  }, []);

  const [activeAccessTokens, setActiveAccessTokens] = useState([]);
  const [expiredAccessTokens, setExpiredAccessTokens] = useState([]);

  const handleChange = (e) => {
    if (e.target.type === "date") {
      setNewTokenInfo({
        ...newTokenInfo,
        [e.target.name]: formatDate(e.target.valueAsDate),
      });
    } else {
      setNewTokenInfo({
        ...newTokenInfo,
        [e.target.name]: e.target.value,
      });
    }
  };

  const fetchTokens = async () => {
    try {
      const res1 = await getTokens("active");
      const res2 = await getTokens("expired");
      setActiveAccessTokens(res1.active_tokens);
      setExpiredAccessTokens(res2.expired_tokens);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const finalTokenDetails = {
        token_name: newTokenInfo.tokenName,
        token_scope: newTokenInfo.accessScope,
        token_expire: newTokenInfo.tokenExpDate,
        username: newTokenInfo.username,
        password: newTokenInfo.password,
      };
      const res = await createToken(finalTokenDetails);
      if (res.Authorization) {
        setMessage({ type: "success", text: "Token created successfully!" });
        setShowMessage(true);
      }
      await fetchTokens();
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
    setNewTokenInfo((prev) => ({
      ...prev,
      password: "",
      tokenName: "",
    }));
    setShowModal(false);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    setLoading(false);
  };

  return (
    <>
      <Modal setShow={setShowModal} show={showModal}>
        {modalChildId === CHILD_IDS.VALIDATE ? (
          <ValidateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            newTokenInfo={newTokenInfo}
          />
        ) : (
          <textarea
            style={{ width: "100%", minHeight: "100px" }}
            name="tokenValue"
            id="tokenValue"
            value={currTokenVal}
            readOnly
          />
        )}
      </Modal>

      <div>
        <h1 className="font-size-main-heading">REST API Tokens</h1>
        <p>
          You can create/manage your tokens here for using FOSSology's REST API.
        </p>
        <hr />
        <h1 className="font-size-main-heading">Create a new token</h1>
        <form>
          <InputContainer
            name="tokenName"
            id="tokenName"
            type="text"
            onChange={handleChange}
            value={newTokenInfo.tokenName}
          >
            Name
          </InputContainer>

          <div className="mb-1">
            <p className="font-demi my-1">Expires at</p>
            <input
              value={newTokenInfo.tokenExpDate}
              type="date"
              onChange={handleChange}
              name="tokenExpDate"
              id="tokenExpDate"
            />
          </div>

          <p className="font-demi mt-1">Access scope</p>
          <InputContainer
            type="radio"
            value="read"
            name="accessScope"
            id="read_only_scope"
            checked={newTokenInfo.accessScope === "read"}
            onChange={handleChange}
          >
            Read only access (Limited only to "GET" calls)
          </InputContainer>
          <InputContainer
            type="radio"
            value="write"
            name="accessScope"
            id="read_write_scope"
            checked={newTokenInfo.accessScope === "write"}
            onChange={handleChange}
          >
            Read/Write access Required for calls other than "GET"
          </InputContainer>

          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
              setModalChildId(CHILD_IDS.VALIDATE);
            }}
            className="mt-4"
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Create new token"
            )}
          </Button>
        </form>
        <hr />
        <AccessTokenTable
          title="Active access tokens"
          tokens={activeAccessTokens}
          onReveal={(val) => {
            setShowModal(true);
            setCurrTokenVal(val);
            setModalChildId(CHILD_IDS.TOKEN);
          }}
        />
        <hr />
        <AccessTokenTable
          title="Expired access tokens"
          tokens={expiredAccessTokens}
          onReveal={(val) => {
            setShowModal(true);
            setCurrTokenVal(val);
            setModalChildId(CHILD_IDS.TOKEN);
          }}
        />
      </div>
    </>
  );
};

const ValidateForm = ({
  handleChange,
  handleSubmit,
  newTokenInfo,
  loading,
}) => {
  return (
    <Form>
      <Form.Group as={Row} controlId="loginUsername">
        <Form.Label column sm="4">
          Username
        </Form.Label>
        <Col sm="8">
          <Form.Label className="font-bold">{newTokenInfo.username}</Form.Label>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="loginPassword">
        <Form.Label column sm="4">
          Password
        </Form.Label>
        <Col sm="8">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={newTokenInfo.password}
          />
        </Col>
      </Form.Group>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" onClick={handleSubmit} className="d-block">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Authorize"
          )}
        </Button>
      </div>
    </Form>
  );
};

const AccessTokenTable = ({ title, tokens, onReveal }) => (
  <div>
    <h1 className="font-size-main-heading">
      {title} ({tokens.length})
    </h1>
    <table className="table table-striped text-primary-color font-size-medium table-bordered">
      <thead>
        <tr className="font-bold">
          <th>Token name</th>
          <th>Created on</th>
          <th>Expiry</th>
          <th>Scope</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token.name} className="token_row">
            <td>{token.name}</td>
            <td>{token.created}</td>
            <td>{token.expire}</td>
            <td>{token.scope === "w" ? "read/write" : "read-only"}</td>
            <td>
              <Button type="button" onClick={() => onReveal(token.token)}>
                Reveal
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ValidateForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  newTokenInfo: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    tokenName: PropTypes.string,
    accessScope: PropTypes.string,
    tokenExpDate: PropTypes.string,
  }),
};

TokenSpace.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setShowMessage: PropTypes.func.isRequired,
};

AccessTokenTable.propTypes = {
  title: PropTypes.string.isRequired,
  tokens: PropTypes.array.isRequired,
  onReveal: PropTypes.func.isRequired,
};

export default TokenSpace;
