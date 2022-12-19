import Card from "components/Card";


export function PremiumBox(props: { cardData: any[] }) {
    return (<div className="bg-white rounded-lg px-5 pt-3 pb-8 mb-10">
        <span className="text-xl font-semibold relative after:absolute after:w-[150%] after:-bottom-2 after:h-[1px] after:bg-primary after:left-0">
            Premium
        </span>
        <div className="mt-10 justify-items-center md:justify-items-start grid grid-cols-[repeat(auto-fit,minmax(min(95%/2,max(250px,100%/6)),1fr))] gap-8">
            {props.cardData.map(s => <Card key={s.title} {...s} />)}
        </div>
    </div>);
}