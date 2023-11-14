import { useRef, useEffect, useState } from "react";
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import '../css/modals.css';

export default function AddAccountModalContent ({ addAccounts, closeModal }) {

    const name_ref = useRef()
    const amount_ref = useRef()

    const addAccount=()=>{
        const amount = amount_ref.current.value
        if (amount === "" || amount == 0 || isNaN(amount)) {
            alert("No amount?")
            return
        }
        const name = name_ref.current.value
        if (name === "") {
            alert("No name?")
            return
        }
        addAccounts(name, amount)
        closeModal()
    }

    return (
        <div className="">
            <InputText id="name" label="Name" ref={name_ref} type="text" />
            {/* <DropDownMenu id="interval" label="Interval" list={interval} ref={interval_ref} /> */}
            <InputText id="amount" label="Amount" ref={amount_ref} type="number" />
            <button onClick={addAccount}>Create</button>
        </div>
    );
};

