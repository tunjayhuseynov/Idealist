// import img from "next/img";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
// const Carousel = dynamic(() => import("antd").then(s => s.Carousel), { ssr: false });
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

interface IBody {
  icon: React.ReactNode;
  title: string;
}

interface IProps {
  title: string;
  price: string;
  images: string[];
  body: IBody[];
}

export default function Card({ title, images, body, price }: IProps) {
  return (
    <div className="max-h-[25rem] bg-white hover:shadow-sm hover:shadow-primary shadow-card-shadow grid grid-cols-[40%,60%] rounded-xl">
      <div className="relative h-[13.865rem]">
        <Carousel showStatus={false} showThumbs={false}>
          {images.map((s, index) => (
            <div key={index} className="relative h-[13.865rem]">
              <Image
                src={s}
                className="object-cover object-center rounded-xl w-full"
                fill
                alt={s}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="flex flex-col justify-between p-2">
        <div className="grid grid-flow-col grid-rows-[40%,60%] gap-y-5">
          <div className="text-sm font-semibold">{title}</div>
          <div className="grid grid-flow-row grid-rows-2 grid-cols-2 gap-y-4">
            {body.map((s, index) => (
              <div key={index} className="flex items-center gap-x-2 gap-y-2">
                <div className="w-[1.25rem] h-[1.25rem] rounded-full flex items-center justify-center">
                  {s.icon}
                </div>
                <div className="text-sm font-semibold">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">{price}</div>
          <div className="flex items-center gap-x-1">
            <div className="w-[1.5rem] h-[1.5rem] rounded-full bg-primary drop-shadow-md flex items-center justify-center">
              <FiHeart className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
