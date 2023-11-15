import { useRef, useEffect, useState, forwardRef } from "react";
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import '../css/modals.css';

const AddTargetModalContent = forwardRef(function ( {selectedSpending, spendings, setSpendings, closeModal }, ref ) {

    const amount_needed_ref = useRef()
    const target_pick_ref = useRef()
    const interval_ref = useRef()
    const [showToggleEdit, setShowToggleEdit] = useState(false)
  
    const toggleEdit=()=>{
        setShowToggleEdit(!showToggleEdit)
    }

    const setSpendingDetails=()=>{
        setSpendings( 
            spendings.map((value=>{
            if (value.name == selectedSpending.name && value.categoryGroup == selectedSpending.categoryGroup) {
                return {
                ...value,
                target: {
                    type: target_pick_ref.current.value,
                    amount: amount_needed_ref.current.value,
                    //interval: interval_ref.current.value,
                    interval: 1
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
            <h3>Type: {selectedSpending?.target?.type ? spendingTypes[selectedSpending?.target?.type] : "Not yet define"}</h3>
            <h3>Amount: {selectedSpending?.target?.amount || "Not yet define"}</h3>
            <h3>Interval: {interval[selectedSpending?.target?.interval] || "Not yet define"} </h3>
            <span style={{ textDecoration:"underline", cursor:"pointer" }} onClick={toggleEdit}>Edit</span>
            <div style={{ display: showToggleEdit ? "block" : "none" }}>
                <DropDownMenu id="target_pick" label="Select Target" list={spendingTypes} defaultValue={selectedSpending?.target?.type||0} ref={target_pick_ref} />
                <InputText id="amount_needed" label="Amount Needed" ref={amount_needed_ref} type="number" />
                {/* {(target_pick_ref?.current?.value == 0 || target_pick_ref?.current?.value == 3) && <div><DropDownMenu id="interval" label="Interval" list={interval} ref={interval_ref} onChange={()=>{
                    switch(interval_ref.current.value) {
                        case "0":

                        break;
                        case "1":

                        break;
                        default:
                        // code block
                    }
                }}/>
                </div>} */}
                <div style={{ color:"red" }}>CURRENTLY FOR INTERVAL ONLY END OF MONTH IS AVAILABLE. HAVENT GOT TIME TO CODE THE REST</div>
                <button onClick={setSpendingDetails}>Save Target</button>
            </div>
        </div>
    );
});

export default AddTargetModalContent