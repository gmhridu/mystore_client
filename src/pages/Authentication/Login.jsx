import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const from = location.state || "/";

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const { data } = await axiosSecure.post(`/jwt`, {
        email: result?.user?.email,
      });
      toast.success("Sign in Successfully");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
      console.log(err.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      await signIn(data?.email, data?.password);
      const { data: tokenData } = await axiosSecure.post(`/jwt`, {
        email: data?.email,
      });
      localStorage.setItem("authToken", tokenData.token);
      toast.success("Sign in Successfully");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Failed to sign in");
      console.error(err.message);
    }
  };
  return (
    <div className="flex items-center justify-center overflow-hidden h-[90vh]">
      <Card className="w-[450px] py-2">
        <CardHeader>
          <CardTitle>Login Account</CardTitle>
          <CardDescription>
            Sign in to access the best deals and offers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <Button type="submit" className="w-full my-4">
                Login
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
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500 pl-1">
              Register Now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
