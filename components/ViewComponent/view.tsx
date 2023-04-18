import Image from 'next/image';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";

interface IProps{
    images: string[]
}

//https://i.pravatar.cc/1000
export default function ViewComponent() {

    return <main className="px-16 grid grid-cols-[66%,33%] mt-24">
        <section id="left">
            <div id="carousel" className='w-full aspect-square border h-1/2'>
                <Swiper
                    pagination={{
                        type: "progressbar",
                    }}
                    className='h-full bg-black'
                    modules={[Pagination, Navigation]}
                    navigation={true}
                    slideNextClass="text-white"
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide >
                        <Image src={"https://i.pravatar.cc/1000"} alt="" fill style={{ objectFit: "contain" }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={"https://i.pravatar.cc/1000"} alt="" fill style={{ objectFit: "contain" }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={"https://i.pravatar.cc/1000"} alt="" fill style={{ objectFit: "contain" }} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={"https://i.pravatar.cc/1000"} alt="" fill style={{ objectFit: "contain" }} />
                    </SwiperSlide>
                    ...
                </Swiper>
            </div>
        </section>

        <section id="right">

        </section>
    </main>
}