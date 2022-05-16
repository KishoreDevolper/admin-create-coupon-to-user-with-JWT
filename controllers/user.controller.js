const db = require("../models")

const coupon = db.coupons


  exports.userBoard = async (req, res) => { 
    try{
    const id = req.params.id

    const  data = await coupon.findAll({
    
      where: {CreatedTo:id}, attributes:["Coupons"]
    })
    res.status(200).send(["your coupon is",data]);
  }
  catch(err){
    res.send(err)
  }
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("welcome admin !!..");
  };