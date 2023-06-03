let list = [
  { id: 1, title: 'TodoList列表', status: '0' },
  { id: 2, title: 'TodoList添加', status: '1' },
  { id: 3, title: 'TodoList编辑', status: '2' },
  { id: 4, title: 'TodoList修改状态', status: '0' },
  { id: 5, title: 'TodoList删除', status: '0' },
  { id: 6, title: 'TodoList搜索', status: '0' },
  { id: 7, title: 'TodoList总结', status: '0' },
];
export default {
  'GET /api/todolists': list,
  'POST /api/todo': (req: any, res: any) => {
    const item = {
      id: list.length + 1,
      title: req.query.todo,
      status: '0',
    };
    list.unshift(item);
    res.send({
      status: '200',
      message: '添加待办事项成功',
    });
  },
  'PUT /api/edit': (req: any, res: any) => {
    const { id, status } = req.query;
    list.map((item, index) => {
      if (item.id == id) {
        list[index].status = status;
      }
    });
    res.send({
      status: '200',
      message: '修改成功',
    });
  },
  'DELETE /api/delete': (req: any, res: any) => {
    const { id } = req.query;
    for (let i = 0; i <= list.length; i++) {
      if (list[i].id === Number(id)) {
        list.splice(i, 1);
      }
      res.send({
        status: '200',
        message: '删除成功',
      });
      return;
    }
    // list = list.filter((item) => {
    //   return item.id !== Number(id);
    // });
    // res.send({
    //   status: '200',
    //   message: '删除成功',
    // });
  },
};
