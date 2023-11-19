import { useRef, useEffect, useState } from "react";
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import '../css/modals.css';

export default function AddLoanModalContent ({ addLoans, closeModal }) {

    const name_ref = useRef()
    const amount_ref = useRef()
    const interest_ref = useRef()

    const addLoan=()=>{
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
        const interest = interest_ref.current.value
        if (interest === "") {
            alert("No interest?")
            return
        }
        addLoans(name, amount, interest)
        closeModal()
    }

    return (
        <div className="">
            <InputText id="name" label="Loan name" ref={name_ref} type="text" />
            <InputText id="amount" label="Amount owed" ref={amount_ref} type="number" />
            <InputText id="interest" label="Interest" placeholder="Interest in terms of %. Eg. 5%  = 5" ref={interest_ref} type="number" />
            <button onClick={addLoan}>Create</button>
        </div>
    );
};

