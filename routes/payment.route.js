const router = require("express").Router();

const stripe = require("stripe")('sk_test_51MaNalGdyr4z0iOx4jCi5kMGaFGjF5GHGcsPw5WqcA5EqkqvBUDXlZvmFACbnRriL9iBR8aANcBjmQI8GUHAjr2100C2cEbngR')
const cors = require("cors")


/* istanbul ignore next */
router.post("/payment", cors(), async (req, res) => {
  let { amount, id, description } = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description,
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment)
    res.json({
      message: "Payment successful",
      success: true
    })
  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment failed",
      success: false
    })
  }
})

module.exports=router;
