import React, { useContext, useEffect, useState } from "react";
import { default as Swipe, Navigation, Controller } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import PersonSlider from "./PersonSlider";
import { Photo } from "../../types/family";
import arrow from "../../icons/arrow.svg";
import { NodeContext } from "../../App";
import "swiper/css";

import styles from "./styles.module.scss";
import Flipcard from "../Flipcard";

const SliderPhoto = ({
  src,
  backSideImg,
}: {
  src: string | undefined;
  backSideImg: string | undefined;
}) => {
  return (
    <Flipcard
      front={<img className={styles.slider__img} src={src} alt="" />}
      back={
        <img className={styles.slider__img} src={backSideImg || src} alt="" />
      }
    />
  );
};

const SliderCard = ({ photo }: { photo: Photo }) => {
  const { familyTree, handleFindNode } = useContext(NodeContext);

  return (
    <>
      <SliderPhoto src={photo?.image} backSideImg={photo?.backSideImg} />
      <div className={styles.slider__info}>
        <ul className={styles.slider__info_persons}>
          {!!photo?.persons?.length &&
            photo?.persons?.map((person, index) =>
              familyTree?.map((item) =>
                item.id === person && index < 3 ? (
                  <PersonSlider
                    key={item.id}
                    index={index}
                    name={item.name}
                    surname={item.surname}
                    img={item.img}
                    onClick={() => handleFindNode(item.id)}
                  />
                ) : null
              )
            )}
          {photo.persons && photo.persons.length >= 3 && (
            <li className={styles.slider__info_person_more}>
              {photo.persons.length - 3}+
            </li>
          )}
        </ul>
        <div className={styles.slider__info_descr}>
          {photo.date + ". " + photo.place + ". " + photo.description}
        </div>
      </div>
    </>
  );
};

const SliderArrows = () => {
  const swiper = useSwiper();

  const handlePress = (slide: "prev" | "next") => () => {
    if (slide === "next") {
      swiper.slideNext();
      return;
    }

    swiper.slidePrev();
  };

  return (
    <div className={styles.slider__buttons}>
      <button
        className={styles.slider__buttons_prev}
        onClick={handlePress("prev")}
      >
        <img src={arrow} alt="" />
      </button>
      <button
        className={styles.slider__buttons_next}
        onClick={handlePress("next")}
      >
        <img src={arrow} alt="" />
      </button>
    </div>
  );
};

const Slider = () => {
  const { node } = useContext(NodeContext);

  if (!node?.photos) return null;

  return (
    <div className={`swiper ${styles.slider}`}>
      <Swiper
        modules={[Navigation, Controller]}
        spaceBetween={10}
        slidesPerView={1}
        loop
      >
        {node?.photos?.map((photo, i) => (
          <SwiperSlide key={i}>
            <SliderCard photo={photo} />
          </SwiperSlide>
        ))}
        <SliderArrows />
      </Swiper>
    </div>
  );
};

export default Slider;
