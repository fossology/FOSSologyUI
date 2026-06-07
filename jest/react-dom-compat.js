let realDom = null;
try {
  realDom = require('react-dom');
} catch (e) {
  realDom = null;
}

function createRoot(container) {
  return {
    render(element) {
      try {
        if (realDom && typeof realDom.render === 'function') {
          realDom.render(element, container);
          return;
        }
        const server = require('react-dom/server');
        container.innerHTML = server.renderToStaticMarkup(element);
      } catch (err) {
        try {
          container.textContent = '';
        } catch (e) {}
      }
    },
    unmount() {
      try {
        if (realDom && typeof realDom.unmountComponentAtNode === 'function') {
          realDom.unmountComponentAtNode(container);
          return;
        }
        container.innerHTML = '';
      } catch (e) {}
    },
  };
}

function render(element, container) {
  if (realDom && typeof realDom.render === 'function') {
    return realDom.render(element, container);
  }
  const root = createRoot(container);
  root.render(element);
  return root;
}

function unmountComponentAtNode(container) {
  try {
    if (container && container._reactRoot && typeof container._reactRoot.unmount === 'function') {
      container._reactRoot.unmount();
      return true;
    }
    if (realDom && typeof realDom.unmountComponentAtNode === 'function') {
      return realDom.unmountComponentAtNode(container);
    }
    container.innerHTML = '';
    return true;
  } catch (e) {
    return false;
  }
}

const exported = {
  ...(realDom || {}),
  createRoot,
  render,
  unmountComponentAtNode,
};

module.exports = exported;
module.exports.default = exported;
