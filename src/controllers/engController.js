const EngService = require('../models/EngService');

module.exports = {
  //# create a note
  create: async (request, reply) => {
    try {
      const note = request.body;
      const newNote = await EngService.create(note);

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
      }else{
        order = -1;
      }

      // filtering
      const filter = request.query.filter;
      filter_data = JSON.parse(filter);
      location = filter_data["location"];
      type_of_services = filter_data["type_of_services"];
      invitedDate = filter_data["invitedDate"];
      winnerDate = filter_data["winnerDate"];
      q = filter_data["q"];
      vat_number = filter_data["vat_number"];
      taxcode = filter_data["taxcode"];
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

      if(type_of_services){
        query.push({"type_of_services":{$all: type_of_services }});
      }

      if(winnerDate){
        query.push({"winnerDate":{ $regex: winnerDate}});
      }

      if(invitedDate){
        query.push({"invitedDate":{ $regex: invitedDate}});
      }

      if(vat_number){
        query.push({"vat_number":{ $regex: vat_number}});
      }

      if(taxcode){
        query.push({"taxcode":{ $regex: taxcode}});
      }

      //console.log(query);

      if(query.length > 0){
        notes = await EngService.find().and(query).sort({[field]:order});
        reply.code(200).send(notes);
      }else{
        notes = await EngService.find({}).sort({[field]:order})
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
      const note = await EngService.findById(noteId);
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

  

      await EngService.findByIdAndUpdate(noteId, updates);
      const noteToUpdate = await EngService.findById(noteId);
      reply.code(200).send({data: {...noteToUpdate, id:noteId}});
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#delete a note
  delete: async (request, reply) => {
    try {
      const noteId = request.params.id;
      const noteToDelete = await EngService.findById(noteId);
      await EngService.findByIdAndDelete(noteId);
      reply.code(200).send({ data: noteToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

};
