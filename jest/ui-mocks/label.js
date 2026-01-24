module.exports = ({ children, ...props }) => {
  return require('react').createElement('label', props, children);
};
