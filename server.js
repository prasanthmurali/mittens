var express = require ('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
const port = 3000;

var db = null;

MongoClient.connect("mongodb://localhost:27017/mittens",function(err,dbconn){
	if(!err){
		console.log("we are connected to the database");
		db = dbconn;		
	}
});

app.use(bodyParser.json());
app.use(express.static('public'));

/*
var meows = ['CSK is back !',
			'Whistle podu @!',
			'IPL 2018, we are back !',
			'Chepauk, here we come xD',
			'CSKKKKK xD'];
*/			
/*
db.meows.insert({text: 'CSK is back !'});
db.meows.insert({text: 'Whistle podu @!'});
db.meows.insert({text: 'IPL 2018, we are back !'});
db.meows.insert({text: 'Chepauk, here we come xD'});
db.meows.insert({text: 'CSKKKKK xD'});			
*/
app.get('/meows',function(req,res,next){
	
	db.collection('meows',function(err,meowsCollection){
			meowsCollection.find().toArray(function(err,meows){

				// console.log(meows);
				return 	res.json(meows);
			});
	});
});

app.post('/meows',function(req,res,next){

	db.collection('meows',function(err,meowsCollection){

		var newMeow = {text: req.body.newMeow}		
		meowsCollection.insert(newMeow,{w:1},function(err){
		return 	res.send();
		});
	});
});	

app.put('/meows/remove',function(req,res,next){
	db.collection('meows',function(err,meowsCollection){
		var meowId = req.body.meow._id;
		var newMeow = {text: req.body.newMeow}		
		meowsCollection.remove({_id: ObjectId(meowId)}, {w:1},function(err){
		return 	res.send();
		});
	});
});	


app.post('/users',function(req,res,next){

    console.log(req.body);
	db.collection('users',function(err,usersCollection){
		usersCollection.insert(req.body, {w:1},function(err){

		return 	res.send();
		});
	});
});	

	// console.log(req.body);
	// meows.push(req.body.newMeow);
	// res.send();	

app.listen(port,function(){
	console.log("App listening on port 3000");
});

