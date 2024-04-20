import { Link } from "react-router-dom";
import styles from "../styles/Username.module.css";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

const Password = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className="containemx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Hello</h4>
            <span className="w-2/3 py-4 text-xl text-center text-gray-500 ">
              {"explore more by connecting with us"}
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4 profile">
              <img src={avatar} className={styles.profile__img} alt="avatar" />
            </div>
            <div className="flex flex-col items-center gap-6 textbox">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="password"
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="text-gray-500">
                {"Forgot Password? "}
                <Link className="text-red-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
