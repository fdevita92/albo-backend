const Service = require('../models/service');

module.exports = {
  //# create a note
  create: async (request, reply) => {
    try {
      const service = request.body;
      //console.log(request.body)
      const newService = await Service.create(service);
      reply.code(201).send(newService);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#get the list of notes
  fetch: async (request, reply) => {
    try {
      //sort
      //console.log(request.query)
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
      q = filter_data["q"];
      services = null;

      console.log(filter);

      query = [];

      if(q){
        //query.push({name:q})
        query.push({"name":{ $regex: q, $options:"i"}});
      }

      if(location){
        query.push({"location":{ $regex: location, $options:"i"}});
      }

      if(type_of_services){
        query.push({"type_of_services":{ $all: type_of_services}});
      }
      //console.log(query);

      if(query.length > 0){
        services = await Service.find().and(query).sort({[field]:order});
        reply.code(200).send(services);
      }else{
        services = await Service.find({}).sort({[field]:order})
        reply.code(200).send(services);
      }
      
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#get a single note
  get: async (request, reply) => {
    try {
      const serviceId = request.params.id;
      const service = await Service.findById(serviceId);
      reply.code(200).send(service);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#update a note
  update: async (request, reply) => {
    try {
      const serviceId = request.params.id;
      const updates = request.body;
      //console.log(updates);
      await Service.findByIdAndUpdate(serviceId, updates);
      const serviceToUpdate = await Service.findById(serviceId);
      reply.code(200).send({data: {...serviceToUpdate, id:serviceId}});
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#delete a note
  delete: async (request, reply) => {
    try {
      const serviceId = request.params.id;
      const serviceToDelete = await Service.findById(serviceId);
      await Service.findByIdAndDelete(serviceId);
      reply.code(200).send({ data: serviceToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

};
