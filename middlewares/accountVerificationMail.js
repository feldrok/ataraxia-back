import sgMail from "@sendgrid/mail";

function accountVerificationMail(user, res) {
    const message = {
        to: user.mail,
        from: "arielgonzalezayala@gmail.com",
        subject: "Confirmá tu dirección de mail",
        text: "Haz click en el link de confirmación",
        html: `<h2>Te damos al bienvenida a Ataraxia! Por favor, clickeá el siguiente link para confirmar tu dirección de mail y unirte a nuestra página: <a href="http://localhost:3000/verify/${user._id}/${user.verify_code}">&gt;&gt;CLICK AQUI&lt;&lt;</a></h2>`
        }
    try {
        sgMail.send(message);
    } catch (error) {
        next(error)
    }
}

export default accountVerificationMail