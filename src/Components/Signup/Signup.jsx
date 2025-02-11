import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Profile from "../../assets/userProfile.png";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../Functions/Constants";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showNormalPassword, setShowNormalPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const checkAndNavigate = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/");
      }
    };
    checkAndNavigate();
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // Redirect after storing the token
    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "https://backend.pgdavhyperion.in/api/auth/redirect/google";
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(/^.{8,}$/, "Minimum 8 characters")
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setIsLoading(false);
        localStorage.setItem("token", data?.access_token);
        navigate(`/thanks`);
      } else {
        setIsLoading(false);
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert(error?.response?.data?.message || error.message || "Signup failed! Please try again.");
    }
  };

  return (
    <div className={`${isLoading ? "opacity-40" : "opacity-100"} w-full`}>
      <div className="container-login100 min-h-screen mt-2">
        <div className="wrap-login100">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors }) => (
              <Form className="login100-form validate-form">
                <span className="login100-form-logo">
                  <img src={Profile} alt="User Profile" />
                </span>
                <span className="login100-form-title">Signup</span>

                <div className="wrap-input100 validate-input" data-validate="Enter username">
                  <Field type="text" name="name" className="input100 text-white placeholder:text-white" placeholder="Username" />
                  <span className="focus-input100" data="&#xf207;"></span>
                </div>
                <ErrorMessage name="name" component="div" className="error-message" />

                <div className="wrap-input100 validate-input -mt-4" data-validate="Enter email">
                  <Field type="email" name="email" className="input100 placeholder:text-white" placeholder="Email" />
                  <span className="focus-input100" data="&#xf15a;"></span>
                </div>
                <ErrorMessage name="email" component="div" className="error-message" />

                <div className="wrap-input100 validate-input -mt-4" data-validate="Enter password">
                  <Field type={showNormalPassword ? "text" : "password"} name="password" className="input100 placeholder:text-white" placeholder="Password" />
                  <span className="focus-input100" data="&#xf191;"></span>
                </div>
                <button type="button" onClick={() => setShowNormalPassword(!showNormalPassword)} className="text-lg text-white hover:cursor-pointer relative -top-16 left-56">
                  {showNormalPassword ? <IoMdEyeOff /> : <IoEye />}
                </button>
                <ErrorMessage name="password" component="div" className="error-message max-w-60" />

                <div className="wrap-input100 validate-input -mt-8" data-validate="Confirm password">
                  <Field type={showConfirmPassword ? "text" : "password"} name="password_confirmation" className="input100 placeholder:text-white" placeholder="Confirm Password" />
                  <span className="focus-input100" data="&#xf191;"></span>
                </div>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-lg text-white hover:cursor-pointer relative -top-16 left-56">
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoEye />}
                </button>
                <ErrorMessage name="password_confirmation" component="div" className="error-message -mt-8" />

                <div className="container-login100-form-btn mt-8">
                  <button type="submit" className={`login100-form-btn -mt-8 ${Object.keys(errors).length ? "opacity-40 cursor-not-allowed" : "cursor-pointer opacity-100"}`} disabled={!!Object.keys(errors).length}>
                    Signup
                  </button>
                </div>

                <hr className="mt-6" />

                {/* Google Login Button */}
                <div className="px-6 sm:px-0 max-w-sm mt-8">
                  <button type="button" onClick={handleGoogleLogin} className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                    <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Sign up with Google
                    <div></div>
                  </button>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
