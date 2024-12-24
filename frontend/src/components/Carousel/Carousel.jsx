import './Carousel.css'
const Carousel = () => {

   return (
      <section className='flex justify-center items-baseline relative z-40 w-[450px] h-72 pt-12 overflow-hidden
         lg:w-full lg:h-96 lg:pt-6 '>
         < img src="/assets/photos/img-alcides.jpg" className="pic01"/>
         < img src="/assets/photos/img-alcides.jpg" className="pic02"/>
         < img src="/assets/photos/img-alcides.jpg" className="pic03"/>
         < img src="/assets/photos/img-alcides.jpg" className="pic04"/>
         < img src="/assets/photos/img-alcides.jpg" className='pic05'/>
      </section>
   )
}

export default Carousel