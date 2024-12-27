import './Button.css'
import AnimatedElement from "../AnimatedElement/AnimatedElement"
import { ModalContext } from "../../context/ModalContext" // de context/ModalContext
import { useContext } from "react"

const Button = ( { buttonText, colorCode, url, action, disabled } ) => {
   
   const { setModal, setConfirmationModal, setWeatherModal, sent, setHistoryModal } = useContext(ModalContext);

   const handleForm = () => {
      switch(action) {
         case 'openWeatherModal':
            setWeatherModal(true);
            break;
         case 'openHistoryModal':
            setHistoryModal(true);
            break;
         case 'openConfirmationModal':
            setConfirmationModal(true);
            break;
         case 'openInfoModal':
            setModal(true);
            break;
         // default:
         //    break;
      }
   };

   const handleUrl = (url) => {
      const urlMapping = {
         calendar: 'https://calendar.app.google/QjaYzfVTPurjNd3s6',
         // url del salon donde sera la fiest
         salon: 'https://maps.app.goo.gl/fLbBVkszwHn63fHz9',
         // url san martin de porres
         church: 'https://www.google.com/maps/place/Parroquia+San+Mart%C3%ADn+de+Porres/@-17.784837,-63.2002768,20.22z/data=!4m6!3m5!1s0x93f1e8024cdb0e57:0x6dea8c05aefd36be!8m2!3d-17.7848525!4d-63.2003304!16s%2Fg%2F11c55vwmyx?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D',
         
      };
      if (url in urlMapping) {
         setTimeout(() => {
            window.location.href = urlMapping[url];
         }, 500);
      }
   };

   return (
      <AnimatedElement>
         <button 
            onClick={ url ? () => handleUrl(url) : handleForm }
            disabled={ sent }
            type="button" 
            className={` unselectable w-64 text-lg active:bg-green-dark
            ${colorCode}
            ${ colorCode === 'bg-mustard' ? 'btn-special' : 'btn-normal' }  `}
         >
            { buttonText }
         </button>
      </AnimatedElement>
   )
}

export default Button