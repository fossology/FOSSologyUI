import fetchTokenApi from "@/api/auth";
import { setCookie } from "@/shared/storageHelper";

const MOCK_AUTH = true; // 👈 ONLY for local testing

// Fetching the Token
const fetchToken = ({ username, password }) => {
  if (MOCK_AUTH) {
    const fakeToken = "fake-token-for-ui-testing";
    setCookie("token", fakeToken);
    return Promise.resolve(fakeToken);
  }

  return fetchTokenApi(username, password).then((res) => {
    setCookie("token", res.Authorization);
    return res.Authorization;
  });
};

export default fetchToken;
