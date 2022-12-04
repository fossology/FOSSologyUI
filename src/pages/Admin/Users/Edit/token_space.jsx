/*
 Copyright (C) 2022 Krishna Mahato (krishhtrishh9304@gmail.com)

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

// css
import "./index.css";

// widgets
import { Button, InputContainer, Spinner } from "components/Widgets";
import Modal from "components/Widgets/Modal";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { createToken, getTokens } from "services/users";
// utils
import formatDate from "utils";

const TokenSpace = ({ setMessage, setShowMessage }) => {
  // local states
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currTokenVal, setCurrTokenVal] = useState("");

  // child IDs = token_val, validate
  const CHILD_IDS = {
    TOKEN: "token_val",
    VALIDATE: "validate",
  };
  const [modalChildId, setModalChildId] = useState(CHILD_IDS.TOKEN);

  const initialTokenInfo = {
    username: JSON.parse(localStorage.getItem("user"))?.name,
    password: "",
    tokenName: "",
    accessScope: "read",
    tokenExpDate: formatDate(new Date()),
  };
  const [newTokenInfo, setNewTokenInfo] = useState(initialTokenInfo);

  const initialTokenState = {
    name: "Some dummy token name",
    created: "yyyy-mm-dd",
    expire: "yyyy-mm-dd",
    scope: "read/write",
    token: "Some dummy token value",
  };

  const [activeAccessTokens, setActiveAccessTokens] = useState([
    initialTokenState,
  ]);

  const [expiredAccessTokens, setExpiredAccessTokens] = useState([
    initialTokenState,
  ]);

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

  // fetching all the active and the expired Tokens
  const fetchTokens = async () => {
    try {
      const res1 = await getTokens("active");
      const res2 = await getTokens("expired");
      const activeTokens = res1.active_tokens;
      const expiredTokens = res2.expired_tokens;
      setActiveAccessTokens(activeTokens);
      setExpiredAccessTokens(expiredTokens);
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
      setShowMessage(true);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  // API Call to create a new Token
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // setting the request payload
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
    setNewTokenInfo(initialTokenInfo);
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
            style={{
              width: "100%",
              minHeight: "100px",
            }}
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
        <div>
          <h1 className="font-size-main-heading">
            Active access tokens ({activeAccessTokens.length})
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
              {activeAccessTokens.map((token) => {
                return (
                  <tr key={token.name} className="token_row">
                    <td>{token.name}</td>
                    <td>{token.created}</td>
                    <td>{token.expire}</td>
                    <td>{token.scope === "w" ? "read/write" : "read-only"}</td>
                    <td>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setCurrTokenVal(token.token);
                          setModalChildId(CHILD_IDS.TOKEN);
                        }}
                      >
                        Reveal
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <hr />
        <div>
          <h1 className="font-size-main-heading">
            Expired access tokens ({expiredAccessTokens.length})
          </h1>
          <table className="table table-striped text-primary-color font-size-medium table-bordered">
            <thead>
              <tr className="font-bold">
                <th>Token name</th>
                <th>Created on</th>
                <th>Expired</th>
                <th>Scope</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expiredAccessTokens.map((token) => {
                return (
                  <tr key={token.name} className="token_row">
                    <td>{token.name}</td>
                    <td>{token.created}</td>
                    <td>{token.expire}</td>
                    <td>{token.scope === "w" ? "read/write" : "read-only"}</td>
                    <td>
                      <Button
                        type="button"
                        onClick={() => {
                          setShowModal(true);
                          setCurrTokenVal(token.token);
                          setModalChildId(CHILD_IDS.TOKEN);
                        }}
                      >
                        Reveal
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
          <Form.Label className="font-bold" column>
            {newTokenInfo.username}
          </Form.Label>
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
            "Auhtorize"
          )}
        </Button>
      </div>
    </Form>
  );
};

const validationInfo = {
  username: PropTypes.string,
  password: PropTypes.string,
};

ValidateForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  newTokenInfo: PropTypes.shape(validationInfo),
};

TokenSpace.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setShowMessage: PropTypes.func.isRequired,
};

export default TokenSpace;
