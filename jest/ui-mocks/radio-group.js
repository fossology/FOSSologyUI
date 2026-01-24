const React = require('react');
module.exports = ({ children, ...props }) => React.createElement('div', props, children);
module.exports.RadioGroupItem = ({ children, ...props }) => React.createElement('input', { type: 'radio', ...props }, children);
module.exports.RadioGroup = module.exports;
