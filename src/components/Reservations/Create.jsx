import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'use-http';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { transformDate } from '../../utils';
import { ENDPOINT_BASE_URL, USER_EP, CARS_EP } from '../../config/api';

function CreateReservation({ submit }) {
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [notes, setNotes] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userList, setUserList] = useState([]);
  const [carList, setCarList] = useState([]);

  /**
   * Initialize useFetch
   */
  const {
    get, response,
  } = useFetch(ENDPOINT_BASE_URL, { data: [] });

  /**
   * Load users from endpoint
   */
  const loadUsers = useCallback(async () => {
    const Users = await get(USER_EP);
    if (response.ok) setUserList(Users.data);
  }, [get, response]);

  /**
   * Load cars from endpoint
   */
  const loadCars = useCallback(async () => {
    const Cars = await get(CARS_EP);
    if (response.ok) setCarList(Cars.data);
  }, [get, response]);

  /**
   * componentDidMount
   */
  useEffect(() => { loadUsers(); }, [loadUsers]);

  /**
   * componentDidMount
   */
  useEffect(() => { loadCars(); }, [loadCars]);

  /**
   * Default object representation
   */
  const responseBody = {
    userId: '',
    carId: '',
    from: null,
    to: null,
    notes: '',
  };

  /**
   * Handle form submit
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    responseBody.userId = parseInt(user, 10);
    responseBody.carId = car;
    responseBody.from = transformDate(startDate);
    responseBody.to = transformDate(endDate);
    responseBody.notes = notes;

    submit(responseBody);
  };

  /**
   * Handle form when and input changes its value.
   */
  const inputChangeHandler = (setFunction, event) => setFunction(event.target.value);

  return (
    <form className="form CreateReservation" onSubmit={handleSubmit}>
      <div className="form__wrapper">
        <div className="form__group">
          { userList.length > 0
            ? (
              <select name="user" id="User" onChange={(e) => inputChangeHandler(setUser, e)}>
                { userList.map((o) => <option value={o.client} key={`user__${o.client}`}>{ `${o.name} ${o.lastname} - (${o.id})` }</option>) }
              </select>
            )
            : <input type="text" placeholder="User" name="user" onChange={(e) => inputChangeHandler(setUser, e)} />}
          { userList.length > 0
            ? (
              <select name="car" id="Car" onChange={(e) => inputChangeHandler(setCar, e)}>
                { carList.map((o) => <option value={o.carId} key={`car__${o.id}`}>{ `${o.id} ${o.maker} ${o.ref}` }</option>) }
              </select>
            )
            : <input type="text" placeholder="Car" name="car" onChange={(e) => inputChangeHandler(setCar, e)} />}
        </div>
        <div className="form__group">
          <DatePicker
            selected={startDate}
            showTimeSelect
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            selectsStart
            showDisabledMonthNavigation
            endDate={endDate}
            placeholderText="From"
          />
          <DatePicker
            selected={endDate}
            showTimeSelect
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="To"
          />
        </div>
        <textarea name="notes" id="notes" cols="30" rows="5" placeholder="Notes" onChange={(e) => inputChangeHandler(setNotes, e)} />
      </div>
      <button role="button">Create Reservation</button>
    </form>
  );
}

CreateReservation.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default CreateReservation;
