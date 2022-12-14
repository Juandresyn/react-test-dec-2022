
import { render, screen, waitFor, fireEvent, userEvent, act } from "@testing-library/react";
import { useFetch } from 'use-http';
import Users from '../src/components/Users';
import Create from '../src/components/Users/Create';
import { users } from '../src/mockData';
import * as utils from '../src/utils';

jest.mock('use-http');

jest.mock('react-datepicker/dist/react-datepicker.css', () => ({
  __esModule: true,
  default: {
    class1: 'class1'
  },
}));

describe('Test <Users /> component', () => {
  const mockFetch = { useFetch };
  useFetch.mockReturnValue({
      get: () => ({ data: users }),
      post: () => null,
      del: () => null,
      response: { ok: true },
      loading: false
    });

  test('Should call endpoint', async () => {
    let Render;

    act(() => Render = render(<Users></Users>));

    await waitFor(() => {
      const plainHTML = Render.asFragment();
      expect(plainHTML).toMatchSnapshot();


      const usersCount = screen.getByText(`${ users.length } users found`);
      expect(usersCount).toBeTruthy();
    });
  });

  test('Should open <Create /> component', async () => {
    let Render;

    act(() => Render = render(<Users></Users>));

    await waitFor(() => {
      fireEvent.click(Render.container.querySelector('[role="button"]'));

      const button = screen.getByRole('button', {
        name: /hide form/i
      });

      expect(button).toBeTruthy();
    });
  });
});

describe('Test <Create /> component', () => {
  test('<Create /> component should pass data on submit', async () => {
    const createDataMock = {
      "id": "1234567890",
      "lastname": "yepes",
      "name": "juan",
      "dob": null
    };
    let Render;
    let handleSubmitMock = jest.fn();

    act(() => Render = render(<Create submit={ handleSubmitMock }></Create>));

    await waitFor(() => {
      const inputId = Render.container.querySelector('[name="id"]');
      fireEvent.change(inputId, { target: { value: createDataMock.id } })

      expect(inputId.value).toBe(createDataMock.id);

      const inputName = Render.container.querySelector('[name="name"]');
      fireEvent.change(inputName, { target: { value: createDataMock.name } })

      expect(inputName.value).toBe(createDataMock.name);

      const inputLastName = Render.container.querySelector('[name="lastname"]');
      fireEvent.change(inputLastName, { target: { value: createDataMock.lastname } })

      expect(inputLastName.value).toBe(createDataMock.lastname);

      const inputDob = Render.container.querySelector('[placeholder="DoB"]');
      fireEvent.change(inputDob, { target: { value: "1992-16-02" } })

      expect(inputDob.value).toBe("1992-16-02");

      utils.transformDate = jest.fn(() => null)

      fireEvent.click(Render.container.querySelector('[role="button"]'));

      expect(handleSubmitMock).toBeCalledWith(createDataMock);
    });
  });
});
