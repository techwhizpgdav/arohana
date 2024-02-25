import React, { useEffect, useState } from "react";
import Api from "../../Functions/api";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
    competition_id: Yup.string().required("Required"),
    url: Yup.string().url("Invalid URL").required("Required"),
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
      <div className="dashboard-hero h-screen flex justify-center items-center text-white">
        <Spinner2 />
      </div>
    );
  }

  return (
    <div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmitForm(values, { setSubmitting });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex gap-5 pt-20 mdmax:flex-col p-10 mdmax:items-center ">
              <div className="w-96 mdmax:w-80">
                <label
                  htmlFor="submission"
                  className="block text-sm font-medium text-gray-400 pl-1"
                >
                  Gdrive Url
                </label>
                <Field
                  required
                  id="submission"
                  name="url"
                  type="text"
                  placeholder="URL"
                  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-600 rounded-md"
                />
                {errors.url && touched.url ? <div>{errors.url}</div> : null}
              </div>
              <div>
                <label
                  htmlFor="competition"
                  className="block text-sm font-medium text-gray-400 pl-1"
                >
                  Competition
                </label>
                <Field
                  as="select"
                  id="competition"
                  name="competition_id"
                  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-600 rounded-md"
                >
                  <option value="">Select Competition</option>
                  {Competition?.map((comp) => {
                    if (comp?.pivot?.leader) {
                      return (
                        <option
                          value={comp?.pivot?.competition_id}
                          key={comp?.pivot?.competition_id}
                          name={comp?.pivot?.competition_id}
                          id={comp?.pivot?.competition_id}
                        >
                          {comp?.title}
                        </option>
                      );
                    }
                  })}
                </Field>
                <ErrorMessage name="competition_id" />
              </div>
              <div>
                <label
                  htmlFor="remarks"
                  className="block text-sm font-medium text-gray-400 pl-1 mdmax:w-80"
                >
                  Remarks
                </label>
                <Field
                  id="remarks"
                  name="remarks"
                  placeholder="Remarks if any"
                  className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-600 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 max-h-10 mdmax:w-40 mdmax:py-2 "
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="p-10">
        <h2 className=" text-4xl">
          Important Instructions !!
        </h2>
            <ol className=" list-decimal w-4/5 ">
              <li className=" p-2">
                Participation in every event does not necessitate a submission. 
              </li>
              <li className=" p-2">
                Only the team leader is authorized to submit the entry.
              </li>
              <li className=" p-2">
              You are only required to submit entries for events in which you receive notification in the respective WhatsApp groups. 
              </li>
              <li className=" p-2">
                Ensure that the submitted URL is accessible to the adjudicators(judges).
              </li>
            </ol>
      </div>

      <h1 className="text-4xl mt-10 mdmax:pl-4">Your Submissions</h1>
      <div className="relative overflow-x-auto mt-12">
        {!submissions.length > 0 ? (
          <div>
            <h1 className="text-2xl">No Submissions Yet</h1>
          </div>
        ) : (
          submissions.map((submission, index) => (
            <div
              key={index}
              className="mb-6 bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-4
             mdmax:grid-cols-1 mdmax:pl-4"
            >
              <div>
                <div className="font-medium text-black mdmax:text-xl py-2">
                  Competition Name
                </div>
                <div className="text-gray-900 py-2">{submission?.title}</div>
              </div>
              <div>
                <div className="font-medium text-gray-500 py-2">URL</div>
                <div className="text-gray-900 py-2 max-w-56 overflow-x-scroll scrollBar mdmax:w-96 mdmax:overflow-visible">
                  {submission?.pivot?.url}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-500 py-2">Status</div>
                <div className="text-gray-900 py-2 capitalize">
                  {submission?.pivot?.status}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-500 py-2">Remarks</div>
                <div className="text-gray-900 py-2">
                  {submission?.pivot?.remarks ? submission?.pivot?.remarks : "No Remarks"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Submission;
