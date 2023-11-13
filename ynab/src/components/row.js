import '../css/row.css';
import useModal from '../hooks/useModal'
import { spendingTypes, interval } from '../enums/spendings';
import DropDownMenu from '../components/DropDownMenu'
import InputText from '../components/InputText'


function Row(props) {

    const { name, details, assigned, activity, available, type, onClick } = props
    const { openModal, Modal, closeModal } = useModal();

  return (
    <div>
        {type =="header" && <div className={`row-style row-style-header`} >
            <div className="checkbox-col">
                <input type="checkbox" />
            </div>
            <div className="column-style-two">
                {name}
            </div>
            <div className="column-style-four">
                {details}
            </div>
            <div className="column-style-one">
                {assigned}
            </div>
            <div className="column-style-one">
                {activity}
            </div>
            <div className="column-style-one">
                {available}
            </div>
            </div>
        }
        {
            type == "row" && <div className={`row-style`} onClick={onClick}>
                <div className="checkbox-col">
                    <input type="checkbox" />
                </div>
                <div className="column-style-two">
                    {name}
                </div>
                <div className="column-style-four">
                    {details}
                </div>
                <div className="column-style-one">
                    {assigned}
                </div>
                <div className="column-style-one">
                    {activity}
                </div>
                <div className="column-style-one">
                    {available}
                </div>
            </div>
        }

    </div>
  );
}

export default Row;
