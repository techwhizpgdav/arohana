import React , {useState}from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { API_URL } from '../../Functions/Constants'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
const ResetPass = () => {
  const { token } = useParams()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showNormalPassword, setShowNormalPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialValues = {
    token : token,
    email: email,
    password: '',
    password_confirmation: '',
  }
  const validationSchema = Yup.object({
    password: Yup.string()
    .matches(
      /^.{8,}$/,
      "Minimum 8 characters"
    )
      .required("Required"),
      password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  })
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/reset-password`, values);
      if (response.status == 200) {
        alert('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <div>
      <div className={`${isLoading ? "opacity-40" : "opacity-100"} `}>
        <div className="container-login100 ">
          <div className="wrap-login100 flex items-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isValid }) => (
                <Form
                  className={`login100-form validate-form `}
                >
                  <span className="login100-form-title -translate-y-20">
                    Reset Password
                  </span>
                  <div
                    className="wrap-input100 "
                    data-validate="Enter username"
                  >
                    <div className='input100 text-white translate-y-3 opacity-70'>
                      {email}
                    </div>
                    <span className="focus-input100" data="&#xf15a;"></span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <Field
                      type= {showNormalPassword ? "text" : "password"}
                      name="password"
                      className="input100 text-white placeholder:text-white "
                      placeholder="Password"
                    />
                    <span className="focus-input100" data="&#xf191;"></span>
                  </div>
                  <button type="button" onClick={() => setShowNormalPassword(!showNormalPassword)} className=" text-lg text-white hover:cursor-pointer relative -top-16 left-56">
                  {showNormalPassword ? <IoMdEyeOff /> : <IoEye />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message max-w-60"
                  />
                  <div className="wrap-input100 validate-input">
                    <Field
                      type= {showConfirmPassword ? "text" : "password"}
                      name="password_confirmation"
                      className="input100 text-white placeholder:text-white "
                      placeholder="Confirm Password"
                    />
                    <span className="focus-input100" data="&#xf191;"></span>
                  </div>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className=" text-lg text-white hover:cursor-pointer relative -top-16 left-56">
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoEye />}
                  </button>
                  <ErrorMessage
                    name="password_confirmation"
                    component="div"
                    className="error-message"
                  />
                  <div className={`container-login100-form-btn`}>
                    <button
                      type="submit"
                      className={`login100-form-btn ${
                        !isValid && "opacity-45 cursor-not-allowed"
                      } cursor-pointer`}
                      disabled={!isValid}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPass