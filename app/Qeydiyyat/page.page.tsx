import Registration from "./index.client";

export default async function Page() {
    return <Registration />
}

export const revalidate = 7200;