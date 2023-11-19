import { useRef, useEffect, useState, forwardRef } from "react";

const InputText = forwardRef(function ( { id, label, type="text", placeholder="" }, ref ) {

  return (
    <div style={{ margin: "8px", padding: "8px" }}>
        <label htmlFor={id} style={{ marginRight:"8px" }} >{label}</label>: &nbsp;
        <input type={type} style={{ borderRadius:"4px", height:"21px", padding:"3px" }} id={id} ref={ref} placeholder={placeholder} />
    </div>
  );
});

export default InputText