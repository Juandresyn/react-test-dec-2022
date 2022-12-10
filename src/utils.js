export const transformDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${year}-${month}-${day} ${hour}:${minutes}:00`
};

export const cars = [
    {
      id: "NOF123",
      maker: 'mercedes-benz',
      model: 2023,
      ref: 'GLC300',
      color: 'blue',
      milage: 31278
    },
    {
      id: "IHJ889",
      maker: 'audi',
      model: 2020,
      ref: 'Q5',
      color: 'white',
      milage: 45123
    },
    {
      id: "UUE654",
      maker: 'mazda',
      model: 2021,
      ref: 'CX-9',
      color: 'silver',
      milage: 55687
    }
];

export const reservations = [
    {
      id: "rid-20221210-000001",
      user: {
        id: '12345678',
        name: 'Juan',
        lastName: 'Yepes',
        age: '30'
      },
      car: {
        id: "NOF123",
        maker: 'mercedes-benz',
        model: 2023,
        ref: 'GLC300',
        color: 'blue',
        milage: 31278
      },
      from: '2022-12-10 10:00:00',
      to: '2022-12-20 11:00:00',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat, nibh nec egestas sodales, justo nulla sodales dolor.'
    },
    {
      id: "rid-20221210-000002",
      user: {
        id: '23456789',
        name: 'Pepito',
        lastName: 'Perez',
        age: '45'
      },
      car: {
        id: "IHJ889",
        maker: 'audi',
        model: 2020,
        ref: 'Q5',
        color: 'white',
        milage: 45123
      },
      from: '2022-12-10 10:30:00',
      to: '2022-12-20 11:10:00',
      notes: ''
    },
];