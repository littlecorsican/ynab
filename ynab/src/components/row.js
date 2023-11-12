import '../css/row.css';
import useModal from '../hooks/useModal'
import { spendingTypes } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'

function Row(props) {

    const { text1, text2, text3, text4, type, click } = props
    const { openModal, Modal, closeModal } = useModal();

  return (
    <div>
        <div className={`row-style ${type=='header'? 'row-style-header' : '' }`} onClick={()=>click ? openModal() : null} >
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
        <Modal>
            <DropDownMenu id="target" label="Select Target" list={spendingTypes} />
        </Modal>
    </div>
  );
}

export default Row;
