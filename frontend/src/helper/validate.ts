/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

type ValueUsername = {
  username: string;
};
type ValuePassword = {
  password: string;
};

type ValueEmail = {
  email: string;
};
type ValueResetPassword = {
  password: string;
  confirmPwd: string;
};

export async function usernameValidate(values: ValueUsername) {
  const error: unknown = usernameVerify({}, values);
  return error;
}

export const passwordValidate = async (values: ValuePassword) => {
  const error: unknown = passwordVerify({}, values);
  return error;
};

export const resetPasswordVaidate = async (values: ValueResetPassword) => {
  const error: any = passwordVerify({}, values);
  if (values.password !== values.confirmPwd) {
    error.exist = toast.error("Password doesn't match");
  }
  return error;
};

export const registerValidate = async (values: any) => {
  const error: any = emailVerify({}, values);
  usernameVerify(error, values);
  passwordVerify(error, values);
  return error;
};

export const profileValidate = async (values: any) => {
  const error = emailVerify({}, values);
  return error;
};

const usernameVerify = (error: any, values: ValueUsername) => {
  if (!values.username) {
    error.username = toast.error("Username is required");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid username");
  }
};

const passwordVerify = (error: any, values: ValuePassword) => {
  // eslint-disable-next-line no-useless-escape
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password is required");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password");
  } else if (values.password.length < 6) {
    error.password = toast.error("Password must be at least 6 characters");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one special character"
    );
  }
};

const emailVerify = (error: any, values: ValueEmail) => {
  if (!values.email) {
    error.email = toast.error("Email is required");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid email address");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid email address");
  }
  return error;
};
