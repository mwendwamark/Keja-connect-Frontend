import React from "react";
import "./Testimonials.css";
import { Data2 } from "../Data2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonial = () => {
  return (
    <section className="testimonial section">
      <div className="testimonial-contents container">
        <h3 className="section-subtitle">TESTIMONIALS</h3>
        <h2 className="section-title">What Others Have To Say About Us</h2>

        <Swiper
          className="testimonial-container"
          slidesPerView={1}
          spaceBetween={15}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {Data2.map(({ id, image, title, role, description }) => {
            return (
              <SwiperSlide className="testimonial-card" key={id}>
                <img src={image} alt={title} className="testimonial-img" />
                <h3 className="testimonial-name">{title}</h3>
                <p className="testimonial-role">{role}</p>
                <p className="testimonial-description">
                  {" "}
                  <span>"</span> {description} <span>"</span>
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
