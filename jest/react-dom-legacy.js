const realReactDOM = require('react-dom');
module.exports = {
  ...realReactDOM,
  render: realReactDOM.createRoot ? (element, container) => {
    const root = realReactDOM.createRoot(container);
    root.render(element);
    return root;
  } : realReactDOM.render,
  unmountComponentAtNode: (container) => {
    try {
      if (container._reactRootContainer) {
        container._reactRootContainer.unmount();
      } else if (realReactDOM.unmountComponentAtNode) {
        realReactDOM.unmountComponentAtNode(container);
      }
    } catch (e) {
    }
  }
};
