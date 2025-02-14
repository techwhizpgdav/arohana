import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import Api from "../../Functions/api";
import { CalendarDays, Mail, Phone, School, User } from "lucide-react";

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

  const { fetchApi } = Api();
  const [pass, setPass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Fetch entries only if fest_pass is valid
    if (fest_pass && fest_pass !== "0") {
      fetchApi("GET", "api/entries").then((data) => {
        if (isMounted) {
          setPass(data?.data?.data || []);
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [fest_pass]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>
    );
  }

  const profileItems = [
    { icon: <User className="w-5 h-5" />, label: "Name", value: name },
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: email },
    {
      icon: <School className="w-5 h-5" />,
      label: "College",
      value: college ?? <i className="text-gray-500">not provided</i>,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone Number",
      value: phone_number ? (
        `+91 ${phone_number}`
      ) : (
        <i className="text-gray-500">not provided</i>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Profile Details
            </h2>
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                is_verified
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {is_verified ? "Verified ✓" : "Pending"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Profile Information */}
            <div className="space-y-6">
              {profileItems.map(({ icon, label, value }, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-red-600">{icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="font-medium text-gray-900">{value}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Email Verification Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Email Verification</p>
                  {email_verified_at ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  ) : (
                    <Link
                      to="/verify"
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Verify Now
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - QR Code and Pass Usage */}
            <div className="space-y-6">
              {/* QR Code Section */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Entry Pass QR Code
                </h3>
                {is_verified ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                      <QRCode
                        value={`https://admin-frontend-five-psi.vercel.app/dashboard/users/entry?pass=${fest_pass}`}
                        size={160}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Present this QR code at the entrance
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    QR Code will be available after verification
                  </p>
                )}
              </div>

              {/* Pass Usage History */}
              {fest_pass !== "0" && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <CalendarDays className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Pass Usage History
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {pass.length > 0 ? (
                      pass.map((dates, index) => {
                        const date = new Date(dates?.updated_at);
                        return (
                          <div
                            key={index}
                            className="bg-white p-3 rounded-lg shadow-sm text-gray-700 hover:shadow-md transition-shadow"
                          >
                            {`${date.getFullYear()}-${
                              date.getMonth() + 1
                            }-${date.getDate()}`}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 text-center">
                        No usage history available
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
