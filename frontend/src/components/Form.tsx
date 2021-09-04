import { Formik } from "formik";
import React, {
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface CustomInputProps {
  type: string;
  name: string;
  placeholder?: string;
}
interface ButtonProps {
  label: ReactNode | string;
}
interface FormProps {
  onSubmit(values: { [x: string]: any }): void;
  initialValues: {
    [x: string]: any;
  };
  inputs: Array<CustomInputProps>;
  buttonProps: ButtonProps;
}

const Form: FC<FormProps> = ({
  onSubmit,
  initialValues,
  inputs = [],
  buttonProps,
}) => {
  const renderInput = (
    input: CustomInputProps,
    value: any,
    handleChange: ChangeEventHandler
  ) => {
    const { placeholder, type, name } = input;
    switch (type) {
      case "text":
        return (
          <input
            type={"text"}
            name={name}
            key={input.name}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
          />
        );
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ handleSubmit, values, handleChange }) => {
        return (
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => {
              return renderInput(input, values[input.name], handleChange);
            })}

            <button type={"submit"}>{buttonProps.label}</button>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
