const React = require('react');
module.exports = ({ children, ...props }) => React.createElement('select', props, children);
module.exports.SelectTrigger = ({ children }) => React.createElement('div', {}, children);
module.exports.SelectValue = ({ children, placeholder }) => React.createElement('span', {}, children || placeholder);
module.exports.SelectContent = ({ children }) => React.createElement('div', {}, children);
module.exports.SelectItem = ({ children, ...props }) => React.createElement('option', props, children);
