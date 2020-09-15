import { Button, ButtonProps } from "@chakra-ui/core";

type ActionButtonProps = {
  text: string;
  [name: string]: any;
};

const ActionButton: React.FC<ActionButtonProps> = ({ text, ...props }) => (
  <Button textTransform="uppercase" border="0" {...props}>
    {text}
  </Button>
);

export default ActionButton;
