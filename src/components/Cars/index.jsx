import { useState } from 'react';
import Table from '../Table';
import Create from './Create';
import { cars } from '../../utils.js';

const headers = ['id', 'maker', 'model', 'ref', 'color', 'milage'];

function Cars() {
  const [showForm, setShowForm] = useState(false);
  const [carList, setCarList] = useState(cars);

  const handleSubmit = (data) => {
    setCarList(items => [...items, data]);

    setShowForm(showForm => false);
  };

  return (
    <div className="Cars">
      <h1 className="title__main">Manage Cars</h1>

      <button className="reservations__cta" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create Car' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }
      <Table
        headers={headers}
        items={carList}></Table>
    </div>
  )
}

export default Cars;
