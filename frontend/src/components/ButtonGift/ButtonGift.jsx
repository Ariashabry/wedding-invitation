import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from "../../context/ModalContext";
import FeatureWrapper from '../FeatureWrapper/FeatureWrapper';
import { Gift } from "@phosphor-icons/react";
import './ButtonGift.css'

const ButtonGift = () => {
   const { setModal, modal } = useContext(ModalContext);
   const [ ringMovement, setRingMovement ] = useState(false);
   const [ clicked, setClicked ] = useState(null);

   const handleMovementInterval = () => {
      const intervalFn = setInterval(() => {
         setRingMovement(true);
         setTimeout(() => {
            setRingMovement(false);
         }, 1000);
      }, 5000);
      setClicked(intervalFn);
   };

   const handleClick = () => {
      setModal(true);
   };

   useEffect(() => {
      // Si el modal está cerrado y no hay intervalo activo, iniciar la animación
      if (!modal && !clicked) {
         handleMovementInterval();
      }
      // Si el modal está abierto, limpiar el intervalo
      if (modal && clicked) {
         clearInterval(clicked);
         setClicked(null);
      }

      // Cleanup al desmontar
      return () => {
         if (clicked) {
            clearInterval(clicked);
         }
      };
   }, [modal, clicked]);

   return (
      <FeatureWrapper featureKey="TIPACU_BUTTON">
         <button 
            onClick={handleClick}
            title="T'ipacu - Regalo tradicional boliviano"
            className={`tipacu-button unselectable fixed flex flex-col items-center z-50 top-[10px] right-[30px]
               transition-all duration-300 ease-in-out hover:scale-110 active:scale-95
               lg:top-6 lg:right-40 p-2
               ${ringMovement && 'tipacu-animation'}`
            }
         >
            <section className='relative'>
               <Gift 
                  size={32} 
                  weight="fill" 
                  className="text-mustard drop-shadow-lg"
               />
               {!modal && (
                  <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute -top-1 -left-1 h-full w-full rounded-full bg-mustard opacity-75"></span>
                     <span className="relative -top-1 -left-1 rounded-full h-3 w-3 bg-mustard"></span>
                  </span>
               )}
            </section>
            <span className="text-xs font-medium text-mustard mt-1">T'ipacu</span>
         </button>
      </FeatureWrapper>
   )
}

export default ButtonGift