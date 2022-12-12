import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { transformDate } from '../../utils';

function CreateReservation({ submit }) {
  const [user, setUser] = useState(null);
  const [car, setCar] = useState(null);
  const [notes, setNotes] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState();

  /**
   * Default object representation
   */
  const responseBody = {
    userId: '',
    carId: '',
    from: null,
    to: null,
    notes: ''
  };

  /**
   * Handle form submit
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    responseBody.userId = parseInt(user);
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
          <input type="text" placeholder="User" name="user" onChange={(e)=>inputChangeHandler(setUser, e)} />
          <input type="text" placeholder="Car" name="car" onChange={(e)=>inputChangeHandler(setCar, e)} />
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
          <textarea name="notes" id="" cols="30" rows="5" placeholder="Notes" onChange={(e)=>inputChangeHandler(setNotes, e)}></textarea>
      </div>
      <button>Create Reservation</button>
    </form>
  )
}

export default CreateReservation;
