import { useState, useCallback, useEffect } from 'react';
import useFetch, { Provider } from 'use-http';
import Table from '../Table';
import Create from './Create';
import { getAge } from '../../utils.js';
import { ENDPOINT_BASE_URL, USER_EP } from '../../config/api';

const headers = ['id', 'cedula', 'name', 'lastname', 'age'];
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

  /**
   * Initialize useFetch
   */
  const { get, post, del, response, loading, error } = useFetch(ENDPOINT_BASE_URL, { data: [] });

  /**
   * Load users from endpoint
   */
  const loadInitialUsers = useCallback(async () => {
    const initialUsers = await get(USER_EP);
    if (response.ok) setUserList(initialUsers.data)
  }, [get, response]);

  /**
   * componentDidMount
   */
  useEffect(() => { loadInitialUsers() }, [loadInitialUsers]);

  /**
   * send new user data to the server for creation
   */
  const postNewUser = useCallback(async (data) => {
    if (!!data && !data.id) return;
    const newUser = await post(USER_EP, data);

    if (response.ok) {
      setUserList(items => [newUser.data, ...items]);
      setShowForm(showForm => false);
    }
  }, [post, response, userList]);

  /**
   * Ask server to delete an existing user
   */
  const deleteUser = useCallback(async (id) => {
    await del(`${ USER_EP }/${id}`);

    if (response.ok) {
      setUserList(users => users.filter(c => c.id === id))
    }
  }, [del, response, userList]);

  /**
   * Handle for when <Create> is submitted
   */
  const handleSubmit = (data) => {
    postNewUser(data);
  };

  return (
    <div className="Users">
      <h1 className="title__main">Manage Users</h1>

      <button role="button" className="button--wide" onClick={() => setShowForm((showForm) => !showForm)}>{ showForm ? 'Hide Form' : 'Create User' }</button>

      { showForm ? <Create submit={ (data) => handleSubmit(data) }></Create> : null }

      { !loading ? `${ userList.length } users found` : '' }
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
