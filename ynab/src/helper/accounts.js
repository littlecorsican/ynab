

export const readyToAssignComments=(readyToAssignAmt)=>{
    if (readyToAssignAmt >= 0) {
        return {
            message : `$${readyToAssignAmt} ready to assign`,
            aboveZero: true
        }
    }
    return {
        message : `$${readyToAssignAmt} shortfall, you assigned more than you have`,
        aboveZero: false
    }
}