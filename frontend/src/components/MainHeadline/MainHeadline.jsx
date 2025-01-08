const MainHeadline = () => {
   return (
      <section className="z-50 flex flex-col items-center gap-5 absolute inset-0 -ml-0.125 mx-auto top-[12%] lg:top-[8%] transform rotate-[8deg]">
         <img src="/assets/images/header-title-mobile.png" alt="" className="w-52 mb-2 lg:w-64" />
         
         <h1 className="text-center text-white text-4xl font-bold drop-shadow-lg lg:text-5xl">
            Alcides & Nilda
         </h1>
         <hr className="w-44 border-1 border-mustard" />
         <h2 className="text-center text-white text-2xl drop-shadow-lg mt-2 lg:text-3xl">
            25 de Enero 2025
         </h2>
      </section>
   )
}

export default MainHeadline