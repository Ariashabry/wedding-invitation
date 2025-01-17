import React from 'react';
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

const TimelineEvent = ({ time, title, icon, description, location, locationUrl, isLast }) => (
  <div className="relative mb-16 sm:mb-20 last:mb-8">
    {/* Vertical line for mobile */}
    {!isLast && (
      <div className="absolute left-4 top-14 w-[2px] h-[calc(100%+2rem)] bg-gradient-to-b from-mustard via-mustard/50 to-transparent sm:hidden" />
    )}

    <div className="flex flex-col sm:flex-row gap-4">
      {/* Mobile layout container */}
      <div className="flex items-start gap-4 sm:hidden">
        {/* Dot indicator for mobile */}
        <div className="relative z-10 mt-1">
          <div className="w-8 h-8 rounded-full bg-mustard/10 backdrop-blur-sm flex items-center justify-center">
            <div className="w-2 h-2 bg-mustard rounded-full"></div>
          </div>
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
      <div className="hidden sm:flex items-start gap-4">
        {/* Time column */}
        <div className="text-right w-[120px] pt-3">
          <p className="font-poppins font-semibold text-white">{time}</p>
          <p className="text-sm text-white/80 font-poppins mt-1">{title}</p>
        </div>

        {/* Timeline dot */}
        <div className="relative flex items-center justify-center w-[20px] pt-4">
          <div className="absolute w-0.5 bg-mustard h-[calc(100%+5rem)] top-8"></div>
          <div className="w-3 h-3 bg-mustard rounded-full z-10 transform rotate-45"></div>
        </div>

        {/* Icon and description */}
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
);

const Timeline = () => {
  const events = [
    {
      time: "2:00 PM",
      title: "CEREMONIA RELIGIOSA",
      icon: <Church className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Ceremonia en la Parroquia San Martín de Porres. Su presencia es muy importante para nosotros 💒",
      location: "Ver ubicación de la Parroquia",
      locationUrl: "https://maps.app.goo.gl/9RoxJZ9KR9PGB97dA"
    },
    {
      time: "3:00 PM - 5:30 PM",
      title: "SESIÓN DE FOTOS",
      icon: <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Tiempo para capturar recuerdos inolvidables. ¡Disfruten de un breve descanso! 📸"
    },
    {
      time: "5:30 PM",
      title: "RECEPCIÓN Y BIENVENIDA",
      icon: <UsersThree className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "¡Los esperamos en el Salón de eventos Elianne 2 para dar inicio a la celebración! 🎉",
      location: "Ver ubicación del Salón",
      locationUrl: "https://maps.app.goo.gl/fLbBVkszwHn63fHz9"
    },
    {
      time: "6:00 PM - 6:45 PM",
      title: "CEREMONIA CIVIL",
      icon: <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Ceremonia civil donde nos uniremos legalmente en matrimonio. Agradecemos su compañía ✨"
    },
    {
      time: "6:45 PM",
      title: "BAILE DE LOS NOVIOS",
      icon: <PersonSimpleWalk className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Show especial de los novios con canciones seleccionadas. ¡Nuestro primer baile como esposos! 💃"
    },
    {
      time: "7:00 PM",
      title: "VALS PRINCIPAL",
      icon: <MusicNotes className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Disfrutemos del elegante vals con nuestros padres y seres queridos, celebrando este momento especial 🎵"
    },
    {
      time: "7:15 PM",
      title: "BRINDIS DE HONOR",
      icon: <Wine className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Levantaremos nuestras copas para agradecerles por su amor y apoyo 🥂"
    },
    {
      time: "7:30 PM",
      title: "PALABRAS DE AGRADECIMIENTO",
      icon: <Microphone className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Un momento para expresar nuestro agradecimiento a familiares y amigos 💝"
    },
    {
      time: "7:45 PM",
      title: "BAILE DE LA CUECA",
      icon: <PersonSimpleWalk className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Disfrutemos juntos del tradicional baile de la cueca 🎊"
    },
    {
      time: "8:00 PM",
      title: "CENA",
      icon: <ForkKnife className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Compartiremos una deliciosa cena y disfrutaremos de momentos especiales juntos 🍽️"
    },
    {
      time: "9:00 PM",
      title: "T'IPACU",
      icon: <HandHeart className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Les invitamos a participar en la tradición del T'ipacu, un gesto simbólico que celebra nuestro nuevo comienzo 🙏"
    },
    {
      time: "9:15 PM",
      title: "FIESTA",
      icon: <Confetti className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "¡Prepárense para desatar la locura! La pista de baile estará lista, así que a bailar, reír y disfrutar hasta que salga el sol 🎉"
    },
    {
      time: "3:00 AM",
      title: "CIERRE Y DESPEDIDA",
      icon: <Moon className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Agradecemos su presencia en este día tan especial. ¡Hasta pronto! ✨"
    }
  ];

  return (
    <FeatureWrapper featureKey="TIMELINE">
      <div className="w-full max-w-4xl mx-auto">
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

export default Timeline; 