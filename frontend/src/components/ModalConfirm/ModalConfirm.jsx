import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ModalContext } from "../../context/ModalContext"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import './ModalConfirm.css';
import Swal from 'sweetalert2'
import { convertLength } from '@mui/material/styles/cssUtils';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://backend-lake-nu.vercel.app";

const countryCodes = [
    { code: '+591', country: 'Bolivia', iso: 'BO', minLength: 8, maxLength: 8 },
    { code: '+51', country: 'Perú', iso: 'PE', minLength: 9, maxLength: 9 },
    { code: '+56', country: 'Chile', iso: 'CL', minLength: 9, maxLength: 9 },
    { code: '+54', country: 'Argentina', iso: 'AR', minLength: 10, maxLength: 10 },
    { code: '+55', country: 'Brasil', iso: 'BR', minLength: 10, maxLength: 11 },
    { code: '+593', country: 'Ecuador', iso: 'EC', minLength: 9, maxLength: 10 },
    { code: '+595', country: 'Paraguay', iso: 'PY', minLength: 9, maxLength: 9 },
    { code: '+598', country: 'Uruguay', iso: 'UY', minLength: 8, maxLength: 9 },
    { code: '+57', country: 'Colombia', iso: 'CO', minLength: 10, maxLength: 10 },
    { code: '+34', country: 'España', iso: 'ES', minLength: 9, maxLength: 9 },
    { code: '+1', country: 'Estados Unidos', iso: 'US', minLength: 10, maxLength: 10 }
];

const PHONE_CONFIGS = {
   '591': { // Bolivia
      length: 8,
      name: 'Bolivia',
      startsWith: ['6', '7', '2', '3', '4'],
      flag: '🇧🇴'
   },
   '51': { // Perú
      length: 9,
      name: 'Perú',
      startsWith: ['9'],
      flag: '🇵🇪'
   },
   '54': { // Argentina
      length: 10,
      name: 'Argentina',
      startsWith: ['9'],
      flag: '🇦🇷'
   },
   '55': { // Brasil
      length: 9,
      name: 'Brasil',
      startsWith: ['9'],
      flag: '🇧🇷'
   },
   '56': { // Chile
      length: 9,
      name: 'Chile',
      startsWith: ['9'],
      flag: '🇨🇱'
   },
   '57': { // Colombia
      length: 10,
      name: 'Colombia',
      startsWith: ['3'],
      flag: '🇨🇴'
   },
   '58': { // Venezuela
      length: 10,
      name: 'Venezuela',
      startsWith: ['4'],
      flag: '🇻🇪'
   },
   '52': { // México
      length: 10,
      name: 'México',
      startsWith: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      flag: '🇲🇽'
   },
   '593': { // Ecuador
      length: 9,
      name: 'Ecuador',
      startsWith: ['9'],
      flag: '🇪🇨'
   },
   '595': { // Paraguay
      length: 9,
      name: 'Paraguay',
      startsWith: ['9'],
      flag: '🇵🇾'
   },
   '598': { // Uruguay
      length: 8,
      name: 'Uruguay',
      startsWith: ['9'],
      flag: '🇺🇾'
   },
   '34': { // España
      length: 9,
      name: 'España',
      startsWith: ['6', '7'],
      flag: '🇪🇸'
   },
   '1': { // Estados Unidos
      length: 10,
      name: 'Estados Unidos',
      startsWith: ['2', '3', '4', '5', '6', '7', '8', '9'],
      flag: '🇺🇸'
   }
};

// Ordenar países por nombre para el selector
const sortedCountries = Object.entries(PHONE_CONFIGS).sort((a, b) => 
   a[1].name.localeCompare(b[1].name, 'es', { sensitivity: 'base' })
);

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

const styleSheet = document.createElement("style");
styleSheet.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.shake {
  animation: shake 0.5s ease-in-out;
}

.highlight-required {
  box-shadow: 0 0 0 2px #EF4444;
  transition: all 0.3s ease;
}

.swal-popup-high-z-index {
   z-index: 9999 !important;
}

.swal2-container {
   z-index: 9999 !important;
}
`;
document.head.appendChild(styleSheet);

const ModalConfirm = () => {

   const { setConfirmationModal } = useContext(ModalContext);
   const [formData, setFormData] = useState(initialFormState);
   const [isLoading, setIsLoading] = useState(false);
   const [arrowBehavior, setArrowBehavior] = useState(false);
   const [optionalInput, setOptionalInput] = useState(true);
   const [partnerNames, setPartnerNames] = useState(['']);
   const [errors, setErrors] = useState({
      fullName: '',
      phone: ''
   });
   const [showToast, setShowToast] = useState(false);
   const [selectedCountry, setSelectedCountry] = useState('591');
   const [activeSection, setActiveSection] = useState('confirmation');
   const [shakingFields, setShakingFields] = useState({
      fullName: false,
      phone: false
   });

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
      if (partnerNames.length >= 2) {
         Swal.fire({
            icon: 'warning',
            title: 'Límite de acompañantes alcanzado',
            html: `
                <div class="text-center">
                    <p class="mb-4">Solo se permiten hasta 2 acompañantes por invitado.</p>
                    <p class="text-sm text-gray-600">
                        Si necesitas registrar más personas, por favor contáctanos:
                        <br/>
                        <a 
                            href="https://wa.me/59176327232?text=Hola%20Alcides,%20necesito%20registrar%20más%20acompañantes" 
                            class="font-bold text-[#25D366] hover:text-[#128C7E]"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            76327232 📱
                        </a>
                    </p>
                </div>
            `,
            background: '#EAE8E4',
            customClass: {
                confirmButton: 'btn-alert bg-green hover:bg-green-dark',
                popup: 'rounded-lg p-6'
            },
            buttonsStyling: false
         });
         return;
      }
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

      // Encontrar el país seleccionado
      const selectedCountry = countryCodes.find(country => country.code === selectedCountry);
      
      if (phone.length < selectedCountry.minLength || phone.length > selectedCountry.maxLength) {
         if (selectedCountry.minLength === selectedCountry.maxLength) {
            return `El teléfono debe tener ${selectedCountry.minLength} dígitos para ${selectedCountry.country}`;
         }
         return `El teléfono debe tener entre ${selectedCountry.minLength} y ${selectedCountry.maxLength} dígitos para ${selectedCountry.country}`;
      }
      
      return '';
   };

   // Función para formatear el teléfono
   const formatPhone = (value) => {
      const selectedCountry = countryCodes.find(country => country.code === selectedCountry);
      const numbersOnly = value.replace(/\D/g, '');
      return numbersOnly.slice(0, selectedCountry.maxLength);
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

   const handlePhoneChange = (e) => {
      let value = e.target.value.replace(/\D/g, '');
      // Si el usuario está empezando a escribir, agregamos el código de país
      if (!value.startsWith(selectedCountry)) {
         value = value.slice(0, PHONE_CONFIGS[selectedCountry].length); // Solo los dígitos permitidos
      }
      setFormData({ ...formData, phone: value });
      if (errors.phone) setErrors({ ...errors, phone: '' });
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

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setErrors({ fullName: '', phone: '' });
      
      try {
         const newErrors = {};
         const newShaking = {
            fullName: false,
            phone: false
         };

         if (!formData.fullName?.trim()) {
            newErrors.fullName = 'El nombre es obligatorio';
            newShaking.fullName = true;
         }

         // Validación del teléfono
         const phoneNumber = formData.phone?.replace(/\D/g, '');
         let validatedPhone = '';

         if (!phoneNumber) {
            newErrors.phone = 'El teléfono es obligatorio';
            newShaking.phone = true;
         } else {
            const config = PHONE_CONFIGS[selectedCountry];
            
            if (phoneNumber.length !== config.length) {
               newErrors.phone = `El número debe tener ${config.length} dígitos`;
               newShaking.phone = true;
            } else if (config.startsWith && !config.startsWith.includes(phoneNumber[0])) {
               newErrors.phone = `El número no parece ser válido para ${config.name}`;
               newShaking.phone = true;
            } else {
               validatedPhone = selectedCountry + phoneNumber;
            }
         }

         // Si hay errores de validación, mostrarlos
         if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShakingFields(newShaking);
            
            const firstErrorField = Object.keys(newErrors)[0];
            const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
               errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            Swal.fire({
               icon: 'warning',
               title: 'Campos requeridos',
               text: Object.values(newErrors)[0],
               timer: 3000,
               timerProgressBar: true,
               showConfirmButton: false
            });

            setIsLoading(false);
            return;
         }

         // Preparamos los datos para enviar con valores booleanos explícitos
         let submitData = {
            fullName: formData.fullName.trim(),
            phone: validatedPhone,
            assist: Boolean(formData.assist),           // Conversión explícita a boolean
            assistChurch: Boolean(formData.assistChurch), // Conversión explícita a boolean
            onlyChurch: Boolean(formData.onlyChurch),    // Conversión explícita a boolean
            partner: false,                              // Valor por defecto
            partnersName: []                             // Array vacío por defecto
         };

         // Procesamos los datos de acompañantes si existen
         if (formData.partner && Array.isArray(formData.partnersName)) {
            const validPartners = formData.partnersName
               .filter(name => name && typeof name === 'string')
               .map(name => name.trim())
               .filter(name => name.length > 0);

            if (validPartners.length > 0) {
               submitData.partner = true;
               submitData.partnersName = validPartners;
            }
         }

         console.log('Datos a enviar:', submitData); // Para debugging

         // Intentamos registrar al invitado
         const response = await axios.post(`${BACKEND_URL}/api/guests`, submitData);

         if (response.status === 200 || response.status === 201) {
            Swal.fire({
               icon: 'success',
               title: '¡Gracias!',
               html: `¡Gracias <b>${submitData.fullName}</b> por confirmar tu asistencia!`,
               timer: 3000,
               timerProgressBar: true,
               showConfirmButton: false
            });
            setConfirmationModal(false);
            setFormData({
               fullName: '',
               phone: '',
               assist: 'false',
               partner: 'false',
               partnersName: '',
               assistChurch: 'false',
               onlyChurch: false
            });
         }
      } catch (error) {
         console.error('Error al registrar:', error);
         
         // Aseguramos que el Sweet Alert se muestre con el z-index correcto
         const swalConfig = {
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.error || 'Hubo un error al procesar tu registro.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6',
            customClass: {
               popup: 'swal-popup-high-z-index' // Clase personalizada para z-index alto
            }
         };

         // Mostramos el Sweet Alert y esperamos su respuesta
         await Swal.fire(swalConfig);
         
         // Si el error es de duplicado, cerramos el modal de registro
         if (error.response?.data?.error?.includes('Ya existe')) {
            setConfirmationModal(false);
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleSectionClick = (section) => {
      setActiveSection(section);
   };

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="relative bg-white w-11/12 max-w-2xl rounded-3xl flex flex-col h-[90vh]">
            {/* Botón de cerrar */}
            <button
               onClick={() => setConfirmationModal(false)}
               className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
               aria-label="Cerrar"
            >
               <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
               >
                  <path 
                     strokeLinecap="round" 
                     strokeLinejoin="round" 
                     strokeWidth={2} 
                     d="M6 18L18 6M6 6l12 12" 
                  />
               </svg>
            </button>

            <div className="flex-1 overflow-y-auto">
               <div className="p-8">
                  <h2 className="text-2xl font-semibold text-center mb-2">
                     Confirma tu asistencia
                  </h2>
                  <p className="text-center text-gray-600 mb-6">
                     Por favor, completa un formulario por familia o invitado individual.
                     ¡Nos encantaría contar con tu presencia!
                  </p>

                  <div className="bg-blue-50 p-4 rounded-2xl mb-6">
                     <p className="flex items-center gap-2 text-blue-600">
                        <span role="img" aria-label="tip">💡</span>
                        Tip: Haz clic en cada sección para completar tus datos
                     </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
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
                                    className={`section-input-text ${errors.fullName ? 'border-red-500 highlight-required' : 'border-gray-300'} ${shakingFields.fullName ? 'shake' : ''}`}
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

                     {/* Teléfono */}
                     <label>
                        <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='phone' onChange={handleArrowBehavior} />
                        <div className="section-line"></div>
                        <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                           <div className="section-header">
                              <h3>
                                 Teléfono 📞
                                 <span className='section-required text-red'>(*)</span>
                              </h3>
                              <KeyboardArrowDownIcon className={`text-gray-dark ${(arrowBehavior.checked && arrowBehavior.name === 'phone') && 'rotate-180'}`} fontSize='medium' />
                           </div>
                           <div className="flex flex-col pb-6 gap-2">
                              <div className="flex items-center gap-2">
                                 {/* Selector de código de país */}
                                 <div className="relative min-w-[80px] w-auto">
                                    <select
                                       value={selectedCountry}
                                       onChange={(e) => {
                                          setSelectedCountry(e.target.value);
                                          setFormData({ ...formData, phone: '' });
                                       }}
                                       className="w-full p-3 border rounded-lg bg-white appearance-none pr-8 text-base"
                                    >
                                       {sortedCountries.map(([code, config]) => (
                                          <option key={code} value={code}>
                                             {config.flag} {code}
                                          </option>
                                       ))}
                                    </select>
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                       <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                       </svg>
                                    </div>
                                 </div>

                                 {/* Input de número */}
                                 <div className="flex-1">
                                    <input
                                       type="tel"
                                       name="phone"
                                       placeholder={`${PHONE_CONFIGS[selectedCountry].length} dígitos`}
                                       value={formData.phone}
                                       onChange={handlePhoneChange}
                                       className={`w-full p-3 border rounded-lg text-base ${
                                          errors.phone ? 'border-red-500' : 'border-gray-300'
                                       }`}
                                    />
                                 </div>
                              </div>
                              
                              {/* Texto informativo */}
                              <p className="text-xs text-gray-500">
                                 Bolivia: {PHONE_CONFIGS[selectedCountry].length} dígitos
                              </p>

                              {errors.phone && (
                                 <p className="text-red-500 text-sm">{errors.phone}</p>
                              )}
                           </div>
                        </span>
                     </label>

                     {/* Confirmación */}
                     <label>
                        <input className="peer/showLabel absolute scale-0 unselectable" type="checkbox" name='confirmation' onChange={handleArrowBehavior} />
                        <div className="section-line"></div>
                        <span className="block bg-white max-h-14 overflow-hidden rounded-b-lg px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
                           <div className="section-header">
                              <h3>
                                 Confirmación ✨
                                 <span className='section-required text-red'>(*)</span>
                              </h3>
                              <KeyboardArrowDownIcon className={`text-gray-dark ${(arrowBehavior.checked && arrowBehavior.name === 'confirmation') && 'rotate-180'}`} fontSize='medium' />
                           </div>
                           <div className="flex flex-col gap-2">
                              {/* No asistiré */}
                              <button
                                 type="button"
                                 onClick={() => {
                                    setFormData({
                                       ...formData,
                                       assist: false,
                                       assistChurch: false,
                                       onlyChurch: false
                                    });
                                 }}
                                 className={`w-full px-4 py-3 rounded-full border text-center transition-all ${
                                    !formData.assist && !formData.assistChurch
                                       ? 'bg-[#B08D57] border-[#B08D57] text-white'
                                       : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                 }`}
                              >
                                 No asistiré
                              </button>

                              {/* Iglesia */}
                              <button
                                 type="button"
                                 onClick={() => {
                                    setFormData({
                                       ...formData,
                                       assist: false,
                                       assistChurch: true,
                                       onlyChurch: true
                                    });
                                 }}
                                 className={`w-full px-4 py-3 rounded-full border text-center transition-all ${
                                    formData.assistChurch && !formData.assist
                                       ? 'bg-[#B08D57] border-[#B08D57] text-white'
                                       : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                 }`}
                              >
                                 Iglesia (14:00)
                              </button>

                              {/* Recepción */}
                              <button
                                 type="button"
                                 onClick={() => {
                                    setFormData({
                                       ...formData,
                                       assist: true,
                                       assistChurch: false,
                                       onlyChurch: false
                                    });
                                 }}
                                 className={`w-full px-4 py-3 rounded-full border text-center transition-all ${
                                    formData.assist && !formData.assistChurch
                                       ? 'bg-[#B08D57] border-[#B08D57] text-white'
                                       : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                 }`}
                              >
                                 Recepción (17:30)
                              </button>

                              {/* Iglesia y Recepción */}
                              <button
                                 type="button"
                                 onClick={() => {
                                    setFormData({
                                       ...formData,
                                       assist: true,
                                       assistChurch: true,
                                       onlyChurch: false
                                    });
                                 }}
                                 className={`w-full px-4 py-3 rounded-full border text-center transition-all ${
                                    formData.assist && formData.assistChurch
                                       ? 'bg-[#B08D57] border-[#B08D57] text-white'
                                       : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                 }`}
                              >
                                 Iglesia y Recepción
                              </button>
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
                                       <CancelIcon 
                                          onClick={() => removePartnerInput(index)} 
                                          fontSize='small' 
                                          className='text-mustard ml-1 cursor-pointer' 
                                       />
                                    </label>
                                 ))}
                                 {partnerNames.length < 2 && (
                                    <button
                                       className='mt-3 flex items-center gap-2 text-gray-dark text-opacity-50 text-sm font-normal'
                                       onClick={addPartnerInput}
                                    >
                                       <AddCircleIcon fontSize='small' className='text-mustard' />
                                       Agregar acompañante
                                    </button>
                                 )}
                              </div>
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
                                    onClick={ handle Change } 
                                    className='section-input-radio'
                                    />
                                 </label>
                                 <label htmlFor="childrensNotConfirm" className='flex gap-2 cursor-pointer'>No
                                    <input 
                                    type="radio" 
                                    name="dietaryRestrictions" 
                                    id="restrictionsNotConfirm" 
                                    value={ false } 
                                    onClick={ handle Change }
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
                                 onChange={ handle Change } 
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
                                    onChange={ handle Change }
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
                  </form>
               </div>
            </div>

            {/* Footer con botón siempre visible */}
            <div className="sticky bottom-0 bg-white p-6 border-t rounded-b-3xl">
               <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full bg-[#B8860B] text-white py-4 rounded-full text-lg font-medium
                     transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
               >
                  {isLoading ? 'Enviando...' : 'Enviar'}
               </button>
            </div>
         </div>
      </div>
   )
}

export default ModalConfirm