const db = require("../models")

const coupons = db.coupons

const Joi = require("joi")

const schema = Joi.object({
  userId:Joi.string().optional(),
  CreatedTo:Joi.string().optional(),
    Coupons:Joi.string().required()
})
const addcoupon = async (req, res) => { 
try{
  const id = req.params.id

  let data = {
    CreatedTo :id,
    Coupons:req.body.Coupons
  }
  const  {error} = schema.validate(data)
  if(error){
    res.send(error)
  }
  else
  await coupons.create(data)
  res.send(["coupon saved sucessfully",data])
}
catch{
  res.send("invalid user id ")
}
  
  
}

module.exports={
  addcoupon
}
