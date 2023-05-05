import LogIn from "./index.client";

export default async function Page() {
  return <LogIn />;
}

export const revalidate = 7200;
