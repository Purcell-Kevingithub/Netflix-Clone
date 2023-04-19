import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../css/App.css";
import Movie from "./Movie";


const MySlider = (props) => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    responsive: [
      {
        breakpoint: 980, // tablet breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700, // mobile breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const renderSlides = () =>
    props?.movieArr?.map((movie, index) => (
      <div key={`${index}-${movie.id}`}>
        <Movie movie={movie} />
      </div>
    ));

  return (
    <div className="Slider-container">
      <Slider {...settings}>{renderSlides()}</Slider>
    </div>
  );
};

export default MySlider;
