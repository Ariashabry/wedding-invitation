import { useState, useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../context/ModalContext';
import { PaperPlaneTilt, X, Heart } from "@phosphor-icons/react";
import axios from 'axios';
import './ModalWishes.css';

const ModalWishes = () => {
   const { wishesModal, setWishesModal } = useContext(ModalContext);
   const modalRef = useRef(null);
   const initialFormState = {
      name: '',
      message: ''
   };
   
   const [formData, setFormData] = useState(initialFormState);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [error, setError] = useState(null);

   // Resetear el formulario cuando se abre el modal
   useEffect(() => {
      if (wishesModal) {
         setFormData(initialFormState);
         setIsSuccess(false);
         setError(null);
         setIsSubmitting(false);
      }
   }, [wishesModal]);

   // Manejador de ESC
   useEffect(() => {
      const handleEsc = (event) => {
         if (event.key === 'Escape') {
            event.preventDefault();
            setWishesModal(false);
         }
      };

      // Guardar el elemento que tenía el foco antes de abrir el modal
      const previousActiveElement = document.activeElement;

      if (wishesModal) {
         // Cuando el modal se abre, establecer el foco en el modal
         modalRef.current?.focus();
      }

      window.addEventListener('keydown', handleEsc);
      
      return () => {
         window.removeEventListener('keydown', handleEsc);
         if (!wishesModal) {
            // Cuando el modal se cierra, remover el foco de cualquier elemento
            document.body.focus();
            // Prevenir que el foco vaya a cualquier otro elemento
            document.activeElement?.blur();
         }
      };
   }, [wishesModal, setWishesModal]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);
      
      try {
         const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/wishes`, 
            {
               name: formData.name.trim(),
               message: formData.message.trim()
            }
         );

         if (response.data.success) {
            setIsSuccess(true);
            setTimeout(() => {
               setWishesModal(false);
               setFormData({ name: '', message: '' });
               setIsSuccess(false);
            }, 2000);
         }
      } catch (error) {
         console.error('Error:', error);
         setError(error.response?.data?.error || 'Hubo un error al enviar tu mensaje');
      } finally {
         setIsSubmitting(false);
      }
   };

   // Función para capitalizar todas las palabras (para el nombre)
   const capitalizeWords = (str) => {
      if (!str) return '';
      return str
         .toLowerCase()
         .split(' ')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ');
   };

   // Función para capitalizar solo la primera letra (para el mensaje)
   const capitalizeFirstLetter = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
   };

   // Función para validar caracteres permitidos en nombres
   const isValidNameChar = (char) => {
      return /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]$/.test(char);
   };

   // Función para formatear el nombre
   const formatName = (value) => {
      const cleanedValue = value
         .split('')
         .filter(char => isValidNameChar(char))
         .join('')
         .replace(/\s+/g, ' ');
      
      return capitalizeWords(cleanedValue);
   };

   const handleClose = () => {
      setWishesModal(false);
      // Remover el foco de cualquier elemento
      document.activeElement?.blur();
   };

   if (!wishesModal) return null;

   return (
      <div 
         className="wishes-overlay"
         ref={modalRef}
         tabIndex="-1"
      >
         <div className="wishes-container">
            <div className="wishes-header">
               <Heart size={32} weight="fill" className="wishes-icon" />
               <h2>Envía tus Felicitaciones</h2>
               <p>Comparte tus buenos deseos con los novios</p>
               <button 
                  onClick={handleClose}
                  className="wishes-close-btn"
                  aria-label="Cerrar"
               >
                  <X size={24} weight="bold" />
               </button>
            </div>
            
            <form className="wishes-form">
               <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <input
                     id="name"
                     type="text"
                     placeholder="Tu nombre completo"
                     value={formData.name}
                     onChange={(e) => {
                        const formattedName = formatName(e.target.value);
                        setFormData({...formData, name: formattedName});
                     }}
                     required
                     minLength={3}
                     maxLength={50}
                     disabled={isSubmitting}
                     className="wishes-input"
                  />
               </div>
               
               <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                     id="message"
                     placeholder="Escribe tus buenos deseos para los novios..."
                     value={formData.message}
                     onChange={(e) => {
                        const formattedMessage = capitalizeFirstLetter(e.target.value);
                        setFormData({...formData, message: formattedMessage});
                     }}
                     required
                     minLength={10}
                     maxLength={200}
                     disabled={isSubmitting}
                     className="wishes-textarea"
                  />
                  <span className="character-count">
                     {200 - formData.message.length} caracteres restantes
                  </span>
               </div>
            </form>

            <div className="wishes-footer">
               <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || isSuccess || !formData.name.trim() || !formData.message.trim()}
                  className="wishes-submit-btn"
               >
                  {isSuccess ? (
                     <>¡Mensaje Enviado! <Heart size={20} weight="fill" /></>
                  ) : isSubmitting ? (
                     'Enviando...'
                  ) : (
                     <>Enviar Felicitación <PaperPlaneTilt size={20} weight="fill" /></>
                  )}
               </button>
            </div>
         </div>
      </div>
   );
};

export default ModalWishes; 