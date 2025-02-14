import React, { useEffect, useState } from "react";
import Api from "../../Functions/api";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_URL } from "../../Functions/Constants";
import { useNavigate } from "react-router-dom";

const Submission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [Competition, setCompetition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { fetchApi } = Api();
  const navigate = useNavigate();

  const initialValues = {
    competition_id: "",
    url: "",
    remarks: "",
  };

  const validationSchema = Yup.object({
    competition_id: Yup.string().required("Competition selection is required"),
    url: Yup.string()
      .url("Please enter a valid URL")
      .required("URL is required"),
    remarks: Yup.string(),
  });

  const onSubmitForm = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("competition_id", values.competition_id);
    formData.append("url", values.url);
    formData.append("remarks", values.remarks);
    const token = localStorage.getItem("token");

    axios
      .post(`${API_URL}/api/submissions`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Submission Successful");
        fetchApi("get", "api/submissions").then((data) => {
          setSubmissions(data?.data?.data[0]?.competition_submissions);
        });
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    fetchApi("get", "api/submissions").then((data) => {
      setSubmissions(data?.data?.data[0]?.competition_submissions);
    });
    fetchApi("get", "api/participations").then((data) => {
      setCompetition(data?.data?.data[0]?.competitions);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Submit Your Entry
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitForm}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Competition
                  </label>
                  <Field
                    as="select"
                    name="competition_id"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select Competition</option>
                    {Competition?.map((comp) => {
                      if (comp?.pivot?.leader) {
                        return (
                          <option
                            value={comp?.pivot?.competition_id}
                            key={comp?.pivot?.competition_id}
                          >
                            {comp?.title}
                          </option>
                        );
                      }
                    })}
                  </Field>
                  {errors.competition_id && touched.competition_id && (
                    <div className="text-red-500 text-sm">
                      {errors.competition_id}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Drive URL
                  </label>
                  <Field
                    name="url"
                    type="text"
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.url && touched.url && (
                    <div className="text-red-500 text-sm">{errors.url}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Remarks
                  </label>
                  <Field
                    name="remarks"
                    placeholder="Any additional comments..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 font-medium"
              >
                {isSubmitting ? "Submitting..." : "Submit Entry"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r-md">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Important Instructions
        </h3>
        <ul className="list-disc pl-6 space-y-1 text-blue-700">
          <li>Only team leaders can submit entries</li>
          <li>Submit only for events with WhatsApp group notifications</li>
          <li>Ensure the submitted URL is accessible to judges</li>
          <li>Not all events require submissions</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Submissions</h2>
        <div className="space-y-4">
          {!submissions.length > 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No submissions yet</p>
            </div>
          ) : (
            submissions.map((submission, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Competition
                    </h3>
                    <p className="text-gray-900">{submission?.title}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      URL
                    </h3>
                    <p className="text-blue-600 truncate hover:text-blue-800">
                      {submission?.pivot?.url}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Status
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        submission?.pivot?.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : submission?.pivot?.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {submission?.pivot?.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Remarks
                    </h3>
                    <p className="text-gray-600">
                      {submission?.pivot?.remarks || "No remarks"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Submission;
