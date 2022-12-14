import { useState, useCallback, useEffect } from 'react';
import useFetch, { Provider } from 'use-http';
import Table from '../Table';
import Create from './Create';
import { ENDPOINT_BASE_URL, RESERVATIONS_EP } from '../../config/api';

const headers = ['id', 'user', 'car', 'from', 'to'];

const transformRows = (row) => (row.user ? {
  id: row.id,
  user: `${ row.user.name } ${ row.user.lastname }`,
  car: `${ row.car.ref } ${ row.car.model } ${ row.car.color }`,
  from: row.from,
  to: row.to
} : {});

function Reservations() {
  const [showForm, setShowForm] = useState(false);
  const [reservationsList, setReservationsList] = useState([]);

  /**
   * Initialize useFetch
   */
  const { get, post, del, response, loading, error } = useFetch(ENDPOINT_BASE_URL, { data: [] });

  /**
   * Load reservations from endpoint
   */
  const loadInitialReservations = useCallback(async () => {
    const initialReservations = await get(RESERVATIONS_EP);
    if (response.ok) setReservationsList(initialReservations.data)
  }, [get, response]);

  /**
   * componentDidMount
   */
  useEffect(() => { loadInitialReservations() }, [loadInitialReservations]);

  /**
   * send new reservation data to the server for creation
   */
  const postNewReserv = useCallback(async (data) => {
    if (!!data && !data.userId) return;
    const newReserv = await post(RESERVATIONS_EP, data);

    if (response.ok) {
      setReservationsList(items => [newReserv.reservation, ...items]);
      setShowForm(showForm => false);
    }
  }, [post, response, reservationsList])

  /**
   * Ask server to delete an existing reservation.
   */
  const deleteReserv = useCallback(async (id) => {
    await del(`${ RESERVATIONS_EP }/${id}`);

    if (response.ok) {
      loadInitialReservations();
    }
  }, [del, response, reservationsList]);

  /**
   * Handle for when <Create> is submitted
   */
  const handleSubmit = async (data) => {
    postNewReserv(data);
  };

  return (
    <div className="Reservations">
      <h1 className="title__main">Manage Reservations</h1>
      <button role="button" className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create Reservation' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }

      { !loading ? `${ reservationsList.length } reservations found` : '' }

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
