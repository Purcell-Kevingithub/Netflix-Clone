import React from "react";
import "../css/App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Movie from "./Movie";

import Slider from "react-slick";

const MySlider = (props) => {
  const renderSlides = () =>
      props.movieArr.map((movie, index) => (
      <div key={`${index}-${movie.id}`}>
        <Movie movie={movie} num={`${index}-${movie.id}`} />
      </div>
    ));

  return (
    <div className="Slideyoparent">
      <div className="Slideyo">
        <Slider dots={false} slidesToShow={6} slidesToScroll={4}>{renderSlides()}</Slider>
      </div>
    </div>
  );
}

export default MySlider;