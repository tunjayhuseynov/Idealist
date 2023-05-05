import ViewComponent from "components/ViewComponent/view";
import { AdminCrud } from "modules/Crud-Admin";
import { GetServerSidePropsContext } from "next/types";
import { IBina } from "types/category/Bina";
import { Currency } from "types/category/Common";
import { BooleanDetailParser, DetailParser } from "./utils";

interface IProps {
  currency: keyof typeof Currency;
  details: { [name: string]: string };
}

export default function ViewPage({ currency, details }: IProps) {
  return (
    <>
      <ViewComponent
        details={details}
        booleanDetails={{
          s: ["asdas"],
        }}
        currency={currency}
        description={""}
        images={[]}
        price={5}
        title={""}
        coordinate={{ lat: 0, lng: 0 }}
      />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const crud = new AdminCrud<IBina>("Bina");
  const params = context.params;

  if (!params || typeof params.id != "string") {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const doc = await crud.GetOne(id);

  if (!doc) return { notFound: true }

  return {
    props: {
      currency: doc.currency,
      details: DetailParser(doc),
      booleanDetails: BooleanDetailParser(doc),
    },
  };
}
