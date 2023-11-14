import { useRef, useEffect, useState } from "react";

export default function TextArea({ id, label }) {

  return (
    <div style={{ margin: "8px", padding: "8px" }}>
        <label htmlFor={id} style={{ marginRight:"8px" }} >{label}</label>: &nbsp;
        <textarea className="rounded" id={id}></textarea>
    </div>
  );
};
