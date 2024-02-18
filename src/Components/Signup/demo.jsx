import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Functions/Constants';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
     const navigate = useNavigate();
     const [email, setEmail] = useState('');
     const [step, setStep] = useState(3);
     const initialValues = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
     };
     const emailValues = {
          email: '',
     };
     const otpValues = {
          'email': email,
          otp: ''
     };
     const validationSchema = Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
          password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
     });
     const emailSchema = Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
     });
     const otpSchema = Yup.object({
          otp: Yup.string().required('Required'),
     });
     const sendOtp = async (values) => {
          try {
               const response = await axios.post(`${API_URL}/send-otp`, values);
               if(response.status === 200) {
                    const emailData = await response.data.email;
                    setEmail(emailData);
                    setStep(2);
               }
          } catch (error) {
               console.log(error);
          }
     };
     const verifyOtp = async (values) => {
          try {
               const response = await axios.post(`${API_URL}/verify-otp-antara`, values);
               if(response.status === 200) {

                    setStep(3);

               }
          } catch (error) {
               console.log(error);
          }
     };
     const onSubmit = async (values) => {

          try {
            const response = await axios.post(`${API_URL}/register`, values , {
                 headers: {
                       'Content-Type': 'application/json',
                     }
               }
            ); 
            const data = response.data;
            if (response.status === 400) {
              alert('User already exists! Please login.');
            }
            else if (response.status === 200) {
              localStorage.setItem('token', data.token);
              navigate(`/thanks`);
            } else {
              alert("Signup failed! Please try again.");
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
     return (
          <>
          {
               step ==1 ? 
               <div className="flex justify-center items-center h-full p-10 bg-gray-100">
                    <div className="w-96 h-full bg-white p-5 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-gray-800">Signup</h1>
                    <Formik initialValues={emailValues} validationSchema={emailSchema} onSubmit={sendOtp}>
                         <Form className="mt-5">
                              <div className="mb-5">
                                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                                   <Field type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                                   <ErrorMessage name="email" component="div" />
                              </div>
                              <button type="submit" className="w-full py-2 px-3 bg-blue-500 text-white rounded-md focus:outline-none">Send OTP</button>
                         </Form>
                    </Formik>
                    </div>
               </div>
               : <div></div>
          }
          
          {
               step == 2 ?
               <div className="mb-5">
                    <div className="flex justify-center items-center h-full p-10 bg-gray-100">
                         <div className="w-96 h-full bg-white p-5 rounded-lg shadow-lg">
                              <h1 className="text-3xl font-bold text-center text-gray-800">Verify Otp</h1>
                              <Formik initialValues={otpValues} validationSchema={otpSchema} onSubmit={verifyOtp}>
                                   <Form className="mt-5">
                                        <div className="mb-5">
                                             <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-600">Otp</label>
                                             <Field type="text" id="otp" name="otp" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                                             <ErrorMessage name="otp" component="div" />
                                        </div>
                                        <button type="submit" className="w-full py-2 px-3 bg-blue-500 text-white rounded-md focus:outline-none">Verify</button>
                                   </Form>
                              </Formik>
                         </div>
                    </div>
               </div>
                    : <div></div>
          }
          { step == 3 ? 
               <div className="flex justify-center items-center h-full p-10 bg-gray-100">
                    <div className="w-96 h-full bg-white p-5 rounded-lg shadow-lg">
                         <h1 className="text-3xl font-bold text-center text-gray-800">Signup</h1>
                         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                              <Form className="mt-5">
                                   <div className="mb-5">
                                        <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-600">Username</label>
                                        <Field type="text" id="userName" name="userName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                                        <ErrorMessage name="userName" component="div" />
                                   </div>
                                   <div className="mb-5">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                                        <Field type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                                        <ErrorMessage name="email" component="div" />
                                   </div>
                                   <div className="mb-5">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                                        <Field type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                                        <ErrorMessage name="password" component="div" />
                                   </div>
                                   <div className="mb-5">
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-600">Confirm Password</label>
                                        <Field type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                                        <ErrorMessage name="confirmPassword" component="div" />
                                   </div>
                                   <button type="submit" className="w-full py-2 px-3 bg-blue-500 text-white rounded-md focus:outline-none">Signup</button>
                              </Form>
                         </Formik>
                    </div>
               </div> 
               : <div></div>

          }

          </>
     );
};

export default Signup;