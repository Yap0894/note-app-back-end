const {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler,
  updateNoteByIdHanlder,
  deleteNodebyIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNoteByIdHanlder,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNodebyIdHandler,
  },
];

module.exports = routes;
