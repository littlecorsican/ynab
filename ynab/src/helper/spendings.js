

export const calculateSpendingText=({available, targetType, targetAmount, targetInterval})=>{

    if (available && targetAmount && targetType && targetInterval) {
        switch(parseInt(targetType)) {
            case 0:
                // console.log("yyy", targetType, available,  targetAmount)
                if (available >= targetAmount) {
                    return {
                        message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                    }
                }
                return {
                    message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is needed'
                }
                break;
            case 1:
                if (available >= targetAmount) {
                    return {
                        message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                    }
                }
                return {
                    message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is needed eventually'
                }
                break;
            case 2:
                if (available >= targetAmount) {
                    return {
                        message: `$${parseFloat(targetAmount)} needed --- Fully funded`
                    }
                }
                return {
                    message: '$' + (parseFloat(targetAmount) - parseFloat(available)) + ' more is needed this month'
                }
                break;
            break;
            default:
            // code block
        }
    }
    return { message: ""}
}
