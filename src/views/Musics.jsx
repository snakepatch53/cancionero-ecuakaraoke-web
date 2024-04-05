import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContent from "../components/PageContent";
import {
    faChevronLeft,
    faChevronRight,
    faMusic,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getSongs, searchSongs } from "../services/all";
import { cls } from "../lib/utils";
import debounce from "just-debounce-it";

export default function Musics() {
    const [songs, setSongs] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePagination = (url) => {
        setLoading(true);
        getSongs(url).then((response) => {
            setLoading(false);
            setSongs(response);
        });
    };

    const debounceSearch = useCallback(
        debounce((search, url) => {
            if (!search) return handlePagination("");
            setLoading(true);
            searchSongs(url, search).then((response) => {
                setLoading(false);
                setSongs(response);
            });
        }, 500),
        []
    );

    const handleSearch = (e) => {
        const search = e.target.value;
        debounceSearch(search, "");
    };

    useEffect(() => {
        handlePagination("");
    }, []);

    return (
        <PageContent className="flex flex-col gap-5 px-[--pdd]">
            <section className="container flex items-center flex-col gap-3">
                <Search onChange={(e) => handleSearch(e)} />
            </section>
            <section className="container flex items-center flex-col gap-3">
                {songs?.data?.map((song) => (
                    <Item
                        key={song.id}
                        number={song.id}
                        to={"/new/" + song.id}
                        title={song.title}
                        artist={song.artist}
                        genre={song.gender}
                    />
                ))}
            </section>

            <section className="container flex justify-center gap-2 pt-5 pb-10">
                {songs?.prev_page_url && (
                    <Button
                        onClick={() => handlePagination(songs?.prev_page_url)}
                        icon={faChevronLeft}
                        disabled={loading}
                    />
                )}
                <Button text={songs?.current_page} disabled />
                {songs?.next_page_url && (
                    <Button
                        onClick={() => handlePagination(songs?.next_page_url)}
                        icon={faChevronRight}
                        disabled={loading}
                    />
                )}
            </section>
        </PageContent>
    );
}

function Item({ to, number, title, artist, genre }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 w-full max-w-[800px] bg-black/10 p-2 sm:p-5 rounded"
        >
            <div className="flex flex-col justify-center items-center h-20 aspect-square bg-black/20 rounded text-[--c1-bg]">
                <FontAwesomeIcon className="text-lg" icon={faMusic} />
                <span className="font-bold text-sm">#{number}</span>
            </div>
            <div className="flex flex-col">
                <h4 className="block max-w-52 sm:max-w-none font-bold text-lg text-nowrap text-ellipsis overflow-hidden text-[--c2-bg] opacity-70">
                    {title}
                </h4>
                <h3 className="block max-w-52 sm:max-w-none text-nowrap text-ellipsis overflow-hidden">
                    <b className="text-[--c1-bg]">Artista: </b>
                    <span className="opacity-80">{artist}</span>
                </h3>
                <p className="block max-w-52 sm:max-w-none text-sm text-nowrap text-ellipsis overflow-hidden opacity-60">
                    {genre}
                </p>
            </div>
        </Link>
    );
}

function Search({ onChange }) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 items-center w-full max-w-[800px]">
            <label className="font-bold tracking-wide">Busca una canción: </label>
            <div className="flex-1 flex items-center gap-2 w-full sm:w-auto px-3 bg-black/50 rounded">
                <input
                    className="flex-1 bg-transparent py-3 outline-none"
                    placeholder="Nombre, artista o genero"
                    type="text"
                    onChange={onChange}
                />
                <FontAwesomeIcon className="opacity-80" icon={faSearch} />
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
