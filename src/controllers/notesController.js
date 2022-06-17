const Note = require('../models/note');

module.exports = {
  //# create a note
  create: async (request, reply) => {
    try {
      const note = request.body;
      console.log(request.body)
      const newNote = await Note.create(note);
      reply.code(201).send(newNote);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#get the list of notes
  fetch: async (request, reply) => {
    try {
      //sort
      const sort = request.query.sort;
      sort_array = JSON.parse(sort);
      const field = sort_array[0];
      order = null;
      if (sort_array[1] === "ASC"){
        order = 1;
      }
      if (sort_array[1] === "DESC"){
        order = -1;
      }

      // filtering
      const filter = request.query.filter;
      filter_data = JSON.parse(filter);
      categories_not_soa = filter_data["categories_not_soa"];
      categories_soa = filter_data["categories_soa"];
      q = filter_data["q"];
      //isEmpty = JSON.stringify(filter_data) === '{}';
      notes = null;

      //console.log(filter)

      if(q && categories_not_soa && categories_soa){
        notes = await Note.find().and([{"categories_not_soa":{$all: categories_not_soa }},{name:q},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(categories_not_soa && categories_soa){
        notes = await Note.find().and([{"categories_not_soa":{$all: categories_not_soa }},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(q && categories_soa){
        notes = await Note.find().and([{"categories_soa":{ $all: categories_soa }},{name:q}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(q && categories_not_soa){
        notes = await Note.find().and([{"categories_not_soa":{ $all: categories_not_soa }},{name:q}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(categories_soa){
        notes = await Note.find({ "categories_soa":{ $all: categories_soa }}).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(categories_not_soa){
        notes = await Note.find({ "categories_not_soa":{ $all: categories_not_soa }}).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(q){
        notes = await Note.find({name:q}).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(!q){
        notes = await Note.find({}).sort({[field]:order});
        reply.code(200).send(notes);
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#get a single note
  get: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const note = await Note.findById(noteId);
      reply.code(200).send(note);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#update a note
  update: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const updates = request.body;
      await Note.findByIdAndUpdate(noteId, updates);
      const noteToUpdate = await Note.findById(noteId);
      reply.code(200).send({ data: noteToUpdate });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#delete a note
  delete: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const noteToDelete = await Note.findById(noteId);
      await Note.findByIdAndDelete(noteId);
      reply.code(200).send({ data: noteToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

};
