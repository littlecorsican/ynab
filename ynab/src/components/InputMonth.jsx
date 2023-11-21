import { useRef, useEffect, useState, forwardRef } from "react";

const InputMonth = forwardRef(function ( { id, label, onChange }, ref ) {

  const thisMonth = new Date().getMonth()+1
  const thisYear = new Date().getFullYear()

  return (
    <div style={{ margin: "8px", padding: "8px" }}>
        <label htmlFor={id} style={{ marginRight:"8px" }} >{label}</label>: &nbsp;
        <input type="month" 
          style={{ borderRadius:"4px", height:"21px", padding:"3px" }}
          id={id}
          ref={ref}
          onChange={onChange}
          min={`${thisYear}-${thisMonth}`}
        />
    </div>
  );
});

export default InputMonth