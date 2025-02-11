import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../Functions/api';
import './Login.css'
import Profile from '../../assets/userProfile.png'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Login = ({ path }) => {
     const navigate = useNavigate();
     const { login, isLoading } = Api();
     const [showPassword, setShowPassword] = useState(false);

     useEffect(() => {
          const checkAndNavigate = async () => {
               const token = localStorage.getItem('token');
               if (token) {
                    navigate('/');
               }
          };
          checkAndNavigate();
     }, [navigate]);

     const initialValues = {
          email: '',
          password: '',
     };

     const validationSchema = Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
     });

     const onSubmit = async (values) => {
          login(values);
     };

     const handleAutofill = (e) => {
          e.preventDefault();
          const email = e.target.elements.email.value;
          const password = e.target.elements.password.value;
          const values = {
               email,
               password,
          };
          onSubmit(values);
     };

     const handleGoogleLogin = () => {
          window.location.href = 'https://backend.pgdavhyperion.in/api/auth/redirect/google';
     };

     useEffect(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const token = urlParams.get('token');
          if (token) {
               localStorage.setItem('token', token);
               navigate('/'); //. Redirect to the desired page after storing the token
          }
     }, [navigate]);

     return (
          <div className={`${isLoading ? 'opacity-40' : 'opacity-100'} `} >
               <div className="container-login100 " >
                    <div className="wrap-login100 flex items-center">
                         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                              {({ isValid }) => (
                                   <Form className={`login100-form validate-form `} onSubmit={handleAutofill}>
                                        <span className="login100-form-logo">
                                             <img src={Profile} alt="" />
                                        </span>
                                        <span className="login100-form-title">
                                             Log in
                                        </span>
                                        <div className="wrap-input100 validate-input" data-validate="Enter username">
                                             <Field type="email" name="email" className="input100 text-white placeholder:text-white " placeholder="Email" />
                                             <span className='focus-input100' data="&#xf15a;"></span>
                                        </div>
                                        <ErrorMessage name="email" component="div" className="error-message" />
                                        <div className="wrap-input100 validate-input -mb-2" data-validate="Enter password">
                                             <Field type={showPassword ? "text" : "password"} name="password" className="input100 placeholder:text-white" placeholder="Password" />
                                             <span className="focus-input100" data="&#xf191;"></span>
                                        </div>
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className=" text-lg text-white hover:cursor-pointer relative -top-6 left-56">
                                             {showPassword ? <IoMdEyeOff /> : <IoEye />}
                                        </button>
                                        <ErrorMessage name="password" component="div" className="error-message" />
                                        <div className={`container-login100-form-btn`}>
                                             <button type="submit" className={`login100-form-btn ${!isValid && 'opacity-45 cursor-not-allowed'} cursor-pointer`} disabled={!isValid} >
                                                  Login
                                             </button>
                                        </div>
                                        <hr className='mt-4' />
                                        <div className="px-6 sm:px-0 max-w-sm mt-8">
                                             <button type="button" onClick={handleGoogleLogin} className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                                                  <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                                       <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                                  </svg>
                                                  Sign in/up with Google
                                                  <div></div>
                                             </button>
                                        </div>
                                        <hr className='mt-4' />
                                        <div className="text-center pt-6">
                                             <Link to="/registration" className="txt1">
                                                  Don't Have an account? <span className='text-white font-medium'> Sign Up</span>
                                             </Link>
                                        </div>
                                        <div className="text-center pt-6">
                                             <Link to="/forget-password" className="txt1">
                                                  Forgot Password?
                                             </Link>
                                        </div>
                                   </Form>
                              )}
                         </Formik>
                    </div>
               </div>
          </div>
     );
};

export default Login;