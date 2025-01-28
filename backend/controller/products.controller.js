const {Products}=require("../models/index")
module.exports={
 getAllProducts : async (req, res) => {
      try {
        const Productss = await Products.findAll();
        res.send(Productss);
      } catch (error) {
        throw error;
      }
},
addProducts: async (req, res) => {
  try {
    const body= req.body;
    const newProducts = await Products.create(body);
    res.status(201).send({ message: "Products is created successfully", newProducts });
  } catch (error) {
    throw error;
  }
},
  updateProducts: async (req, res) => {
    try {
      const {name,description,price,stock,imageUrl,createdAt,updatedAt}  = req.body;
      const body  = req.body;
      if (!body ){
        res
          .status(401)
          .send({ message: "body are  not send" });
      }
      const { id } = req.params;
      const updated = await Products.update( {name,description,price,stock,imageUrl,createdAt,updatedAt} 
       ,
        {   where: { id: id }
           
        }
      );
      res.status(201).send({ message: "Products is updated successfully", updated });
    } catch (error) {
      throw error;
    }
  },
deleteProducts: async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(401).send({ message: "id is not send" });
    }
    await Products.destroy({
      where :{
       id: id 
  },
})
    res.send({ message: "Products is deleted successfully" });
  } 
  catch (error) {
    throw error;
  }
},
}