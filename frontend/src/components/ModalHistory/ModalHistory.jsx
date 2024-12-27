import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

const ModalHistory = () => {
  const { isHistoryModalOpen, setHistoryModal } = useContext(ModalContext);

  if (!isHistoryModalOpen) return null;

  return (
    <div className="flex flex-col w-11/12 h-full overflow-y-scroll rounded-md shadow-md
         md:w-[640px] md:h-5/6 md:self-center
         lg:w-[720px] ">

      <header className="relative flex flex-col items-center justify-start gap-2 w-full rounded-t-md
            bg-[url('/assets/backgrounds/cbu-header-vertical.png')] bg-no-repeat bg-cover bg-bottom ">
        <div className="h-[150px] lg:h-[200px] flex pt-[4vh]">
          <h2 className="text-2xl font-semibold text-center text-white z-50
                  lg:text-3xl">
            Nuestra Historia
          </h2>
        </div>
        <img 
          onClick={() => setHistoryModal(false)}
          src="./assets/images/btn-close.png" 
          alt=" Boton cerrar " 
          className="absolute top-4 right-4 h-10 cursor-pointer rounded-md z-50
                  transition-all delay-50 duration-150 hover:cursor-pointer hover:scale-90 hover:drop-shadow-md hover:rotate-90" 
        />
        <img src="./assets/images/weather-header-pieces-03.png" alt="Gift animation" className="h-16 absolute -bottom-4 right-5 jumping-element lg:h-20 lg:-bottom-4 lg:right-12" />
        <img src="./assets/images/weather-header-pieces-01.png" alt="Star animation" className="h-6 absolute top-2 left-12 jumping-element-reverse lg:h-12 lg:top-5 lg:left-20" />
        <img src="./assets/images/cbu-header-pieces-06.png" alt="Coins animation" className="h-4 absolute top-16 left-2 jumping-element-reverse lg:h-6 lg:top-16 lg:left-12" />
        <img src="./assets/images/weather-header-pieces-02.png" alt="" className="h-12 absolute -bottom-2 left-5 jumping-element lg:h-16 lg:-bottom-2 lg:left-10" />
      </header>

      <main className='flex flex-col items-center gap-8 grow bg-cream p-6 text-gray-dark text-sm'>
        <article className="flex flex-col gap-2 w-full">
          <section className="flex items-center gap-2 mb-4">
            <h2 className='font-semibold text-lg'>La Historia de Alcides & Nilda</h2>
          </section>
          <div className='flex flex-col flex-wrap gap-2'>
            <p className='italic text-base'>
              Alcides y Nilda comparten una pasión por el deporte. Alcides es un amante del ciclismo, mientras que Nilda encuentra su alegría en el atletismo. A pesar de sus diferentes disciplinas, ambos comparten el espíritu competitivo y la dedicación que estos deportes requieren.
            </p>
            <p className='italic text-base'>
              Su historia comenzó en su etapa universitaria, cuando sus caminos se cruzaron por casualidad. Desde ese momento, se convirtieron en compañeros inseparables, tanto en la vida como en sus respectivas pasiones.
            </p>
            <p className='italic text-base'>
              Nilda siempre ha estado al lado de Alcides en sus competencias de ciclismo, brindándole apoyo incondicional y celebrando cada logro. De la misma forma, Alcides está ahí para animarla cuando ella participa en sus carreras, demostrando que el amor verdadero también es trabajo en equipo.
            </p>
            <p className='italic text-base'>
              Después de más de siete años juntos, su amor sigue creciendo, construyendo una relación basada en la confianza, el respeto y el apoyo mutuo. Hoy celebran su historia de amor junto a todos ustedes, sus amigos y familia, quienes han sido testigos de esta bella unión.
            </p>
            <p className='italic text-base'>
              Gracias por acompañarlos en este día tan especial y ser parte de este nuevo capítulo en su vida juntos.
            </p>
            <div className="flex justify-center mt-4">
              <img src="./assets/photos/img-alcides04.jpg" alt="Alcides y Nilda" className="rounded-lg shadow-lg max-w-full h-auto" />
            </div>
          </div>
        </article>
      </main>

      <footer className='h-[8vh] bg-green flex flex-col items-center justify-center rounded-b-md'>
        <div className="w-full border-t border-white my-2"></div>
        <p className="text-white text-lg font-serif italic">A & N</p>
        <div className="w-full border-t border-white my-2"></div>
      </footer>

    </div>
  );
};

export default ModalHistory;
