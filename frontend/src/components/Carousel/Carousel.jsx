import './Carousel.css'
import { useState, useEffect } from 'react';

const Carousel = () => {
   const [loadedImages, setLoadedImages] = useState({});

   const imageFormats = {
      1: '.png',
      2: '.png',
      3: '.png',
      4: '.png',
      5: '.png'
   };

   const tryLoadImage = async (index) => {
      const number = String(index).padStart(2, '0');
      const format = imageFormats[index];
      const src = `/assets/photos/img-alcides${number}${format}`;
      
      try {
         const response = await fetch(src);
         if (response.ok) {
            setLoadedImages(prev => ({
               ...prev,
               [index]: src
            }));
         } else {
            console.log(`Error cargando imagen ${src}`);
         }
      } catch (error) {
         console.log(`Error con ${src}:`, error);
      }
   };

   useEffect(() => {
      Array.from({ length: 5 }, (_, i) => i + 1).forEach(tryLoadImage);
   }, []);

   return (
      <section className='
         flex justify-center items-baseline 
         relative 
         w-[450px] h-72 
         mt-32
         lg:w-full lg:h-96 
         lg:mt-40
      '>
         {Object.entries(loadedImages).map(([index, src]) => (
            <img 
               key={index}
               src={src}
               className={`
                  pic${String(index).padStart(2, '0')}
                  w-auto h-full
                  object-cover
                  object-center
                  rounded-lg
                  shadow-lg
                  absolute
               `}
               alt={`Imagen ${index}`}
               style={{
                  maxHeight: '300px',
                  width: 'auto',
                  objectFit: 'cover',
                  zIndex: index === '3' ? 2 : 1
               }}
            />
         ))}
      </section>
   );
};

export default Carousel