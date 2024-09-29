import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/CommonForm/CommonForm";
import { loginFormControls } from "@/components/Common/config/config";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { googleSignIn, loginUser } from "@/store/Slice/authSlice/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const formInstance = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      const result = await dispatch(googleSignIn(response.access_token));
      if (result.payload.success) {
        toast.success("Signed in successfully");
      } else {
        toast.error("Google Sign-In failed.");
      }
    },
    onError: () => toast.error("Google Sign-In failed."),
  });


 
  const onSubmit = async (data) => {
    const formData = {
      email: data?.email,
      password: data?.password,
    };
    try {
      const result = await dispatch(loginUser(formData));
      if (result?.payload?.success) {
        toast.success(result?.payload?.message);

        
        if (result?.payload?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/shop/home");
        }
      } else {
        toast.error("Something is wrong please try again later!");
        formInstance.reset();
      }
    } catch (error) {
      toast.error("Something is wrong please try again later");
      console.log("error", error);
    }
  };

  return (
    <CommonForm
      fields={loginFormControls(formInstance.control)}
      onSubmit={onSubmit}
      showPasswordToggle={true}
      title={"Login Account"}
      description={"Login to access the best deals and offers"}
      buttonText={"Login"}
      googleSignInHandler={handleGoogleSignIn}
      googleSignInText={"Sign in with Google"}
      linkText={"Don't have an Account?"}
      linkToggleText={"Register"}
      linkTo={"/auth/register"}
    />
  );
};

export default Login;
