import { createContext, useState } from "react";

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

const ModalProvider = ({ children }) => {
   const [modal, setModal] = useState(false);                     // Para T'ipacu
   const [confirmationModal, setConfirmationModal] = useState(false);
   const [weatherModal, setWeatherModal] = useState(false);
   const [sent, setSent] = useState(false);
   const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
   const [wishesModal, setWishesModal] = useState(false);        // Para Felicitaciones

   const contextValue = {
      modal,                    // T'ipacu modal
      setModal,
      confirmationModal,
      setConfirmationModal,
      weatherModal,
      setWeatherModal,
      sent,
      setSent,
      isHistoryModalOpen,
      setIsHistoryModalOpen,
      wishesModal,             // Wishes modal
      setWishesModal
   };

   return (
      <ModalContext.Provider value={contextValue}>
         {children}
      </ModalContext.Provider>
   );
};

export default ModalProvider;