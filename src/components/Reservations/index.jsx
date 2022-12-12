import { useState, useCallback, useEffect } from 'react';
import useFetch, { Provider } from 'use-http';
import Table from '../Table';
import Create from './Create';

const headers = ['id', 'user', 'car', 'from', 'to'];

const transformRows = (row) => (row.user ? {
  id: row.id,
  user: `${ row.user.name } ${ row.user.lastname }`,
  car: `${ row.car.ref } ${ row.car.model } ${ row.car.color }`,
  from: row.from,
  to: row.to
} : {});

const { VITE_ENDPOINT_BASE_URL }  = import.meta.env;

function Reservations() {
  const [showForm, setShowForm] = useState(false);
  const [reservationsList, setReservationsList] = useState([]);

  const { get, post, del, response, loading, error } = useFetch(VITE_ENDPOINT_BASE_URL, { data: [] });
  const loadInitialReservations = useCallback(async () => {
    const initialReservations = await get("/api/reservations");
    if (response.ok) setReservationsList(initialReservations.data)
  }, [get, response]);

  useEffect(() => { loadInitialReservations() }, [loadInitialReservations]) // componentDidMount

  const postNewReserv = useCallback(async (data) => {
    if (!!data && !data.userId) return;
    const newReserv = await post('/api/reservations', data);

    if (response.ok) {
      setReservationsList(items => [newReserv.reservation, ...items]);
      setShowForm(showForm => false);
    }
  }, [post, response, reservationsList])

  const deleteReserv = useCallback(async (id) => {
    await del(`/api/reservations/${id}`);

    if (response.ok) {
      loadInitialReservations();
    }
  }, [del, response, reservationsList])

  const handleSubmit = async (data) => {
    postNewReserv(data);
  };



  return (
    <div className="Reservations">
      <h1 className="title__main">Manage Reservations</h1>
      <button className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create Reservation' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }

      <Table
        headers={ headers }
        items={ reservationsList.map(transformRows) }
        options={({
          remove: deleteReserv
        })}></Table>
    </div>
  )
}

export default Reservations;
