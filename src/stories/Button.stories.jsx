import React from "react";
import Button from "components/Widgets/Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Click Me</Button>;

export const Default = Template.bind({});
Default.args = {
  type: "button",
  className:
    "bg-primary-color text-secondary-color font-demi text-center hover-primary-color",
};
