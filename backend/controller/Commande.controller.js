const { Commande, User } = require("../models/index");

module.exports = {
  getAllCommande: async (req, res) => {
    try {
      const commandes = await Commande.findAll({
        include: [
          { model: User, as: 'client' }
        ]
      });
      res.send(commandes);
    } catch (error) {
      throw error;
    }
  },
  
  addCommande: async (req, res) => {
    try {
      const body = req.body;
      const newCommande = await Commande.create(body);
      res.status(201).send({ message: "Commande is created successfully", newCommande });
    } catch (error) {
      throw error;
    }
  },
  
  updateCommande: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      if (!body) {
        res.status(401).send({ message: "Body is not sent" });
      }
      const updated = await Commande.update(body, {
        where: { id: id }
      });
      res.status(201).send({ message: "Commande is updated successfully", updated });
    } catch (error) {
      throw error;
    }
  },
  
  deleteCommande: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(401).send({ message: "ID is not sent" });
      }
      await Commande.destroy({
        where: { id: id }
      });
      res.send({ message: "Commande is deleted successfully" });
    } catch (error) {
      throw error;
    }
  }
};