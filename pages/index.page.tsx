import Header from "components/Header/Header";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { PremiumBox } from "./HomeComponents/PremiumBox";



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


    return <div className="w-margin mx-auto">
        <Header />
        <PremiumBox cardData={cardData}></PremiumBox>
    </div>
}