import sgMail from "@sendgrid/mail";

const { SENDGRID_SENDER } = process.env

function accountVerificationMail(user, res) {
    const message = {
        to: user.mail,
        from: "arielgonzalezayala@gmail.com",
        subject: "Confirmá tu dirección de mail",
        text: "Haz click en el link de confirmación",
        html: ` <br>
                <div align=center>
                    <img src="https://i.ibb.co/x248tXm/ATARAXIA2.png" alt="ATARAXIA2" align=center border="0">
                </div>
                <br>
                <h1 style="color: #d90541" align=center>Te damos al bienvenida a Ataraxia!</h1>
                <h2 align=center>Para poder realizar compras en nuestra tienda, necesitamos que verifiques tu mail. Por favor, <a href="http://ataraxia-front.onrender.com/verify/${user._id}/${user.verify_code}">haz click en este link.</a></h2>`
        }
    try {
        sgMail.send(message);
    } catch (error) {
        next(error)
    }
}

export default accountVerificationMail