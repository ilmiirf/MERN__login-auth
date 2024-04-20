/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate";
import { useState } from "react";
import convertToBase64 from "../helper/convert";

import styles from "../styles/Username.module.css";
import stylesProfile from "../styles/Profile.module.css";

interface ValuesType {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
}

const Profile = () => {
  const [file, setFile] = useState<any>();
  const initialValues: ValuesType = {
    firstName: "Shan",
    lastName: "Vey",
    email: "shan@gamil.com",
    mobile: "082234567890",
    address: "malang",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: profileValidate,
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
        <div className={`${styles.glass} ${stylesProfile.glass} w1/2`}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="w-2/3 py-4 text-xl text-center text-gray-500 ">
              {"You can update your profile here"}
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4 profile">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile__img} ${stylesProfile.profile__img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  className={`${styles.textbox} ${stylesProfile.textbox}`}
                  placeholder="first name"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  className={`${styles.textbox} ${stylesProfile.textbox}`}
                  placeholder="last name"
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${stylesProfile.textbox}`}
                  type="text"
                  placeholder="mobile"
                />
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${stylesProfile.textbox}`}
                  type="text"
                  placeholder="email"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${stylesProfile.textbox}`}
                type="text"
                placeholder="address"
              />

              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="text-gray-500">
                {"Come back later?"}
                <Link className="text-red-500" to="/">
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
