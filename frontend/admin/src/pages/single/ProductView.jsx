import "./productView.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import IsLoading from "../../components/isLoading/IsLoading";
import { Link } from 'react-router-dom';
import getIdUrl from "../../helpers/get-id-url";
import { useEffect } from "react";
import useProduct from "../../hooks/useProduct";
import { URL_BASE } from "../../environments/env";

const ProductView = () => {
    const id = getIdUrl()
    const { data, loading, error, handleProductId } = useProduct(id)
    // eslint-disable-next-line
    useEffect(() => handleProductId(id), [])
    if (error) return (<div>Ha ocurrido un error al obtener el producto</div>)
    return (
        <div className="container">
            <Sidebar />
            <div className="viewContainer">
                <Navbar />
                {loading && <IsLoading />}
                <div className="details">
                    <div className="detail-title">
                        <p className="title">Producto #{id}</p>
                        <label className="status">
                            Activo: &nbsp;
                            <input
                                type="checkbox"
                                checked={data && data.asset}
                                onChange={(event) => this.setState({ asset: event.target.checked })}
                                className="chekbox1"
                                readOnly />
                        </label>
                    </div>
                    <div className="detail-content col-100">
                        <div className="form">
                            <label htmlFor="id">Código:</label>
                            <input className="input1" type="text" value={data && data.sku ? data.sku : ''} readOnly />
                        </div>
                        <div className="form">
                            <label htmlFor="nombre">Nombre:</label>
                            <input className="input1" type="text" value={data && data.name ? data.name : ''} readOnly />
                        </div>
                        <div className="form">
                            <label htmlFor="precioc">Precio de Compra:</label>
                            <input className="input1" type="number" value={data ? data.priceC : ''} readOnly />
                        </div>
                        <div className="form">
                            <label className="label1" htmlFor="descripcion">Descripción:</label>
                            <input className="input2" type="text" value={data && data.description ? data.description : ''} readOnly />
                        </div>
                        <div className="form">
                            <label className="label1" htmlFor="preciov">Precio de venta:</label>
                            <input className="input3" type="number" value={data && data.priceV ? data.priceV : ''} readOnly />
                        </div>
                        {data && data.img && (
                            <img className="col-50" src={`${(data.img).includes('cloudinary') ? '' : URL_BASE}${data.img}`} alt="Mi Imagen" />
                        )}
                        <div className="detail-content">
                            <div className="form">
                                <label className="label3" htmlFor="model">Modelo:</label>
                                <input type="text" value={data && data.model ? data.model : ''} readOnly />
                            </div>
                            <div className="form">
                                <label htmlFor="isv">ISV:</label>
                                <input type="number" value={data && data.tax ? data.tax : ''} readOnly />

                            </div>
                            <div className="form">
                                <label htmlFor="descuento">Descuento:</label>
                                <input type="number" value={data && data.discount !== null ? data.discount : ''} readOnly />
                            </div>
                            <div className="form">
                                <label htmlFor="existencia col-30">Existencia:</label>
                                <input type="number" value={data && data.existence ? data.existence : ''} readOnly />
                            </div>
                            <div className="form">
                                <label htmlFor="marca">Marca:</label>
                                <input type="text" value={data && data.brand ? data.brand : ''} readOnly />
                            </div>
                            <Link className="btn" to="/products">
                                Regresar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductView;