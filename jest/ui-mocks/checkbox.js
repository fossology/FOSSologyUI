module.exports = ({ children, ...props }) => {
  return require('react').createElement('input', { type: 'checkbox', ...props }, children);
};
