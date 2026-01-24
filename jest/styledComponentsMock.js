const React = require('react');

function createComp(tag) {
  return function StyledMock(props) {
    const { children, ...rest } = props || {};
    return React.createElement(tag || 'div', rest, children);
  };
}

function styled(tag) {
  return function() {
    return createComp(tag);
  };
}

const mock = styled;
mock.button = styled('button');
mock.div = styled('div');
mock.span = styled('span');
mock.input = styled('input');

const ThemeContext = React.createContext({ primaryColor: '#000' });
mock.ThemeContext = ThemeContext;
mock.ThemeProvider = ThemeContext.Provider;

mock.default = mock;

module.exports = mock;
