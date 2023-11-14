import { useRef, useEffect, useState } from "react";
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'
import '../css/modals.css';

export default function AddSpendingCategoryModalContent ({ addSpendingCategoryGroup, spendingCategoryGroup, closeModal }) {

    const name_ref = useRef()

    const addSpending=()=>{
        const name = name_ref.current.value
        if (name === "") {
            alert("Must input something")
            return
        }
        const find = spendingCategoryGroup.find((value)=>{
            return value.name == name
        })
        if (find) {
            alert("Category group already exist")
            return
        }
        addSpendingCategoryGroup(name)
        closeModal()
    }

    return (
        <div className="">
            <InputText id="name" label="New Category Title" ref={name_ref} type="text" />
            <button onClick={addSpending}>Create</button>
        </div>
    );
};

