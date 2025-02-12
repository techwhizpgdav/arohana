import React from "react";
import { useEffect, useState } from "react";
import Qrcode from "../../assets/qrcode.jpg";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import Api from '../../Functions/api';
import Spinner2 from "../ShimmerAndSpinner/Spinner2";

const UserProfile = ({ user }) => {
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

  const {fetchApi} = Api();
  const [pass,setPass] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    fetchApi("GET", 'api/entries').then((data)=>{
      setPass(data?.data?.data);
      setIsLoading(false);
    })
  }, [user]);



  if(isLoading){
    return <Spinner2 />
  }



  return (
    <div className="border rounded-md shadow-md p-4 h-3/4 ">
      <h2 className="text-3xl font-bold mb-20">Profile</h2>
      <div className="flex mdmax:flex-col-reverse justify-around gap-10">
      hi hello
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
            <p className="font-bold">Fest Pass:</p>
            <p>{is_verified == 0 ? "Pending⌛" : "Verified✅"}</p>
          </div>
          <div className="flex gap-2 mb-4">
            <b>
              You can participate in events and submit drive links without
              account verification.
            </b>
          </div>
        </div>
        <div className="flex gap-8 items-center justify-center flex-col  ">
          <div>
              {
                fest_pass != "0" ? 
                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    <h2 style={{ textAlign: 'center', color: '#6c757d', marginBottom: '20px' }}>Fest Pass Usage</h2>
                    {
                      pass.map((dates , index) => {
                        const date = new Date(dates?.updated_at);
                        return (
                          <p className="text-center font-semibold pt-1" key={index} style={{ backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                            {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
                          </p>
                        )
                      })
                    }
                </div>:null
              }
          </div>
          <p className="font-bold text-black">Unique QR Code</p>
          {is_verified ? (
            <div className=" flex items-center justify-center flex-col">
              <QRCode value={`https://admin-frontend-five-psi.vercel.app/dashboard/users/entry?pass=${fest_pass}`} size={140} />
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