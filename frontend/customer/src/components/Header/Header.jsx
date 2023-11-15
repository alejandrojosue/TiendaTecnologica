import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import "./Header.scss";
import Search from "./Search/Search";
import { Context } from "../../utils/context";
import Cart from "../Cart/Cart";
import { useUser } from "../../services/UserContext";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [searchModal, setSearchModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { userName, setUserName } = useUser();

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const { cartCount, showCart, setShowCart } = useContext(Context);

    const handleMenuClick = () => {
        // Alternar el estado de visibilidad del menú
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Aquí puedes realizar las acciones necesarias para cerrar la sesión
        // Por ejemplo, limpiar el estado y redirigir a la página de inicio de sesión
        setTimeout(() => {
            setUserName('');
            navigate("/");
            window.location.reload();
        }, 100); // 100 milisegundos de espera
    };

    const handleLoginClick = () => {
        if (userName) {
            // Si hay un usuario autenticado, abre el menú
            handleMenuClick();
        } else {
            // Si no hay un usuario autenticado, redirige a la página de inicio de sesión
            navigate("/login");
        }
    };

    return (
        <>
            <header
                className={`main-header ${scrolled ? "sticky-header" : ""}`}
            >
                <div className="header-content">
                    <ul className="left">
                        <li onClick={() => navigate("/")}>INICIO</li>
                        <li onClick={() => navigate("/about")}>ACERCA DE</li>
                        <li>CATEGORIAS</li>
                    </ul>
                    <div className="center" onClick={() => navigate("/")}>
                        REDAX.
                    </div>
                    <div className="right">
                        <TbSearch onClick={() => setSearchModal(true)} />
                        <AiOutlineHeart />
                        <span
                            className="cart-icon"
                            onClick={() => setShowCart(true)}
                        >
                            <CgShoppingCart />
                            {!!cartCount && <span>{cartCount}</span>}
                        </span>
                        <div style={{ cursor: "pointer" }} onClick={handleLoginClick}>
                            {userName ? `Hola, ${userName}` : 'Iniciar Sesión'}
                        </div>
                        {isMenuOpen && userName && (
                        <div className="boton">
                        <button className="button" onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                        )}
                    </div>
                </div>
            </header>
            {searchModal && <Search setSearchModal={setSearchModal} />}
            {showCart && <Cart />}
        </>
    );
};

export default Header;
