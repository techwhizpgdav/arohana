// import { HStack, Table, TableCaption, TableContainer, Thead, Tr, Td, Th, Tbody } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Api from "../../Functions/api";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { API_URL } from "../../Functions/Constants";
const Submission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [Competition, setCompetition] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { fetchApi } = Api();
  const initialValues = {
    competition_id: '',
    url : '',
    remarks: ''
  };
  const validationSchema = Yup.object({
    competition_id: Yup.string().required('Required'),
    url: Yup.string().url('Invalid URL').required('Required'),
    remarks: Yup.string(),
  });
  useEffect(() => {

    fetchApi('get', 'api/submissions').then((data) => {
      setSubmissions(data);
    });

    fetchApi('get', 'api/participations').then((data) => {
      console.log(data?.data?.data[0]?.competitions);
      setCompetition(data?.data?.data[0]?.competitions);
      setIsLoading(false);
    }
    );
  }, []);

  const onSubmitForm = (values, { setSubmitting }) => {
    const formData = new FormData();  
    formData.append('competition_id', values.competition_id);
    formData.append('url', values.url);
    formData.append('remarks', values.remarks);
    try {
        axios.post(`${API_URL}/api/submissions`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          console.log(response);
          alert('Submission Successful');
        }
        );
      } catch (error) {
        console.log(error);
      }
    setSubmitting(false);
    }
  
  if (isLoading) {
    return <div className='dashboard-hero h-screen flex justify-center items-center text-white'>
      <Spinner2 />
    </div>;
  }

  return (
    <div>


        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            onSubmitForm(values, { setSubmitting });

          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex gap-5 pt-10">
                <div className="w-96">
                  <label htmlFor="submission" className="block text-sm font-medium text-gray-400 pl-1">Gdrive Url</label>
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
                  <label htmlFor="competition" className="block text-sm font-medium text-gray-400 pl-1">Competition</label>
                  <Field
                    as="select"
                    id="competition"
                    name="competition_id"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-600 rounded-md"
                  >
                    <option value="">Select Competition</option>
                    {Competition?.map((comp) => {
                      return <option value={comp?.pivot?.competition_id} 
                      key={comp?.pivot?.competition_id} 
                      name = {comp?.pivot?.competition_id}
                      id = { comp?.pivot?.competition_id}
                      >{comp?.title}</option>;
                    })}
                  </Field>
                  <ErrorMessage name="competition_id" />
                  
                </div>
                <div>
                  <label htmlFor="remarks" className="block text-sm font-medium text-gray-400 pl-1">Remarks</label>
                  <Field
                    id="remarks"
                    name="remarks"
                    placeholder="Remarks if any"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-600 rounded-md"
                  />
                </div>
                <button type="submit" className=" px-4 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 max-h-10">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>


      <h1 className="text-4xl">Submission</h1>

      <div className="relative overflow-x-auto mt-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-200 dark:text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Competition
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Submitted At
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-slate-100 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-black"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4 text-black">Silver</td>
              <td className="px-6 py-4 text-black">Laptop</td>
              <td className="px-6 py-4 text-black">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submission;
