// import { HStack, Table, TableCaption, TableContainer, Thead, Tr, Td, Th, Tbody } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Submission = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
  }, []);

  // if (submissions.length === 0) {
  //   return (
  //     <div>
  //       <h1 className="text-4xl">Submission</h1>
  //       <p className=" flex w-screen h-60 justify-center items-center">Page under working, hold your patience.</p>
  //     </div>
  //   );
  // }

  return (
    <div>
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
