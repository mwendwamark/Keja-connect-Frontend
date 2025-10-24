import React, { useRef } from "react";
import "./Testimonials.css";
import { Data2 } from "../../../assets/Data2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const Testimonial = () => {
  const swiperRef = useRef(null);

  return (
    <section className="testimonial-wrapper body-section">
      <div className="testimonial-contents container">
        <div className="testimonial-header">
          <div className="testimonial-header-text">
            <strong className="title-top title-top-faint">TESTIMONIALS</strong>
            <h2 className="testimonial-main-title h2-heading">
              Don't take our word for it! Hear it from our partners.
            </h2>
          </div>
          <div className="testimonial-navigation">
            <button
              className="testimonial-nav-btn testimonial-prev"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous testimonial"
            >
              <IoArrowBack />
            </button>
            <button
              className="testimonial-nav-btn testimonial-next"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next testimonial"
            >
              <IoArrowForward />
            </button>
          </div>
        </div>

        <Swiper
          className="testimonial-swiper-container"
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {Data2.map(({ id, image, title, role, description }) => {
            return (
              <SwiperSlide key={id}>
                <div className="testimonial-card">
                  <div className="testimonial-card-header">
                    <img
                      src={image}
                      alt={title}
                      className="testimonial-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="testimonial-card-body">
                    <p className="testimonial-description">
                      <span className="quote-mark">"</span>
                      {description}
                      <span className="quote-mark">"</span>
                    </p>
                  </div>
                  <div className="testimonial-card-footer">
                    <h3 className="testimonial-name">{title}</h3>
                    <p className="testimonial-role">{role}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="testimonial-pagination"></div>
      </div>
    </section>
  );
};

export default Testimonial;
