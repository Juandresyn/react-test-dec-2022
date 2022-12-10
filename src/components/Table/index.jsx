import './Table.css'

const deconstructItem = (item) => Object.values(item);

function Table({ headers, items }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    { headers.map((h, index) => <th key={`th_${index}`}>{ h.toUpperCase() }</th>) }
                </tr>
            </thead>
            <tbody>
                { items.map((i, index) => {
                    return (
                        <tr key={`item_${index}`}>
                         { deconstructItem(i).map((value, index) => <td key={`td_${index}`}>{ value }</td> ) }
                        </tr>        
                    )
                }) }
            </tbody>
        </table>
    )
}

export default Table;