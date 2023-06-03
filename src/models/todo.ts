import { getTodoLists } from '@/services/ant-design-pro/todo';
import { useCallback, useState } from 'react';

export default () => {
  const [todoList, setTodoList] = useState([]);
  const getTodoList = useCallback(async () => {
    const resData = await getTodoLists();
    setTodoList(resData);
  }, []);
  return { todoList, getTodoList };
};
// export default {
//   namespace: 'todo',
//   state: {
//     todoList: [],
//   },
//   effects: {
//     *getTodoList(_, { call, put }) {
//       const resData = yield call(getTodoLists);
//       yield put({
//         type: 'setTodoList',
//         payload: resData,
//       });
//     },
//   },
//   reducers: {
//     setTodoList(state, { payload }) {
//       return {
//         ...state,
//         todoList: payload,
//       };
//     },
//   },
// };
