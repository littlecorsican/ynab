import logo from './logo.svg';
import './App.css';
import Row from './components/Row';
import { useState, useEffect, useContext } from 'react'
import useModal from './hooks/useModal'
import { spendingTypes } from './enums/spendings';
import DropDownMenu from './components/DropDownMenu'

function App() {

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
    {name:"spending1", categoryGroup:"name", amount: 500, available: 500, target: null },
    {name:"spending2", categoryGroup:"name", amount: 1500, available: 1500, target: null },
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
  const [totalAmt, setTotalAmt] = useState(0)

  const addSpending=(name, amount, categoryGroup)=>{
    setSpendings([ ...spendings, {
      categoryGroup,
      amount,
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
    const totalAmt = accounts.reduce((total,value)=>{
      return total += parseFloat(value.amount)
    }, 0)
    setTotalAmt(totalAmt)

    // PUT SPENDINGS IN THEIR RESPECTIVE CATEGORY GROUP
    const columns = spendingCategoryGroup.map((value,index)=>{
      console.log("value", value)
      let totalAmt = 0
      let totalAvailable = 0
      value.list = []
      for (let i = 0 ; i < spendings.length; i++) {
        if (spendings[i].categoryGroup == value.name) {
          value.list.push(spendings[i])
          totalAmt += parseFloat(spendings[i].amount)
          totalAvailable += parseFloat(spendings[i].available)
        } 
      }
      value.totalAmt = totalAmt
      value.totalAvailable = totalAvailable
      return value
    })
    console.log("columns", columns)
    setColumns(columns)
  },[accounts, spendings, spendingCategoryGroup])

  const { openModal:openAddSpendingCategoryGroupModal, Modal:AddSpendingCategoryGroupModal, closeModal:closeAddSpendingCategoryGroupModal } = useModal();

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
          addSpending(name, amount, categoryGroup)
        }}>Add Spending</button>
        <button onClick={()=>{
          const name = prompt("input name")
          addSpendingCategoryGroup(name)
        }}>Add Spending Category Group</button>
      </div>
      <div>
        <h2>Ready to assign</h2>
        <div>
          {totalAmt}
        </div>
        <h2>Budget</h2>
        {
          accounts.map((value)=>{
            return <div>{value.name}  {value.amount}</div>
          })
        }
        <h2>Spending</h2>
        <Row text1="Category" type="header" text2="Assigned" text3="Activity" text4="Available" />
        {
          columns && columns.map((value, index)=>{
            console.log("value", value)
            return <div>
              <Row 
                key={value.name} 
                text1={value.name}
                type="header"
                text2={`$${value.totalAmt||0}`}
                text3={`$${0}`}
                text4={`$${value.totalAvailable||0}`}
              />
              {
                value.list.map((value2,index)=>{
                  return <Row 
                    key={index}
                    text1={value2.name}
                    text2={`$${value2.amount||0}`}
                    text3={`$${0}`}
                    text4={`$${value2.available||0}`}
                    click={true}
                  />
                })
              }
            </div>
          })
        }
      </div>
      <AddSpendingCategoryGroupModal>
        
      </AddSpendingCategoryGroupModal>
    </div>
  );
}

export default App;
