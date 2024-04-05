import { useParams } from "react-router-dom";
import PageContent from "../components/PageContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCardClip, faMicrophone, faMusic, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { showSongs, storageOrder } from "../services/all";
import { Formik } from "formik";
import { cls } from "../lib/utils";
import * as Yup from "yup";
import { isCedula } from "../lib/validations";
import ModalSuccess from "../components/ModalSuccess";

export default function New() {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        showSongs(id).then((response) => {
            setSong(response);
        });
    }, [id]);

    const schema = Yup.object().shape({
        dni: Yup.string()
            .required("Campo requerido")
            .test("is-cedula", "El DNI no es válido!", isCedula),
        name: Yup.string().required("Campo requerido"),
    });

    // verificamos si hay datos del cliente en localStorage
    const client = JSON.parse(localStorage.getItem("client")) || {};

    return (
        <PageContent className="flex flex-col gap-5 px-[--pdd]">
            <section className="container flex items-center flex-col leading-4">
                <h3 className="uppercase font-bold text-lg text-[--c1-bg]">Solicitar canción</h3>
                <div className="flex gap-1 items-center">
                    <FontAwesomeIcon className="text-sm text-[--c2-bg] opacity-60" icon={faMusic} />
                    <span className="text-[--c2-bg] opacity-70">
                        {song?.artist} - {song?.title}
                    </span>
                </div>
            </section>
            <Formik
                validationSchema={schema}
                initialValues={{
                    dni: client.dni || "",
                    name: client.name || "",
                }}
                onSubmit={(values) => {
                    // primero guardamos los datos del cliente en localStorage para que se autocomplete el formulario la próxima vez
                    localStorage.setItem("client", JSON.stringify(values));
                    // ahora si creamos el pedido
                    const data = {
                        song: {
                            id,
                        },
                        client: {
                            ...values,
                        },
                    };
                    storageOrder(data).then((response) => {
                        console.log(response);
                        setSuccess(true);
                    });
                }}
            >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center flex-col gap-5 w-full max-w-[500px] mx-auto mt-5"
                    >
                        <Input
                            inputMode="numeric"
                            label="Cédula:"
                            placeholder="Ej: 0704870365"
                            icon={faIdCardClip}
                            name="dni"
                            value={values.dni}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.dni}
                            errors={errors.dni}
                        />

                        <Input
                            label="Nombre:"
                            placeholder="Ej: Pedro Fernández"
                            icon={faUser}
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.name}
                            errors={errors.name}
                        />
                        <Submit classWrap="mt-3" />
                    </form>
                )}
            </Formik>
            {success && <ModalSuccess />}
        </PageContent>
    );
}

function Input({
    type = "text",
    inputMode = "text",
    label,
    placeholder,
    icon,
    name,
    value,
    onChange,
    touched,
    onBlur,
    errors,
}) {
    return (
        <div className="flex flex-col gap-1 items-center w-full">
            <label className="font-bold tracking-wide">{label}</label>
            <div
                className={cls("flex items-center gap-2 w-full px-3 bg-black/50 rounded", {
                    "border border-red-500": touched && errors,
                    "border border-green-500": touched && !errors,
                })}
            >
                <FontAwesomeIcon className="opacity-80" icon={icon} />
                <input
                    className="flex-1 bg-transparent py-3 outline-none"
                    placeholder={placeholder}
                    type={type}
                    inputMode={inputMode}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </div>
            {touched && errors && <span className="text-red-500 text-sm">{errors}</span>}
        </div>
    );
}

function Submit({ classWrap = "" }) {
    return (
        <button
            className={cls(
                "flex justify-center items-center gap-1 w-full bg-[--c1-bg] py-3 px-5 rounded transition-all duration-300 hover:opacity-80",
                classWrap
            )}
            type="submit"
        >
            <span className="text-[--c1-txt] font-bold">¡A Cantar!</span>
            <FontAwesomeIcon className="text-sm" icon={faMicrophone} />
        </button>
    );
}
