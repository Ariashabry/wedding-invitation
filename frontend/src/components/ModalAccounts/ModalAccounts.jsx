import React, { useContext, useState, useEffect } from 'react'
import { ModalContext } from "../../context/ModalContext"
import './ModalAccounts.css'

const ModalAccounts = () => {

   const { setModal } = useContext(ModalContext);
   const [ copied, setCopied ] = useState(false);

   const handleClose = () => {
      setModal(false);
   };

   const handleDownloadQR = () => {
      const link = document.createElement('a');
      link.href = './assets/photos/pagos/qr.webp';
      link.download = 'qr-yape.webp';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
      <div className="flex flex-col w-11/12 rounded-lg shadow-lg h-[90vh] 
         md:w-[640px] md:self-center
         lg:w-[720px]">

         <header className="relative flex flex-col items-center justify-center w-full rounded-t-lg overflow-hidden h-[15vh]">
            <div className='absolute inset-0 bg-blue-900/80'></div>
            <img 
               src="./assets/images/aguayo.webp" 
               className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="w-full flex flex-col items-center justify-center gap-0.5 relative z-20 px-4">
               <h2 className="text-base font-semibold text-center text-yellow-500 md:text-lg lg:text-xl max-w-[90%]">
                  T'ipacu: ✨ Uniendo Corazones y Tradiciones 🤝
               </h2>
               <p className="text-xs md:text-sm text-yellow-400 italic">
                  Ayni: Donde Cada Mano que Da, Recibe
               </p>
            </div>
            <button 
               onClick={handleClose}
               className="absolute top-0 right-0 p-3 md:p-4 bg-white/20 rounded-tl-xl rounded-br-lg z-30
                  transition-all duration-300 hover:bg-white/30 hover:rotate-90"
            >
               <img 
                  src="./assets/images/btn-close.png" 
                  alt="Botón cerrar (Esc)" 
                  className="h-7 w-7 md:h-8 md:w-8"
               />
            </button>
         </header>

         <main className='flex flex-col items-center justify-center gap-4 grow bg-cream px-2 py-4 md:py-6 md:px-4 text-gray-dark'>
            <article className="text-center max-w-xl">
               <p className="text-sm md:text-base lg:text-lg">
                  En nuestra cultura andina 🦙, el Ayni representa el equilibrio perfecto entre dar y recibir. 
                  Es la sabiduría ancestral que nos enseña que en la reciprocidad encontramos la verdadera riqueza de nuestra comunidad.
               </p>
            </article>

            <article className="flex flex-col items-center w-full max-w-md bg-[#6a1b9a]/5 p-4 md:p-6 rounded-lg">
               <section className="flex items-center gap-3 mb-4">
                  <img 
                     src="./assets/images/yape.png" 
                     alt="Yape" 
                     className='h-8 w-8 md:h-10 md:w-10 object-contain'
                  />
                  <div className="flex items-center text-base md:text-lg">
                     <span className='italic'>Titular: </span>
                     <span className='font-medium ml-1'>Nilda B. Caballero</span>
                  </div>
               </section>

               <div className="flex flex-col items-center gap-3">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-white p-2 rounded-lg shadow-md">
                     <img 
                        src="./assets/photos/pagos/qr.webp" 
                        alt="Código QR para Yape" 
                        className="w-full h-full object-contain"
                     />
                  </div>
                  <button
                     onClick={handleDownloadQR}
                     className="p-2 px-4 bg-[#6a1b9a]/90 rounded-lg 
                        shadow-lg text-white hover:bg-[#6a1b9a] transition-all duration-300
                        flex items-center gap-2 text-sm"
                  >
                     <svg 
                        className="w-4 h-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                     >
                        <path 
                           strokeLinecap="round" 
                           strokeLinejoin="round" 
                           strokeWidth={2} 
                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                     </svg>
                     Descargar QR
                  </button>
               </div>
            </article>

            <article className='flex flex-col gap-2 items-center'>
               <div className="w-32 md:w-48 h-0.5 bg-gradient-to-r from-[#D52B1E] via-[#F4E400] to-[#058E6E]"></div>
               <div className='text-center max-w-xl'>
                  <p className='text-sm md:text-base lg:text-lg font-medium mb-1'>
                      ¡Que viva el amor! ❤️
                  </p>
                  <p className='text-sm md:text-base lg:text-lg'>
                     Tu compañía es la bendición más grande. Gracias por ser parte de este gesto de apoyo y por permitirnos compartir 
                     contigo nuestras tradiciones y este momento especial.
                  </p>
               </div>
            </article>
         </main>

         <footer className='h-[8vh] relative overflow-hidden rounded-b-lg'>
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
