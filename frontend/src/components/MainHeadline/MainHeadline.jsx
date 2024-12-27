const MainHeadline = () => {
   return (
      <section className="z-50 flex flex-col items-center gap-5 absolute inset-0 mx-auto top-[40%] lg:top-[35%]">
         <img src="/assets/images/header-title-mobile.png" alt="" className="w-52 mb-2 lg:w-64" />
         
         {/* <img src="/assets/images/names.png" alt="" className="w-72 lg:w-96"/> */}
         <h1 className="text-center text-white text-4xl font-bold drop-shadow-lg lg:text-5xl">
            Alcides & Nilda
         </h1>
 {/* <hr className="w-44 border-1 border-mustard " /> */}
         
      </section>
   )
}

export default MainHeadline