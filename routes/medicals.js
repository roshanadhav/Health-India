const express = require("express")
const {Medical} = require("../modles/medicals.js")
const User = require("../modles/users.js")
const { isUserLOgedIn } = require("../middlewear.js")
const router = express.Router({mergeParams : true })





router.get("/", isUserLOgedIn , async (req,res)=>{
  let user = await User.findById(req.user._id).populate("ifmedicalOwner")
    res.render("./medical/profile.ejs" , {user})
})

// medicals registration routs : 

router.get("/register" ,isUserLOgedIn, async(req,res)=>{
    res.render("./medical/registerForm.ejs")
})


router.post("/do-register", async(req , res )=>{
    let newMedical = new Medical({
        businessName : req.body.businessName ,
        businessType : req.body.businessType ,
        licenseNumber : req.body.licenseNumber ,
        taxIdentificationNumber : req.body.taxId ,
        contactPerson : req.body.contactPerson ,
        phoneNumber : req.body.phoneNumber ,
        emailAddress : req.body.emailAddress ,
        physicalAddress : req.body.physicalAddress ,
        coordinatess : req.body.coordinates ,
        operatingHours : req.body.operatingHours ,
        servicesOffered : req.body.servicesOffered ,
        pharmacyLicense : req.body.pharmacyLicense ,
        paymentMethods : req.body.paymentMethods ,
        complianceDocumentation : req.body.complianceDocumentation ,
        owner : req.user._id ,
    })
    let savdMedical = await newMedical.save()
    let user = await User.findByIdAndUpdate(req.user._id , {ifmedicalOwner : savdMedical._id}, {new : true})
    res.redirect("/medical/")
})


router.get('/check', async (req, res) => {
    try {
      const users = await Medical.find();
      res.render('./medical/check.ejs', { users });
    } catch (err) {
      res.status(500).send('Error fetching users.');
    }
  });
  
  // Create an order
  router.post('/order', async (req, res) => {
    try {
      const { customerId, providerId, deliveryAddress, items } = req.body;
      const newOrder = new Order({
        customer: customerId,
        provider: providerId,
        deliveryAddress,
        items: JSON.parse(items),
      });
  
      await newOrder.save();
      res.redirect(`/order/${newOrder._id}`);
    } catch (err) {
      res.status(500).send('Error creating order.');
    }
  });
  
  // View order details
  router.get('/order/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate('customer provider deliveryAgent');
      res.render('order', { order });
    } catch (err) {
      res.status(500).send('Error fetching order.');
    }
  });
  
  // Update order status and assign a delivery agent
  router.post('/order/:id/status', async (req, res) => {
    try {
      const { status, deliveryAgentId } = req.body;
      const order = await Order.findById(req.params.id);
  
      if (status) order.status = status;
      if (deliveryAgentId) order.deliveryAgent = deliveryAgentId;
  
      await order.save();
      res.redirect(`/order/${order._id}`);
    } catch (err) {
      res.status(500).send('Error updating order status.');
    }
  });
module.exports = router ;