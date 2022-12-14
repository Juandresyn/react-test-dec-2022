/**
* Returns array of values from an object
*/
const deconstructItem = (item) => Object.values(item);

function Table({ headers, items, options }) {
  /**
  * Check if table props contains remove function.
  */
  const hasRemove = !!options && !!options.remove;

  return (
    <table className="table">
      <thead>
        <tr>
          { headers.map((h, index) => <th key={`th_${index}`}>{ h.toUpperCase() }</th>) }
          { !!options ? <th>OPTIONS</th> : null }
        </tr>
      </thead>
      <tbody>
        { items.map((i, index) => {
          return (
            <tr key={`item_${index}`} id={i.id}>
              { deconstructItem(i).map((value, index) => <td key={`td_${index}`}>{ value }</td> ) }
              { hasRemove ? <td><button id={`remove__${ i.id }`} role="button" type="button" onClick={()=> options.remove(i.id)}>Remove</button></td> : null }
            </tr>
          )
        }) }
      </tbody>
    </table>
  )
}

export default Table;
