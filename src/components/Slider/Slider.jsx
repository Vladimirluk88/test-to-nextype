import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Slider.scss";
import Preloader from "../Preloader/Preloader";

const Slide = ({ element }) => {
    let [showSlideImg, setShowSlideImg] = useState(true);
    return (
        <div
            key={element.toString()}
            className="Slide keen-slider__slide"
            style={{ maxWidth: 320, minWidth: 320 }}
        >
            {showSlideImg ? (
                <a href={element.url}>
                    <img src={element.image} alt="slide" />
                </a>
            ) : (
                <></>
            )}
            <div
                className="Slide__description"
                onClick={() => {
                    setShowSlideImg((tempShowSlide) =>
                        setShowSlideImg(!tempShowSlide)
                    );
                }}
                style={showSlideImg ? {} : { "overflow-y": "scroll" }}
            >
                <div className="Slide__description-text">
                    <span>{element.description}</span>
                    {showSlideImg ? (
                        <div className="Slide__description-gradient"></div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="Slide__tags">
                    {element.tags.map((tag) => {
                        return <a href="/">{tag.name} </a>;
                    })}
                </div>
            </div>
        </div>
    );
};

const ElementsSlider = ({ sliderElements }) => {
    return (
        <>
            {sliderElements.length !== undefined ? (
                <div className="Slider__wrapper">
                    <Swiper
                        spaceBetween={16}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            480: {
                                slidesPerView: 1.2,
                                spaceBetween: 20,
                                centeredSlides: false,
                                centerInsufficientSlides: true,
                            },
                            680: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            980: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1320: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {sliderElements.map((element) => {
                            return (
                                <SwiperSlide>
                                    <Slide element={element} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                <Preloader />
            )}
        </>
    );
};

export default ElementsSlider;