// ******** PACKAGES ********

const express = require ('express');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ******** AWS STUFF ********
AWS.config.update({
	region: "us-east-1"
});
AWS.config.dynamodb({
	endpoint: "dynamodb.us-east-1.amazonaws.com"
})



let docClient = new AWS.DynamoDB.DocumentClient();

let table = "testDb";


let myCredential = AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack); 
  else console.log("Access Key and SecretAccessKey Obtained");
});
  
// ******** ROUTE PARAMETERS ********

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
})

app.post('/', (req,res) => {
	let firstName = req.body.fname;
	let lastName = req.body.lname;
	let email = req.body.email;
	let params = {
		TableName:table,
		Item:{	
			"email": email,
			"firstName": firstName,
			"lastName": lastName
			}
				}

	console.log("Adding a new item...");
	docClient.put(params, function(err, data) {
	    if (err) {
	        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("Added item:", JSON.stringify(data, null, 2));
		}
})
})


app.listen(3000,() => {
	console.log('App has started on port 3000')
});
