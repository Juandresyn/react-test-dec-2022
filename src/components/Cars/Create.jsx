import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { transformDate } from '../../utils'

const headers = ['id', 'user', 'car', 'from', 'to'];

function CreateReservation({ submit }) {
  const [id, setId] = useState(null);
  const [maker, setMaker] = useState(null);
  const [model, setModel] = useState(null);
  const [ref, setRef] = useState(null);
  const [color, setColor] = useState(null);
  const [milage, setMilage] = useState(null);

  const responseBody = {
    id: '',
    maker: '',
    model: 0,
    ref: '',
    color: '',
    milage: 0
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    responseBody.id = id;
    responseBody.maker = maker;
    responseBody.model = model;
    responseBody.ref = ref;
    responseBody.color = color;
    responseBody.milage = milage;
    
    console.log(JSON.stringify(responseBody))

    submit(responseBody);
  };

  const inputChangeHandler = (setFunction, event) => setFunction(event.target.value);

  return (
    <form className="form CreateReservation" onSubmit={handleSubmit}>
      <div className="form__wrapper">
          <input type="text" placeholder="License" name="id" onChange={(e)=>inputChangeHandler(setId, e)} />
          <input type="text" placeholder="Maker" name="maker" onChange={(e)=>inputChangeHandler(setMaker, e)} />
          <input type="text" placeholder="Model" name="Model" onChange={(e)=>inputChangeHandler(setModel, e)} />
          <input type="text" placeholder="Ref" name="Ref" onChange={(e)=>inputChangeHandler(setRef, e)} />
          <input type="text" placeholder="Color" name="Color" onChange={(e)=>inputChangeHandler(setColor, e)} />
          <input type="text" placeholder="Milage" name="Milage" onChange={(e)=>inputChangeHandler(setMilage, e)} />
      </div>
      <button>Create Car</button>
    </form>
  )
}

export default CreateReservation;
