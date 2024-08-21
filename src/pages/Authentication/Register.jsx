import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPass, setConfirmShowPass] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    signInWithGoogle,
    createUser,
    updateUserProfile,
    user,
    setUser,
    loading,
  } = useAuth();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const from = location?.state || "/login";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setConfirmShowPass(!confirmShowPass);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      const user = result?.user;
      if (user) {
        setUser(user);
      }
      toast.success("Account registered successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong please try again");
    }
  };

  const onSubmit = async (data) => {
    const { username, email, password, confirmPassword } = data;

    console.log(data)

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await createUser(email, password);

      await updateUserProfile(username);

      setUser({ ...result?.user, displayName: username });

      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
        withCredentials: true,
      });
      console.log(data);

      toast.success("Account registered successfully");
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong; please try again");
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden h-[90vh]">
      <Card className="w-[450px] py-2">
        <CardHeader>
          <CardTitle>Register Account</CardTitle>
          <CardDescription>
            Create a new account to access the best deals and offers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Registration Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="username"
                control={form.control}
                placeholder="john.doe"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                placeholder="john.doe@mail.com"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                placeholder="******"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                      </button>
                    </div>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                placeholder="******"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your confirm password"
                          type={confirmShowPass ? "text" : "password"}
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={handleShowConfirmPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {confirmShowPass ? (
                          <IoEyeOutline />
                        ) : (
                          <IoEyeOffOutline />
                        )}
                      </button>
                    </div>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full my-4">
                Register
              </Button>
            </form>
          </Form>
          <Button
            onClick={handleGoogleSignIn}
            aria-label="Register with Google"
            className="p-3 flex gap-x-2 w-full bg-white text-black border rounded-md hover:bg-black hover:text-white"
          >
            <FcGoogle className="text-2xl" />
            <span className="">Sign in with Google</span>
          </Button>
          <div className="flex items-center justify-center my-2">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500 pl-1">
              Login Now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
