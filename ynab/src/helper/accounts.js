

export const readyToAssignComments=(readyToAssignAmt)=>{
    if (readyToAssignAmt > 0) {
        return {
            message : `$${readyToAssignAmt} ready to assign`
        }
    }
    return {
        message : `$${readyToAssignAmt} shortfall, you assigned more than you have`
    }
}