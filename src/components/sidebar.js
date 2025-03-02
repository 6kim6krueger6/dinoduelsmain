import { IoMdHome } from "react-icons/io";
import { useState } from 'react';
import { GiDinosaurRex } from "react-icons/gi";
import { BsChevronDown, BsTwitter } from "react-icons/bs"; // Импортируем BsTwitter
import { CgGames } from "react-icons/cg";
import { IoIosHelpCircle } from "react-icons/io";
import { Link } from 'react-router-dom'; // Импортируем Link

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [submenuStates, setSubmenuStates] = useState({});

    const Menus = [
        { title: "Home", icon: <IoMdHome />, path: "/" },
        { title: "Games", icon: <CgGames />, submenu: true, submenuItems: [{ title: "Rock Paper Scissors", path: "/rock-paper-scissors" }] },
        { title: "Help", icon: <IoIosHelpCircle />, submenu: true, submenuItems: [{ title: "About us", path: "https://wobbly-riverbed-ac5.notion.site/DinoDuels-Docs-1a9b07b26d4580af948df7c67138748d" }] }, // Обновленный путь для About us
    ];

    const toggleSubmenu = (index) => {
        setSubmenuStates((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div
            className={`bg-light-green h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} duration-300 fixed flex flex-col`} // Добавлен flex flex-col
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div>
                <div className='inline-flex'>
                    <GiDinosaurRex className='text-white text-4xl cursor-pointer block float-left mr-2' />
                    <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>DinoDuels</h1>
                </div>
                <ul className='pt-2'>
                    {Menus.map((menu, index) => (
                        <div key={index}>
                            {/* Элемент меню */}
                            {menu.path && !menu.submenu ? (
                                <Link to={menu.path}>
                                    <li
                                        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}
                                    >
                                        <span className='text-2xl block float-left'>
                                            {menu.icon ? menu.icon : <IoMdHome />}
                                        </span>
                                        <span className={`text-base font-medium flex-1 ${!open && "invisible"}`}> {/* Используем invisible */}
                                            {menu.title}
                                        </span>
                                    </li>
                                </Link>
                            ) : (
                                <li
                                    className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2`}
                                    onClick={() => menu.submenu && toggleSubmenu(index)}
                                >
                                    <span className='text-2xl block float-left'>
                                        {menu.icon ? menu.icon : <IoMdHome />}
                                    </span>
                                    <span className={`text-base font-medium flex-1 ${!open && "invisible"}`}> {/* Используем invisible */}
                                        {menu.title}
                                    </span>
                                    {menu.submenu && (
                                        <BsChevronDown className={`${submenuStates[index] && "rotate-180"}`} />
                                    )}
                                </li>
                            )}

                            {/* Подменю */}
                            {menu.submenu && submenuStates[index] && open && (
                                <ul>
                                    {menu.submenuItems.map((submenuItem, subIndex) => (
                                        <li key={subIndex}>
                                            {submenuItem.path.startsWith("http") ? ( // Проверяем, является ли путь внешней ссылкой
                                                <a
                                                    href={submenuItem.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md mt-2"
                                                >
                                                    {submenuItem.title}
                                                </a>
                                            ) : (
                                                <Link to={submenuItem.path}>
                                                    <div className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md mt-2">
                                                        {submenuItem.title}
                                                    </div>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </ul>
            </div>

            {/* Кнопка для перехода в Twitter (X) */}
            <div className="mt-auto"> {/* mt-auto для прижатия к нижней части */}
                <a
                    href="https://x.com/dinoduels"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-4 text-gray-300 text-sm p-2 hover:bg-light-white rounded-md mt-2"
                >
                    <BsTwitter className="text-2xl" />
                    <span className={`text-base font-medium ${!open && "invisible"}`}> {/* Используем invisible */}
                        Twitter
                    </span>
                </a>
            </div>
        </div>
    );
}

export default Sidebar;