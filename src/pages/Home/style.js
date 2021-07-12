import styled from "styled-components";

const LoginForm = styled.div`
  border: 1px black dashed;
  min-width: 35vw;
  padding: 1rem;
  @media (max-width: 768px) {
    float: none;
    margin: 1rem;
  }
  @media (min-width: 768px) {
    float: right;
  }
`;

export default LoginForm;
