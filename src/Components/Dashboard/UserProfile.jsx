import React from "react";
import { useEffect, useState } from "react";
import Qrcode from "../../assets/qrcode.jpg";
import { Link } from "react-router-dom";
import Api from "../../Functions/api";
import QRCode from "react-qr-code";
import { API_URL } from "../../Functions/Constants";
const UserProfile = ({ user }) => {
  console.log(user);
  const {
    name,
    college,
    qrCode,
    email,
    email_verified_at,
    is_verified,
    phone_number,
    fest_pass,
  } = user;
  const { fetchApi } = Api();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  return (
    <div className="border rounded-md shadow-md p-4 h-3/4 ">
      <h2 className="text-3xl font-bold mb-20">Profile</h2>
      <div className="flex mdmax:flex-col-reverse justify-around gap-10">
        <div>
          <div className="flex gap-2 mb-4 ">
            <p className="font-bold">Name:</p>
            <p>{name}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <p className="font-bold">Email:</p>
            <p>{email}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <p className="font-bold">Email Verification Status :</p>
            <p>
              {email_verified_at ? (
                "Verified"
              ) : (
                <Link
                  to={"/verify"}
                  className=" bg-black p-1 rounded-lg text-white hover:bg-teal-600 transition-all duration-500 "
                >
                  Verify Now
                </Link>
              )}
            </p>
          </div>
          <div className="flex gap-2 mb-4">
            <p className="font-bold">College:</p>
            <p>{college}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <p className="font-bold">Phone Number:</p>
            <p>+91 {phone_number}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <p className="font-bold">Account Verification Status:</p>
            <p>{is_verified == 0 ? "Pending" : "Verified"}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <b>
              You can participate in events and submit drive links without
              account verification.
            </b>
          </div>
        </div>
        <div className="flex gap-8 items-center justify-center flex-col  ">
          <p className="font-bold text-black">Unique QR Code</p>
          {is_verified ? (
            <div className=" flex items-center justify-center flex-col">
              <QRCode value={`${API_URL}/api/scan/${fest_pass}`} size={100} />
              <p className="text-center mt-10">
                Show this QR code while entering in the college.
              </p>
            </div>
          ) : (
            <p>
              QR Code not available, please wait until your account get Verified
              from the admin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
