import { useRef, useEffect, useState } from "react";
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import InputMonth from '../components/InputMonth'
import '../css/modals.css';
import { calculateDiffMonth, calculateMonthlyRepayment } from '../helper/loans'

export default function AddLoanTargetModalContent ({ selectedLoan, closeModal }) {

    const [remaining, setRemaining] = useState(0)
    const [monthlyRepayment, setMonthlyRepayment] = useState(0)

    const monthly_payment_ref = useRef()
    const pay_off_date_ref = useRef()
    const every_ref = useRef()

    const days_in_month = new Array(31).fill().map((value, index)=>{
        return {
            id : index,
            title: `${index+1}th`
        }
    })

    const onChange=()=>{
        /*
            when monthly payment is changed, time remaining is adjusted
            when payoff date is changed, monthly payment is changed , time remaining is changed
            
        */
        const pay_off_date = pay_off_date_ref.current.value
        const pay_off_year = pay_off_date.split("-")[0]
        const pay_off_month = pay_off_date.split("-")[1]
        const thisMonth = new Date().getMonth()+1
        const thisYear = new Date().getFullYear()
        const diff = calculateDiffMonth(thisMonth, thisYear, pay_off_month, pay_off_year)
        setRemaining(diff)

        // TO DO 
        // CALCULATE REMAINING TO PAY AND MONTHLY PAYMENT
        const monthlyRepayment = calculateMonthlyRepayment(selectedLoan.amount, selectedLoan.interest, diff)
        setMonthlyRepayment(monthlyRepayment)
    }

    return (
        <div className="">
            <h2>Create Loan Target</h2>
            <h3>Summary</h3>
            <p>
                <InputText id="monthly_payment" label="Monthly Payment" ref={monthly_payment_ref} type="number" />
            </p>
            <p>
                <InputMonth id="payoff_date" label="Pay off Date" ref={pay_off_date_ref} onChange={onChange} />
            </p>
            <p>
                <DropDownMenu id="every" label="Every" ref={every_ref} list={days_in_month} />
            </p>
            <p>Minimum Payment: {selectedLoan.minimum}</p>
            <p>Time Remaining: {remaining} Months </p>
            <p>To pay monthly: {monthlyRepayment}</p>
            <p>Remaining To Pay {selectedLoan.amount + monthlyRepayment} </p>
            <p>Principal: {selectedLoan.amount} </p>
            <p>Interest: {selectedLoan.interest} </p>
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

