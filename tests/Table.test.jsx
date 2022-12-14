import {
  render, screen, waitFor, act,
} from '@testing-library/react';
import Table from '../src/components/Table';
import { cars } from '../src/mockData';

const headers = ['id', 'license', 'maker', 'model', 'ref', 'color', 'milage'];

describe('Test <Table /> component', () => {
  test('Check fragment', async () => {
    let Render;

    act(() => {
      Render = render(<Table
        headers={headers}
        items={cars}
      />);
    });

    await waitFor(() => {
      const plainHTML = Render.asFragment();
      expect(plainHTML).toMatchSnapshot();
    });
  });

  test('Show render equal number of rows as items passed', async () => {
    act(() => {
      render(<Table
        headers={headers}
        items={cars}
      />);
    });

    await waitFor(() => {
      const license = screen.getByText(`${cars[0].id}`);
      const license2 = screen.getByText(`${cars[1].id}`);
      const license3 = screen.getByText(`${cars[2].id}`);

      expect(license).toBeTruthy();
      expect(license2).toBeTruthy();
      expect(license3).toBeTruthy();
    });
  });

  test('Remove button should display', async () => {
    let Render;

    act(() => {
      Render = render(<Table
        headers={headers}
        items={cars}
        options={({ remove: () => null })}
      />);
    });

    await waitFor(() => {
      const plainHTML = Render.asFragment();
      expect(plainHTML).toMatchSnapshot();

      const removeBtns = Render.container.querySelector(`#remove__${cars[0].id}`);
      expect(removeBtns).toBeTruthy();
    });
  });
});
