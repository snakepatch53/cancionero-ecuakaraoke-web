import { faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Frontpage() {
    return (
        <div className="relative flex items-center w-full min-h-screen">
            <Ligth color="yellow" size="5" x="20" y="35" extend="4" />
            <Ligth color="white" size="15" x="31" y="42" />
            <Ligth color="blue" size="13" x="40" y="55" />
            <Ligth color="blue" size="10" x="20" y="80" />
            <Ligth color="red" size="20" x="50" y="70" extend="5" />
            <Ligth color="green" size="30" x="50" y="50" />
            <Ligth color="pink" size="10" x="25" y="55" />
            <Ligth color="purple" size="30" x="40" y="35" />
            <div className="absolute -z-10 inset-0 backdrop-blur-lg" />
            <div className="flex flex-col justify-center items-center gap-10 max-w-72 mx-auto h-full">
                <div className="flex flex-col w-full">
                    <img className="w-ful max-w-48 object-contain mx-auto" src="/img/icon.png" />
                    <img className="w-ful object-contain" src="/img/name.png" />
                </div>

                <h1 className="font-bold text-center text-2xl text-balance">
                    Encuentra todo mas facil en nuestro{" "}
                    <b className="text-[--c2-bg]">cancionero digital</b>
                </h1>
                <img className="w-full" src="/img/url-qr.jpg" />
                <div className="flex flex-col gap-1">
                    <span className="flex justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faLocationDot} className="text-red-500" />
                        Av. Juan de la Cruz, Macas, Ecuador
                    </span>
                    <span className="flex justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faFacebook} className="text-blue-500" />
                        facebook.com/LaBohemiaMacas
                    </span>
                    <span className="flex justify-center items-center gap-1">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-green-500" />
                        +593 93 981 4662
                    </span>
                </div>
            </div>
        </div>
    );
}

function Ligth({ color, size, x, y, extend = 3 }) {
    return (
        <div
            className="absolute -z-20 flex justify-center"
            style={{
                top: `${y}rem`,
                left: `${x}rem`,
            }}
        >
            <div
                className="rounded-full"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    boxShadow: `0 0 ${extend}rem 0.5rem ${color}`,
                }}
            />
        </div>
    );
}
