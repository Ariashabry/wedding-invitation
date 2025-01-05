import React, { useContext, useState, useEffect } from 'react'
import { ModalContext } from "../../context/ModalContext"
import './ModalAccounts.css'

const ModalAccounts = () => {

   const { setModal } = useContext(ModalContext);
   const [ copied, setCopied ] = useState(false);

   const handleClose = () => {
      setModal(false);
   };

   useEffect(() => {
      const handleEscapeKey = (event) => {
         if (event.key === 'Escape') {
            handleClose();
         }
      };

      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, []);

   const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
         setCopied(false);
      }, 1000);
   }

   return (
      <div className="flex flex-col w-11/12 rounded-md shadow-md h-auto max-h-[95vh]
         md:w-[640px] md:self-center
         lg:w-[720px]">

         <header className="relative flex flex-col items-center justify-start gap-1 w-full rounded-t-md overflow-hidden">
            <div className='absolute inset-0 bg-blue-900/80'></div>
            <img 
               src="./assets/images/aguayo.webp" 
               className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="h-[100px] md:h-[120px] flex flex-col items-center pt-[2vh] gap-1 relative z-20">
               <h2 className="text-lg font-semibold text-center text-yellow-500 md:text-xl lg:text-2xl max-w-[80%]">
                  T’ipacu: ✨ Uniendo Corazones y Tradiciones 🤝
               </h2>
               <p className="text-sm md:text-base text-yellow-400 italic">
                  Ayni: Donde Cada Mano que Da, Recibe
               </p>
            </div> 
            <button 
               onClick={handleClose}
               className="absolute top-1 right-1 p-1.5 md:p-2 bg-white/10 rounded-full z-30
                  transition-all duration-300 hover:bg-white/20 hover:rotate-90"
            >
               <img 
                  src="./assets/images/btn-close.png" 
                  alt="Botón cerrar (Esc)" 
                  className="h-5 w-5 md:h-6 md:w-6"
               />
            </button>
         </header>

         <main className='flex flex-col items-center gap-3 md:gap-4 grow bg-cream p-3 md:p-4 text-gray-dark text-sm'>
            <article className="text-center max-w-2xl">
               <p className="text-sm md:text-base mb-3 md:mb-4">
                  En nuestra cultura andina 🦙, el Ayni representa el equilibrio perfecto entre dar y recibir. 
                  Es la sabiduría ancestral que nos enseña que en la reciprocidad encontramos la verdadera riqueza de nuestra comunidad.
               </p>
            </article>

            <article className="flex flex-col gap-2 w-full lg:w-[450px] bg-blue-900/5 p-3 md:p-4 rounded-lg border-l-4 border-[#058E6E]">
               <section className="flex items-center gap-2">
                  <img src="./assets/images/green-arrows-icon.png" alt="" className='h-6'/>
                  <h2 className='font-semibold text-base'>BANCO GANADERO</h2>
               </section>
               <div className="flex flex-col gap-1.5">
                  <div className='flex-wrap'>
                     <span className='italic'>Titular:</span>
                     <span className='font-semibold ml-2'>Nilda B. Caballero</span>
                  </div>
                  <div className='flex-wrap'>
                     <span className='italic'>Número de Cuenta:</span>
                     <span className='font-semibold ml-2'>1-5041816</span>
                  </div>
               </div>
            </article>

            <article className='flex flex-col gap-1.5 md:gap-2 items-center'>
               <div className="w-36 md:w-48 h-1 bg-gradient-to-r from-[#D52B1E] via-[#F4E400] to-[#058E6E]"></div>
               <div className='text-center max-w-2xl'>
                  <p className='text-sm md:text-base font-medium mb-1.5 md:mb-2'>
                     ¡Que viva el amor! ❤️
                  </p>
                  <p className='text-sm md:text-base'>
                     Tu compañía es la bendición más grande. Gracias por ser parte de este gesto de apoyo y por permitirnos compartir 
                     contigo nuestras tradiciones y este momento especial.
                  </p>
               </div>
            </article>
         </main>

         <footer className='h-[5vh] md:h-[6vh] relative overflow-hidden rounded-b-md'>
            <div className='absolute inset-0 bg-blue-900/80'></div>
            <img 
               src="./assets/images/aguayo.webp" 
               className="w-full h-full object-cover opacity-20"
            />
         </footer>

      </div>
   )
}

export default ModalAccounts
