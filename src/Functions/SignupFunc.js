import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from './Constants';
import { Formik } from 'formik';

const SignupFunc = () => {
     const navigate = useNavigate();
     const [isLoading, setIsLoading] = useState(false);
 
     const initialValues = {
         name: '',
         email: '',
         password: '',
         password_confirmation: '',
         screenshot: '',
     };
 
     const validationSchema = Yup.object({
         name: Yup.string().required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
         password: Yup.string()
             .matches(
                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/,
                 'Weak Password'
             )
             .required('Required'),
         password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
         screenshot: Yup.mixed().required('A screenshot is required'),
     });
 
     const onSubmit = async (values) => {
         setIsLoading(true);
         const formData = new FormData();
         for (const key in values) {
             formData.append(key, values[key]);
         }
         try {
             const response = await axios.post(`${API_URL}/register`, formData, {
                 headers: {
                     'Content-Type': 'multipart/form-data',
                 }
             });
             const data = response.data;
             if (response.status === 200) {
                 setIsLoading(false);
                 localStorage.setItem('token', data?.access_token);
                 navigate(`/thanks`);
             } else {
                 setIsLoading(false);
                 alert("Signup failed! Please try again.");
             }
         } catch (error) {
             setIsLoading(false);
             if (error?.response.status === 422) {
                 alert("Email already exists.");
             }
             console.error('Error:', error.response.data.ErrorMessage);
         }
     };

     return {
         initialValues,
         validationSchema,
         onSubmit,
         isLoading
     };
 };
 
 export default SignupFunc;
 