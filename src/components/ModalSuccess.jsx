import { faCheckCircle, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfettiExplosion from "react-confetti-explosion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ModalSuccess() {
    return (
        <>
            <div className="fixed inset-0">
                <ConfettiExplosion force={0.8} duration={3000} particleCount={300} width="1600" />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex justify-center items-center bg-black/40"
            >
                <div className="flex flex-col gap-2 bg-black/50 backdrop-blur-sm py-16 px-10 rounded-lg shadow-xl">
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-[--c1-bg] text-6xl mb-5"
                    />
                    <h1 className="text-2xl font-bold text-center">¡Tu cancion empezara pronto!</h1>
                    <p className="text-white opacity-90 text-center">
                        Mira la lista para que sepas cuanto falta
                    </p>
                    <Link
                        to="/"
                        className="flex justify-center items-center gap-1 py-2 mt-3 bg-[--c1-bg] rounded transition hover:opacity-80"
                    >
                        <span>Ver cuanto falta</span>
                        <FontAwesomeIcon icon={faMusic} className="text-sm" />
                    </Link>
                </div>
            </motion.div>
        </>
    );
}
