import React , {useState}from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Api from "../../Functions/api";
import "../Login/Login.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../Functions/Constants";
import axios from "axios";
const Email = () => {
  const { forgotPassword } = Api();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {fetchApi} = Api();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const onSubmit = async (values) => {
    setEmail(values.email);
    setIsLoading(true);
    try {
      const result = await axios.post(`${API_URL}/forgot-password`, {
        email: values.email,
      });
      if (result.status === 200) {
        setStep(2);
        setIsLoading(false);
      } else {
        alert("Something went wrong. Please try again.");
        setStep(1);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 500) {
        alert("This email is not valid.");
      }
      alert(error.response.data.message);
      setStep(1);
    }
  };

  const handleAutofill = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const values = {
      email,
    };
    onSubmit(values);
  };

  return (
    <>
    { step==1 &&
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
                  onSubmit={handleAutofill}
                >
                  <span className="login100-form-title -translate-y-20">
                    Forget Password
                  </span>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Enter username"
                  >
                    <Field
                      type="email"
                      name="email"
                      className="input100 text-white placeholder:text-white "
                      placeholder="Email"
                    />
                    <span className="focus-input100" data="&#xf15a;"></span>
                  </div>
                  <ErrorMessage
                    name="email"
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
                      Send Email
                    </button>
                  </div>
                  <div className="text-center pt-6">
                    <Link to="/login" className="txt1">
                      Login
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      }
      {
        step==2 &&
        <div className="container-login100 ">
          <div className="wrap-login100 flex items-center">
            <div className="login100-form validate-form text-white text-center ">
               Email sent to {email} Successfully !!!
               <p className=" pt-2 max-w-80">
                Please check your email to reset your password.
               </p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Email;
