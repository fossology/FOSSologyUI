/*
 Copyright (C) 2021 Aman Dwivedi (aman.dwivedi5@gmail.com), Shruti Agarwal (mail2shruti.ag@gmail.com)
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

// React Imports
import React, { useState } from "react";

// External library imports
import { useHistory } from "react-router-dom";
import { Form, Row, Col, Spinner, Alert } from "react-bootstrap";

// Custom component imports
import { fetchToken } from "../../services/auth";
import { routes } from "../../constants/routes";
import { isAuth } from "../../shared/authHelper";
import Button from "../../components/Widgets/Button";
import Features from "./Features";

// CSS imports
import { LoginForm } from "./style";

const Home = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { username, password } = values;
  const history = useHistory();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchToken(values)
      .then(() => {
        history.push(routes.browse);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>An error occurred!</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
      <div className="main-container my-3">
        <div className="row m-0">
          <div className="col-md-6">
            <b className="font-size-medium">FOSSology</b> is a framework for
            software analysis tools. With it, you can:
            <ul className="my-3 list-unstyled">
              <li>Upload files into the fossology repository.</li>
              <li>
                Unpack files (zip, tar, bz2, iso's, and many others) into its
                component files.
              </li>
              <li>Browse upload file trees.</li>
              <li>View file contents and meta data.</li>
              <li>Scan for software licenses.</li>
              <li>Scan for copyrights and other author information.</li>
              <li>
                View side-by-side license and bucket differences between file
                trees.
              </li>
              <li>Tag and attach notes to files.</li>
              <li>
                Report files based on your own custom classification scheme.
              </li>
            </ul>
            <div className="my-3">
              <b className="font-size-medium">Where to begin...</b>
              <ul className="my-3">
                <li>
                  The menu at the top contains all the primary capabilities of
                  FOSSology.
                </li>
                <li>
                  Depending on your account's access rights, you may be able to
                  upload files, schedule analysis tasks, or even add new users.
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            {!isAuth() && (
              <LoginForm>
                <Form>
                  <Form.Group as={Row} controlId="loginUsername">
                    <Form.Label column sm="4">
                      Username
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        onChange={handleChange("username")}
                        value={username}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="loginPassword">
                    <Form.Label column sm="4">
                      Password
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleChange("password")}
                        value={password}
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="d-block mx-auto"
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
                      "Login"
                    )}
                  </Button>
                </Form>
              </LoginForm>
            )}
          </div>
        </div>
        <Features />
      </div>
    </React.Fragment>
  );
};

export default Home;
