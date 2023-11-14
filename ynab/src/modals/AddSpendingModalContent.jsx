import { useRef, useEffect, useState } from "react";
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import '../css/modals.css';

export default function AddSpendingModalContent ({ spendingCategoryGroup, addSpending, closeModal }) {

    const name_ref = useRef()
    const amount_ref = useRef()
    const category_group_ref = useRef()

    const createSpending=()=>{
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
        const inputCategoryGroup = category_group_ref.current.value
        const find = spendingCategoryGroup.find((value)=>{
            return value.name == inputCategoryGroup
        })
        if (!find) {
            alert("Category Group doesnt exists, create spending category group first")
            return
        }
        addSpending(name, amount, inputCategoryGroup)
        closeModal()
    }

    return (
        <div className="">
            <InputText id="name" label="Name" ref={name_ref} type="text" />
            <DropDownMenu id="spendingCategoryGroup" label="Type" list={spendingCategoryGroup.map((value)=>{
                return {
                    id: value.categoryGroup,
                    title: value.name
                }
            })} ref={category_group_ref} />
            <InputText id="amount" label="Amount" ref={amount_ref} type="number" />
            <button onClick={createSpending}>Create</button>
        </div>
    );
};

