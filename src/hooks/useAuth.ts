import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { register, login, logout } from "../features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const registerUser = (email: string, password: string) => {
    dispatch(register({ email, password }));
  };

  const loginUser = (email: string, name: string) => {
    dispatch(login({ email, name }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    ...authState,
    registerUser,
    loginUser,
    logoutUser,
  };
};
