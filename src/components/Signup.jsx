import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import authServices from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
function Signup() {
  // initialization of varaiable
  const { handleSubmit, register, formState } = useForm();
  const { errors } = formState;
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handle Submit
  const onSubmit = async (data) => {
    const isSignup = await authServices.signup(data);
    if (isSignup) {
      dispatch(login(isSignup));
      navigate("/home");
    }
  };
  return (
    <div className="centerElement ">
      <form
        className="flex flex-col justify-center items-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex">
            <Input
              ref={ref}
              lable="Name : "
              {...register("email", {
                required: true,
              })}
            />
          </div>
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

export default Signup;
