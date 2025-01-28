const {Commande}=require("../models/index")
module.exports={
    getAllCommande : async (req, res) => {
      try {
        const Commandes = await Commande.findAll();
        res.send(Commandes);
      } catch (error) {
        throw error;
      }
},
addCommande: async (req, res) => {
  try {
    const body= req.body;
    const newCommande = await Commande.create(body)
    res.status(201).send({ message: "Commande is created successfully", newCommande });
  } catch (error) {
    throw error;
  }
},
  updateCommande: async (req, res) => {
    try {
      const {status,totalPrice}  = req.body;
      const body  = req.body;
      if (!body ){
        res
          .status(401)
          .send({ message: "body are  not send" });
      }
      const { id } = req.params;
      const updated = await Commande.update( {status,totalPrice}
       ,
        {   where: { id: id }
           
        }
      );
      res.status(201).send({ message: "Commande is updated successfully", updated });
    } catch (error) {
      throw error;
    }
  },
deleteCommande: async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(401).send({ message: "id is not send" });
    }
    await Commande.destroy({
      where :{
       id: id 
  },
})
    res.send({ message: "Commande is deleted successfully" });
  } 
  catch (error) {
    throw error;
  }
},
}