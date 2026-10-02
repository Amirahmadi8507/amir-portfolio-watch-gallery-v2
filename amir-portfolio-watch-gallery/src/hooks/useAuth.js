import { useContext } from "react";
import AuthContext from "../context/authContextValue";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;