import React from 'react';
import FeatureWrapper from '../FeatureWrapper/FeatureWrapper';
import { 
  Church, 
  Camera, 
  Certificate, 
  Confetti, 
  Wine, 
  ForkKnife, 
  MusicNotes, 
  Cake,
  MapPin 
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
      description: "Estaremos en la Iglesia San Martin de Porres esperándolos 💒",
      location: "Ver ubicación de la Parroquia",
      locationUrl: "https://maps.app.goo.gl/9RoxJZ9KR9PGB97dA"
    },
    {
      time: "3:00 PM - 5:30 PM",
      title: "SESION DE FOTOS",
      icon: <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Estaremos capturando momentos con ustedes 📸"
    },
    {
      time: "5:30 PM",
      title: "BODA CIVIL",
      icon: <Certificate className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Los esperamos en el Salón de eventos Elianne 2 🎉",
      location: "Ver ubicación del Salón",
      locationUrl: "https://maps.app.goo.gl/fLbBVkszwHn63fHz9"
    },
    {
      time: "6:00 PM",
      title: "PROGRESO...",
      icon: <Confetti className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Estaremos preparando sorpresas ✨"
    },
    {
      time: "7:00 PM",
      title: "PROGRESO...",
      icon: <Wine className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Seguiremos celebrando juntos 🎊"
    },
    {
      time: "8:00 PM",
      title: "PROGRESO...",
      icon: <ForkKnife className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Los esperamos para más momentos especiales 🌟"
    },
    {
      time: "9:00 PM",
      title: "PROGRESO...",
      icon: <MusicNotes className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Continuaremos la celebración con ustedes 💫"
    },
    {
      time: "10:00 PM",
      title: "PROGRESO...",
      icon: <Cake className="w-7 h-7 sm:w-8 sm:h-8 text-white" weight="fill" />,
      description: "Estaremos disfrutando juntos ✨"
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