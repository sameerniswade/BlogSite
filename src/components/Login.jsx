import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import authServices from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const { handleSubmit, register, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);

  const onSubmit = async (data) => {
    const userDetails = await authServices.login(data.email, data.password);
    if (userDetails) {
      dispatch(login(userDetails));
      navigate("/home");
    }
  };

  return (
    <div className="centerElement block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <form
        className="flex flex-col justify-center items-center "
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex">
            <Input
              ref={ref}
              lable="Email : "
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter valid Email",
                },
              })}
            />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>
          <div className="flex">
            <Input
              ref={ref}
              lable="Password : "
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message: "Please enter valid Password",
                },
              })}
            />
            <p className="text-red-400">{errors.password?.message}</p>
          </div>
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

export default Login;
