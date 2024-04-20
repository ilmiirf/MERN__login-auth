import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

const Recovery = () => {
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
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="w-2/3 pt-4 text-xl text-center text-gray-500 ">
              {"Enter OTP to recover your password"}
            </span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center gap-6 textbox">
              <div className="text-center input">
                <span className="py-4 text-sm text-gray-100">
                  {"Enter 6 digit OTP sent to your email address"}
                </span>
              </div>

              <input className={styles.textbox} type="text" placeholder="OTP" />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="text-gray-500">
                {"Can't get OTP? "}
                <button className="text-red-500">Resend</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
