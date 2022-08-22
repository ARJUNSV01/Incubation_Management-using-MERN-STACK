var express = require('express');
var router = express.Router();
const adminHelper = require('../helpers/adminHelper');
const userHelper = require('../helpers/userHelper');
const { route } = require('./users');
var jwt = require('jsonwebtoken')

/* GET home page. */
const checktoken =  (req,res,next)=>{
  console.log('token checking');
  let token = req.headers.authorization
  console.log(token);
  if(token){
    let auth = jwt.verify(token,'secret1234567')
    console.log(auth);
    if(auth){
      console.log('success');
      next()
    }else{
      res.status(400).json({err:'authentication error'})
    }
  }

}

router.post('/login',async function(req, res, next) {
 try{
   console.log('hi');
   console.log(req.body);
  let response = await adminHelper.adminLogin(req.body)
  if(response.loggedIn){
    console.log('sucess');
    res.status(200).json(response)
  }else{
    res.status(400).json({err:'Invalid Credentials'})
  }

 }catch(err){
  console.log(err);
 }
});
router.get('/newapplication',async(req,res)=>{
  console.log('hi');
  try{
  let formData = await adminHelper.getNewApplication()

  const newData = formData.filter((form)=>{
  return !form.status 
  })

  const pendingData = formData.filter((form)=>{
    return (form.status === 'pending' || form.status ==='approved' || form.status === 'declined')
  })

  const confirmedData = formData.filter((form)=>{
    return form.status === 'approved'
  })

 let response={
    all:formData,
    new:newData,
    pending:pendingData,
    approved:confirmedData
  }
  console.log(newData);
  res.status(200).json(response)
  }catch(err){
res.status(400).json({status:'No data available'})
  }
})
router.get('/getcompanydetails/:id',(req,res)=>{
  console.log(req.params.id);
 adminHelper.getCompanyDetails(req.params.id).then((companyDetails)=>{
   res.status(200).json(companyDetails)
 }).catch((err)=>{
   res.status(400).json({status:'error'})
 })

})

router.post('/pending',checktoken,(req,res)=>{
  console.log(req.body);
const formId = req.body._id
adminHelper.pending(formId).then((response)=>{
  console.log(response);
  res.status(200).json(response)
}).catch((err)=>{
  res.status(400).json({status:'error'})
})
})

router.post('/approve',checktoken,(req,res)=>{
  console.log(req.body);
  const formId = req.body._id
  adminHelper.approve(formId).then((response)=>{
    console.log(response);
    res.status(200).json(response)
  }).catch((err)=>{
    console.log(err);
    res.status(400).json({status:'error'})
  })
})

router.post('/decline',checktoken,(req,res)=>{
  console.log(req.body);
  const formId = req.body._id
  adminHelper.decline(formId).then((response)=>{
    console.log(response);
    res.status(200).json({response})
  }).catch(()=>{
    console.log(err);
    res.status(400).json({status:'error'})
  })

})
router.get('/getslots',(req,res)=>{
  try{
    adminHelper.getAllSlots().then((slots)=>{
      const slotA = slots.filter((slot)=>{
        return slot.section === 'A'
      })
      const slotB = slots.filter((slot)=>{
        return slot.section === 'B'
      })
      const slotC = slots.filter((slot)=>{
        return slot.section === 'C'
      })
      const slotD = slots.filter((slot)=>{
        return slot.section === 'D'
      })
      const slotE = slots.filter((slot)=>{
        return slot.section === 'E'
      })

      let response ={
        A:slotA,
        B:slotB,
        C:slotC,
        D:slotD,
        E:slotE,
        
      }
      res.status(200).json(response)

    })
  }catch(err){
    res.status(400).json({status:'err'})
  }
})

router.post('/selectcompany',(req,res)=>{
  try{
  slotId = req.body._id
  companyId = req.body.company
  adminHelper.bookSlot(slotId,companyId).then((response)=>{
    adminHelper.bookCompany(companyId).then((response)=>{
      res.status(200).json(response)
    })
  })
}catch(err){
  res.status(400).json({status:'error'})
}
})

module.exports = router;
