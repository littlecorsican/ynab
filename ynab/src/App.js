import logo from './logo.svg';
import './App.css';
import Row from './components/Row';
import { useState, useEffect, useContext, useRef } from 'react'
import useModal from './hooks/useModal'
import { spendingTypes, interval } from './enums/spendings';
import DropDownMenu from './components/DropDownMenu'
import InputText from './components/InputText'
import { calculateSpendingText } from './helper/spendings'
import { readyToAssignComments } from './helper/accounts'

function App() {

  const amount_needed_ref = useRef()
  const target_pick_ref = useRef()
  const interval_ref = useRef()

  /**
   * account: string
   * date: date
   * payee:
   * categoryGroup:
   * outflow:
   * inflow:
  */
  const [accounts, setAccount ] = useState([
    {name:"account1", amount: 500},
    {name:"account2", amount: 500},
  ])
  const [spendings, setSpendings ] = useState([
    {name:"spending1", categoryGroup:"name", assigned: 500, available: 500, target: null },
    {name:"spending2", categoryGroup:"name", assigned: 1500, available: 1500, target: {
        type: 1,
        amount: 300,
        interval: 1
      } 
    },
    {name:"spending3", categoryGroup:"name", assigned:1500, available: 1500, target: {
        type: 1,
        amount: 500,
        interval: 1
      } 
    },
  ])
  /*
  *  name: 
  *  amount:
  *  categoryGroup:
  */
  const [spendingCategoryGroup, setSpendingCategoryGroup] = useState([
    {name:"name", list:[]}
  ])
  const [columns, setColumns] = useState(null)
  const [totalReadyToAssign, setTotalReadyToAssign] = useState(0)
  const [selectedSpending, setSelectedSpending] = useState(null)

  const addSpending=(name, amount, categoryGroup)=>{
    setSpendings([ ...spendings, {
      categoryGroup,
      name,
      available: amount,
      assigned: amount,
      target: null
    } ])
  }

  const addAccounts=(name, amount, categoryGroup)=>{
    setAccount([ ...accounts, {
      categoryGroup,
      amount,
      name
    } ])
  }

  const addSpendingCategoryGroup=(name)=>{
    setSpendingCategoryGroup([ ...spendingCategoryGroup, { name, list:[] } ])
  }

  useEffect(()=>{
    console.log("spendings", spendings)
    console.log("spendingCategoryGroup", spendingCategoryGroup)
    // const columns = spendingCategoryGroup.reduce((prev, value)=>{
    //   console.log("prev", prev, value)
    //   if (value.categoryGroup in prev) {
    //     prev[value.categoryGroup] = [...prev[value.categoryGroup], value] 
    //       return prev
    //     } 
    //     prev[value.categoryGroup] = [value]
    //     return prev
    //   }, {})

    // CALCULATE ACCOUNTS TOTAL MONEY READY TO ASSIGN
    let totalReadyToAssign = accounts.reduce((total,value)=>{
      return total += parseFloat(value.amount)
    }, 0)
    console.log("totalReadyToAssign", totalReadyToAssign)

    // PUT SPENDINGS IN THEIR RESPECTIVE CATEGORY GROUP
    const columns = spendingCategoryGroup.map((value,index)=>{
      console.log("value", value)
      let totalAssigned = 0
      let totalAvailable = 0
      value.list = []
      for (let i = 0 ; i < spendings.length; i++) {
        if (spendings[i].categoryGroup == value.name) {
          value.list.push(spendings[i])
          totalAssigned += parseFloat(spendings[i].assigned)
          totalReadyToAssign -= parseFloat(spendings[i].assigned)
          totalAvailable += parseFloat(spendings[i].available)
        } 
      }
      value.totalAssigned = totalAssigned
      value.totalAvailable = totalAvailable
      return value
    })
    setTotalReadyToAssign(totalReadyToAssign)
    console.log("columns", columns)
    setColumns(columns)
  },[accounts, spendings, spendingCategoryGroup])

  const { openModal:openAddSpendingCategoryGroupModal, Modal:AddSpendingCategoryGroupModal, closeModal:closeAddSpendingCategoryGroupModal } = useModal();
  const { openModal:openAddTargetModal, Modal:AddTargetModal, closeModal:closeAddTargetModal } = useModal();

  return (
    <div className="App">
      <div className="button-bar">
        <button>All</button>
        <button>Underfunded</button>
        <button>Overfunded</button>
        <button>Money Available</button>
      </div>
      <div className="button-bar">
        <button onClick={()=>{
          const amount = prompt("input amount")
          const categoryGroup = prompt("input category group")
          const name = prompt("input name")
          if (amount === null || !categoryGroup || !name) {
            return;
          }
          addAccounts(name, amount, categoryGroup)
        }}>Add Accounts</button>
        <button onClick={()=>{
          const amount = prompt("input amount")
          const categoryGroup = prompt("input category group")
          const find = spendingCategoryGroup.find((value)=>{
            return value.name == categoryGroup
          })
          if (!find) {
            alert("Category Group doesnt exists, create spending category group first")
            return
          }
          const name = prompt("input name")
          if (amount === null || !categoryGroup || !name) {
            return;
          }
          addSpending(name, amount, categoryGroup)
        }}>Add Spending</button>
        <button onClick={()=>{
          const name = prompt("input name")
          if (!name) {
            return;
          }
          const find = spendingCategoryGroup.find((value)=>{
            return value.name == name
          })
          if (find) {
            alert("Category group already exist")
            return
          }
          addSpendingCategoryGroup(name)
        }}>Add Spending Category Group</button>
      </div>
      <div>
        <h2>Ready to assign</h2>
        <div>
          {readyToAssignComments(totalReadyToAssign).message}
        </div>
        <h2>Budget</h2>
        {
          accounts.map((value)=>{
            return <div>{value.name}  {value.amount}</div>
          })
        }
        <h2>Spending</h2>
        <Row name="Category" type="header" assigned="Assigned" activity="Activity" available="Available" details="Comments" />
        {
          columns && columns.map((value, index)=>{
            console.log("value", value)
            return <div>
              <Row 
                key={value.name} 
                name={value.name}
                type="header"
                assigned={`$${value.totalAssigned||0}`}
                activity={`$${0}`}
                available={`$${value.totalAvailable||0}`}
              />
              {
                value.list.map((value2,index)=>{
                  return <Row 
                    key={index}
                    name={value2.name}
                    assigned={`$${value2.assigned||0}`}
                    activity={`$${0}`}
                    available={`$${value2.available||0}`}
                    //details={`${value2?.target ? '$' + (parseFloat(value2?.target?.amount) - parseFloat(value2.available)) + ' more is needed' : ""}`}
                    details={calculateSpendingText({
                      available: value2.available,
                      targetAmount: value2?.target?.amount,
                      targetType: value2?.target?.type,
                      targetInterval: value2?.target?.interval
                    }).message}
                    type="row"
                    onClick={()=>{
                      setSelectedSpending(value2)
                      openAddTargetModal()
                    }}
                  />
                })
              }
            </div>
          })
        }
      </div>
      <AddSpendingCategoryGroupModal>
        
      </AddSpendingCategoryGroupModal>
      {
        <AddTargetModal>
          <h3>Current Type: {selectedSpending?.target?.type ? spendingTypes[selectedSpending?.target?.type] : "Not yet define"}</h3>
          <h3>Amount: {selectedSpending?.target?.amount || "Not yet define"}</h3>
          <h3> Interval: {interval[selectedSpending?.target?.interval] || "Not yet define"} </h3>
          <DropDownMenu id="target_pick" label="Select Target" list={spendingTypes} defaultValue={selectedSpending?.target?.type||0} ref={target_pick_ref} />
          <InputText id="amount_needed" label="Amount Needed" ref={amount_needed_ref} type="number" />
          <DropDownMenu id="interval" label="Interval" list={interval} ref={interval_ref} />
          <button onClick={()=>{
            setSpendings( 
              spendings.map((value=>{
                if (value.name == selectedSpending.name && value.categoryGroup == selectedSpending.categoryGroup) {
                  return {
                    ...value,
                    target: {
                      type: target_pick_ref.current.value,
                      amount: amount_needed_ref.current.value,
                      interval: interval_ref.current.value
                    }
                  }
                }
                return value
              }))
            )
            closeAddTargetModal()
          }}>Save Target</button>
        </AddTargetModal>
      }
    </div>
  );
}

export default App;
