import { IoMdHome } from "react-icons/io";
import { useState } from 'react';
import { GiDinosaurRex } from "react-icons/gi";
import { BsChevronDown } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { IoIosHelpCircle } from "react-icons/io";

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [submenuStates, setSubmenuStates] = useState({});

    const Menus = [
        { title: "Home", icon: <IoMdHome /> },
        { title: "Games", icon: <CgGames />, submenu: true, submenuItems: [{ title: "Chance Clash" }] },
        { title: "Help", icon: <IoIosHelpCircle />, submenu: true, submenuItems: [{ title: "About us" }, { title: "Contact us" }] },
    ];

    const toggleSubmenu = (index) => {
        setSubmenuStates((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div
            className={`bg-light-green h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 relative`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className='inline-flex'>
                <GiDinosaurRex className='text-white text-4xl cursor-pointer block float-left mr-2' />
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>DinoDuels</h1>
            </div>
            <ul className='pt-2'>
                {Menus.map((menu, index) => (
                    <div key={index}>
                        <li
                            className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}
                            onClick={() => menu.submenu && toggleSubmenu(index)}
                        >
                            <span className='text-2xl block float-left'>
                                {menu.icon ? menu.icon : <IoMdHome />}
                            </span>
                            <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.title}</span>
                            {menu.submenu && (
                                <BsChevronDown className={`${submenuStates[index] && "rotate-180"}`} />
                            )}
                        </li>
                        {menu.submenu && submenuStates[index] && open && (
                            <ul>
                                {menu.submenuItems.map((submenuItem, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md mt-2'
                                    >
                                        {submenuItem.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;