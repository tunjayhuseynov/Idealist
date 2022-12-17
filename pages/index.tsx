import Card from "components/Card";
import Header from "components/Header/Header";
import Navbar from "components/Navbar/Navbar";
import { FiHeart, FiShoppingCart } from "react-icons/fi";


export default function HomePage() {

    const cardData = [
        {
            title: "Lorem ipsum dolor sit ame dasdasdasasdsad",
            price: "$ 100",
            images: [
                "https://source.unsplash.com/random/1500x1500",
                "https://source.unsplash.com/random/1500x1500",
                "https://source.unsplash.com/random/1500x1500",
            ],
            body: [
                {
                    icon: <FiHeart />,
                    title: "50 m2",
                },
                {
                    icon: <FiShoppingCart />,
                    title: "Metro",
                },
                {
                    icon: <FiHeart />,
                    title: "50 m2",
                },
                {
                    icon: <FiShoppingCart />,
                    title: "Metro",
                },
            ],
        }
    ]


    return <div className="w-[80%] mx-auto">
        <Header />
        <div className="bg-white rounded-lg px-5 pt-3 pb-8 mb-10">
            <span className="text-xl font-semibold relative after:absolute after:w-[150%] after:-bottom-2 after:h-[1px] after:bg-primary after:left-[.825rem]">
                Premium
            </span>
            <div className="mt-10 justify-items-center md:justify-items-start grid grid-cols-[repeat(auto-fit,minmax(min(95%/2,max(250px,100%/6)),1fr))] gap-8">
                {cardData.map(s => <Card key={s.title} {...s} />)}
            </div>
        </div>
    </div>
}