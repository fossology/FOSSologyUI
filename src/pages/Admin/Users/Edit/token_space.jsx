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

import React, { useState } from "react";

// widgets
import { Button, InputContainer, Spinner } from "components/Widgets";
import Modal from "components/Widgets/Modal";
import PropTypes from "prop-types";

// utils
import formatDate from "utils";

// css
import "./index.css";

const TokenSpace = ({ setMessage, setShowMessage }) => {
  // local states
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newTokenInfo, setNewTokenInfo] = useState({
    tokenName: "",
    accessScope: "read_only",
    tokenExpDate: formatDate(new Date()),
  });

  const initialTokenState = {
    tokenName: "Some dummy token name",
    createdOn: "yyyy-mm-dd",
    expiredOn: "yyyy-mm-dd",
    scope: "read/write",
    value: "Some dummy token value",
  };

  // eslint-disable-next-line no-unused-vars
  const [activeAccessTokens, setActiveAccessTokens] = useState([
    initialTokenState,
  ]);
  // eslint-disable-next-line no-unused-vars
  const [expiredAccessTokens, setExpiredAccessTokens] = useState([
    initialTokenState,
  ]);
  const [currTokenVal, setCurrTokenVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // mock asynchrounchronous instructions
    setTimeout(() => {
      setLoading(false);
      setShowMessage(false);
    }, 2000);
    setLoading(true);
    setMessage({ type: "danger", text: "Failed to fetch" });
    setShowMessage(true);
  };

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

  return (
    <>
      <Modal setShow={setShowModal} show={showModal}>
        <textarea
          style={{
            width: "100%",
            maxHeight: "200px",
          }}
          name="tokenValue"
          id="tokenValue"
          value={currTokenVal}
        />
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
            value={newTokenInfo.name}
          >
            Name
          </InputContainer>
          <div className="mb-1">
            <p className="font-demi my-1">Expires at</p>
            <input
              value={newTokenInfo.date}
              type="date"
              onChange={handleChange}
              name="tokenExpDate"
              id="tokenExpDate"
            />
          </div>
          <p className="font-demi mt-1">Access scope</p>
          <InputContainer
            type="radio"
            value="read_only"
            name="accessScope"
            id="read_only_scope"
            checked={newTokenInfo.accessScope === "read_only"}
            onChange={handleChange}
          >
            Read only access (Limited only to "GET" calls)
          </InputContainer>
          <InputContainer
            type="radio"
            value="read_write"
            name="accessScope"
            id="read_write_scope"
            checked={newTokenInfo.accessScope === "read_write"}
            onChange={handleChange}
          >
            Read/Write access Required for calls other than "GET"
          </InputContainer>
          <Button type="submit" onClick={handleSubmit} className="mt-4">
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
            <tr className="font-bold">
              <th>Token name</th>
              <th>Created on</th>
              <th>Expiry</th>
              <th>Scope</th>
            </tr>
            {activeAccessTokens.map((token) => {
              return (
                <tr
                  onClick={() => {
                    setCurrTokenVal(token.value);
                    setShowModal(true);
                  }}
                  key={token.tokenName}
                  className="token_row"
                >
                  <td>{token.tokenName}</td>
                  <td>{token.createdOn}</td>
                  <td>{token.expiredOn}</td>
                  <td>{token.scope}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <hr />
        <div>
          <h1 className="font-size-main-heading">
            Expired access tokens ({expiredAccessTokens.length})
          </h1>
          <table className="table table-striped text-primary-color font-size-medium table-bordered">
            <tr className="font-bold">
              <th>Token name</th>
              <th>Created on</th>
              <th>Expired</th>
              <th>Scope</th>
            </tr>
            {expiredAccessTokens.map((token) => {
              return (
                <tr
                  onClick={() => {
                    setCurrTokenVal(token.value);
                    setShowModal(true);
                  }}
                  key={token.tokenName}
                  className="token_row"
                >
                  <td>{token.tokenName}</td>
                  <td>{token.createdOn}</td>
                  <td>{token.expiredOn}</td>
                  <td>{token.scope}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

TokenSpace.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setShowMessage: PropTypes.func.isRequired,
};

export default TokenSpace;
