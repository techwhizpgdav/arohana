import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import Profile from "../../assets/userProfile.png";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../Functions/Constants";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import SponsorTask from "./SponsorTask";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showNormalPassword, setShowNormalPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    college: "",
    college_id: "",
    instagram_id: "",
    // sponsor_task: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        // Only 8 characters nothing else 
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum 8 characters, at least one letter and one number"
      )
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    college: Yup.string().required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(/^[6-9]\d{9}$/, "Invalid phone number"),
    college_id: Yup.string().required("Photo ID is required"),
    // sponsor_task: Yup.string().required("Sponsor Task Screen Shot is required"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in values) {
        if (!values[key]) continue;
        if ((key === "college_id" || key === "sponsor_task") && values[key].name) {
          formData.append(key, values[key], values[key].name);
        } else if (key === "instagram_id" && values[key] !== "") {
          formData.append(key, values[key]);
        } else if (key !== "instagram_id") {
          formData.append(key, values[key]);
        }
      }
    try {
      const response = await axios.post(`${API_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
      console.log(error); // Log the entire error object to the console
      alert(
        error?.response?.data?.message ||
          error.message ||
          "Signup failed! Please try again."
      );
    }
  };

  useEffect(() => {
    const checkAndNavigate = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/");
      }
    };
    checkAndNavigate();
  }, [navigate]);
const handleAutofill = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const password_confirmation = e.target.elements.password_confirmation.value;
    const college = e.target.elements.college.value;
    const college_idFile = e.target.elements.college_id.files[0]; // Get the uploaded file
    // const sponsor_taskFile = e.target.elements.sponsor_task.files[0]; // Get the uploaded file
    const values = {
        name,
        email,
        password,
        password_confirmation,
        college,
        phone: e.target.elements.phone.value,
        college_id: college_idFile,
        instagram_id: e.target.elements.instagram_id.value,
        // sponsor_task: sponsor_taskFile,
    };
    onSubmit(values);
};
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    
  return (
    <>
    
    {/* <SponsorTask /> */}

    <div className={`${isLoading ? "opacity-40" : "opacity-100"} w-full`}>
      <div className="container-login100 min-h-screen mt-2">
        <div className="wrap-login100 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, errors }) => (
              <Form
                className="login100-form validate-form"
                onSubmit={handleAutofill}
              >
                <span className="login100-form-logo">
                  <img src={Profile} alt="" />
                </span>
                <span className="login100-form-title">Signup</span>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter username"
                >
                  <Field
                    type="text"
                    name="name"
                    className="input100 text-white placeholder:text-white"
                    placeholder="Username"
                  />
                  <span className="focus-input100" data="&#xf207;"></span>
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter email"
                >
                  <Field
                    type="email"
                    name="email"
                    className="input100 placeholder:text-white"
                    placeholder="Email"
                  />
                  <span className="focus-input100" data="&#xf15a;"></span>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              <div className="wrap-input100 validate-input" data-validate="Enter password">
                <Field
                  type={showNormalPassword ? "text" : "password"}
                  name="password"
                  className="input100 placeholder:text-white"
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
                
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Confirm password"
                >
                  <Field
                    type= {showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    className="input100 placeholder:text-white"
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

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter college"
                >
                  <Field
                    type="text"
                    name="college"
                    className="input100 placeholder:text-white"
                    placeholder="College"
                  />
                  <span className="focus-input100" data="&#xf133;"></span>
                </div>
                <ErrorMessage
                  name="college"
                  component="div"
                  className="error-message"
                />
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter college"
                >
                  <Field
                    type="text"
                    name="phone"
                    className="input100 placeholder:text-white"
                    placeholder="Phone"
                  />
                  <span className="focus-input100" data="&#xf155;"></span>
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-message"
                />

                <div
                  className=" mb-2 wrap-input100 validate-input"
                  data-validate="Enter college"
                >
                  <Field
                    type="text"
                    name="instagram_id"
                    className="input100 placeholder:text-white"
                    placeholder="Instagram ID (Optional)"
                  />
                  <span className="focus-input100" data="&#xf16d;"></span>
                </div>
                <div className=" max-w-60 text-white mb-8">
                  Do you have public account with 1000+ followers on Instagram?
                  If Yes we have a 🎁 for you.
                </div>
                
                <div className="validate-input mb-4">
                  <Field
                    name="college_id"
                    type="file"
                    className="input100 placeholder:text-white file-input"
                    accept="image/*"
                    id="college_id"
                  />
                  <label htmlFor="college_id" className="file-label">
                    {values.college_id
                      ? values.college_id.split("\\").pop()
                      : "Upload College ID"}
                  </label>
                </div>
                <ErrorMessage
                  name="college_id"
                  component="div"
                  className="error-message"
                />
                {/* <div className="validate-input mb-4">
                  <Field
                    name="sponsor_task"
                    type="file"
                    className="input100 placeholder:text-white file-input"
                    accept="image/*"
                    id="sponsor_task"
                  />
                  <label htmlFor="sponsor_task" className="file-label">
                    {values.sponsor_task
                      ? values.sponsor_task.split("\\").pop()
                      : "Upload Sponsor Task"}
                  </label>
                </div>
                <ErrorMessage
                  name="sponsor_task"
                  component="div"
                  className="error-message"
                /> */}

                <div>
                {/* <div className="inset-0 flex items-center justify-center">
                    <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md border border-transparent  z-20 text-white"
                    >
                     How to do Sponsor Task?
                    </button>
                </div> */}

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Follow the steps to complete the Sponsor Task.
                            </Dialog.Title>
                            <div className="mt-2">
                            <div className=" text-center">
                            <a href='https://play.google.com/store/apps/details?id=com.zingbusbtoc.zingbus' className= "text-haldi underline  ">
                                Click here to download the app.
                            </a>
                            </div>
                            <ul className="list-disc p-4">
                                <li>Proceed to download the application and ensure to provide a five-star rating.</li>
                                <li>Compose a review consisting of two to three sentences of high quality.</li>
                                <li>Ensure that the review is published and visible to the public.</li>
                                <li>Capture a screenshot of the published review and upload it to the designated location here.</li>
                            </ul>
                            </div>

                            <div className="mt-4">
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-haldi-orange px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                                >
                                Got it, thanks!
                                </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </Dialog>
                </Transition>
                </div>

                <div className="container-login100-form-btn">
                  <button
                    type="submit"
                    className={`login100-form-btn mt-4 ${
                      Object.keys(errors).length
                        ? "opacity-40 cursor-not-allowed"
                        : "cursor-pointer opacity-100"
                    }`}
                    disabled={!!Object.keys(errors).length}
                  >
                    Signup
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </> 
  );
};

export default Signup;
