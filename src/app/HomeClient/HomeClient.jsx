'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Alert, Button, Spinner } from '@/components/Widgets';
// import Features from '../Features';

// Services
import fetchToken from '@/services/auth';
import { getUserSelf } from '@/services/users';
import { fetchAllGroups } from '@/services/groups';

// Helpers
import routes from '@/constants/routes';
import { isAuth } from '@/shared/authHelper';

// Styles
import LoginForm from '../style';
import { Form, Row, Col } from 'react-bootstrap';

const HomeClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [values, setValues] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { username, password } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await fetchToken(values);
      await getUserSelf();
      await fetchAllGroups();
      router.push(routes.browse);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
      setShowError(true);
    }
  };

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setErrorMessage(message);
      setShowError(true);
      router.replace(window.location.pathname);
    }
  }, [searchParams, router]);

  return (
    <div className="main-container my-3">
      {showError && (
        <Alert
          type="danger"
          setShow={setShowError}
          message={errorMessage}
          heading="An error occurred"
        />
      )}

      <div className="row m-0">
        <div className="col-md-6">
          <b className="font-size-medium">FOSSology</b> is a framework for
          software analysis tools. With it, you can:
          <ul className="my-3 list-unstyled">
            <li>Upload files into the FOSSology repository.</li>
            <li>
              Unpack files (zip, tar, bz2, isos, and many others) into their
              component files.
            </li>
            <li>Browse upload file trees.</li>
            <li>View file contents and metadata.</li>
            <li>Scan for software licenses.</li>
            <li>Scan for copyrights and author information.</li>
            <li>
              View side-by-side license and bucket differences between file
              trees.
            </li>
            <li>Tag and attach notes to files.</li>
            <li>
              Report files based on your custom classification scheme.
            </li>
          </ul>

          <div className="my-3">
            <b className="font-size-medium">Where to begin...</b>
            <ul className="my-3">
              <li>The top menu contains all primary features of FOSSology.</li>
              <li>
                Depending on your access rights, you may be able to upload,
                analyze files, or manage users.
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
                      onChange={handleChange('username')}
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
                      onChange={handleChange('password')}
                      value={password}
                    />

                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="d-block mt-4"
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
                        'Login'
                      )}
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </LoginForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeClient;