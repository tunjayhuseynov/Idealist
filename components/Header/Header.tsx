import { Input } from "antd";
import Image from "next/image";

const { Search } = Input;

export default function Header() {
  return (
    <div className="flex flex-col pt-8 gap-y-8 items-center justify-center min-h-[20rem]">
      <div className="w-[27.5rem] h-[5.5rem] relative">
        <Image
          src={"/assets/logo.svg"}
          className="z-0"
          alt="Idealist.az Logo"
          fill
        />
      </div>
      <div>
        <Search
          placeholder="İdealındaki məhsulu axtar..."
          className="w-[28.125rem] shadow-sm hover:[&>span>input]:!border-primary focus:[&>span>input]:!border-primary [&>span>span]:!bg-primary hover:[&>span>span>button]:!bg-primaryHover"
          enterButton
        />
      </div>
    </div>
  );
}
