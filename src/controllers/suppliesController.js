const Supply = require('../models/Supply');

module.exports = {
  //# create a note
  create: async (request, reply) => {
    try {
      const supply = request.body;

      const newSupply = await Supply.create(supply);
      reply.code(201).send(newSupply);
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
      categories = filter_data["categories"];
      q = filter_data["q"];
      vat_number = filter_data["vat_number"];
      taxcode = filter_data["taxcode"];
      supplies = null;

      //console.log(filter);

      query = [];

      if(q){
        //query.push({name:q})
        query.push({"name":{ $regex: q, $options:"i"}});
      }

      if(location){
        query.push({"location":{ $regex: location, $options:"i"}});
      }

      if(categories){
        categories.forEach(element => {
          if(element)
            query.push({"categories":{ $elemMatch: { $regex: element, $options:"i"}}});
        });
        //query.push({"categories":{ $all: categories}});
      }

      if(vat_number){
        query.push({"vat_number":{ $regex: vat_number}});
      }

      if(taxcode){
        query.push({"taxcode":{ $regex: taxcode}});
      }

      if(query.length > 0){
        supplies = await Supply.find().and(query).sort({[field]:order});
        reply.code(200).send(supplies);
      }else{
        supplies = await Supply.find({}).sort({[field]:order})
        reply.code(200).send(supplies);
      }
      
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#get a single note
  get: async (request, reply) => {
    try {
      const supplyId = request.params.id;
      const supply = await Supply.findById(supplyId);
      reply.code(200).send(supply);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#update a note
  update: async (request, reply) => {
    try {
      const supplyId = request.params.id;
      const updates = request.body;

      await Supply.findByIdAndUpdate(supplyId, updates);
      const supplyToUpdate = await Supply.findById(supplyId);
      reply.code(200).send({data: {...supplyToUpdate, id:supplyId}});
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  //#delete a note
  delete: async (request, reply) => {
    try {
      const supplyId = request.params.id;
      const supplyToDelete = await Supply.findById(supplyId);
      await Supply.findByIdAndDelete(supplyId);
      reply.code(200).send({ data: supplyToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  },

};
