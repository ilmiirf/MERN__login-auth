/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate } from "../helper/validate";
import cn from "classnames";
import { useState } from "react";
import convertToBase64 from "../helper/convert";

interface ValuesType {
  email: string;
  username: string;
  password: string;
}

const Register = () => {
  const [file, setFile] = useState<any>();
  const initialValues: ValuesType = {
    email: "",
    username: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });
  const onUpload = async (e: any) => {
    const base64 = await convertToBase64(e.target?.files[0]);
    setFile(base64);
  };
  return (
    <div className="containemx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={(cn(styles.glass), "w-1/2")}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="w-2/3 py-4 text-xl text-center text-gray-500 ">
              {"Join with us now and enjoy our services"}
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4 profile">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile__img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="flex flex-col items-center gap-6 textbox">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="email"
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="username"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="password"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="text-gray-500">
                {"Already have an account? "}
                <Link className="text-red-500" to="/">
                  Login now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
