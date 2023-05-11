import ViewComponent from "components/ViewComponent/view";
import { AdminCrud } from "modules/Crud-Admin";
import { IBina } from "types/category/Bina";
import { BooleanDetailParser, DetailParser } from "./utils";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const crud = new AdminCrud<IBina>("Bina");
  const { id } = params;
  const doc = await crud.GetOne(id);

  if (!doc) return notFound();

  let details = await DetailParser(doc);
  let booleanDetails = await BooleanDetailParser(doc);

  let title = ""

  if (doc.village) {
    title += doc.village.value + doc.region?.value
  } else if (doc.region) {
    title += doc.region.value
  } else {
    title += doc.city.value
  }

  return (
    <>
      <ViewComponent
        details={details}
        booleanDetails={booleanDetails}
        currency={doc.currency}
        description={doc.about}
        images={doc.images}
        price={doc.price}
        title={title}
        coordinate={doc.coordinate}
      />
    </>
  );
}
