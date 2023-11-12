import { useRef, useEffect, useState } from "react";

export default function TextArea({ id, label }) {

  return (
    <div className="p-4">
        <label htmlFor={id} className="mr-2" >{label}</label>: &nbsp;
        <textarea className="rounded" id={id}></textarea>
    </div>
  );
};
