import React, { useState } from "react";
import "./styles.css";

const FileInput = ({accept, id, fileHandleFnc, text}) => {
    const [fileSelected, setFileSelected] = useState("");
    const onChange = (e) => {
        console.log(e.target.files);
        setFileSelected(e.target.files[0].name);
        fileHandleFnc(e.target.files[0]);
    }
    return(
        <>
            <label htmlFor={id} className={`custom-input ${!fileSelected ? "label-input" : "active"}`}>{fileSelected ? `The File ${fileSelected} was Selected` : text}</label>
            <input type="file" accept={accept} id={id} onChange={onChange} style={{display:"none"}} />
        </>
    );
}
export default FileInput;