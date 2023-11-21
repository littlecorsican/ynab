import { useRef, useEffect, useState } from "react";
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import InputMonth from '../components/InputMonth'
import '../css/modals.css';
import { calculateDiffMonth, calculateMonthlyRepayment, calculateNumberOfTerms, addZeroIfSingleDigit } from '../helper/loans'

export default function AddLoanTargetModalContent ({ setLoans, loans, selectedLoan, closeModal }) {

    const [remaining, setRemaining] = useState(0) // remaining terms expressed in number , number of months
    const [interestAmount, setInterestAmount] = useState(0) // total interest amount, expressed in number,
    // const [monthlyRepayment, setMonthlyRepayment] = useState(0)

    const monthly_payment_ref = useRef()
    const pay_off_date_ref = useRef()
    const every_ref = useRef()

    const days_in_month = new Array(31).fill().map((value, index)=>{
        return {
            id : index,
            title: `${index+1}th`
        }
    })

    const onPayOffDateChange=()=>{
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
        monthly_payment_ref.current.value = monthlyRepayment
    }

    const onPaymentRefChange=()=>{
        const minimum_payment = monthly_payment_ref.current.value
        const numberOfTerms = calculateNumberOfTerms(selectedLoan.amount, selectedLoan.interest, minimum_payment)
        console.log(numberOfTerms)
        // add months to input month
        let targetMonth = new Date().getMonth()+1
        let targetYear = new Date().getFullYear()
        for (let i=0; i < numberOfTerms; i++) {
            if (targetMonth < 12) {
                targetMonth += 1
            } else {
                targetMonth = 1
                targetYear += 1
            }
        }
        targetMonth = addZeroIfSingleDigit(targetMonth)
        pay_off_date_ref.current.value = `${targetYear}-${targetMonth}`
    }

    const addSpendingTarget=()=>{
        setLoans( 
            loans.map((value=>{
            if (value.name == selectedLoan.name) {
                return {
                ...value,
                target: {
                    monthly_payment: monthly_payment_ref.current.value,
                    remaining: pay_off_date_ref.current.value,

                }
                }
            }
            return value
            }))
        )
        closeModal()
    }

    return (
        <div className="">
            <h2>Create Loan Target</h2>
            <h3>Summary</h3>
            <p>
                <InputText id="monthly_payment" label="Monthly Payment" ref={monthly_payment_ref} type="number" onBlur={onPaymentRefChange} />
            </p>
            <p>
                <InputMonth id="payoff_date" label="Pay off Date" ref={pay_off_date_ref} onChange={onPayOffDateChange} />
            </p>
            <p>
                <DropDownMenu id="every" label="Every" ref={every_ref} list={days_in_month} />
            </p>
            <p>Minimum Payment: {selectedLoan.minimum}</p>
            <p>Time Remaining: {remaining} Months </p>
            <p>To pay monthly: {monthly_payment_ref?.current?.value}</p>
            <p>Remaining To Pay {selectedLoan.amount} </p>
            <p>Principal: {selectedLoan.amount} </p>
            <p>Interest ({selectedLoan.interest}%):  </p>
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
            <button onClick={addSpendingTarget}>Create</button>
        </div>
    );
};

