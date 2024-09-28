import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommonForm from "@/components/Common/CommonForm/CommonForm";
import { loginFormControls } from "@/components/Common/config/config";
import { useDispatch } from "react-redux";
import { googleSingIn, loginUser } from "@/store/Slice/authSlice/authSlice";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const formInstance = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      const result = await dispatch(googleSingIn(response.access_token));
      if (result.payload.success) {
        toast.success("Signed in successfully");
      } else {
        toast.error("Google Sign-In failed.");
      }
    },
    onError: () => toast.error("Google Sign-In failed."),
  });

  // ok

 
  const onSubmit = async (data) => {
    const formData = {
      email: data?.email,
      password: data?.password  
    }
    try {
     await dispatch(loginUser(formData))
        .then((data) => {
        if(data?.payload?.success){
          toast.success(data?.payload?.message);
        } else {
          toast.error("Something is wrong please try again later!");
          formInstance.reset();
        }
      })
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
