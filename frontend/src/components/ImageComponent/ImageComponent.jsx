import AnimatedElement from "../AnimatedElement/AnimatedElement"
import './ImageComponent.css'

const ImageComponent = ({ src, alt, margin }) => {
   const getBubbleColors = () => {
      const parentBg = document.querySelector('.bg-blue, .bg-cream, .bg-green');
      if (!parentBg) return ['bubble-cream', 'bubble-blue', 'bubble-gold']; // default colors

      // Retorna un array de tres colores para alternar
      if (parentBg.classList.contains('bg-blue')) return ['bubble-cream', 'bubble-white', 'bubble-gold'];
      if (parentBg.classList.contains('bg-cream')) return ['bubble-blue', 'bubble-white', 'bubble-gold'];
      if (parentBg.classList.contains('bg-green')) return ['bubble-cream', 'bubble-blue', 'bubble-gold'];
      
      return ['bubble-cream', 'bubble-blue', 'bubble-gold'];
   };

   const [primaryColor, secondaryColor, goldColor] = getBubbleColors();

   return (
      <AnimatedElement>
         <div className={`relative flex flex-col items-center ${margin === 'disabled' ? 'mt-1' : 'mt-10'} lg:mt-8`}>
            {/* Burbujas superiores */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <div className="bubble-container bubble-group-1">
                  <div className={`bubble ${goldColor}`}></div>
                  <div className={`bubble ${primaryColor} delay-2`}></div>
               </div>
            </div>

            {/* Imagen central con resplandor */}
            <div className="relative w-32 h-32 flex items-center justify-center my-4 image-container">
               <img 
                  src={src} 
                  alt={alt} 
                  className="w-full h-full object-contain z-10 relative"
               />
               <div className="glow-effect"></div>
            </div>

            {/* Burbujas laterales */}
            <div className="absolute bottom-0 left-0 transform -translate-x-1/2">
               <div className="bubble-container bubble-group-2">
                  <div className={`bubble ${secondaryColor} delay-1`}></div>
               </div>
            </div>

            <div className="absolute bottom-0 right-0 transform translate-x-1/2">
               <div className="bubble-container bubble-group-3">
                  <div className={`bubble ${goldColor}`}></div>
                  <div className={`bubble ${primaryColor} delay-2`}></div>
               </div>
            </div>
         </div>
      </AnimatedElement>
   );
}

export default ImageComponent;