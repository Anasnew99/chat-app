import React, { FC } from "react";

interface ContainerProps {}

const Container: FC<ContainerProps> = (props) => {
  return <div>{props.children}</div>;
};
export default Container;
