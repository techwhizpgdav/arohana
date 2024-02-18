import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Thanks = () => {
     const [modalIsOpen, setModalIsOpen] = useState(true);
     const navigate = useNavigate();

     useEffect(() => {
          AOS.init({
               duration: 1000,
          });
     }, []);

     const closeModal = () => {
          setModalIsOpen(false);
          navigate('/verify');
     };
     return (
          <div className=' overflow-hidden'>
          <Modal
               isOpen={modalIsOpen}
               onRequestClose={closeModal}
               style={{
                    overlay: {
                         backgroundColor: 'rgba(255, 222, 199 ,0.2)',
                    },
                    content: {
                         color: 'black',
                         width: '50%',
                         height: '50%',
                         margin: 'auto',
                         backgroundColor: 'rgba(255, 222, 199 ,1)',
                         borderRadius: '10px',
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'center',
                         alignItems: 'center',
                    },
               }}
          >
               <div style={{ textAlign: 'center' }} data-aos="fade-down" className=' overflow-hidden'>
                    <h2 className='text-brown font-bold text-2xl'>🎉 Thank You for Registering! 🎉</h2>
                    <p className='text-brown font-medium text-lg'>Make sure You verify Your Email</p>
               </div>
               <button 
                    className="py-2 px-2 font-large text-red rounded mt-6"
                    onClick={closeModal}
                    data-aos="fade-up"
               >
                    Verify
               </button>
               </Modal>
          </div>
     );
};

export default Thanks;