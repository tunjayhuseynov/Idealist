"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Descriptions } from "antd";
import { Currency, IRentDuration } from "types/category/Common";

interface IProps {
  images: string[];
  title: string;
  coordinate: {
    lat: number;
    lng: number;
  };
  description: string;
  price: number;
  currency: keyof typeof Currency;
  rentDuration?: keyof typeof IRentDuration;
  details: { [name: string]: string };
  booleanDetails: { [name: string]: string[] };
}

//https://i.pravatar.cc/1000
export default function ViewComponent({ details, booleanDetails, price, currency, coordinate, description, images, title, rentDuration }: IProps) {
  return (
    <main className="px-16 grid grid-cols-[66.66%,33.33%] gap-x-10 mt-24">
      <section id="Left">
        <div id="carousel" className="w-full aspect-square border h-1/2">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            className="h-full bg-black"
            modules={[Pagination, Navigation]}
            navigation={true}
            slideNextClass="text-white"
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {images.map(l => <SwiperSlide>
              <Image
                src={l}
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </SwiperSlide>)}
          </Swiper>
        </div>
        <div id="Left-Bottom" className="grid grid-cols-[70%,30%] mt-4">
          <div id="Left-Bottom-Left">
            <div id="Title-Map" className="grid grid-cols-[75%,25%]">
              <div
                id="Title"
                className="relative h-[66%] before:absolute before:w-16 before:h-[1px] before:bg-black before:bg-opacity-20 before:-bottom-1"
              >
                <span className="text-xl font-semibold">{title}</span>
              </div>
              <div id="Map">
                <button className="px-5 py-3 bg-secondary rounded-i text-white font-medium">
                  Xəritəni aç
                </button>
              </div>
            </div>
            <div id="Description" className="mt-5">
              <span className="">
                {description}
              </span>
            </div>
          </div>
          <div id="Left-Bottom-Right">
            <div className="shadow-lg rounded-i w-full h-[150px] grid grid-rows-[32%,68%]">
              <div className="bg-primary rounded-t-i flex items-center justify-center">
                <span className="font-semibold text-2xl text-white">
                  {Intl.NumberFormat("de-DE", { style: "currency", currency }).format(price)}
                </span>
                {rentDuration && <span>/ {IRentDuration[rentDuration]}</span>}
              </div>
              <div className="rounded-b-i"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="Right">
        <div
          id="data-table"
          className="drop-shadow-lg min-h-[200px] rounded-i bg-white px-3 py-2"
        >
          <Descriptions title="Məlumatlar" layout="horizontal">
            {Object.entries(details).map(([k, v]) => {
              return (
                <Descriptions.Item key={k} label={k}>
                  {v}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
          <Descriptions layout="vertical">
            {Object.entries(booleanDetails).map(([k, v]) => {
              return (
                <Descriptions.Item key={k} label={k} span={2} className="!pb-0">
                  <div className="pl-3">
                    {v.map((s) => (
                      <div
                        key={s}
                        className="relative before:-left-2 before:top-[10.5px] before:absolute before:w-1 before:h-1 before:rounded-full before:bg-secondary"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        </div>
      </section>
    </main>
  );
}