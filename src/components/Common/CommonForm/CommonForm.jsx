import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CommonForm = ({
  fields,
  onSubmit,
  showPasswordToggle,
  title,
  description,
  buttonText,
  googleSignInHandler,
  googleSignInText,
  linkText,
  linkTo,
  linkToggleText,
  defaultValues = {},
  className
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setConfirmPassword(!confirmPassword);

  const methods = useForm({ defaultValues });

  return (
    <div className={`flex items-center justify-center overflow-hidden h-[90vh] ${className}`}>
      <Card className="lg:w-[450px] py-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) =>
                onSubmit(data, methods.reset)
              )}
            >
              {fields?.map((field, index) => (
                <FormField
                  key={index}
                  control={methods.control}
                  name={field.name}
                  rules={field.rules}
                  render={({ field: formField, fieldState }) => (
                    <FormItem className="relative mb-4">
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "select" ? (
                          <Select
                            onValueChange={formField.onChange}
                            value={formField.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === "textarea" ? (
                          <Textarea
                            {...formField}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <Input
                            {...formField}
                            placeholder={field.placeholder}
                            type={
                              field.name === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : field.name === "confirmPassword"
                                  ? confirmPassword
                                    ? "text"
                                    : "password"
                                  : "text"
                            }
                          />
                        )}
                      </FormControl>
                      {/* Password Toggle Button */}
                      {field.name === "password" && showPasswordToggle && (
                        <button
                          type="button"
                          onClick={handleShowPassword}
                          className="absolute right-0 top-1/2 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <IoEyeOutline />
                          ) : (
                            <IoEyeOffOutline />
                          )}
                        </button>
                      )}

                      {/* Confirm Password Toggle Button */}
                      {field.name === "confirmPassword" &&
                        showPasswordToggle && (
                          <button
                            type="button"
                            onClick={handleShowConfirmPassword}
                            className="absolute right-0 top-1/2 pr-3 flex items-center"
                          >
                            {confirmPassword ? (
                              <IoEyeOutline />
                            ) : (
                              <IoEyeOffOutline />
                            )}
                          </button>
                        )}

                      {fieldState.error && (
                        <FormMessage>{fieldState.error.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" className={`w-full my-4`}>
                {buttonText}
              </Button>
              {googleSignInHandler && (
                <Button
                  onClick={googleSignInHandler}
                  aria-label="Sign in with Google"
                  className="p-3 flex gap-x-2 w-full bg-white text-black border rounded-md hover:bg-black hover:text-white"
                >
                  <FcGoogle className="text-2xl" />
                  <span>{googleSignInText}</span>
                </Button>
              )}
            </form>
          </FormProvider>
          {linkText && linkTo && linkToggleText && (
            <div className="flex items-center justify-center my-2">
              <span>{linkText}</span>
              <Link to={linkTo} className="text-blue-500 pl-1">
                {linkToggleText}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommonForm;
