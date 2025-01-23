import AnimatedElement from '../AnimatedElement/AnimatedElement';

const NewGallery = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-6 mt-20">
      <AnimatedElement>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3 hover:scale-105 transition-transform duration-300">Mira nuestras fotos 📸</h2>
          <p className="text-gray-600 mb-4 hover:text-gray-800 transition-colors">
            Haz clic aquí para ver todas las fotos de nuestra boda
          </p>
          <a 
            href="https://photos.app.goo.gl/qwDUQrebGGdXboXR6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue text-white rounded-lg 
                     hover:bg-opacity-90 hover:scale-105 hover:shadow-lg 
                     transform transition-all duration-300 ease-in-out"
          >
            Ver Álbum de Fotos 🤍
          </a>
        </div>
      </AnimatedElement>
    </section>
  );
};

export default NewGallery; 