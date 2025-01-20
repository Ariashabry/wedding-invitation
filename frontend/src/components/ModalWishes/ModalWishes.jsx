import { useState, useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import axios from 'axios';
import './ModalWishes.css';

const ModalWishes = () => {
   const { wishesModal, setWishesModal } = useContext(ModalContext);
   const [formData, setFormData] = useState({
      name: '',
      message: ''
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
         await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/wishes`, formData);
         setIsSuccess(true);
         setTimeout(() => {
            setWishesModal(false);
            setFormData({ name: '', message: '' });
            setIsSuccess(false);
         }, 2000);
      } catch (error) {
         console.error('Error:', error);
      } finally {
         setIsSubmitting(false);
      }
   };

   if (!wishesModal) return null;

   return (
      <div className="modal-overlay">
         <div className="modal-container">
            <button 
               onClick={() => setWishesModal(false)}
               className="close-button"
            >
               <X size={24} weight="bold" />
            </button>

            <div className="modal-header">
               <h2>Envía tus Felicitaciones</h2>
               <p>Comparte tus buenos deseos con los novios</p>
            </div>
            
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
               />
               
               <textarea
                  placeholder="Escribe tu mensaje..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  maxLength={200}
               />
               <span className="character-count">
                  {200 - formData.message.length} caracteres restantes
               </span>

               <button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
               >
                  {isSubmitting ? 'Enviando...' : 'Enviar Felicitación'}
               </button>
            </form>
         </div>
      </div>
   );
};

export default ModalWishes; 