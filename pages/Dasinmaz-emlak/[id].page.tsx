import ViewComponent from "components/ViewComponent/view";
import { AdminCrud } from "modules/Crud-Admin";
import { GetServerSidePropsContext } from "next/types";
import { IBina } from "types/category/Bina";


export default function ViewPage() {

    return <>
        <ViewComponent
            details={{
                "a": "a"
            }}
            booleanDetails={{
                "s": ["asdas"]
            }}
            currency={"AZN"}
            description={""}
            images={[]}
            price={5}
            title={""}
            coordinate={{ lat: 0, lng: 0 }}
        />
    </>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const crud = new AdminCrud<IBina>("Bina")
    const params = context.params;

    if (!params || typeof params.id != "string") {
        return {
            props: {
                notFound: true
            }
        }
    }

    const { id } = params;
    const doc = await crud.GetOne(id)

    return {
        props: {

        }, // will be passed to the page component as props
    }
}