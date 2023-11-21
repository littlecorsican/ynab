

export const loanComments=(amount, interest)=>{
    return `Loan Amount: -${amount} \n
        Interest: ${interest}%
    `
}

export const calculateDiffMonth=(month1, year1, month2, year2)=>{
    const yearDiff = parseInt(year2)-parseInt(year1)
    if (yearDiff == 0) {
    	return month2 - month1
    }
    let monthDiff = 12 - parseInt(month1) + parseInt(month2)

    const yearMonths = (yearDiff-1) * 12
    monthDiff += parseInt(yearMonths)
    return monthDiff
}

export const calculateMonthlyRepayment=(principle, interest_rate, terms)=>{
    /**
     * principle: number
     * interest_rate: number eg 2 = 2%
     * terms: number - expressed in months, how many months do you want to repay
     */
    const monthlyRate = interest_rate / 100 / 12;
    const step1 = (monthlyRate + 1) ** terms
    const var1 = step1 - 1
    const var2 = step1 * monthlyRate
    const step2 = var1/var2
    return Math.round(principle / step2  * 100) / 100

}

export const calculateNumberOfTerms=(principle, interest_rate, minimum_payment)=>{
    /**
     * principle: number
     * interest_rate: number eg 2 = 2%
     * minimum_payment: number
     */
    const step1 = principle * (interest_rate/100/12)
    const step2 = 1 + (interest_rate/100/12)
    const step2_2 = Math.log(step2, 10)
    const step1_2 = step1 / minimum_payment
    const step1_3 = 1-step1_2
    const step1_4 = Math.log(step1_3, 10)
    return Math.round(-(step1_4 / step2_2) ) 

}