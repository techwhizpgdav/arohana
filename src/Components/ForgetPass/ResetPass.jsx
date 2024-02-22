import React , {useState}from 'react'
import { useParams, Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
const ResetPass = () => {
  // const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const initialValues = {
    password: '',
    confirmPassword: '',
  }
  const validationSchema = Yup.object({
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  })
  const onSubmit = async (values) => {
    setIsLoading(true)
    console.log(values)
  }

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
                  onSubmit={onSubmit}
                >
                  <span className="login100-form-title -translate-y-20">
                    Reset Password
                  </span>
                  <div
                    className="wrap-input100 validate-input opacity-60"
                    data-validate="Enter username"
                  >
                    <Field
                      type="email"
                      name="email"
                      className="input100 text-white placeholder:text-white "
                      placeholder="Email"
                      disabled
                    />
                    <span className="focus-input100" data="&#xf15a;"></span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <Field
                      type="password"
                      name="password"
                      className="input100 text-white placeholder:text-white "
                      placeholder="Password"
                    />
                    <span className="focus-input100" data="&#xf191;"></span>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                  <div className="wrap-input100 validate-input">
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="input100 text-white placeholder:text-white "
                      placeholder="Confirm Password"
                    />
                    <span className="focus-input100" data="&#xf191;"></span>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
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