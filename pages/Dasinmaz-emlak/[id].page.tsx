import ViewComponent from "components/ViewComponent/view";


export default function ViewPage() {


    return <>
        <ViewComponent
            details={{
                "a": "a"
            }}
            booleanDetails={{
                "s": ["asdas"]
            }}
            currency={"azn"}
            description={""}
            images={[]}
            price={5}
            title={""}
            coordinate={{ lat: 0, lng: 0 }}
        />
    </>
}