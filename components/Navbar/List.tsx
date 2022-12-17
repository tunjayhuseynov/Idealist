import Image from 'next/image';

interface IProps {
}

export default function List({ }: IProps) {

    const list = [
        {
            name: "Avtomobil",
            link: "/",
            icon: "/icons/category/car.svg"
        },
        {
            name: "Hobbilər",
            link: "/contact",
            icon: "/icons/category/hobby.svg"
        },
        {
            name: "Daşınmaz Əmlak",
            link: "/about",
            icon: "/icons/category/dasinmaz.svg"
        },
        {
            name: "Ev və Dekorasiya",
            link: "/contact",
            icon: "/icons/category/home.svg"
        },
        {
            name: "Heyvanlar",
            link: "/contact",
            icon: "/icons/category/animal.svg"
        },
        {
            name: "İş Elanları",
            link: "/contact",
            icon: "/icons/category/job.svg"
        },
        {
            name: "Uşaq Dünyası",
            link: "/contact",
            icon: "/icons/category/child.svg"
        },
        {
            name: "Şəxsi Əşyalar",
            link: "/contact",
            icon: "/icons/category/private.svg"
        },
        {
            name: "Elektronika",
            link: "/contact",
            icon: "/icons/category/electro.svg"
        },
        {
            name: "Xidmətlər",
            link: "/contact",
            icon: "/icons/category/service.svg"
        },
    ]

    let selected = "before:bottom-0 before:h-full before:w-[90%] before:bg-primary before:absolute before:bg-opacity-60 before:rounded-xl"
    let hover = "hover:before:bottom-0 hover:before:-left-1 hover:before:h-full hover:before:w-[90%] hover:before:bg-primary hover:before:rounded-xl hover:before:bg-opacity-60 hover:before:absolute hover:before:animate-loading"

    return <>
        <ul className="list-none bg-white min-w-[24rem] mt-[1px] grid grid-cols-2 gap-y-4 pl-8 py-3 rounded-b-lg">
            {list.map(s => <li key={s.name} className={`font-semibold inline-flex space-x-2 items-center cursor-pointer relative ${hover}`}>
                <div className='w-4 h-4 relative'>
                    <Image src={s.icon} alt={s.name} fill className='z-0' />
                </div>
                <span className='z-20'>
                    {s.name}
                </span>
            </li>)}
        </ul>
    </>
}