import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordVaidate } from "../helper/validate";
import cn from "classnames";

interface ValuesType {
  password: string;
  confirmPwd: string;
}

const Reset = () => {
  const initialValues: ValuesType = {
    password: "admin@123",
    confirmPwd: "admin@123",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validate: resetPasswordVaidate,
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
        <div className={cn(styles.glass, "w-1/2")}>
          <div className="flex flex-col items-center title">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="w-2/3 pt-4 text-xl text-center text-gray-500 ">
              {"Enter new passwod"}
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col items-center gap-6 textbox">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="New password"
              />
              <input
                {...formik.getFieldProps("confirmPwd")}
                className={styles.textbox}
                type="password"
                placeholder="Repeat password"
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
