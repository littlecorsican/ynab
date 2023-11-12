import '../css/row.css';
import useModal from '../hooks/useModal'
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'


function Row(props) {

    const { text1, text2, text3, text4, type, data } = props
    const { openModal, Modal, closeModal } = useModal();

  return (
    <div>
        {type =="header" && <div className={`row-style row-style-header`} >
            <div className="checkbox-col">
                <input type="checkbox" />
            </div>
            <div className="column-style-left">
                {text1}
            </div>
            <div className="column-style-right">
                {text2}
            </div>
            <div className="column-style-right">
                {text3}
            </div>
            <div className="column-style-right">
                {text4}
            </div>
            </div>
        }
        {
            type == "row" && <div className={`row-style`} onClick={()=> {
                openModal()
            }}>
                <div className="checkbox-col">
                    <input type="checkbox" />
                </div>
                <div className="column-style-left">
                    {text1}
                </div>
                <div className="column-style-right">
                    {text2}
                </div>
                <div className="column-style-right">
                    {text3}
                </div>
                <div className="column-style-right">
                    {text4}
                </div>
            </div>
        }
        {
            type == "row" && <Modal>
                <h3>Current Type: {spendingTypes[data.target]}</h3>
                <DropDownMenu id="target_pick" label="Select Target" list={spendingTypes} defaultValue={data.target||0} />
                <InputText id="amount_needed" label="Amount Needed" />
                <DropDownMenu id="interval" label="Interval" list={interval} />
            </Modal>
        }
    </div>
  );
}

export default Row;
