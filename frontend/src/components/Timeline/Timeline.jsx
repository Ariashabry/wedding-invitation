import React, { useEffect, useState, memo } from 'react';
import FeatureWrapper from '../FeatureWrapper/FeatureWrapper';
import { 
  Church, 
  Camera, 
  Wine,
  HandHeart,
  Microphone,
  MusicNotes,
  PersonSimpleWalk,
  ForkKnife,
  Gift,
  Confetti,
  Moon,
  MapPin,
  Handshake,
  UsersThree
} from "@phosphor-icons/react";
import { useInView } from 'react-intersection-observer';

// Memoizar el componente TimelineEvent para evitar re-renders innecesarios
const TimelineEvent = memo(({ time, title, icon, description, location, locationUrl, isLast, count, transitionText }) => (
  <div className="relative mb-24 sm:mb-20 last:mb-8">
    {/* Vertical line for mobile with transition text */}
    {!isLast && (
      <div className="relative">
        {/* Línea vertical con gradiente y patrón punteado */}
        <div className="absolute left-4 top-14 w-[2px] h-[calc(100%+7.5rem)] bg-gradient-to-b from-mustard via-mustard/50 to-transparent sm:hidden
          after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full 
          after:bg-gradient-to-b after:from-transparent after:via-mustard/50 after:to-transparent 
          after:bg-[length:1px_8px] after:bg-repeat-y after:animate-flowDown">
          
          {/* Texto de transición integrado con la línea */}
          {transitionText && (
            <div className="absolute -left-8 top-[calc(100%-0.5rem)] 
              text-mustard text-sm italic font-medium whitespace-nowrap sm:hidden">
              {transitionText}
            </div>
          )}
        </div>
      </div>
    )}

    <div className="flex flex-col sm:flex-row gap-4">
      {/* Mobile layout container */}
      <div className="flex items-start gap-4 sm:hidden">
        {/* Dot indicator for mobile */}
        <div className="relative z-10 mt-1">
          <div className="w-8 h-8 rounded-full bg-mustard/10 backdrop-blur-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-mustard rounded-full"></div>
          </div>
          {count && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-mustard rounded-full flex items-center justify-center">
              <span className="text-xs text-black font-semibold">{count}</span>
            </div>
          )}
        </div>

        {/* Mobile time and content */}
        <div className="flex-1">
          <div className="flex flex-col mb-2">
            <p className="font-poppins font-semibold text-white text-sm">{time}</p>
            <p className="text-sm text-white/80 font-poppins">{title}</p>
          </div>
          <p className="text-sm text-white/80 font-poppins mb-2">
            {description}
          </p>
          {locationUrl && (
            <a 
              href={locationUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-mustard hover:text-mustard/80 transition-colors text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </a>
          )}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-start gap-6">
        {/* Time column */}
        <div className="text-right w-[140px] pt-3">
          <p className="font-poppins font-semibold text-white whitespace-nowrap">{time}</p>
          <p className="text-sm text-white/80 font-poppins mt-1">{title}</p>
        </div>

        {/* Timeline section with dot and line */}
        <div className="relative flex flex-col items-center">
          {/* Línea vertical con gradiente y patrón punteado */}
          <div className="relative flex items-center justify-center w-[20px] pt-4">
            <div className="absolute w-0.5 bg-gradient-to-b from-mustard via-mustard to-mustard/30 h-[calc(100%+3.5rem)] top-8 
              after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-full 
              after:bg-gradient-to-b after:from-transparent after:via-mustard/50 after:to-transparent 
              after:bg-[length:1px_8px] after:bg-repeat-y after:animate-flowDown"></div>
            
            {/* Punto dorado */}
            <div className="w-3 h-3 bg-mustard rounded-full z-10 transform rotate-45"></div>
            
            {/* Contador (si existe) */}
            {count && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-mustard rounded-full flex items-center justify-center">
                <span className="text-xs text-black font-semibold">{count}</span>
              </div>
            )}
          </div>

          {/* Texto de transición separado */}
          {transitionText && !isLast && (
            <div className="absolute whitespace-nowrap top-[calc(100%+6.5rem)] left-1/2 -translate-x-1/2 
              text-mustard text-sm italic font-medium">
              {transitionText}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="flex items-start gap-4 flex-1 pt-2">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 
            bg-mustard/10 rounded-full backdrop-blur-sm">
            {icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/80 font-poppins flex-1 pr-4 lg:pr-8 pt-2 mb-2">
              {description}
            </p>
            {locationUrl && (
              <a 
                href={locationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-mustard hover:text-mustard/80 transition-colors text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
));

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px'
  });

  const events = [
    {
      time: "2:00 PM",
      duration: "1 hora",
      title: "CEREMONIA RELIGIOSA",
      icon: <Church className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Ceremonia en la Parroquia San Martín de Porres. Su presencia es muy importante para nosotros 💒",
      location: "Ver ubicación de la Parroquia",
      locationUrl: "https://maps.app.goo.gl/9RoxJZ9KR9PGB97dA",
      transitionText: "receso y sesion de fotos"
    },
    {
      time: "5:30 PM",
      duration: "30 minutos",
      title: "RECEPCIÓN Y BIENVENIDA",
      icon: <UsersThree className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "¡Los esperamos en el Salón de eventos Elianne 2 para dar inicio a la celebración! 🎉",
      location: "Ver ubicación del Salón",
      locationUrl: "https://maps.app.goo.gl/tyGvikCqBoyk3gKb9",
      transitionText: "Welcome!!!!!"
    },
    {
      time: "6:00 PM",
      duration: "1 hora",
      title: "CEREMONIA CIVIL",
      icon: <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Ceremonia civil donde nos uniremos legalmente en matrimonio. Agradecemos su compañía ✨",
      transitionText: "Bendición Ceremonial"
    },
    {
      time: "7:00 PM",
      duration: "15 minutos",
      title: "BAILE DE LOS NOVIOS",
      icon: <PersonSimpleWalk className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Show especial de los novios con canciones seleccionadas. ¡Nuestro primer baile como esposos! 💑",
      transitionText: ""
    },
    {
      time: "7:15 PM",
      duration: "15 minutos",
      title: "VALS PRINCIPAL",
      icon: <MusicNotes className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Disfrutemos del elegante vals con nuestros padres y seres queridos, celebrando este momento especial 🎵",
      transitionText: ""
    },
    {
      time: "7:30 PM",
      duration: "15 minutos",
      title: "PALABRAS DE AGRADECIMIENTO",
      icon: <Microphone className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Un momento para expresar nuestro agradecimiento a familiares y amigos 💝",
      transitionText: ""
    },
    {
      time: "7:45 PM",
      duration: "15 minutos",
      title: "BRINDIS DE HONOR",
      icon: <Wine className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Levantaremos nuestras copas para agradecerles por su amor y apoyo 🥂",
      transitionText: ""
    },
    {
      time: "8:00 PM",
      duration: "45 minutos",
      title: "BAILE DE LA CUECA",
      icon: <PersonSimpleWalk className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "¡A mover los pañuelos! 🤠",
      transitionText: ""
    },
    {
      time: "8:45 PM",
      duration: "40 minutos",
      title: "CENA",
      icon: <ForkKnife className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Compartiremos una deliciosa cena 🍽️",
      transitionText: ""
    },
    {
      time: "9:20 PM",
      duration: "15 minutos",
      title: "T'IPACU",
      icon: <HandHeart className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Les invitamos a participar en la tradición del T'ipacu, un gesto simbólico que celebra nuestro nuevo comienzo 🙏",
      transitionText: ""
    },
    {
      time: "10:00 PM",
      duration: "6 horas",
      title: "FIESTA",
      icon: <Confetti className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "¡Prepárense para desatar la locura! La pista de baile estará lista, así que a bailar, reír y disfrutar hasta que salga el sol 🎉",
      transitionText: "Lanzamiento de bouquet"
    },
    {
      time: "4:00 AM",
      title: "CIERRE Y DESPEDIDA",
      icon: <Moon className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Agradecemos su presencia en este día tan especial. ¡Hasta pronto! ✨"
    }
  ];

  useEffect(() => {
    if (inView) {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }
  }, [inView]);

  useEffect(() => {
    // Manejar el scroll cuando se carga la página si hay un hash en la URL
    if (window.location.hash === '#cronograma') {
      const element = document.getElementById('cronograma');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <FeatureWrapper featureKey="TIMELINE">
      <div 
        ref={ref}
        id="cronograma" 
        className={`w-full max-w-4xl mx-auto scroll-mt-20 transition-opacity duration-500 ease-in-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Título con contenedor dedicado y padding simétrico */}
        <div className="w-full py-8 sm:py-12 px-4 md:px-8">
          <h1 className="text-3xl sm:text-4xl font-poppins text-white text-center font-semibold tracking-wide">
            CRONOGRAMA
          </h1>
        </div>

        {/* Contenedor de eventos con padding propio */}
        <div className="relative px-4 md:px-8">
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              {...event}
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </div>
    </FeatureWrapper>
  );
};

export default memo(Timeline); 