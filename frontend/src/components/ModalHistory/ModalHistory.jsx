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
              En el año 2010, en los pasillos de una universidad llena de sueños y esperanzas, dos personas cruzaron miradas por primera vez. Aunque nunca fueron compañeros de clase, ella estudiando medicina y él ingeniería de sistemas, el destino encontró la manera de unir sus caminos. Sus primeros encuentros fueron casuales, pero con el tiempo, lo que parecía una coincidencia se transformó en una conexión especial, una que no podía ser ignorada.
            </p>
            <p className='italic text-base'>
              Con los años, su relación floreció. Entre risas, charlas interminables y momentos compartidos, construyeron un vínculo marcado por el respeto, el apoyo mutuo y el amor incondicional. Una pasión que los une es su amor por el deporte competitivo. Ella, como una dedicada atleta de fondo, conquistando distancias de 10K y 21K, y él, como ciclista apasionado, enfrentando kilómetros sobre dos ruedas. Juntos, han aprendido a acompañarse y alentarse en su "locura" por el deporte, celebrando cada meta alcanzada y cada desafío enfrentado.
            </p>
            <p className='italic text-base'>
              En el 2020, cuando el mundo enfrentó desafíos inesperados, decidieron dar un paso más y comenzar a convivir. Fue en esos días de incertidumbre que descubrieron la verdadera fuerza de su amor. Aprendieron a disfrutar de los pequeños momentos, a encontrar alegría en lo cotidiano y a construir una vida basada en la comprensión y el compromiso. Cada día fue una lección, un recordatorio de que, juntos, podían superar cualquier adversidad.
            </p>
            <p className='italic text-base'>
              Hoy, en el 2025, están listos para dar el siguiente gran paso: unirse en matrimonio. Este momento celebra no solo el amor que comparten, sino también el crecimiento, las experiencias vividas y los sueños que aún están por alcanzar.
            </p>
            <p className='italic text-base'>
              Gracias por acompañarlos en este viaje. Esta es una historia de amor que inspira, un viaje que comenzó en los pasillos de una universidad y que hoy continúa con la promesa de una vida juntos. Su historia apenas comienza.
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
