/**
 * 
 * @param {targetType} param0 
 *  0: "Needed For Spending",
    1: "Savings Balance",
    2: "Monthly Savings Builder",
    3: "Monthly Debt Payment"
 * @returns 
 */

export const calculateSpendingText=({available, targetType, targetAmount, targetInterval})=>{

    if (available && targetAmount && targetType && targetInterval) {
        switch(parseInt(targetType)) {
            case 0:  //Needed For Spending
                if (available >= targetAmount) {
                    return {
                        message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                    }
                }
                return { //DEFAULT END OF MONTH
                    message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is needed by the end of this month'
                }
                break;
            case 1: // Savings Balance
                if (available >= targetAmount) {
                    return {
                        message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                    }
                }
                return {
                    message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is needed eventually'
                }
                break;
            case 2: // Monthly Savings Builder
                if (available >= targetAmount) {
                    return {
                        message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                    }
                }
                return {
                    message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is needed this month'
                }
                break;
            case 3: // Monthly Debt Payment
            if (available >= targetAmount) {
                return {
                    message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                }
            }
            return {
                message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is by the end of this month'
            }
            break;
            default:
            // code block
        }
    }
    return { message: ""}
}
