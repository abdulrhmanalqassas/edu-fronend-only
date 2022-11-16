import React from "react";
import  QRCode from "react-qr-code";


export default function QrCode(){
    const [id,setId]= React.useState("no-studint")
return(
    <QRCode value={"https://www.linkedin.com/in/mohamed-khaled-66636713a"} />
    )
}