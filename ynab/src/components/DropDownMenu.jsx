import { useRef, useEffect, useState, forwardRef } from "react";

const DropDownMenu = forwardRef(function ( { id, label, list, defaultValue }, ref ) {
    return (
        <div style={{ margin: "8px", padding: "8px" }}>
            <label htmlFor={id} style={{ marginRight:"8px" }} >{label}</label>: &nbsp;
            <select style={{ lineHeight:"12px", minHeight: "21px", padding:"3px", minWidth:"200px" }} id={id} defaultValue={defaultValue||0} ref={ref}>
                {
                    Array.isArray(list) && list.map((value)=>{
                        return <option key={value.id} value={value.id}>{value.title}</option>
                    })
                }
                {
                    !Array.isArray(list) && Object.entries(list).map((value)=>{
                        console.log(value)
                        return <option key={value[0]} value={value[0]}>{value[1]}</option>
                    })
                }
            </select>
        </div>
    );
});

export default DropDownMenu