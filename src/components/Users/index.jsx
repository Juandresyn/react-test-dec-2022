import { useState, useCallback, useEffect } from 'react';
import useFetch, { Provider } from 'use-http';
import Table from '../Table';
import Create from './Create';
import { getAge } from '../../utils.js';

const headers = ['id', 'cedula', 'name', 'lastname', 'age'];
const { VITE_ENDPOINT_BASE_URL }  = import.meta.env;
const transformRows = (row) => (row && row.name ? {
  id: row.client,
  cedula: row.id,
  name: row.name,
  lastname: row.lastname,
  dob: getAge(row.dob)
} : {});

function Users() {
  const [showForm, setShowForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const { get, post, del, response, loading, error } = useFetch(VITE_ENDPOINT_BASE_URL, { data: [] });

  const loadInitialUsers = useCallback(async () => {
    const initialUsers = await get("/api/users");
    if (response.ok) setUserList(initialUsers.data)
  }, [get, response]);

  useEffect(() => { loadInitialUsers() }, [loadInitialUsers]) // componentDidMount

  const postNewUser = useCallback(async (data) => {
    if (!!data && !data.id) return;
    const newUser = await post('/api/users', data);

    if (response.ok) {
      setUserList(items => [newUser.data, ...items]);
      setShowForm(showForm => false);
    }
  }, [post, response, userList])

  const deleteUser = useCallback(async (id) => {
    await del(`/api/users/${id}`);

    if (response.ok) {
      setUserList(users => users.filter(c => c.id === id))
    }
  }, [del, response, userList])

  const handleSubmit = (data) => {
    postNewUser(data);
  };

  return (
    <div className="Users">
      <h1 className="title__main">Manage Users</h1>

      <button className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create User' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }
      <Table
        headers={headers}
        items={userList.map(transformRows)}
        options={({
          remove: deleteUser
        })}></Table>
    </div>
  )
}

export default Users;
