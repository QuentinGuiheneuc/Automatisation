import React, { useState } from "react";

import Input from "../../components/Input";
import ColoredSubmitButton from "../../components/ColoredSubmitButton";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import { auth } from "../../states/authSlice";
import { getData } from "../../data/data";

import { userApi } from "../../data/userApi";

// import { localTokenGet } from "../../data/localStokage";

export default function Login() {
  const navigate: NavigateFunction = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    submitted: false,
  });
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userApi
      .login(user.email, user.password)
      .then(async (reponse) => {
        if (reponse.error) {
          setError("Bad login");
          console.log(reponse.error);
        } else {
          dispatch(auth(reponse));
          getData(dispatch).catch((e) => {});
          navigate("/");
        }
      })
      .catch((e) => {
        setError(`Bad login${e}`);
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col items-center h-full bg-black">
      <div className="mt-36 w-28%">
        <h1 className="text-white text-3xl mb-5">Sign In</h1>
        <form
          onSubmit={handleSubmit}
          className="pl-14 pr-14 pt-10 pb-10 bg-grey-dark space-y-10"
        >
          <div className="space-y-4">
            <Input
              placeholder="Enter your email"
              text="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <Input
              placeholder="Enter your password"
              text="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <span className="text-red">{error}</span>
          </div>
          <ColoredSubmitButton text="SIGN IN" className="text-sm" />
        </form>
      </div>
    </div>
  );
}
