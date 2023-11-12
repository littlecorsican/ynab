import { useRef, useEffect, useState } from "react";

export default function DropDownMenu({ id, label, list }) {

    return (
        <div className="p-4">
            <label htmlFor={id} className="mr-2" >{label}</label>: &nbsp;
            <select id={id}>
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
};