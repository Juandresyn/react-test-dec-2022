import { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { transformDate } from '../../utils';

function CreateReservation({ submit }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [dob, setDob] = useState(null);

  /**
   * Default object representation
   */
  const responseBody = {
    id: '',
    name: '',
    lastname: 0,
    dob: null,
  };

  /**
   * Handle form submit
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    responseBody.id = id;
    responseBody.name = name;
    responseBody.lastname = lastname;
    responseBody.dob = transformDate(dob, false);

    submit(responseBody);
  };

  const inputChangeHandler = (setFunction, event) => setFunction(event.target.value);

  return (
    <form className="form CreateReservation" onSubmit={handleSubmit}>
      <div className="form__wrapper">
        <input type="number" placeholder="ID" name="id" onChange={(e) => inputChangeHandler(setId, e)} />
        <input type="text" placeholder="Name" name="name" onChange={(e) => inputChangeHandler(setName, e)} />
        <input type="text" placeholder="Last Name" name="lastname" onChange={(e) => inputChangeHandler(setLastname, e)} />
        <DatePicker
          selected={dob}
          onChange={(date) => setDob(date)}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="DoB"
          maxDate={Date.now()}
        />
      </div>
      <button role="button">Create User</button>
    </form>
  );
}

CreateReservation.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default CreateReservation;
