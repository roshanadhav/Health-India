const express = require("express") ;

const router = express.Router({mergeParams:true})

router.get("/register" , (req,res)=>{
    res.render("./delevaryAgent/regisetr.ejs")
})


module.exports = router ;