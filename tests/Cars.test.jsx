import {
  render, screen, waitFor, fireEvent, act,
} from '@testing-library/react';
import { useFetch } from 'use-http';
import Cars from '../src/components/Cars';
import Create from '../src/components/Cars/Create';
import { cars } from '../src/mockData';

jest.mock('use-http');

describe('Test <Car /> component', () => {
  useFetch.mockReturnValue({
    get: () => ({ data: cars }),
    post: () => null,
    del: () => null,
    response: { ok: true },
    loading: false,
  });

  test('Should call endpoint', async () => {
    let Render;

    act(() => {
      Render = render(<Cars />);
    });

    await waitFor(() => {
      const plainHTML = Render.asFragment();
      expect(plainHTML).toMatchSnapshot();

      const carsCount = screen.getByText(`${cars.length} cars found`);
      expect(carsCount).toBeTruthy();
    });
  });

  test('Should open <Create /> component', async () => {
    let Render;

    act(() => {
      Render = render(<Cars />);
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
      color: 'red',
      id: '1234567890',
      maker: 'mazda',
      model: '2015',
      milage: '15378',
      ref: 'cx-5',
    };
    let Render;
    const handleSubmitMock = jest.fn();

    act(() => {
      Render = render(<Create submit={handleSubmitMock} />);
    });

    await waitFor(() => {
      const inputId = Render.container.querySelector('[name="id"]');
      fireEvent.change(inputId, { target: { value: createDataMock.id } });

      expect(inputId.value).toBe(createDataMock.id);

      const inputMaker = Render.container.querySelector('[name="maker"]');
      fireEvent.change(inputMaker, { target: { value: createDataMock.maker } });

      expect(inputMaker.value).toBe(createDataMock.maker);

      const inputModel = Render.container.querySelector('[name="Model"]');
      fireEvent.change(inputModel, { target: { value: createDataMock.model } });

      expect(inputModel.value).toBe(createDataMock.model);

      const inputRef = Render.container.querySelector('[name="Ref"]');
      fireEvent.change(inputRef, { target: { value: createDataMock.ref } });

      expect(inputRef.value).toBe(createDataMock.ref);

      const inputColor = Render.container.querySelector('[name="Color"]');
      fireEvent.change(inputColor, { target: { value: createDataMock.color } });

      expect(inputColor.value).toBe(createDataMock.color);

      const inputMilage = Render.container.querySelector('[name="Milage"]');
      fireEvent.change(inputMilage, { target: { value: createDataMock.milage } });

      expect(inputMilage.value).toBe(createDataMock.milage);

      fireEvent.click(Render.container.querySelector('[role="button"]'));
      expect(handleSubmitMock).toBeCalledWith(createDataMock);
    });
  });
});
