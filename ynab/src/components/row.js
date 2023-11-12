import '../css/row.css';

function Row({ name, header2, header3, header4 }) {
  return (
    <div className="row-style">
        <div className="checkbox-col">
            <input type="checkbox" />
        </div>
        <div className="column-style-left">
            {name}y
        </div>
        <div className="column-style-right">
            {header2}z
        </div>
        <div className="column-style-right">
            {header3}z
        </div>
        <div className="column-style-right">
            {header4}z
        </div>
    </div>
  );
}

export default Row;
