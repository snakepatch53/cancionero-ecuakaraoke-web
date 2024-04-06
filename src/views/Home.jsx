import { faChevronLeft, faChevronRight, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContent from "../components/PageContent";
import { useEffect, useState } from "react";
import { getOrders } from "../services/all";
import { cls } from "../lib/utils";

export default function Home() {
    const [orders, setOrders] = useState(null);
    const [pageUrl, setPageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getOrders(pageUrl).then((response) => {
            setLoading(false);
            setOrders(response);
        });

        const interval = setInterval(() => {
            getOrders(pageUrl).then((response) => {
                setOrders(response);
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [pageUrl]);
    return (
        <PageContent className="px-[--pdd] pt-5">
            <section className="container flex items-center flex-col gap-3">
                {orders?.data?.map((order) => (
                    <Item
                        key={order.id}
                        number={order?.song?.id}
                        title={order?.song?.artist + " - " + order?.song?.title}
                        by={order?.client?.name}
                        date={order.date_str}
                    />
                ))}
            </section>

            <section className="container flex justify-center gap-2 pt-5 pb-10">
                {orders?.prev_page_url && (
                    <Button
                        onClick={() => {
                            setPageUrl(orders?.prev_page_url);
                        }}
                        icon={faChevronLeft}
                        disabled={loading}
                    />
                )}
                <Button text={orders?.current_page} disabled />
                {orders?.next_page_url && (
                    <Button
                        onClick={() => {
                            setPageUrl(orders?.next_page_url);
                        }}
                        icon={faChevronRight}
                        disabled={loading}
                    />
                )}
            </section>
        </PageContent>
    );
}

function Item({ number, title, by, date }) {
    return (
        <div className="flex items-center gap-3 w-full max-w-[800px] bg-black/10 p-2 sm:p-5 rounded">
            <div className="flex flex-col justify-center items-center h-20 aspect-square bg-black/20 rounded text-[--c1-bg]">
                <FontAwesomeIcon className="text-lg" icon={faMusic} />
                <span className="font-bold text-sm">#{number}</span>
            </div>
            <div className="flex flex-col">
                <h4 className="block max-w-52 sm:max-w-none font-bold text-lg text-nowrap text-ellipsis overflow-hidden text-[--c2-bg] opacity-70">
                    {title}
                </h4>
                <h3 className="block max-w-52 sm:max-w-none text-nowrap text-ellipsis overflow-hidden">
                    <b className="text-[--c1-bg]">Para: </b>
                    <span className="opacity-80">{by}</span>
                </h3>
                <p className="block max-w-52 sm:max-w-none text-[0.75rem] text-nowrap text-ellipsis overflow-hidden opacity-60 capitalize">
                    {date}
                </p>
            </div>
        </div>
    );
}

function Button({ onClick, icon = null, text = null, disabled = false }) {
    return (
        <button
            className={cls(
                "flex justify-center items-center w-10 aspect-square bg-black/20 rounded",
                {
                    "cursor-not-allowed opacity-50": disabled,
                }
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <FontAwesomeIcon className="opacity-90" icon={icon} />}
            {text && <span>{text}</span>}
        </button>
    );
}
