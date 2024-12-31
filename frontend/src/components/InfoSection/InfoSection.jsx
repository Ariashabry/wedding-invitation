import React from 'react'

const InfoSection = ( { header, subtitle, children, lineColorCode, textColorCode } ) => {
   const isLongHeader = header.includes('Ceremonia') || header.includes('Boda Civil');

   return (
      <div className="flex flex-col items-center gap-2 w-full">
         <h2 className={`
            font-semibold text-center text-white
            ${isLongHeader 
               ? 'text-sm sm:text-base md:text-lg max-w-[280px] break-words whitespace-normal' 
               : 'text-base sm:text-lg md:text-xl'}
            ${textColorCode}
         `}>
            {header}
         </h2>
         
         {subtitle && (
            <h3 className="text-center text-white">
               {subtitle}
            </h3>
         )}

         <div className={`w-12 border-t-2 ${lineColorCode}`}></div>

         <p className="text-center text-white">
            {children}
         </p>
      </div>
   );
};

export default InfoSection