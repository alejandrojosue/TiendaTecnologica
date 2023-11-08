import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    let { data } = useFetch(
        `/api/productos?populate=*&filters[nombre][$contains]=${query}`
    );

    if (!query.length) {
        data = null;
    }

    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Buscar Producto"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            <div className="search-result-content">
                {!data?.data?.length && (
                    <div className="start-msg">
                        Empieza a escribir para ver los productos que buscas.
                    </div>
                )}
                <div className="search-results">
                    {data?.data?.map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                            onClick={() => {
                                navigate("/product/" + item.id);
                                setSearchModal(false);
                            }}
                        >
                            <div className="image-container">
                            <img src={!(item.attributes.img.data?.attributes.url ) ? process.env.REACT_APP_STRIPE_APP_DEV_URL +  item.attributes.img.data?.attributes.formats?.thumbnail.url : process.env.REACT_APP_STRIPE_APP_DEV_URL +  item.attributes.img.data?.attributes.url } alt="" />
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                    {item.attributes.nombre}
                                </span>
                                <span className="desc">
                                    {item.attributes.descripcion}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
