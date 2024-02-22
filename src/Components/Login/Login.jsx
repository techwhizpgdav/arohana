import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../../Functions/api';
import './Login.css'
import Profile from '../../assets/userProfile.png'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
const Login = ({path}) => {

     const navigate = useNavigate();
     const {login , isLoading} = Api();
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

     return (
          <div className={`${isLoading? 'opacity-40': 'opacity-100'} `} >
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
                                   <div className="wrap-input100 validate-input" data-validate = "Enter username">
                                        <Field type="email" name="email" className="input100 text-white placeholder:text-white " placeholder="Email"  />
                                        <span className='focus-input100' data="&#xf15a;"></span>
                                   </div>
                                   <ErrorMessage name="email" component="div" className="error-message" />
                                   <div className="wrap-input100 validate-input" data-validate="Enter password">
                                        <Field type= {
                                             showPassword ? "text" : "password"
                                        } name="password" className="input100 placeholder:text-white" placeholder="Password" />
                                        
                                        <span className="focus-input100" data="&#xf191;"></span>
                                   </div>
                                   <button type="button" onClick={() => setShowPassword(!showPassword)} className=" text-lg text-white hover:cursor-pointer relative -top-16 left-56">
                                        {showPassword ? <IoMdEyeOff /> : <IoEye />}
                                        </button>
                                   <ErrorMessage name="password" component="div" className="error-message" />
                                   <div className={`container-login100-form-btn`}>
                                        <button type="submit" className={`login100-form-btn ${!isValid && 'opacity-45 cursor-not-allowed'} cursor-pointer`} disabled={!isValid} >
                                             Login
                                        </button>
                                   </div>
                                   <div className="text-center pt-6">
                                        <Link to="/registration" className="txt1">
                                             Don't Have an account? <p className=' text-white font-medium'> Sign Up</p> 
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