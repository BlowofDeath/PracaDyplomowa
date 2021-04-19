import { FRONTEND_URL } from "./environment";
import path from "path";

export const getInvitationTemplate = (token, email) => ({
  from: '"System ewidencji praktyk" <sep@codeinq.pl>', // sender address
  to: email, // list of receivers
  subject: "Zaproszenie do rejestracji w systemie ewidencji praktyk", // Subject line
  // text: "Hello world?", // plain text body
  html: `<img src='cid:logo' /> <br/>Zaproszenie do rejestracji w systemie ewidencji praktyk zawodowych <br/> <a href="${FRONTEND_URL}/invitation/${token}">Link do rejestracji</a>`, // html body
  attachments: [
    {
      filename: "Logo.png",
      path: path.join(__dirname, "/../assets/Logo.png"),
      cid: "logo",
    },
  ],
});
