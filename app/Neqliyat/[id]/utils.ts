import { IAuto } from "types/category/Auto";

export async function DetailParser(doc: IAuto) {
  let details: { [name: string]: string } = {
    Kateqoriya: doc.category.value,
  };

  
}
