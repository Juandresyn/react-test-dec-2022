import {
  render, screen, waitFor, fireEvent, act,
} from '@testing-library/react';
import { useFetch } from 'use-http';
import Reservations from '../src/components/Reservations';
import Create from '../src/components/Reservations/Create';
import { reservations } from '../src/mockData';
import * as utils from '../src/utils';

jest.mock('use-http');

jest.mock('react-datepicker/dist/react-datepicker.css', () => ({
  __esModule: true,
  default: {
    class1: 'class1',
  },
}));

describe('Test <Reservations /> component', () => {
  useFetch.mockReturnValue({
    get: () => ({ data: reservations }),
    post: () => null,
    del: () => null,
    response: { ok: true },
    loading: false,
  });

  test('Should call endpoint', async () => {
    let Render;

    act(() => {
      Render = render(<Reservations />);
    });

    await waitFor(() => {
      const plainHTML = Render.asFragment();
      expect(plainHTML).toMatchSnapshot();

      const carsCount = screen.getByText(`${reservations.length} reservations found`);
      expect(carsCount).toBeTruthy();
    });
  });

  test('Should open <Create /> component', async () => {
    let Render;

    act(() => {
      Render = render(<Reservations />);
    });

    await waitFor(() => {
      fireEvent.click(Render.container.querySelector('[role="button"]'));

      const button = screen.getByRole('button', {
        name: /hide form/i,
      });

      expect(button).toBeTruthy();
    });
  });
});

describe('Test <Create /> component', () => {
  test('<Create /> component should pass data on submit', async () => {
    const createDataMock = {
      userId: 1,
      carId: '2',
      from: null,
      to: null,
      notes: 'Lorem ipsum dolor sit',
    };
    let Render;
    const handleSubmitMock = jest.fn();

    act(() => {
      Render = render(<Create submit={handleSubmitMock} />);
    });

    await waitFor(() => {
      const inputId = Render.container.querySelector('[name="user"]');
      fireEvent.change(inputId, { target: { value: createDataMock.userId } });

      expect(inputId.value).toBe(createDataMock.userId.toString());

      const inputName = Render.container.querySelector('[name="car"]');
      fireEvent.change(inputName, { target: { value: createDataMock.carId } });

      expect(inputName.value).toBe(createDataMock.carId.toString());

      const inputNotes = Render.container.querySelector('[name="notes"]');
      fireEvent.change(inputNotes, { target: { value: createDataMock.notes } });

      expect(inputNotes.value).toBe(createDataMock.notes);

      // eslint-disable-next-line no-import-assign
      utils.transformDate = jest.fn(() => null);

      fireEvent.click(Render.container.querySelector('[role="button"]'));

      expect(handleSubmitMock).toBeCalledWith(createDataMock);
    });
  });
});
