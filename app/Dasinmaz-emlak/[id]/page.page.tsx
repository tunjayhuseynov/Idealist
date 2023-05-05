import ViewComponent from "components/ViewComponent/view";
import { AdminCrud } from "modules/Crud-Admin";
import { IBina } from "types/category/Bina";
import { BooleanDetailParser, DetailParser } from "../utils";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const crud = new AdminCrud<IBina>("Bina");
  const { id } = params;
  const doc = await crud.GetOne(id);

  if (!doc) return notFound();

  let details = DetailParser(doc);
  let booleanDetails = BooleanDetailParser(doc);

  return (
    <>
      <ViewComponent
        details={details}
        booleanDetails={booleanDetails}
        currency={doc.currency}
        description={""}
        images={[]}
        price={5}
        title={""}
        coordinate={{ lat: 0, lng: 0 }}
      />
    </>
  );
}
