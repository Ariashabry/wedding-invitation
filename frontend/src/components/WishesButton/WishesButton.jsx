import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from "../../context/ModalContext";
import { HandsClapping } from "@phosphor-icons/react";
import './WishesButton.css';

const WishesButton = () => {
   const { wishesModal, setWishesModal } = useContext(ModalContext);
   const [heartBeat, setHeartBeat] = useState(false);
   const [animationInterval, setAnimationInterval] = useState(null);

   const handleHeartbeatInterval = () => {
      const intervalId = setInterval(() => {
         setHeartBeat(true);
         setTimeout(() => {
            setHeartBeat(false);
         }, 1000);
      }, 5000);
      setAnimationInterval(intervalId);
   };

   const handleClick = () => {
      setWishesModal(true);
   };

   useEffect(() => {
      if (!wishesModal && !animationInterval) {
         handleHeartbeatInterval();
      }
      if (wishesModal && animationInterval) {
         clearInterval(animationInterval);
         setAnimationInterval(null);
      }

      return () => {
         if (animationInterval) {
            clearInterval(animationInterval);
         }
      };
   }, [wishesModal, animationInterval]);

   return (
      <button 
         onClick={handleClick}
         title="Compartir tus deseos para los novios"
         className={`floating-button unselectable
            ${heartBeat ? 'heartbeat-animation' : ''}`
         }
      >
         <div className='flex flex-col items-center gap-1'>
            <HandsClapping 
               size={24} 
               weight="fill" 
               className="text-white"
            />
            <span className="text-xs font-medium text-white text-center">
               Envía tus<br/>deseos!
            </span>
         </div>
      </button>
   );
};

export default WishesButton; 