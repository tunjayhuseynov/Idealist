import { useState } from "react"


export default function Yarat() {
    const [category, setCategory] = useState<string>();
    const [name, setName] = useState<string>();

    return <div className='w-margin mx-auto'>
        <div className='grid grid-cols-[65%,35%]'>
            <div>

            </div>
            <div></div>
        </div>
    </div>
}