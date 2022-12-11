import { useState } from 'react';
import Table from '../Table';
import Create from './Create';
import { users, getAge } from '../../utils.js';

const headers = ['id', 'name', 'lastname', 'age'];

function Users() {
  const transformDob = (arr) => JSON.parse(JSON.stringify(arr)).map(u => {
    u.dob = getAge(u.dob);
    return u;
  });

  const [showForm, setShowForm] = useState(false);
  const [userList, setUserList] = useState(transformDob(users));

  const handleSubmit = (data) => {
    setUserList(items => [...items, ...transformDob([data])]);

    setShowForm(showForm => false);
  };

  return (
    <div className="Cars">
      <h1 className="title__main">Manage Users</h1>

      <button className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create User' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }
      <Table
        headers={headers}
        items={userList}></Table>
    </div>
  )
}

export default Users;
