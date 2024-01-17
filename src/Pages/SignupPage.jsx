import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import TopNavbar from "../Components/TopNavbar";
import { signup } from "../features/auth/authSlice";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/";
  const { theme } = useSelector((state) => state.preference);

  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Too Short!")
      .max(16, "Too Long!")
      .required("UserName is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(16, "Too Long!")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (user) => {
      dispatch(signup(user)).then((result) => {
        if (!result?.error) navigate(from, { replace: true });
      });
    },
  });

  return (
    <div className="relative h-full">
      <TopNavbar />
      <div className="pt-24 pb-8 h-full w-[90%] max-w-xl m-auto">
        <p
          className="px-4 text-center text-4xl font-semibold pb-10"
          style={{ color: theme.secondaryColor }}>
          Signup
        </p>
        <div className="px-4 pb-6 w-full">
          <form onSubmit={formik.handleSubmit}>
            <label
              htmlFor="userName"
              className="pl-2 mb-1 font-semibold text-neutral-900 dark:text-slate-100">
              User Name
            </label>
            <input
              htmlFor="userName"
              id="userName"
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              placeholder=""
              className="px-4 focus:outline-none bg-transparent font-medium text-neutral-900 dark:text-slate-100 h-10 w-full rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 shadow-md"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <div className="text-red-500 text-sm pl-2 mt-1 mb-6 h-4">
              {formik.errors.userName && formik.touched.userName
                ? formik.errors.userName
                : null}
            </div>

            <label
              htmlFor="email"
              className="pl-2 mb-1 font-semibold text-neutral-900 dark:text-slate-100">
              Email
            </label>
            <input
              htmlFor="email"
              id="email"
              type="email"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              placeholder=""
              className="px-4 focus:outline-none bg-transparent font-medium text-neutral-900 dark:text-slate-100 h-10 w-full rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 shadow-md"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="text-red-500 text-sm pl-2 mt-1 mb-6 h-4">
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : null}
            </div>

            <label
              htmlFor="password"
              className="pl-2 mb-1 font-semibold text-neutral-900 dark:text-slate-100">
              Password
            </label>
            <input
              htmlFor="password"
              id="password"
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
              placeholder=""
              className="px-4 focus:outline-none bg-transparent font-medium text-neutral-900 dark:text-slate-100 h-10 w-full rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 shadow-md"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="text-red-500 text-sm pl-2 mt-1 mb-6 h-4">
              {formik.errors.password && formik.touched.password
                ? formik.errors.password
                : null}
            </div>
            <div className="flex items-center justify-between pt-4">
              <p
                role="button"
                className="text-neutral-800 dark:text-slate-100 text-sm hover:underline"
                onClick={() => navigate("/login")}>
                Already have an account ?
              </p>
              <button
                type="submit"
                className="px-3 py-1 rounded-md font-semibold text-neutral-800 dark:text-slate-100 bg-white bg-opacity-0 border hover:bg-opacity-5"
                style={{ borderColor: theme.secondaryColor }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
