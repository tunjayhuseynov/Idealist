import { Avatar, Badge } from "antd";
import { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { IoExitSharp } from "react-icons/io5";
import { useRouter } from "next/router";

export default function Right() {
  const [isOpen, setOpen] = useState(false);

  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <div className="flex space-x-8 items-center">
      <div className="text-green-500 tracking-wide font-medium cursor-pointer">
        Elan yerləşdir
      </div>
      <div className="relative">
        <Badge count={1}>
          <Avatar
            onClick={() => setOpen(!isOpen)}
            src="https://i.pravatar.cc/300"
            className="cursor-pointer"
          />
        </Badge>
        {isOpen && (
          <div className="absolute top-0 -left-1 translate-y-[10%] -translate-x-full z-[99999]">
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <div className="shadow-lg  border border-gray-200 bg-white rounded-xl">
                <ul className="list-none flex flex-col">
                  <li className="hover:bg-slate-100 rounded-t-xl cursor-pointer px-6 py-2 tracking-wide font-medium border-b flex space-x-2 items-center">
                    <FaUserAlt />
                    <span>Profil</span>
                  </li>
                  <li className="hover:bg-slate-100 cursor-pointer px-6 py-2 tracking-wide font-medium border-b flex space-x-2 items-center">
                    <AiFillSetting />
                    <span>Tənzimlə</span>
                  </li>
                  <li className="hover:bg-slate-100 rounded-b-xl cursor-pointer px-6 py-2 tracking-wide font-medium text-red-600 flex space-x-2 items-center">
                    <IoExitSharp />
                    <span>Çıxış</span>
                  </li>
                </ul>
              </div>
            </ClickAwayListener>
          </div>
        )}
      </div>
    </div>
  );
}
