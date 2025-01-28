const {Category}=require("../models/index")
module.exports={
    getAllCategory : async (req, res) => {
      try {
        const Categorys = await Category.findAll();
        res.send(Categorys);
      } catch (error) {
        throw error;
      }
},
addCategory: async (req, res) => {
  try {
    const body= req.body;
    const newCategory = await Category.create(body);
    res.status(201).send({ message: "Category is created successfully", newCategory });
  } catch (error) {
    throw error;
  }
},
  updateCategory: async (req, res) => {
    try {
      const {name,createdAt,updatedAt}  = req.body;
      const body  = req.body;
      if (!body ){
        res
          .status(401)
          .send({ message: "body are  not send" });
      }
      const { id } = req.params;
      const updated = await Category.update( {name,createdAt,updatedAt}  
       ,
        {   where: { id: id }
           
        }
      );
      res.status(201).send({ message: "Category is updated successfully", updated });
    } catch (error) {
      throw error;
    }
  },
deleteCategory: async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(401).send({ message: "id is not send" });
    }
    await Category.destroy({
      where :{
       id: id 
  },
})
    res.send({ message: "Category is deleted successfully" });
  } 
  catch (error) {
    throw error;
  }
},
}