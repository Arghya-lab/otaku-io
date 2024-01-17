import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

function AccountSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.preference);
  const { status, userData } = useSelector((state) => state.auth);

  return (
    <div>
      {!status ? (
        <div>
          <p className="text-neutral-700 dark:text-slate-300">
            Connect your account for save your preferences in cloud.
          </p>
          <span
            className="hover:underline cursor-pointer font-nunito"
            style={{ color: theme.secondaryColor }}
            onClick={() =>
              navigate("/login", { state: { from: location }, replace: true })
            }>
            login
          </span>
          <span className="text-gray-950 dark:text-slate-100 text-sm">
            &nbsp;or&nbsp;
          </span>
          <span
            className="hover:underline cursor-pointer font-nunito"
            style={{ color: theme.secondaryColor }}
            onClick={() =>
              navigate("/signup", { state: { from: location }, replace: true })
            }>
            signup
          </span>
        </div>
      ) : (
        <div>
          <p></p>
          <p className="text-neutral-700 dark:text-slate-300">
            {userData?.providerUid}
          </p>
          <span
            className="hover:underline cursor-pointer font-nunito"
            style={{ color: theme.secondaryColor }}
            onClick={() => dispatch(logout())}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
}

export default AccountSection;
