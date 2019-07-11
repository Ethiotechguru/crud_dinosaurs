const express = require('express');
const db = require('../models');
const router = express.Router();


router.get('/', function(req, res){
    //*remove file system stuff and use sequelize functions
    // var dinosaurs = fs.readFileSync('./dinosaurs.json');
    // var dinoData = JSON.parse(dinosaurs);
    db.parentDino.findAll().then(function(dinoData){
        res.render('dinos/index', {dinosaurs: dinoData});
    })
    
});

router.put('/:id', function(req, res){
    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    // var id = parseInt(req.params.id);
    // dinoData[id].name = req.body.dinosaurName;
    // dinoData[id].type = req.body.dinosaurType;
    // fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    db.parentDino.update({
        name:req.body.dinosaurName,
        type:req.body.dinosaurType
    }, {
        where:{id: parseInt(req.params.id)}
    }).then(function(){
         res.redirect("/dinosaurs" );
    })
})
// router.get('/:id/edit', function(req, res){
//     db.parentDino.findByPk({
//        where: {id:parseInt(req.params.id)}
//     })
//     .then(function(dino){
//         res.render('dinos/edit', {dinosaur: dino}); 
//     });
    
    
// });




module.exports = router;