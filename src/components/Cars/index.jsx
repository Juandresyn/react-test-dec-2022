import { useState, useCallback, useEffect } from 'react';
import useFetch, { Provider } from 'use-http';
import Table from '../Table';
import Create from './Create';
import { cars } from '../../utils.js';

const headers = ['id', 'license', 'maker', 'model', 'ref', 'color', 'milage'];
const { VITE_ENDPOINT_BASE_URL }  = import.meta.env;
const transformRows = (row) => (row && row.carId ? {
  id: row.carId,
  license: row.id,
  maker: row.maker,
  model: row.model,
  ref: row.ref,
  color: row.color,
  milage: row.milage
} : {});

function Cars() {
  const [showForm, setShowForm] = useState(false);
  const [carList, setCarList] = useState([]);
  const { get, post, del, response, loading, error } = useFetch(VITE_ENDPOINT_BASE_URL, { data: [] });

  const loadInitialCars = useCallback(async () => {
    const initialCars = await get("/api/cars");
    if (response.ok) setCarList(initialCars.data)
  }, [get, response]);

  useEffect(() => { loadInitialCars() }, [loadInitialCars]) // componentDidMount

  const postNewCar = useCallback(async (data) => {
    if (!!data && !data.id) return;
    const newCar = await post('/api/cars', data);

    if (response.ok) {
      setCarList(items => [newCar.data, ...items]);
      setShowForm(showForm => false);
    }
  }, [post, response, carList])

  const deleteCar = useCallback(async (id) => {
    await del(`/api/cars/${id}`);

    if (response.ok) {
      setCarList(cars => cars.filter(c => c.id === id))
    }
  }, [del, response, carList])

  const handleSubmit = (data) => {
    postNewCar(data);
  };

  return (
    <div className="Cars">
      <h1 className="title__main">Manage Cars</h1>

      <button className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create Car' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }
      <Table
        headers={headers}
        items={carList.map(transformRows)}
        options={({
          remove: deleteCar
        })}></Table>
    </div>
  )
}

export default Cars;
