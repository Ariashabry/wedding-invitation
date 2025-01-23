import { createContext, useState, useEffect } from "react";

export const ModalContext = createContext({
   modal: false,
   setModal: () => {},
   confirmationModal: false,
   setConfirmationModal: () => {},
   weatherModal: false,
   setWeatherModal: () => {},
   sent: false,
   setSent: () => {},
   isHistoryModalOpen: false,
   setIsHistoryModalOpen: () => {},
   wishesModal: false,
   setWishesModal: () => {}
});

export const ModalProvider = ({ children }) => {
   const [modal, setModal] = useState(false);
   const [confirmationModal, setConfirmationModal] = useState(false);
   const [weatherModal, setWeatherModal] = useState(false);
   const [sent, setSent] = useState(false);
   const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
   const [wishesModal, setWishesModal] = useState(false);

   useEffect(() => {
      const handleHashChange = () => {
         const hash = window.location.hash;
         
         // Cerrar todos los modales primero
         setModal(false);
         setConfirmationModal(false);
         setWeatherModal(false);
         setIsHistoryModalOpen(false);
         setWishesModal(false);

         // Abrir el modal correspondiente según el hash
         if (hash === '#confirmar') {
            setConfirmationModal(true);
         } else if (hash === '#deseos') {
            setWishesModal(true);
         }
      };

      // Verificar al montar y cuando cambie el hash
      window.addEventListener('hashchange', handleHashChange);
      handleHashChange(); // Verificar hash inicial

      return () => {
         window.removeEventListener('hashchange', handleHashChange);
      };
   }, []);

   const contextValue = {
      modal,
      setModal,
      confirmationModal,
      setConfirmationModal,
      weatherModal,
      setWeatherModal,
      sent,
      setSent,
      isHistoryModalOpen,
      setIsHistoryModalOpen,
      wishesModal,
      setWishesModal
   };

   return (
      <ModalContext.Provider value={contextValue}>
         {children}
      </ModalContext.Provider>
   );
};

export default ModalProvider;