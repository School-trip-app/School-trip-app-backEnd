const service = require('./service');

const controller = {};

controller.createSubscription = async(req, res) => {
    const { customerId, items } = req.body;
    try {
      const subscription = 
              await service.createSubscription(customerId, items);
      res.json({ response: subscription });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
};

module.exports = controller;