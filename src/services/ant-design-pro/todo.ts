import { request } from '@umijs/max';

//get
export const getTodoLists = async () => {
  return request('/api/todolists');
};

//add
export const add = async (params: any) => {
  const url = '/api/todo';

  return request(url, { method: 'post', params });
};

//edit
export const edit = async (params: any) => {
  const url = '/api/edit';

  return request(url, { method: 'put', params });
};

//delete
export const deleteItem = async (params: any) => {
  const url = '/api/delete';

  return request(url, { method: 'delete', params });
};
