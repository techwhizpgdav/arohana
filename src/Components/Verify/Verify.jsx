import React from "react";

import { useEffect, useState } from "react";
import Api from "../../Functions/api";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Functions/Constants";
import Modal from "react-modal";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
Modal.setAppElement("#root"); // For screen readers
const Verify = () => {
  const navigate = useNavigate();
  const { authUser } = Api();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [resendClicked, setResendClicked] = useState(false);

  const [user, setUser] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const checkVerified = () => {
    authUser().then((data) => {
      if (data?.email_verified_at != null) {
        showAlert("Email verified successfully");
        navigate(`/dashboard/userProfile`);
      } else if (data?.email_verified_at == null) {
        showAlert("Email not verified yet");
      }
    });
  };
  //* Check if the user is logged in and if not, redirect to the login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      authUser().then((data) => {
        setUser(data);
        console.log(data?.email_verified_at);
        if (data?.email_verified_at != null) {
          navigate(`/dashboard/userProfile`);
        }
      });
    }
  }, [navigate]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 2000);
  };

  //*  if the user is already verified, redirect to the dashboard else send the verification link

  useEffect(() => {
    if (user?.email_verified_at != null) {
      navigate(`/dashboard/userProfile`);
    } else if (user.email_verified_at === null) {
      const sendEmailVerification = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_URL}/email/verification-notification`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsLoading(false);
          showAlert("Email verification link sent successfully");
        } else if (response.status === 409) {
          showAlert(
            "Email verification link already sent. Please check your email inbox or spam folder."
          );
          setTimeout(() => {
            sendEmailVerification();
          }, 60000);
        }
      };
      sendEmailVerification();
    }
  }, [user]);
  const handleResendClick = () => {
    setResendClicked(true);
    let timer = countdown;
    const intervalId = setInterval(() => {
      timer--;
      setCountdown(timer);
      if (timer === 0) {
        clearInterval(intervalId);
        setResendClicked(false);
        setCountdown(60);
      }
    }, 1000);
    sendEmailVerification();
  };

  if (user.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-brown text-white gap-10">
        Loading...
      </div>
    );
  }

  return (
    // Code to verify the email address
    <>
      <Modal
        isOpen={!!alertMessage}
        onRequestClose={() => setAlertMessage(null)}
        className={`
       absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-skin p-8 rounded-lg`}
      >
        <p>{alertMessage}</p>
        <button
          className="bg-brown text-white p-2 rounded-lg mt-4 w-full"
          onClick={() => setAlertMessage(null)}
        >
          Close
        </button>
      </Modal>
      <div className="flex flex-col justify-center items-center h-screen bg-brown text-white gap-10">
        <h1 className="text-3xl font-bold text-center mt-4 mb-8">
          Verify your email address
        </h1>
        <p className="text-center">
          We have sent you an email with a link to your email address{" "}
          {user.email}{" "}
        </p>
        <div className="flex flex-col justify-center items-center bg-brown text-white gap-10">
          <p className="text-center">
            Please click on the link in the email to verify your email address.
          </p>
          <button
            onClick={checkVerified}
            className="bg-white text-brown p-2 rounded-lg mt-4"
          >
            {" "}
            {isLoading ? <Spinner2 /> : "Check Verification"}
          </button>
          {
            isLoading ? <Spinner2 /> : (
              <div className="flex flex-col justify-center items-center gap-4">
                <p>Didn't receive the email?</p>
                <button
                  onClick={handleResendClick}
                  className="bg-white text-brown p-2 rounded-lg"
                  disabled={countdown != 60}
                >
                  {resendClicked ? `Resend in ${countdown} seconds` : "Resend"}
                </button>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Verify;
