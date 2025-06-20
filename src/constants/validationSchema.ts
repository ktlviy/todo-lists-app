import * as Yup from "yup";

export const validationSchemaRegister = Yup.object({
  name: Yup.string()
    .min(4, "Too short")
    .matches(/^[A-Za-z].*$/, "Name must start with a letter")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().min(6, "Too short").required("Password is required!"),
});

export const validationSchemaLogin = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required!"),
  password: Yup.string().min(6, "Too short").required("Password is required!"),
});
