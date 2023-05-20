import ViewComponent from "components/ViewComponent/view";
import { AdminCrud } from "modules/Crud-Admin";
import { notFound } from "next/navigation";
import React from "react";
import { IAuto } from "types/category/Auto";

export default async function Page({ params }: { params: { id: string } }) {
  const crud = new AdminCrud<IAuto>("Auto");
  const { id } = params;
  const doc = await crud.GetOne(id);



  if (!doc) return notFound();

  return (
    <>
      <ViewComponent
        id={id}
        booleanDetails={{}}
        details={{}}
        title={doc.title ?? ""}
        coordinate={{
          lat: 0,
          lng: 0,
        }}
        currency={doc.currency}
        description={doc.about}
        images={doc.images}
        price={doc.price}
      />
    </>
  );
}
