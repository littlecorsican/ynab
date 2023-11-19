import { useRef, useEffect, useState } from "react";
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import '../css/modals.css';

export default function AddLoanTargetModalContent ({ selectedLoan, closeModal }) {

    const monthly_payment_ref = useRef()


    return (
        <div className="">
            <h2>Create Loan Target</h2>
            <h3>Summary</h3>
            <p>Principal: {selectedLoan.amount} </p>
            <p>Interest: {selectedLoan.interest} </p>
            <p>
                <InputText id="monthly_payment" label="Monthly Payment" ref={monthly_payment_ref} type="number" />
            </p>
            <p>Time Remaining: {} </p>
            {/* Summary
            Minimum Payment
            $100.00
            Time Remaining
            1 yr, 3 mos
            Remaining to Pay
            $1,541.36
            Principal
            $1,500.00
            Interest (4%) */}
            {/* <InputText id="name" label="Loan name" ref={name_ref} type="text" />
            <InputText id="amount" label="Amount owed" ref={amount_ref} type="number" /> */}
            <button onClick>Create</button>
        </div>
    );
};

