import { useState, useCallback, useEffect } from 'react';
import useFetch from 'use-http';
import Table from '../Table';
import Create from './Create';
import { ENDPOINT_BASE_URL, CARS_EP } from '../../config/api';

const headers = ['id', 'license', 'maker', 'model', 'ref', 'color', 'milage'];

/**
 * This method receives an object from an array
 * and transform it into what the <Table> component should render.
 *
 * @param {Object} row - an array item.
 * @returns Object
 */
const transformRows = (row) => (row && row.carId ? {
  id: row.carId,
  license: row.id,
  maker: row.maker,
  model: row.model,
  ref: row.ref,
  color: row.color,
  milage: row.milage,
} : {});

function Cars() {
  const [showForm, setShowForm] = useState(false);
  const [carList, setCarList] = useState([]);

  /**
   * Initialize useFetch
   */
  const {
    get, post, del, response, loading,
  } = useFetch(ENDPOINT_BASE_URL, { data: [] });
  /**
   * Load cars from endpoint
   */
  const loadInitialCars = useCallback(async () => {
    const initialCars = await get(CARS_EP);

    if (response.ok) {
      setCarList(initialCars.data);
    }
  }, [get, response]);

  /**
   * componentDidMount
   */
  useEffect(() => { loadInitialCars(); }, [loadInitialCars]);

  /**
   * send new car data to the server for creation
   */
  const postNewCar = useCallback(async (data) => {
    if (!!data && !data.id) return;
    const newCar = await post(CARS_EP, data);

    if (response.ok) {
      setCarList((items) => [newCar.data, ...items]);
      setShowForm(() => false);
    }
  }, [post, response, carList]);

  /**
   * Ask server to delete an existing car.
   */
  const deleteCar = useCallback(async (id) => {
    await del(`${CARS_EP}/${id}`);

    if (response.ok) {
      setCarList((cars) => cars.filter((c) => c.id === id));
    }
  }, [del, response, carList]);

  /**
   * Handle for when <Create> is submitted
   */
  const handleSubmit = (data) => {
    postNewCar(data);
  };

  return (
    <div className="Cars">
      <h1 className="title__main">Manage Cars</h1>

      <button role="button" type="button" className="button--wide" onClick={() => setShowForm((showFormVal) => !showFormVal)}>{ showForm ? 'Hide Form' : 'Create Car' }</button>

      { showForm ? <Create submit={(data) => handleSubmit(data)} /> : null }
      { !loading ? `${carList.length} cars found` : '' }
      <Table
        headers={headers}
        items={carList.map(transformRows)}
        options={({
          remove: deleteCar,
        })}
      />
    </div>
  );
}

export default Cars;
