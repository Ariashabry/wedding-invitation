import Arrows from "../components/Arrows/Arrows"
import Button from "../components/Button/Button"
import ButtonGift from "../components/ButtonGift/ButtonGift"
import Carousel from "../components/Carousel/Carousel"
import Countdown from "../components/Countdown/Countdown"
import CurvedBottomSection from "../components/CurvedBottomSection/CurvedBottomSection"
import CurvedTopSection from "../components/CurvedTopSection/CurvedSection"
import ImageComponent from "../components/ImageComponent/ImageComponent"
import InfoSection from "../components/InfoSection/InfoSection"
import MainHeadline from "../components/MainHeadline/MainHeadline"
import Portrait from "../components/Portrait/Portrait"
import Spinner from "../components/Spinner/Spinner"
import { useContext } from "react"
import { ModalContext } from "../context/ModalContext"
import ModalContainer from "../components/ModalContainer/ModalContainer"
import ModalAccounts from "../components/ModalAccounts/ModalAccounts"
import ModalConfirm from "../components/ModalConfirm/ModalConfirm"
import ModalWeather from "../components/ModalWeather/ModalWeather"
import ModalHistory from "../components/ModalHistory/ModalHistory"

import SectionContainer from "../components/SectionContainer/SectionContainer"
import SectionContainerElement from "../components/SectionContainerElement/SectionContainerElement"


const Layout = () => {

   const { modal, confirmationModal, weatherModal, sent, isHistoryModalOpen} = useContext(ModalContext);

   return (
      <div className={` relative flex flex-col items-center overflow-hidden
         ${confirmationModal || weatherModal || modal ? ' h-screen' : 'h-min-screen'} `
      }>

         <ButtonGift />

         {/* Modals --------------------------------------- */}
         <ModalContainer isOpen={ modal }>
            <ModalAccounts />
         </ModalContainer>
         
         <ModalContainer isOpen={ weatherModal }>
            <ModalWeather />
         </ModalContainer>
         
         <ModalContainer isOpen={ confirmationModal }>
            <ModalConfirm />
         </ModalContainer>

         <ModalContainer isOpen={ isHistoryModalOpen }>
            <ModalHistory />
         </ModalContainer>

         {/* 1° Portrait Section --------------------------------------- */}
         <section className="relative flex flex-col items-center w-full h-[100vh] text-sm bg-cream pt-8 px-8 overflow-hidden z-20">
            <Spinner />
            <Portrait />
            <MainHeadline />
            <Arrows />
            <CurvedTopSection bgColor={"bg-blue"} />
            <div className="wave-shape-divider">
               <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
               </svg>
            </div>
         </section>

         {/* 2° Countdown, maps and schelude section --------------------------------------- */}
         <section className="relative flex flex-col items-center justify-center w-full bg-blue h-fit px-8 pb-4 z-30
            lg:px-8 lg:pb-20">

            <Countdown />
            <Button
               buttonText={ 'Agendar' }
               colorCode={"bg-green"}
               url={'calendar'}
            />

            {/* Church and party container ---------- */}
            <SectionContainer>

               {/* Church section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/church-icon.png"}
                     alt={"church icon"}
                  />
                  <InfoSection
                     header={"Ceremonia | 14:00 pm"}
                     subtitle={"Iglesia San Martin de Porres 💒"}
                     lineColorCode={"border-green"}
                  >
                     Av. Roca y Coronado
                  </InfoSection>
                  <Button
                     buttonText={"🗺️ ¿Cómo llego? 📍"}
                     colorCode={"bg-green"}
                     url={'church'}
                  />
               </SectionContainerElement>
            
               {/* Salon de eventos ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/music-icon.png"}
                     alt={"Icono música"}
                  />
                  <InfoSection
                     header={"Fiesta | 19:00 pm"}
                     subtitle={"🎶 Recepción Social 🕺💃"}
                     lineColorCode={"border-green"}
                  >
                     Av. Radial 13, Calle 5
                  </InfoSection>
                  <Button
                     buttonText={"🗺️ ¿Cómo llego? 📍"}
                     colorCode={"bg-green"}
                     url={'salon'}
                  />
               </SectionContainerElement>

               {/* Finca donde sera la fiesta ---------- */}
                              {/* <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/music-icon.png"}
                     alt={"Icono música"}
                  />
                  <InfoSection
                     header={"Fiesta del segundo dia!"}
                     subtitle={"La fiesta continua en la quinta ... 🕺"}
                     lineColorCode={"border-green"}
                  >
                     direccion de la finca                  </InfoSection>
                  <Button
                     buttonText={"🗺️ ¿Cómo llego? 📍"}
                     colorCode={"bg-green"}
                     url={'quinta'}
                  />
               </SectionContainerElement> */}

               {/* Present section (only Desktop) ----------
               <SectionContainerElement mobileView={ 'off' }>
                  <ImageComponent
                     src={"/assets/images/plane-icon.png"}
                     alt={"plane icon"}
                  />
                  <InfoSection
                     header={"¿Qué les regalo?"}
                     lineColorCode={"border-green"}
                  >
                     ¿El mejor regalo? tu presencia, pero si querés cumplirnos un sueño hacé click.

                  </InfoSection>
                  <Button
                     buttonText={'Ver información'}
                     colorCode={'bg-green'}
                     url={false}
                     action={'openInfoModal'}
                  />
               </SectionContainerElement> */}


            </SectionContainer>

         </section>

         {/* 3° Music & clothes section --------------------------------------- */}
         <section className="relative flex flex-col items-center w-full h-fit text-sm bg-green px-8 pt-20 pb-32 z-20
            lg:pb-40">
            <CurvedBottomSection bgColor={"bg-blue"} />

            {/* Dress and music container ---------- */}
            <SectionContainer>

               {/* Dress section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/dress-icon.png"}
                     alt={"Icono vestimenta"}
                     margin={"disabled"}
                  />
                  <div className="flex flex-col items-center">
                     <InfoSection
                        header={'¿Qué puedo vestir?'}
                        subtitle={'Código de Vestimenta'}
                        lineColorCode={'border-mustard'}
                     >
                        ✨ Formal para la ceremonia y elegante para la recepción.
                        Elige lo que te haga sentir cómodo/a y espectacular. 👗🤵🎉
                     </InfoSection>
                     <Button
                        buttonText={'Mirá el clima'}
                        colorCode={'bg-mustard'}
                        action={'openWeatherModal'}
                     />
                  </div>
               </SectionContainerElement>

               {/* Music section ---------- */}
               {/* <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/dance-icon.png"}
                     alt={"Icono baile"}
                  />
                  <InfoSection
                     header={"#ModoDJ"}
                     lineColorCode={'border-mustard'}
                  >
                     Ayudanos a armar la lista y no dejar afuera ningún tema de esos que te hacen darlo todo.
                  </InfoSection>
                  <Button
                     buttonText={"Añadir tu tema"}
                     widthClass={"w-64"}
                     colorCode={"bg-mustard"}
                     url={'spotify'}
                  />
               </SectionContainerElement> */}

               {/* HISTORY section ---------- */}
               <SectionContainerElement>
                  <ImageComponent
                     src={"/assets/images/heart-icon.png"}
                     alt={"Icono historia"}
                     margin={"disabled"}
                  />
                  <div className="flex flex-col items-center">
                     <InfoSection
                        header={'Nuestra historia ❤️💑'}
                        subtitle={''}
                        lineColorCode={'border-mustard'}
                     >
                        Cada gran amor tiene un inicio especial. 
                        ❤️ Descubre cómo empezó el nuestro y acompáñanos en este recorrido lleno de momentos inolvidables.
                         ¡Te encantará conocer más! 🌟
                     </InfoSection>
                     <Button
                        buttonText={'Conoce nuestra historia'}
                        colorCode={'bg-mustard'}
                        action={'openHistoryModal'}
                     />
                  </div>
               </SectionContainerElement>

               {/* Confirmation section (only Desktop) ---------- */}
               <SectionContainerElement mobileView={ 'off' }>
                  <ImageComponent
                     src={"/assets/images/confirm-icon.png"}
                     alt={"Icono confimación"}
                     margin={"disabled"}
                  />
                  <InfoSection
                     header={'¿Asistiras a nuestra boda?'}
                     lineColorCode={'border-blue'}
                  >
                     Esperamos que puedas acompañarnos.😀

                  </InfoSection>
                  <Button
                     buttonText={'Confirmar asistencia'}
                     
                     colorCode={'bg-blue'}
                     action={'openConfirmationModal'}
                  />
               </SectionContainerElement>

            </SectionContainer>

            <CurvedTopSection bgColor={"bg-cream"} />
         </section>

         {/* 4° Confirmation section --------------------------------------- */}
         <section className="relative flex flex-col items-center h-fit w-full text-sm bg-cream px-8 z-20
            sm:pb-24 md:pb-0 md:px-0">

            {/* Confirmation and present container ---------- */}
            <SectionContainer>
                {/* Present section ---------- */}
                {/* Solo es visible desde una computadora, no desde movil
                desktopView={ 'off' } */}
                <SectionContainerElement desktopView={ 'off' }>
                  <ImageComponent
                     src={"/assets/images/plane-icon.png"}
                     alt={"plane icon"}
                  />
                  <InfoSection
                     header={"Regalo de Corazón ❤️🎁"}
                     lineColorCode={"border-mustard"}
                     textColorCode={"text-gray-dark"}
                  >
Tu presencia es nuestro mayor regalo. 💕 Si deseas contribuir, puedes hacerlo con una donación para ayudarnos a comenzar esta nueva etapa. ¡Gracias por ser parte de nuestra historia! 🎁💌

                  </InfoSection>
                  <Button
                     buttonText={'Ver información'}
                     
                     colorCode={'bg-green'}
                     url={false}
                     action={'openInfoModal'}
                  />
               </SectionContainerElement>

               {/* Confirmation section ---------- */}
               <SectionContainerElement desktopView={ 'off' }>
                  <ImageComponent
                     src={"/assets/images/confirm-icon.png"}
                     alt={"Icono confimación"}
                     margin={"disabled"}
                  />
                  <InfoSection
                     header={'¿Asistiras a nuestra boda?'}
                     lineColorCode={'border-blue'}
                     textColorCode={'text-gray-dark'}
                  >
                     Esperamos que puedas acompañarnos.😀

                  </InfoSection>
                  <Button
                     buttonText={ sent ? 'Formulario enviado' : 'Confirmar asistencia' }
                     disabled={ sent }
                     colorCode={'bg-green'}
                     action={'openConfirmationModal'}
                  />
               </SectionContainerElement>

              

            </SectionContainer>

            <section className="hidden lg:flex lg:w-full lg:justify-center">
               <Carousel />
            </section>


         </section>

         {/* 5° Carousel section --------------------------------------- */}
         <section className="relative flex justify-center items-end bg-cream w-full z-20
            sm:hidden">
            <Carousel />
         </section>


      </div>
   );
}

export default Layout