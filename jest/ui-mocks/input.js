const React = require('react');

function InputMock(props) {
  const { children, ...rest } = props || {};
  return React.createElement('input', rest, children);
}

module.exports = InputMock;
module.exports.default = InputMock;
