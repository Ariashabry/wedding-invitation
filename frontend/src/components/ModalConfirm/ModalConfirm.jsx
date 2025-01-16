import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from "../../context/ModalContext"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './ModalConfirm.css';
import Swal from 'sweetalert2'
import { convertLength } from '@mui/material/styles/cssUtils';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend-lake-nu.vercel.app';

const countryCodes = [
    { code: '+591', country: 'Bolivia', iso: 'BO' },
    { code: '+51', country: 'Perú', iso: 'PE' },
    { code: '+56', country: 'Chile', iso: 'CL' },
    { code: '+54', country: 'Argentina', iso: 'AR' },
    { code: '+55', country: 'Brasil', iso: 'BR' },
    { code: '+593', country: 'Ecuador', iso: 'EC' },
    { code: '+595', country: 'Paraguay', iso: 'PY' },
    { code: '+598', country: 'Uruguay', iso: 'UY' },
    { code: '+57', country: 'Colombia', iso: 'CO' },
    { code: '+34', country: 'España', iso: 'ES' },
    { code: '+1', country: 'Estados Unidos', iso: 'US' }
];

const initialFormState = {
   fullName: '',
   phone: '',
   assist: 'true',
   partner: 'false',
   partnersName: [],
   childrens: 'false',
   childrensQuantity: 0,
   assistChurch: 'true',
   // dietaryRestrictions: 'false',
   // dietaryRestrictionsIndications: '',
   // otherFoodPreference: '',
   // message: '',
};

const ModalConfirm = () => {

   const { setConfirmationModal } = useContext(ModalContext);
   const [formData, setFormData] = useState(initialFormState);
   const [isLoading, setIsLoading] = useState(false);
   const [arrowBehavior, setArrowBehavior] = useState(false);
   const [optionalInput, setOptionalInput] = useState(true);
   const [partnerNames, setPartnerNames] = useState(['']);
   const [errors, setErrors] = useState({});
   const [showToast, setShowToast] = useState(false);
   const [selectedCountryCode, setSelectedCountryCode] = useState('+591');

   // Función para capitalizar nombres
   const capitalizeWords = (str) => {
      if (!str) return '';
      return str
         .split(' ')
         .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
         .join(' ');
   };

   // Validación de nombre
   const validateName = (name) => {
      if (!name.trim()) {
         return 'El nombre es obligatorio';
      }
      if (name.trim().length < 3) {
         return 'El nombre debe tener al menos 3 caracteres';
      }
      if (!/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/.test(name.trim())) {
         return 'El nombre solo debe contener letras';
      }
      return '';
   };

   // Función para validar caracteres permitidos en nombres
   const isValidNameChar = (char) => {
      return /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]$/.test(char);
   };

   // Función para limpiar y formatear el nombre
   const formatName = (value) => {
      // Eliminar caracteres no permitidos y espacios múltiples
      const cleanedValue = value
         .split('')
         .filter(char => isValidNameChar(char))
         .join('')
         .replace(/\s+/g, ' ');
      
      return capitalizeWords(cleanedValue);
   };

   // Función para manejar el cambio en un input
   const handlePartnerNameChange = (index, value) => {
      const formattedName = formatName(value);
      const updatedNames = [...partnerNames];
      updatedNames[index] = formattedName;
      setPartnerNames(updatedNames);
      setFormData(prevData => ({
         ...prevData,
         partnersName: updatedNames,
      }));
   };

   // Función para agregar un nuevo input para otro acompañante
   const addPartnerInput = (e) => {
      e.preventDefault();
      setPartnerNames([...partnerNames, '']);
   };

   // Función para eliminar un input de acompañante
   const removePartnerInput = (index) => {
      const updatedNames = [...partnerNames];
      updatedNames.splice(index, 1);
      setPartnerNames(updatedNames);

      // Actualizar formData eliminando el elemento correspondiente de partnerName
      setFormData(prevData => ({
         ...prevData,
         partnersName: prevData.partnersName.filter((_, i) => i !== index),
      }));
   };

   // Validación para el teléfono
   const validatePhone = (phone) => {
      if (!phone.trim()) {
         return 'El teléfono es obligatorio';
      }
      // Validación según el país seleccionado
      const minLength = selectedCountryCode === '+1' ? 10 : 8;
      const maxLength = selectedCountryCode === '+1' ? 10 : 9;
      
      if (phone.length < minLength || phone.length > maxLength) {
         return `El teléfono debe tener entre ${minLength} y ${maxLength} dígitos`;
      }
      return '';
   };

   // Función para formatear el teléfono
   const formatPhone = (value) => {
      // Eliminar todo excepto números
      const numbersOnly = value.replace(/\D/g, '');
      // Limitar a 8 dígitos
      return numbersOnly.slice(0, 8);
   };

   const handleChange = (e) => {
      const { name, type, value, checked } = e.target;
      
      if (name === 'fullName') {
         const formattedName = formatName(value);
         const nameError = validateName(formattedName);
         
         setErrors(prev => ({
            ...prev,
            fullName: nameError
         }));
         
         setFormData(prevData => ({
            ...prevData,
            fullName: formattedName
         }));
      } else if (name === 'phone') {
         const formattedPhone = formatPhone(value);
         const phoneError = validatePhone(formattedPhone);
         
         setErrors(prev => ({
            ...prev,
            phone: phoneError
         }));
         
         setFormData(prevData => ({
            ...prevData,
            phone: formattedPhone
         }));
      } else if (type === "radio") {
         value === "false" ? setOptionalInput(true) : setOptionalInput(false);
         setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
         }));
      } else {
         setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
         }));
      }
   };


   const handleArrowBehavior = (e) => {
      setArrowBehavior({
         name: e.target.name,
         checked: e.target.checked
      })
   }

   console.log(formData);

   const validateForm = () => {
      const newErrors = {};
      
      // Validación de campos requeridos
      if (!formData.fullName.trim()) {
         newErrors.fullName = 'El nombre es obligatorio';
      }
      
      if (!formData.phone.trim()) {
         newErrors.phone = 'El teléfono es obligatorio';
      }
      
      if (!formData.assist) {
         newErrors.assist = 'Debes confirmar tu asistencia';
      }

      return newErrors;
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
         setErrors(formErrors);
         setShowToast(true);
         setTimeout(() => setShowToast(false), 3000);
         return;
      }

      setIsLoading(true);

      const showConfirmation = (title, text, confirmedText) => {
         setTimeout(() => {
            Swal.fire({
               confirmButtonText: 'Siguiente',
               title: title,
               text: text,
               background: '#EAE8E4',
               customClass: {
                  confirmButton: 'btn-alert bg-green hover:bg-green-dark'
               },
               buttonsStyling: false
            }).then((result) => {
               if (result.isConfirmed) {
                  Swal.fire({
                     confirmButtonText: 'Cerrar',
                     text: confirmedText,
                     background: '#EAE8E4',
                     customClass: {
                        confirmButton: 'btn-alert bg-green hover:bg-green-dark'
                     },
                     buttonsStyling: false
                  }).then((result) => {
                     if (result.isConfirmed) {
                        setConfirmationModal(false);
                     }
                  });
               }
            });
         }, 100);
      };

      axios
         .post(`${BACKEND_URL}/api/guests`, formData)
         .then((response) => {
            console.log('Response:', response.data);
            if (formData.assist !== "false") {
               showConfirmation(
                  '¡Gracias por Confirmar!',
                  'Estamos felices de saber que nos acompañarás en este día tan especial.',
                  '🎉 Tu confirmación ha sido enviada con éxito. ¡Nos vemos pronto para celebrar juntos! ❤️✨'
               );
            } else {
               showConfirmation(
                  '¡Te vamos a extrañar!',
                  'Lamentamos que no puedas acompañarnos en este día tan especial. ❤️',
                  'Formulario enviado con éxito!'
               );
            }
         })
         .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'Hubo un error al enviar el formulario. Por favor, intenta nuevamente.',
               background: '#EAE8E4',
               customClass: {
                  confirmButton: 'btn-alert bg-green hover:bg-green-dark'
               },
               buttonsStyling: false
            });
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <div className="relative flex flex-col justify-start w-11/12 rounded-md antialiased overflow-y-scroll bg-cream text-gray-dark py-6 shadow-md
         sm:py-12
         md:w-[640px]
         lg:w-[720px]">

         {/* Toast de errores */}
         {showToast && Object.keys(errors).length > 0 && (
            <div className="fixed top-4 right-4 z-50 animate-fade-in">
               <div className="bg-red bg-opacity-90 text-white px-6 py-4 rounded-lg shadow-lg">
                  <h4 className="font-semibold mb-2">Por favor completa los campos requeridos:</h4>
                  <ul className="list-disc list-inside">
                     {Object.values(errors).map((error, index) => (
                        <li key={index} className="text-sm">{error}</li>
                     ))}
                  </ul>
               </div>
            </div>
         )}

         <img
            onClick={() => setConfirmationModal(false)}
            src="./assets/images/btn-close.png"
            alt=" Boton cerrar "
            className="absolute top-5 right-5 h-10 cursor-pointer shadow-md rounded-md z-50
               transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90" />

         <div className="relative py-3 w-10/12 mx-auto text-center">

            <section className="flex flex-col mb-6">
               <span className="text-2xl font-medium mb-4">¿Asistiras a nuestra boda?</span>
               <span className="text-base font-light">
                  Por favor, completa un formulario por familia o invitado individual.
                  <br></br>
                  ¡Nos encantaría contar con tu presencia! 
               </span>
               <div className="flex items-center gap-2 mt-4 bg-blue-50 p-3 rounded-lg">
                  <span className="text-blue-600">💡</span>
                  <span className="text-sm text-blue-700">
                     Tip: Haz clic en cada sección para completar tus datos
                  </span>
               </div>
            </section>

            <form onClick={handleArrowBehavior} className="mt-4 flex flex-col gap-4 text-left">

               {/* Full name section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='fullname' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                     <div className="section-header">
                        <h3>
                           Nombre completo
                           <span className='section-required text-red'>(*)</span>
                        </h3>
                        <KeyboardArrowDownIcon className={`text-gray-dark ${(arrowBehavior.checked && arrowBehavior.name === 'fullname') && 'rotate-180'}`} fontSize='medium' />
                     </div>
                     <div className="flex flex-col pb-6 gap-2">
                        <label>
                           <input
                              required
                              type="text"
                              name="fullName"
                              placeholder="Ej: Juan Pérez Mamani"
                              value={formData.fullName}
                              onChange={handleChange}
                              className={`section-input-text ${errors.fullName ? 'border-red-500' : ''}`}
                              title="Solo se permiten letras y espacios"
                           />
                           {errors.fullName && (
                              <span className="text-red-500 text-xs mt-1">
                                 {errors.fullName}
                              </span>
                           )}
                        </label>
                     </div>
                  </span>
               </label>

               {/* Phone section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='fullname' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                     <div className="section-header">
                        <h3>
                           Teléfono ☎️
                           <span className='section-required text-red'>(*)</span>
                        </h3>
                        <KeyboardArrowDownIcon className={`text-gray-dark ${(arrowBehavior.checked && arrowBehavior.name === 'fullname') && 'rotate-180'}`} fontSize='medium' />
                     </div>
                     <h3 className="text-sm font-medium mb-4">Dejanos un número de teléfono para poder contactarte por cualquier cosa.</h3>
                     <div className="flex flex-col pb-6 gap-2">
                        <label>
                           <div className="phoneInputWrapper">
                              <select 
                                 value={selectedCountryCode}
                                 onChange={(e) => setSelectedCountryCode(e.target.value)}
                                 className="countryCodeSelect"
                                 title="Código de país"
                              >
                                 {countryCodes.map(({ code, country, iso }) => (
                                    <option key={code} value={code} title={country}>
                                       {iso} {code}
                                    </option>
                                 ))}
                              </select>
                              <input
                                 required
                                 type="tel"
                                 name="phone"
                                 placeholder="Ej: 70707070"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 className={`section-input-text ${errors.phone ? 'border-red-500' : ''}`}
                                 title="Ingresa un número de teléfono válido"
                              />
                           </div>
                           {errors.phone && (
                              <span className="text-red-500 text-xs mt-1">
                                 {errors.phone}
                              </span>
                           )}
                        </label>
                     </div>
                  </span>
               </label>

               {/* Assists section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='assist' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           Confirmación ✅
                           <span className='section-required text-red'>(*)</span>
                        </h3>
                        <KeyboardArrowDownIcon className={`text-gray-dark ${(arrowBehavior.checked && arrowBehavior.name === 'assist') && 'rotate-180'}`} fontSize='medium' />
                     </div>
                     <div className="flex flex-col pb-6">
                        <label className="section-label-radio">
                           <input
                              required
                              type="radio"
                              name="assist"
                              value={true}
                              onChange={handleChange}
                              className="section-input-radio"
                              defaultChecked
                           />ASISTIRÉ 🚀
                        </label>
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name="assist"
                              value={false}
                              onChange={handleChange}
                              className="section-input-radio"
                           />NO VOY A PODER ASISTIR 😔
                        </label>
                     </div>
                  </span>
               </label>

               {/* Partners section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='partners_name' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-fit">
                     <div className="section-header">
                        <h3>
                           Acompañante 🧑‍🤝‍🧑
                        </h3>
                        <KeyboardArrowDownIcon className={`text-gray-dark ${(arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180'}`} fontSize='medium' />
                     </div>
                     <h3 className="text-sm font-medium mb-4">
                        <span className="font-bold">¿Fuiste invitado con alguien? </span>
                        Necesitamos su nombre y apellido para la lista.
                     </h3>
                     <div className="section-label-text">
                        <div className='flex gap-4'>
                           <label htmlFor="partnerConfirm" className='flex gap-2 cursor-pointer'>Si
                              <input
                                 type="radio"
                                 name="partner"
                                 id="partnerConfirm"
                                 value={true}
                                 onClick={handleChange}
                                 className='section-input-radio'
                              />
                           </label>
                           <label htmlFor="partnerNotConfirm" className='flex gap-2 cursor-pointer'>No
                              <input
                                 type="radio"
                                 name="partner"
                                 id="partnerNotConfirm"
                                 value={false}
                                 onClick={handleChange}
                                 className='section-input-radio'
                                 defaultChecked
                              />
                           </label>
                        </div>
                        <div className={`${formData.partner !== 'false' ? 'visible' : 'hidden'}`}>
                           {partnerNames.map((partnerName, index) => (
                              <label key={index} className='flex items-center mt-2'>
                                 <input
                                    type="text"
                                    placeholder={`${index + 1}) Nombre y apellido `}
                                    value={partnerName}
                                    onChange={e => handlePartnerNameChange(index, e.target.value)}
                                    className='section-input-text'
                                    disabled={optionalInput}
                                 />
                                 <CancelIcon onClick={() => removePartnerInput(index)} fontSize='small' className='text-mustard ml-1 cursor-pointer' />
                              </label>
                           ))}
                           <button
                              className='mt-3 flex items-center gap-2 text-gray-dark text-opacity-50 text-sm font-normal'
                              onClick={addPartnerInput}>
                              <AddCircleIcon fontSize='small' className='text-mustard' />
                              Agregar acompañante
                           </button>
                        </div>
                     </div>
                  </span>
               </label>

               {/* Assist church section ---------------------- */}
               <label>
                  <input className="peer/showLabel absolute scale-0 unselectable section-input-radio hidden-checkbox" type="checkbox" name='assist_church' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                     <div className="section-header">
                        <h3>
                           Iglesia 💒
                        </h3>
                        <KeyboardArrowDownIcon className={`text-gray-dark ${arrowBehavior.checked && arrowBehavior.name === 'assist_church' && 'rotate-180'}`} fontSize='medium' />
                     </div>
                     <div className="flex flex-col pb-6">
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={true}
                              onChange={handleChange}
                              className="section-input-radio"
                              defaultChecked
                           />Sí, 14:00 PM estaré presente en la Iglesia San Martín 💒
                        </label>
                        <label className="section-label-radio">
                           <input
                              type="radio"
                              name='assistChurch'
                              value={false}
                              onChange={handleChange}
                              className="section-input-radio"
                           />No, 17:30 PM estaré en el salón 🙌🏼
                        </label>
                     </div>
                  </span>
               </label>

               {/* Food section ---------------------- */}
               {/* <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='partners_name' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg  px-4 py-0  shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-72">
                     <div className="section-header">
                        <h3>
                           Restricciones alimentarias
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'partners_name') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">¿Vos o alguno de tu/s acompañante/s tienen alguna restricción alimentaria? Decinos a qué y cuántos son.</h3>
                     <div className="section-label-text">
                        <div className='flex gap-4'>
                           <label htmlFor="childrensConfirm" className='flex gap-2 cursor-pointer'>Si
                              <input 
                              type="radio" 
                              name="dietaryRestrictions" 
                              id="restrictionsConfirm" 
                              value={ true } 
                              onClick={ handleChange } 
                              className='section-input-radio'
                              />
                           </label>
                           <label htmlFor="childrensNotConfirm" className='flex gap-2 cursor-pointer'>No
                              <input 
                              type="radio" 
                              name="dietaryRestrictions" 
                              id="restrictionsNotConfirm" 
                              value={ false } 
                              onClick={ handleChange }
                              className='section-input-radio'
                              />
                           </label>
                        </div>
                        <label className='flex flex-col mt-2'>
                        <input
                           type="text"
                           name="dietaryRestrictionsIndications"
                           placeholder="Ingresá el tipo de restricción"
                           value={formData.dietaryRestrictionsIndications}
                           onChange={ handleChange } 
                           className={`section-input-text ${formData.dietaryRestrictions !== 'false' ? 'visible section-input-text' : 'hidden'}`}
                           disabled={optionalInput} // Utiliza optionalInput para controlar la desactivación del input
                        />
                        </label>
                     </div>
                  </span>
               </label> */}


               {/* Message section ---------------------- */}
               {/* <label>
                  <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='message' />
                  <div className="section-line"></div>
                  <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-64">
                     <div className="section-header">
                        <h3>
                           Mensaje para los novios
                        </h3>
                        <KeyboardArrowDownIcon className={ `text-gray-dark ${ (arrowBehavior.checked && arrowBehavior.name === 'message') && 'rotate-180' }` } fontSize='medium' /> 
                     </div>
                     <h3 className="text-sm font-medium mb-4">¿Querés decirnos algo? Consulta, declaraciones de amor, lo que sea, este es el espacio.</h3>
                     <div className="section-label-text">
                        <label>
                           <input
                              type="text"
                              name="message"
                              placeholder="Te leemos"
                              value={ formData.message }
                              onChange={ handleChange }
                              className='section-input-text'
                           />
                        </label>
                     </div>
                  </span>
               </label> */}

               <div className="flex flex-col gap-4 mt-6 mb-2">
                  <hr className="border-gray-200" />
                  <p className="text-sm text-gray-600 italic text-center">
                     Si bien <span className="font-semibold">amamos a los niños</span>, el 
                     <span className="font-semibold"> horario nocturno</span> y la 
                     <span className="font-semibold"> naturaleza de la celebración</span> nos lleva a organizar una 
                     recepción <span className="font-semibold">solo para adultos</span>. 
                     Para confirmar la asistencia de niños, por favor contacta con Alcides al{' '}
                     <a 
                        href="https://wa.me/59176327232?text=Hola%20Alcides,%20quisiera%20consultar%20sobre%20la%20asistencia%20de%20niños%20a%20la%20boda" 
                        className="font-bold text-[#25D366] hover:text-[#128C7E]"
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        76327232 <span className="text-xs">📱</span>
                     </a>.
                  </p>
               </div>

               <div className="flex justify-center w-full">
                  <button
                     onClick={handleSubmit}
                     type="submit"
                     disabled={isLoading}
                     className={`w-full mt-6 bg-green text-white py-4 px-8 text-lg font-medium 
                        transition-all duration-200 rounded-md hover:bg-green-dark active:scale-95 
                        shadow-md md:w-[280px] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                     {isLoading ? 'Enviando...' : 'Enviar'}
                  </button>
               </div>

            </form>
         </div>
      </div>
   )
}

export default ModalConfirm