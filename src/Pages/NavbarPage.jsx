import React from "react";
import DesktopNav from "../Components/Navbar/DesktopNav";
import MobileNav from "../Components/Navbar/MobileNav";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { API_URL } from "../Functions/Constants";
import axios from "axios";
import Api from "../Functions/api";
import Eventbg from "../assets/eventbg1.jpg";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const NavbarPage = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const { fetchApi } = Api();
  const location = useLocation();
  const [sponsor, setSponsor] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    sponsor_task: "",
  };
  const validationSchema = Yup.object({
    sponsor_task: Yup.string().required("Sponsor Task Screen Shot is required"),
  });
  const onSubmit = async (values) => {
    setIsloading(true);
    console.log(values);
    const formData = new FormData();
    formData.append("sponsor_task", values.sponsor_task);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/user/upload-sponsor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        setIsloading(false);
        setIsOpen(false);
        navigate(`/`);
      } else {
        setIsloading(false);
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      alert(error?.message);
    }
  };
  useEffect(() => {
    if (location.pathname.includes("competitions/")) {
      window.document.body.style.background = `url(${Eventbg}) no-repeat fixed`;
      window.document.body.style.backgroundSize = "cover";
    } else {
      window.document.body.style.background = "none";
    }
  }, [location]);

  const breakpoint = 764;
  //* Function to switch between mobile and desktop view
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  //! Function to check the validation of the token and get the user data

  const authUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const result = fetchApi("GET", "auth-user", "navbar");
      result.then((response) => {
        if (response?.status === 200) {
          setUser(response?.data?.data?.user);
          if (response?.data?.data?.user?.sponsor_task == null) {
            // setIsOpen(true);
          }
        }
      });
    }
  };
  //* Function to show congratulation message if the user is login first time after Admin verification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authUser();
      const congratulationsShown = localStorage.getItem(
        "congratulations-shown"
      );
      if (
        congratulationsShown == 0 &&
        user?.email_verified_at != null &&
        user?.is_verified == true
      ) {
        localStorage.setItem("congratulations-shown", 1);
        setAlertMessage(
          "Congratulations! Your account has been verified by the admin."
        );
      }
    }
  }, [navigate, isOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAutofill = (e) => {
    e.preventDefault();
    const sponsor_taskFile = e.target.elements.sponsor_task.files[0];
    const values = {
      sponsor_task: sponsor_taskFile,
    };
    onSubmit(values);
  };

  return (
    <>
      <Modal
        isOpen={!!alertMessage}
        onRequestClose={() => setAlertMessage(null)}
        className={`
       absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-haldi-orange text-white p-8 rounded-lg flex flex-col items-center gap-2 mdmax:w-4/5 mdmax:p-3`}
      >
        <p className="">{alertMessage}</p>
        <p className=" max-w-96">
          We have generated a unique QR code for you. Please use this to gain
          entry into the College fest.
        </p>
        <Link to={"/dashboard/userProfile"}>
          <button
            className="bg-white text-black p-2 rounded-lg mt-4 w-40 "
            onClick={() => {
              setAlertMessage(null);
            }}
          >
            See QR Code
          </button>
        </Link>
      </Modal>

      {width < breakpoint ? <MobileNav /> : <DesktopNav />}

      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
                    <Dialog.Title className="font-medium text-gray-900 p-2">
                      We sincerely apologize for the inconvenience caused.
                    </Dialog.Title>
                    <Dialog.Title
                      as="h3"
                      className="font-medium leading-6 p-2 text-gray-900"
                    >
                      Follow the steps to complete the Sponsor Task.
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className=" text-center">
                        <a
                          href="https://play.google.com/store/apps/details?id=com.zingbusbtoc.zingbus"
                          className="text-haldi underline  "
                        >
                          Click here to download the app.
                        </a>
                      </div>
                      <ul className="list-disc p-4">
                        <li>
                          Proceed to download the application and ensure to
                          provide a five-star rating.
                        </li>
                        <li>
                          Compose a review consisting of two to three sentences
                          of high quality.
                        </li>
                        <li>
                          Ensure that the review is published and visible to the
                          public.
                        </li>
                        <li>
                          Capture a screenshot of the published review and
                          upload it to the designated location here.
                        </li>
                      </ul>
                    </div>

                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {({ values, errors }) => (
                        <Form>
                          <div className=" flex items-center justify-center mb-4">
                            <Field
                              name="sponsor_task"
                              type="file"
                              className="placeholder:text-white file-input"
                              accept="image/*"
                              id="sponsor_task"
                            />
                            <label
                              htmlFor="sponsor_task"
                              className=" hover:cursor-pointer bg-haldi border-white border-2 text-white rounded-2xl w-48 px-2 py-2 "
                            >
                              {values.sponsor_task
                                ? values.sponsor_task.split("\\").pop()
                                : "Upload Sponsor Task"}
                            </label>
                          </div>
                          <div className="mt-4 text-center">
                            <button
                              disabled={!!Object.keys(errors).length}
                              type="submit"
                              className={`inline-flex justify-center rounded-md border border-transparent bg-haldi-orange px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                                Object.keys(errors).length
                                  ? "opacity-40 cursor-not-allowed"
                                  : "cursor-pointer opacity-100"
                              }`}
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default NavbarPage;
