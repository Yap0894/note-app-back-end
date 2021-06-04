const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) =>{
  const {title, tags, body} = request.payload;

  const id = nanoid(16);

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNoteHandler = () =>({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) =>{
  const {id}= request.params;
  const note = notes.filter((node) => node.id === id)[0];
  if (note != undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const failResponse = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  failResponse.code(404);
  return failResponse;
};
const updateNoteByIdHanlder = (request, h) => {
  const {id} = request.params;

  const {title, tags, body} = request.payload;

  const updatedAt = new Date().toString();

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal diedit',
  });
  response.code(404);
  return response;
};

const deleteNodebyIdHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'failed',
    message: 'Catatan gagal dihapus',
  });
  response.code(404);
  return response;
};

module.exports = {addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler,
  deleteNodebyIdHandler,
  updateNoteByIdHanlder};
