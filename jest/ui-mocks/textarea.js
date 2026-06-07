const React = require('react');

function TextareaMock(props) {
  const { children, ...rest } = props || {};
  return React.createElement('textarea', rest, children);
}

module.exports = TextareaMock;
module.exports.default = TextareaMock;
