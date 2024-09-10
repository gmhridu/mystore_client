import React from "react"
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CommonForm from "@/components/Common/CommonForm/CommonForm";
import { registerFormControls } from "@/components/Common/config/config";
import { useDispatch } from "react-redux";
import { googleSingIn, registerUser } from "@/store/Slice/authSlice/authSlice";
import { useGoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const formInstance = useForm();

  const from = location?.state || "/login";

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      const result = await dispatch(googleSingIn(response.access_token));
      if (result.payload.success) {
        toast.success("Signed in successfully");
        navigate(from);
      } else {
        toast.error("Google Sign-In failed.");
      }
    },
    onError: () => toast.error("Google Sign-In failed."),
  });


  

  const onSubmit = async (data) => {
    const formData = {
      userName: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      if (formData?.password === formData?.confirmPassword) {
        await dispatch(registerUser(formData)).then((data) => {
          if (data?.payload?.success) {
            toast.success("User registered successfully");
            navigate("/auth/login");
          } else {
            toast.error("User already exists");
            return;
          }
        });
      } else {
        toast.error("Oops! Your passwords don’t match. Please re-enter them.");
        return;
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <CommonForm
      fields={registerFormControls(formInstance.control)}
      onSubmit={onSubmit}
      showPasswordToggle={true}
      title="Register Account"
      description="Create a new account to access the best deals and offers."
      buttonText="Register"
      googleSignInHandler={handleGoogleSignIn}
      googleSignInText="Sign up with Google"
      linkText={"Already have an Account?"}
      linkToggleText={"Login"}
      linkTo={"/auth/login"}
    />
  );
};

export default Register;
