import "./reportModal.scss";
import Table from '../table/TableModal'
import { CSVLink } from 'react-csv'
import exportPDFReport from '../../helpers/exportPDFReport'

const ReportModal = ({ data, handleModal, title }) => {
    const date =
        new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    return (
        <div className="loading-modal">
            <div className="loading-content">
                <button className="btnClose" onClick={handleModal}>x</button>
                {data &&
                    <>
                        <div className="content">
                            <p className="title">{title} (máx. 1000)</p>
                            <Table data={data} />
                            <div className="group">
                                <CSVLink
                                    className="btnDownload"
                                    data={data}
                                    separator={";"}
                                    filename={`${title.replaceAll(' ', '_')}${date}.csv`}
                                    onClick={handleModal}>
                                    Exportar CSV
                                </CSVLink>
                                <a
                                    href="#"
                                    className="btnDownload"
                                    onClick={() => {
                                        exportPDFReport(data, `${title.replaceAll(' ', '_')}`)
                                        handleModal()
                                    }}>
                                    Exportar PDF
                                </a>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default ReportModal