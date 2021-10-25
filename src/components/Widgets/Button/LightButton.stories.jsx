import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "styles/theme";
import { GlobalProvider } from "context";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/global.css";
import GlobalStyles from "styles/globalStyle";
import { Button } from "..";

export default {
  title: "Components/LightButton",
  component: Button,
};

const Template = (args) => {
  return (
    <GlobalProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Button {...args}>Click Me</Button>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: "button",
};
