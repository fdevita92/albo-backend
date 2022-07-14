const Note = require('../models/Note');

module.exports = {
  //# create a note
  create: async (request, reply) => {
    try {
      const note = request.body;
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
      //console.log(request.query);
      const sort = request.query.sort;
      sort_array = JSON.parse(sort);
      const field = sort_array[0];
      order = null;
      if (sort_array[1] === "ASC"){
        order = 1;
      }else{
        order = -1;
      }

      // filtering
      const filter = request.query.filter;
      filter_data = JSON.parse(filter);
      location = filter_data["location"];
      categories_not_soa = filter_data["categories_not_soa"];
      categories_soa = filter_data["categories_soa"];
      invitedDate = filter_data["invitedDate"];
      winnerDate = filter_data["winnerDate"];
      q = filter_data["q"];
      notes = null;

      //console.log(filter);

      query = [];

      if(q){
        //query.push({name:q})
        query.push({"name":{ $regex: q, $options:"i"}});
      }

      if(location){
        query.push({"location":{ $regex: location, $options:"i"}});
      }

      if(categories_soa){
        query.push({"categories_soa":{$all: categories_soa }});
      }

      if(categories_not_soa){
        query.push({"categories_not_soa":{$all: categories_not_soa }});
      }

      if(winnerDate){
        query.push({"winnerDate":{ $regex: winnerDate}});
      }

      if(invitedDate){
        query.push({"invitedDate":{ $regex: invitedDate}});
      }

      //console.log(query);

      if(query.length > 0){
        notes = await Note.find().and(query).sort({[field]:order});
        //console.log(notes);
        reply.code(200).send(notes);
      }else{
        notes = await Note.find({}).sort({[field]:order});
        //console.log(notes);
        reply.code(200).send(notes);
      }
      
      /*
      if(q && categories_not_soa && categories_soa){
        notes = await Note.find().and([{"categories_not_soa":{$all: categories_not_soa }},{name:q},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(q && winnerDate && invitedDate){
        notes = await Note.find().and([{"winnerDate":{ $regex: winnerDate}},{"invitedDate":{$regex: invitedDate }},{name:q}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && q && categories_soa){
        notes = await Note.find().and([{"winnerDate":{ $regex: winnerDate}},{name:q},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && q && categories_not_soa){
        notes = await Note.find().and([{"winnerDate":{ $regex: winnerDate}},{"categories_not_soa":{$all: categories_not_soa }},{name:q}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(invitedDate && q && categories_soa){
        notes = await Note.find().and([{"invitedDate":{ $regex: invitedDate}},{name:q},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(invitedDate && q && categories_not_soa){
        notes = await Note.find().and([{"invitedDate":{ $regex: invitedDate}},{"categories_not_soa":{$all: categories_not_soa }},{name:q}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(invitedDate && categories_not_soa && categories_soa){
        notes = await Note.find().and([{"invitedDate":{ $regex: invitedDate}},{"categories_not_soa":{$all: categories_not_soa }},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && categories_not_soa && categories_soa){
        notes = await Note.find().and([{"winnerDate":{ $regex: winnerDate}},{"categories_not_soa":{$all: categories_not_soa }},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && invitedDate && categories_soa){
        notes = await Note.find().and([{ "winnerDate":{ $regex: winnerDate}},{ "invitedDate":{ $regex: invitedDate}},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && invitedDate && categories_not_soa){
        notes = await Note.find().and([{ "winnerDate":{ $regex: winnerDate}},{ "invitedDate":{ $regex: invitedDate}},{"categories_not_soa":{ $all: categories_not_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(categories_not_soa && categories_soa){
        notes = await Note.find().and([{"categories_not_soa":{$all: categories_not_soa }},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && categories_soa){
        notes = await Note.find().and([{"winnerDate":{ $regex: winnerDate}},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && categories_not_soa){
        notes = await Note.find().and([{"winnerDate":{ $regex: winnerDate}},{"categories_not_soa":{ $all: categories_not_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(invitedDate && categories_soa){
        notes = await Note.find().and([{"invitedDate":{ $regex: invitedDate}},{"categories_soa":{ $all: categories_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(invitedDate && categories_not_soa){
        notes = await Note.find().and([{"invitedDate":{ $regex: invitedDate}},{"categories_not_soa":{ $all: categories_not_soa }}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate && invitedDate){
        notes = await Note.find().and([{ "winnerDate":{ $regex: winnerDate}},{ "invitedDate":{ $regex: invitedDate}}]).sort({[field]:order});
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

      if(q && winnerDate){
        notes = await Note.find().and([{"winnerDate":{ $regex: categories_not_soa }},{name:q}]).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(q && invitedDate){
        notes = await Note.find().and([{"invitedDate":{ $regex: invitedDate }},{name:q}]).sort({[field]:order});
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

      if(invitedDate){
        notes = await Note.find({ "invitedDate":{ $regex: invitedDate}}).sort({[field]:order});
        reply.code(200).send(notes);
      }

      if(winnerDate){
        notes = await Note.find({ "winnerDate":{ $regex: winnerDate}}).sort({[field]:order});
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
      */
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
      reply.code(200).send({data: {...noteToUpdate, id:noteId}});
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
