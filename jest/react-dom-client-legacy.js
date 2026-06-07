const realClient = require('react-dom/client');
const realDom = require('react-dom');

module.exports = {
  createRoot: (container) => {
    if (realClient && realClient.createRoot) {
      return realClient.createRoot(container);
    }
    return {
      render: (el) => realDom.render(el, container),
      unmount: () => realDom.unmountComponentAtNode(container),
    };
  },
};
