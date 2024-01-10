var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});


router.get('/project-one',(req,res) =>{
  res.render('project-one');
});

router.get('/project-two',(req,res) =>{
  res.render('project-two');
});

router.get('/project-three',(req,res) =>{
  res.render('project-three');
});

router.get("/chatApp", (req, res) => {
  res.render("chatApp");
});

router.get('/stock-market',(req,res) =>{
  res.render('stock-market');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register',(req,res) =>{
  res.render('register');
});

router.get('/dashboard',(req,res)=>{
res.render('dashboard')
});


router.get('/qr-generator',(req,res) =>{
  res.render('qr-generator');
});

router.post('/submit-form',(req,res) =>{
  console.log("Form Submitted");
});



router.post('/login',(req,res) =>{
  res.render('login');
})

module.exports = router;


