import { useFetchProductsId } from "../../hooks/useFetchProducts";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./view.scss";
import { Link } from 'react-router-dom';

const FoundProduct = ({ inputs, title }) => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get('id');
    const { data, loading } = useFetchProductsId(id)

    return (
        <div className="new1">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="newContainer1">
                <div>
                    <Navbar />
                </div>
                <p className="title">Ver Producto</p>
                <div className="new2">
                    <div className="bottom1">
                        <div style={{ textAlign: 'right', marginBottom: "20px" }}>
                            <label style={{ alignitems: "center", gap: "10px", marginbottom: "10px" }}>
                                Activo: &nbsp;
                                {data && data.asset && (
                                    <input
                                        type="checkbox"
                                        checked={data.asset || false}
                                        onChange={(event) => this.setState({ asset: event.target.checked })}
                                        className="chekbox1"
                                        readOnly
                                    />
                                )}
                                {data && (data.asset || <input
                                    type="checkbox"
                                    checked={data.asset || false}
                                    onChange={(event) => this.setState({ asset: event.target.checked })}
                                    className="chekbox1"
                                    readOnly
                                />)}
                            </label>
                        </div>
                        <div className="top1">
                            <label className="label1" htmlFor="id">Codigo:</label>
                            <input className="input1" type="text" value={data && data.sku ? data.sku : ''} readOnly />
                            <label className="label1" htmlFor="nombre">Nombre:</label>
                            <input className="input1" type="text" value={data && data.name ? data.name : ''} readOnly />
                            <label className="label1" htmlFor="precioc">Precio de Compra:</label>
                            <input className="input1" type="number" value={data ? data.priceC : ''} readOnly />
                        </div>
                        <br />
                        <div className="top2">
                            <label className="label1" htmlFor="descripcion">Descripcion:</label>
                            <input className="input2" type="text" value={data && data.description ? data.description : ''} readOnly />
                            <label className="label1" htmlFor="preciov">Precio de venta:</label>
                            <input className="input3" type="number" value={data && data.priceV ? data.priceV : ''} readOnly />
                        </div>
                        <br />
                        <div className="down">
                            <div className="left1">
                                {data && data.img && (
                                    <img src={`http://localhost:1337${data.img}`} alt="Mi Imagen" />
                                )}
                            </div>
                            <div className="right1">
                                <div className="contenido-derecha ">
                                    <label className="label3" htmlFor="model">Modelo:</label>
                                    <input className="input4" style={{ width: "300px" }} type="text" value={data && data.model ? data.model : ''} readOnly />
                                    <label className="label3" htmlFor="isv">ISV:</label>
                                    <input className="input4" style={{ width: "300px" }} type="number" value={data && data.tax ? data.tax : ''} readOnly />
                                    <label className="label3"></label>
                                    <label className="label2" htmlFor="descuento">Descuento:</label>
                                    <input className="input4" style={{ width: "50px" }} type="number" value={data && data.discount !== null ? data.discount : ''} readOnly />
                                    <label className="label2" htmlFor="existencia">Existencia:</label>
                                    <input className="input4" style={{ width: "50px" }} type="number" value={data && data.existence ? data.existence : ''} readOnly />
                                    <label className="label3" htmlFor="marca">Marca:</label>
                                    <input className="input4" style={{ width: "300px" }} type="text" value={data && data.brand ? data.brand : ''} readOnly />
                                    <label className="label3"></label>
                                    <Link to="/products">
                                        <button className="button1">Volver</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FoundProduct;