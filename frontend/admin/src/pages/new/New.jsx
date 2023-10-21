
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useFetchProductsId } from "../../hooks/useFetchProducts";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

// Obtenemos la cadena de consulta de la URL
const queryString = window.location.search;

// Creamos un objeto URLSearchParams con la cadena de consulta
const params = new URLSearchParams(queryString);

// Accedemos a los parámetros por su nombre
const id = params.get('id'); // Devuelve "valor1"

  const {data, loading}  = useFetchProductsId(id)

  return (
    <div className="new">
      {loading ? 'cargando': JSON.stringify(data)}
      {/* <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">f
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default New;
