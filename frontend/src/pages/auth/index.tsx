import { Route } from "react-router";
import { Login } from "./login";
import { Register } from "./register";
import { ForgotPassword } from "./forgotPassword";

export function AuthPagesRoutes() {
  return (
    <>
      <Route path={`/login`} element={<Login />} />
      <Route path={`/register`} element={<Register />} />
      <Route path={`/forgot-password`} element={<ForgotPassword />} />
    </>
  );
}
