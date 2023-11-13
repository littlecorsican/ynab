import { useRef, useEffect, useState, forwardRef } from "react";

const InputText = forwardRef(function ( { id, label, type="text" }, ref ) {

  return (
    <div className="p-4">
        <label htmlFor={id} className="mr-2" >{label}</label>: &nbsp;
        <input type={type} className="rounded" id={id} ref={ref} />
    </div>
  );
});

export default InputText