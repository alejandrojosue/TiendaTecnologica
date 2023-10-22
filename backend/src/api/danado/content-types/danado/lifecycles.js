module.exports = {
    // async afterCreate(event) {
    //     const { result } = event;

    //     const nodemailer = require('nodemailer');
    //     enviar = async () => {
    //         const config = {
    //             host: 'smtp.gmail.com',
    //             port: 587,
    //             auth: {
    //                 user: 'sistemaoperativoindependiente@gmail.com',
    //                 pass: process.env.GMAIL_KEY //'biyvxblpoqqutson'
    //             }
    //         }
    //         const mensaje = {
    //             from: 'sistemaoperativoindependiente@gmail.com',
    //             to: `${result.email}, sistemaoperativoindependiente@gmail.com`,
    //             subject: 'Reporte de compra',
    //             text: '',
    //             html: `
    //             <div style="font-family: sans-serif; border: 1px solid #444; width: 500px; padding: 10px 10px 20px; position: absolute;">
    //     <div style="width: 600px;">
    //         <span style="margin-left: 5px;">
    //             <b style="color: #3498DB; font-size: 2em;">Orden de Compra </b>
    //             &nbsp;&nbsp;
    //             <b style="background-color: #D5DBDB; padding: 5px; border-radius: 5px; font-size: 1.3em;">No. ${result.id}</b>
    //         </span>

    //     </div>
    //     <div style="padding-top: 0px;">
    //         <p style="padding: 0px 10px; color:#888; display: flex;">
    //             <b style="width: 70px;">
    //                 Cliente: </b>&nbsp;
    //             <span style="width: 370px; padding-bottom: 2px; border-bottom: 1px solid #888;">${result.CustomerName}</span>
    //         </p>
    //         <p style="padding: 0px 10px; color:#888; display: flex;">
    //             <b style="width: 70px;">
    //             Fecha:
    //             </b>&nbsp;
    //             <span style="width: 370px; padding-bottom: 2px; border-bottom: 1px solid #888;">${result.createdAt}</span>
    //         </p>
    //         <p style="padding: 0px 10px; color:#888; display: flex;">
    //             <b style="width: 70px;">
    //                 Total:
    //             </b>&nbsp;
    //             <span style="width: 370px; padding-bottom: 2px; border-bottom: 1px solid #888;">L. ${result.Amount}</span>
    //         </p>
    //     </div>
    // </div>
    //             `
    //         }
    //         try {
    //             const transport = nodemailer.createTransport(config);
    //             await transport.sendMail(mensaje);
    //         } catch (error) {
    //             console.warn(error)
    //         }
    //     }
    //     enviar();
    // },
    // async afterUpdate(event) {
    //     const { result, params } = event;
    // },
}