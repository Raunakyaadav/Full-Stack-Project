'use client'
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const images = ["slide-1.webp","slide-2.webp","slide-3.webp","slide-4.webp"]

function Responsive() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
     autoplay: true,
      autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider  {...settings}>
        {images.map((src,i)=>{
          return(
  <div className="px-3 ">
         <img className="rounded-2xl h-[80%] sm:h-auto" src={src} alt="" />
        </div>
          )
        })}
      
       
     
      </Slider>
    </div>
  );
}

export default Responsive;
