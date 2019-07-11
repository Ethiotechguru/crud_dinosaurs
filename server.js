const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const path = require('path');
const db = require('./models');
//remove fs and use sequelize
// const fs = require('fs');
const methodOverride = require('method-override');
const port = 3000;

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));



app.get('/', function(req, res){
    res.render('index');
});

//GET /dinosaurs -index route - gets All dinosaurs
// app.get('/dinosaurs', function(req, res){
//     //*remove file system stuff and use sequelize functions
//     // var dinosaurs = fs.readFileSync('./dinosaurs.json');
//     // var dinoData = JSON.parse(dinosaurs);
//     db.parentdino.findAll().then(function(dinoData){
//         res.render('dinos/index', {dinosaurs: dinoData});
//     })
    
// });

// post/dinosaurs/new serve 
app.get('/dinosaurs/new', function(req, res){
res.render('dinos/new');
});
//Get ?dinosurs/edit - serve up our edit dinp form
app.get('/dinosaurs/:id/edit', function(req, res){
    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    // let id = parseInt(req.params.id);
    db.parentDino.findOne({
        where: {id: parseInt(req.params.id)},
    }).then(function(dino){
           res.render('dinos/edit', {dinosaur: dino}); 
    });
});
//GET /dinosaurs/:id - show route - gets One dino

app.get('/dinosaurs/:id', function(req, res){
    // let dinosaurs =fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    // let id = parseInt(req.params.id)
    // console.log(dinoData[id])
    db.parentDino.findOne({
        where: {
            id:parseInt(req.params.id),
            }
        })
        .then(function(dino){
            res.render('dinos/show', {dinosaur:dino});
        })  
    });

app.post('/dinosaurs', function(req, res){
    console.log(req.body);
    //read in our JsON file
    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // let dinoData = JSON.parse(dinosaurs);
    //push our new data into the array

    db.parentDino.create({
        type: req.body.dinosaurType,
        name: req.body.dinosaurName
    }).then(function() {
        res.redirect('/dinosaurs');        
    });
    // dinoData.push(newDino);
    //write the array back to the file
    // fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
});

app.delete('/dinosaurs/:id', function(req, res){
    //read the data from the file
    // let dinosaurs = fs.readFileSync('./dinosaurs.json');
    // // Parse the data into an object
    // var dinoData=JSON.parse(dinosaurs);
    // //ssplice out the item at the spcified index
    // var id = parseInt(req.params.id);
    // dinoData.splice(id, 1);
    // //stringfy the object
    // var dinoString =  JSON.stringify(dinoData);
    // // write the object back to the file
    // fs.writeFileSync('./dinosaurs.json', dinoString);

    db.parentDino.destroy({
        where: {id: parseInt(req.params.id)}
    }).then(function(){
        res.redirect('/dinosaurs');
    })
});
// router.delete('/users/:id', isLoggedIn, function(req, res) {
//     db.user.findOne({
//       where: {id:req.user.id},
//       include: [db.post]
//     }).then( function(user){
//     //   console.log(user)
//       db.post.destroy({
//           where: {
//               id:req.params.id,
//               userId: user.id
//           }
//         }).then(function(pics) {
//           res.redirect('/users');
//       })
//     })
//   });
// app.put('/dinosaurs/:id', function(req, res){
//     // let dinosaurs = fs.readFileSync('./dinosaurs.json');
//     // let dinoData = JSON.parse(dinosaurs);
//     // var id = parseInt(req.params.id);
//     // dinoData[id].name = req.body.dinosaurName;
//     // dinoData[id].type = req.body.dinosaurType;
//     // fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
//     db.parentDino.update({
//         name:req.body.dinosaurName,
//         type:req.body.dinosaurType
//     }, {
//         where:{id: parseInt(req.params.id)}
//     }).then(function(){
//          res.redirect("/dinosaurs");
//     })
// })




app.use('/dinosaurs', require('./routers/parentDinos'));
app.use('/childDinos', require('./routers/childDinos'));

app.listen(port, function(){
    console.log("it is running");
})