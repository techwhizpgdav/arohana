import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { BsCalendar2Date } from "react-icons/bs";
import { PiMapPinLine } from "react-icons/pi";
import { HiOutlineClock } from "react-icons/hi2";
import { IoTicketOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import { Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import Api from "../../Functions/api";
import Spinner2 from "../ShimmerAndSpinner/Spinner2";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Rangoli1 from "../../assets/Image/rangoli1.png";
import Rangoli2 from "../../assets/Image/rangoli2.png";
import PaidPart from "./PaidPart";
import UnpaidPart from "./UnpaidPart";
import Slide2 from "../../assets/Participation/Img2.jpg";
import Slide3 from "../../assets/Participation/Img3.jpg";
import Slide4 from "../../assets/Participation/Img4.jpg";
import Slide6 from "../../assets/Participation/Img6.jpg";
import Slide7 from "../../assets/Participation/Img7.jpg";
import { useNavigate, Link } from "react-router-dom";
import Rules from "./Rules";

const CompetitionDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchApi, authUser } = Api();
  const [event, setEvent] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const images = [Rangoli1, Rangoli2];
  const [isChildParticipated, setIsChildParticipated] = useState(false);
  const [step, setStep] = useState(4);
  const [user, setUser] = useState({});
  const [alreadyParticipated, setAlreadyParticipated] = useState(false);
  const [isOnMobile, setIsOnMobile] = useState(false);
  const [sponsorStep, setSponsorStep] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 764) {
      setIsOnMobile(true);
    }
  }, []);

  const handleChildParticipation = (value) => {
    setIsChildParticipated(value);
  };
  useEffect(() => {
    const result = fetchApi("GET", `api/competitions/${id}`, "events");
    result.then((response) => {
      if (response?.status === 200) {
        setAlreadyParticipated(response?.data?.data?.participated);
        setEvent(response?.data?.data?.competition);
        console.log(response?.data?.data?.competition);
        if (response?.data?.data?.competition?.sponsor_task == 1) {
          setSponsorStep(1);
        }
      }
    });
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStep(1);
    } else {
      const checkParticipation = async () => {
        authUser().then((data) => {
          setUser(data);
          if (data?.email_verified_at == null) {
            setStep(2);
          } else if (data?.email_verified_at != null) {
            setStep(4);
          }
        });
      };
      checkParticipation();
      // ! Imortant, change the step after production
    }
  }, [navigate]);
  const {
    date,
    description,
    start_at,
    ends_at,
    rounds,
    paid_event,
    minimum_size,
    maximum_size,
    society,
    tag_line,
    title,
    team_fee,
    upi_id,
    venue,
    image_url,
    sponsor_task,
  } = event;
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  if (Object.keys(event).length === 0) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <Spinner2 />
      </div>
    );
  }

  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        className="mySwiper h-[26rem] mt-4 px-2"
      >
        <SwiperSlide>
          <img
            className="rounded-xl h-[26rem] w-full object-cover
            "
            src={Slide7}
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-xl h-[26rem] w-full object-cover"
            src={Slide2}
            alt=""
          />
        </SwiperSlide>
        {/* <SwiperSlide>
          <img
            className="rounded-xl h-[26rem] w-full object-cover"
            src={ Slide3 }
            alt=""
          />
        </SwiperSlide> */}
        <SwiperSlide>
          <img
            className="rounded-xl h-[26rem] w-full object-cover"
            src={Slide4}
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="rounded-xl h-[26rem] w-full object-cover"
            src={Slide6}
            alt=""
          />
        </SwiperSlide>
      </Swiper>

      {/* Tag Line */}

      {isOnMobile ? (
        <>
          <div className="flex flex-col md:flex-row my-8 md:my-16 items-center justify-center text-center md:gap-3">
            <RiDoubleQuotesL />
            <div className="tag_line font-semibold mt-2 md:text-xl text-gray-600">
              {tag_line}
            </div>
            <RiDoubleQuotesR />
          </div>

          {/* Basic Tags */}
          <div className="tags mt-6 md:mt-10 px-4 lg:px-0 flex flex-row flex-wrap gap-2 md:gap-4">
            <div className="bg-amber-500 rounded-full w-fit pt-1 pb-1 pr-3 pl-3 text-white">
              {society.name}
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 md:mt-12 flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-600 text-center md:text-left">
                {title}
              </h1>
              <div className="poster flex flex-col md:flex-row my-6 md:my-8">
                <img
                  className="rounded-xl w-full md:w-1/3 object-cover mb-4 md:mb-0"
                  src={image_url}
                  alt=""
                />
                <p className="ml-0 md:ml-8 text-base md:text-lg description bg-gray-100 p-4 rounded-md">
                  {description}
                </p>
              </div>
            </div>

            {/* Basic Details */}
            <div className="flex flex-col md:w-1/2 mt-8 md:mt-0">
              <div className="flex flex-row gap-10 md:justify-start mt-4">
                <div className="flex flex-col items-center">
                  <BsCalendar2Date size={40} color="#475569" />
                  <p className="my-2 font-semibold text-slate-600 text-sm md:text-base">
                    {date}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <HiOutlineClock size={40} color="#475569" />
                  <p className="my-2 font-semibold text-slate-600 text-sm md:text-base">
                    {start_at}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <PiMapPinLine size={40} color="#475569" />
                  <p className="my-2 font-semibold text-slate-600 text-sm md:text-base">
                    {venue}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-4 md:mt-8">
                {paid_event ? (
                  <p className="text-rose-500 text-sm md:text-lg font-semibold">
                    Paid Event
                  </p>
                ) : (
                  <p className="text-green-500 text-sm md:text-lg font-semibold">
                    Free Event
                  </p>
                )}
              </div>

              {/* Participant Actions */}
              <div className="flex justify-center mt-4 md:mt-8">
                {step === 1 && (
                  <button>
                    <Link
                      to="/login"
                      className="text-rose-500 font-semibold text-sm md:text-base"
                    >
                      Login to Participate
                    </Link>
                  </button>
                )}
                {step === 2 && (
                  <button>
                    <Link
                      to="/verify"
                      className="bg-black p-2 rounded-lg text-white hover:bg-haldi transition-all duration-500 text-sm md:text-base"
                    >
                      Verify Email
                    </Link>
                  </button>
                )}
                {step === 3 && (
                  <p className="max-w-60 text-sm md:text-base">
                    Please wait for the admin to verify your account.
                  </p>
                )}
                {step === 4 && (
                  <>
                    {alreadyParticipated ? (
                      <button>
                        <Link
                          to="/dashboard"
                          className="bg-haldi text-sm md:text-base font-semibold h-10 md:h-12 w-32 md:w-40 rounded-md flex items-center justify-center text-white cursor-pointer"
                        >
                          Dashboard
                        </Link>
                      </button>
                    ) : (
                      <>
                        {!isChildParticipated ? (
                          <button
                            className="bg-rose-500 h-10 md:h-12 w-32 md:w-40 rounded-md"
                            onClick={openModal}
                          >
                            <div className="flex flex-row items-center justify-center">
                              <IoTicketOutline color="white" size={24} />
                              <p className="text-sm md:text-base text-white mx-2">
                                Participate
                              </p>
                            </div>
                          </button>
                        ) : (
                          <p
                            className="bg-haldi text-sm md:text-base font-semibold h-10 md:h-12 w-32 md:w-40 rounded-md flex items-center justify-center text-white cursor-pointer"
                            onClick={() => navigate("/dashboard")}
                          >
                            Dashboard
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Rules Section */}
          <div className="mt-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-600 text-center">
              RULES
            </h2>
            <div className=" pr-2 pl-2">
              <Rules rounds={rounds} /> {/* Render the Rules component */}
            </div>
          </div>
        </>
      ) : 
// ! Desktop View
      (
        <>
          <div className="flex flex-row my-16 items-center justify-center text-center gap-3">
            <RiDoubleQuotesL />
            <div className="tag_line font-semibold mt-2 text-xl text-gray-600">
              {tag_line}
            </div>
            <RiDoubleQuotesR />
          </div>

          {/* Basic Tags */}
          <div className="tags mt-10 px-40 flex flex-row gap-4">
            <div className=" bg-amber-500 rounded-full w-fit pt-1 pb-1 pr-3 pl-3 text-white">
              {society.name}
            </div>
          </div>

          {/* Title */}
          <div className="mt-6 flex flex-col px-40">
            <h1 className="text-4xl font-semibold text-slate-600">{title}</h1>
            <div className="poster flex flex-row my-6">
              <img
                className="rounded-xl w-1/3 object-cover "
                src={image_url}
                alt=""
              />
              <div className="flex-col w-full ">
                <p className="ml-8 pt-16 text-lg desciptionbg">{description}</p>

                {/* Basic Details */}
                <div className="flex flex-row items-center justify-around mt-20 text-center">
                  <div className="flex flex-col items-center">
                    <BsCalendar2Date size={60} color="#475569" />
                    <p className="my-4 font-semibold text-slate-600">{date}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <HiOutlineClock size={70} color="#475569" />
                    <p className="my-4 font-semibold text-slate-600">
                      {" "}
                      {start_at}{" "}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <PiMapPinLine size={70} color="#475569" />
                    <p className="my-4 font-semibold text-slate-600">{venue}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-around py-16">
                  <div>
                    {paid_event ? (
                      <p className="text-rose-500 text-lg font-semibold">
                        Paid Event
                      </p>
                    ) : (
                      <p className="text-green-500 text-lg font-semibold">
                        Free Event
                      </p>
                    )}
                  </div>
                  {step === 1 && (
                    <button>
                      <Link
                        to="/login"
                        className="text-rose-500 font-semibold "
                      >
                        Login to Participate
                      </Link>
                    </button>
                  )}
                  {step === 2 && (
                    <button>
                      <Link
                        to={"/verify"}
                        className=" bg-black p-2 rounded-lg text-white hover:bg-haldi transition-all duration-500 "
                      >
                        Verify Email
                      </Link>
                    </button>
                  )}
                  {step == 4 && (
                    <>
                      {alreadyParticipated ? (
                        <button>
                          <Link
                            to="/dashboard"
                            className=" bg-haldi text-sm md:text-base font-semibold h-10 md:h-12 w-32 md:w-40 rounded-md flex items-center justify-center text-white cursor-pointer"
                          >
                            Dashboard
                          </Link>
                        </button>
                      ) : (
                        <>
                          {!isChildParticipated ? (
                            <button
                              className="bg-rose-500 h-12 w-40 rounded-md"
                              onClick={openModal}
                            >
                              <div className="flex flex-row items-center justify-center">
                                <IoTicketOutline color="white" size={30} />
                                <p className="text-lg text-white mx-2">
                                  {" "}
                                  Participate{" "}
                                </p>
                              </div>
                            </button>
                          ) : (
                            <p
                              className=" bg-haldi text-lg font-semibold h-12 w-40 rounded-md flex flex-row items-center justify-center text-white hover:cursor-pointer"
                              onClick={() => navigate("/dashboard")}
                            >
                              Dashboard
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-slate-600 text-center">
              RULES
            </h1>
            <Rules rounds={rounds} />
          </div>
        </>
      )}
      {/* //*  Modal */}
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={setIsOpen}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  {title}
                </Dialog.Title>

                {sponsorStep == 1 ? (
                  <div className=" flex flex-col justify-center items-center gap-10 mt-5">
                    <div className="">
                      Complete the sponsor task to participate in the event.
              
                    </div>
                    <div>
                      The steps for sponsor tasks are given in the rules section at the bottom of the page  , complete the task and you are good to go.
                    </div>
                    <button
                      onClick={() => setSponsorStep(0)}
                      className="bg-rose-500 text-white rounded-md p-2 w-20 "
                    >
                      Next
                    </button>
                  </div>
                ) : (
                  <>
                    {sponsor_task == 1 && (
                      <button
                        onClick={() => setSponsorStep(1)}
                        className="bg-rose-500 absolute top-5 text-white rounded-md p-2 "
                      >
                        <IoMdArrowRoundBack size={20} />
                      </button>
                    )}
                    {paid_event ? (
                      <PaidPart
                        event={event}
                        closeModal={closeModal}
                        onParticipation={handleChildParticipation}
                      />
                    ) : (
                      <UnpaidPart
                        event={event}
                        closeModal={closeModal}
                        onParticipation={handleChildParticipation}
                      />
                    )}
                  </>
                )}

                <div className="mt-4 text-center">
                  {isChildParticipated ? (
                    <button
                      type="button"
                      className="text-rose-700"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-rose-700"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default CompetitionDetailsPage;
