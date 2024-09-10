import { AuthContext } from "@/components/Common/Providers/AuthProviders";
import { useContext } from "react";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
