import { useState } from 'react';
import Table from '../Table';
import Create from './Create';
import { reservations } from '../../utils.js';

const headers = ['id', 'user', 'car', 'from', 'to'];

const transformRows = (row) => ({
  user: `${ row.user.name } ${ row.user.lastName }`,
  car: `${ row.car.ref } ${ row.car.model } ${ row.car.color }`,
  from: row.from,
  to: row.to
});

function Reservations() {
  const [showForm, setShowForm] = useState(false);
  const [reservationsList, setReservationsList] = useState(reservations);

  const handleSubmit = (data) => {
    setReservationsList(items => [...items, data]);

    setShowForm(showForm => false);
  };

  return (
    <div className="Reservations">
      <h1 className="title__main">Manage Reservations</h1>
      <button className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create Reservation' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }

      <Table
        headers={ headers }
        items={ reservationsList.map(transformRows) }></Table>
    </div>
  )
}

export default Reservations;
