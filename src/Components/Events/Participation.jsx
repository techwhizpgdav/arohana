import React, { useState } from 'react';
import { Formik, Field, Form,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Api from '../../Functions/api';
import { IoMdArrowRoundBack } from "react-icons/io";


const Participation = ({ event }) => {
     const [buttonSelected, setButtonSelected] = useState("Solo");
     const [step , setStep] = useState(1);
     const { date, description, start_at, ends_at, rounds, paid_event, minimum_size, maximum_size , society , tag_line, title,  upi_id, venue , image_url, inidiviual_fees } = event;
     const team_fee = null;
     const {fetchApi} = Api();
     
     const initialValue = {
          teamName: '',
          numberOfMembers: '',
          teamCode: null,
     };
     const validationSchema = Yup.object({
          teamName: Yup.string().required('Required'),
          numberOfMembers: Yup.number().required('Required').min(1, 'Must be at least 1').max(maximum_size, `Must be at most ${maximum_size}`),
          teamCode: Yup.string().required('Required'),
     });

     const onSubmit = (values) => {
          if (buttonSelected === "Solo") {
               if(paid_event){
                    fetchApi('POST', 'participations', { event_id: event.id, team_name: values.teamName, no_of_participants: values.numberOfMembers, amount: inidiviual_fees })
               }
               else{
                    fetchApi('POST', 'participations', { event_id: event.id, team_name: values.teamName, no_of_participants: values.numberOfMembers })
               }
          } else {
               fetchApi('POST', 'participations', { event_id: event.id, team_code: values.teamCode });
          }
     };

     return (
          <div className="card flex flex-col justify-around items-center min-h-96">
     <div className=" flex gap-20 justify-center mb-10 mt-5">
          <button onClick={() => setButtonSelected("Solo")} className={`text-lg font-semibold ${buttonSelected === "Solo" ? "bg-gray-800 text-white" : "text-gray-500"} pt-2 pb-2 pl-4 pr-4 rounded-lg`}>
               Solo
          </button>
          {
          maximum_size > 1 ? (
               <button  onClick={() => setButtonSelected("Team")} className={`text-lg font-semibold ${buttonSelected === "Team" ? "bg-gray-800 text-white" : "text-gray-500"} pt-2 pb-2 pl-4 pr-4 rounded-lg`}>
               Team
               </button> ) : null
          }
     </div>
     <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          
               >
          {({isValid}) => (
          <Form>
          {buttonSelected === "Solo" ? (
               <div className="flex flex-col gap-10 items-center justify-center">
                    {paid_event && <p className="text-lg font-semibold text-slate-600">
                         This is a paid event.
                    </p>}                                        
               {
          step === 1 ? (
               <div className="flex flex-col gap-5 items-center justify-center">
                    <Field name="teamName" type="text" placeholder="Team Name" className="w-72 h-12 bg-slate-700 border-2 border-gray-800 rounded-md p-4 placeholder:text-white text-white" />
                    <ErrorMessage name="teamName" component="div" className="error-message" /> 
                    {
                         maximum_size > 1 ? (
                         (
                              <>
                              <Field name="numberOfMembers" type="number" placeholder="Number of Members" className="w-72 h-12 bg-slate-700 border-2 border-gray-800 rounded-md p-4 placeholder:text-white text-white" />
                              <ErrorMessage name="numberOfMembers" component="div" className="error-message" />
                              </>
                         )
                         ) : null                   
                    }
               </div>
          ) : null
          }    
                    {
                         paid_event ? (
                              step==1 &&  <button onClick={() => setStep(2)} className=" font-semibold bg-gray-700 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg" disabled= {isValid}>
                                   Pay
                              </button>
                         ) : (
                              <button type="submit" className=" font-semibold bg-gray-800 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg" disabled = {isValid} >
                                   Submit
                              </button>
                         )
                    }

               {step === 2 ? (
                         <div className="flex flex-col gap-5 items-center justify-center">
                              <div className= "absolute top-7 left-5 cursor-pointer hover:text-blue-600 transition-all duration-300 ease-in-out"
                              >
                                   <IoMdArrowRoundBack onClick={() => setStep(1)} className="text-3xl cursor-pointer" />
                              </div>
                              <p className="  text-slate-600 flex gap-1">
                                   Pay the team fee of <p className=' font-bold'>
                                   { 
                                   team_fee ? team_fee : inidiviual_fees
                                   } to {upi_id}
                                   </p>
                              </p>
                              <Field name="paymentScreenshot" type="text" placeholder="Payment Screenshot" className="w-72 h-12 bg-slate-700 border-2 border-gray-800 rounded-md p-4 placeholder:text-white text-white" />
                              <ErrorMessage name="paymentScreenshot" component="div" className="error-message" />
                              <p className=" font-semibold text-slate-600">
                                   Click a screenshot of the payment and upload it to Gdrive and paste the link here.
                              </p>
                              <button type="submit" className=" font-semibold bg-gray-700
                              text-white pt-2 pb-2 pl-4 pr-4 rounded-lg
                              "onClick={()=> onSubmit} >Submit</button>
                         </div>
                    )
                    : null
                    }
               </div>
          ) : (
               <div className="flex items-center gap-4  flex-col">
                    <Field name="teamCode" type="text" placeholder="Team Code" className="w-72 h-12 bg-slate-700 border-2 border-gray-800 rounded-md p-4 placeholder:text-white text-white" /> <p>
                         Team Code is provided by the team leader.
                    </p>
                    {errors.teamCode && touched.teamCode ? <div>{errors.teamCode}</div> : null}
                    <button type="submit" className=" font-semibold bg-gray-800 text-white pt-2 pb-2 pl-4 pr-4 rounded-lg">
                         Submit
                    </button>
               </div>
          )}     
          </Form>
                    )}
               </Formik>
          </div>
     );
}

export default Participation;