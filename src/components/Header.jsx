import { faMusic, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cls } from "../lib/utils";

export default function Header() {
    const [isSticky, setSticky] = useState(false);
    window.onscroll = () => {
        setSticky(window.scrollY > 0);
    };
    return (
        <div className="sticky top-0 z-10 flex justify-center w-full h-auto sm:h-20 transition">
            <div className="relative w-full h-full px-[--pdd]">
                <div
                    className={cls("absolute inset-0 w-full backdrop-blur-sm", {
                        "bg-black/20": isSticky,
                        "bg-transparent": !isSticky,
                    })}
                />
                <div className="relative container flex flex-col gap-1 sm:flex-row justify-between items-center w-full h-full p-2">
                    <Link to="/" className="flex h-16 sm:h-full">
                        <img
                            className="w-full h-full"
                            src="/img/logo.png"
                            alt="Logo del bar karaoke bohemia"
                        />
                    </Link>
                    <nav className="flex flex-col xs:flex-row items-center gap-2 sm:gap-3">
                        <Option to="/" text="Canciones pedidas" icon={faMusic} />
                        <Option to="/list" text="Pedir canción" icon={faPlus} />
                    </nav>
                </div>
            </div>
        </div>
    );
}

function Option({ to, text, icon }) {
    const { pathname } = useLocation();
    const isActive = pathname === to;
    return (
        <Link
            to={to}
            className={cls(
                "flex justify-center items-center gap-1 sm:gap-2 text-white text-base sm:text-lg sm:px-1 py-2 opacity-70 transition hover:opacity-100",
                {
                    "opacity-100 text-[--c2-bg]": isActive,
                }
            )}
        >
            <FontAwesomeIcon className="text-sm sm:text-base" icon={icon} />
            {text}
        </Link>
    );
}
