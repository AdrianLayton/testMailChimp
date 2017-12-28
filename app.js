

// ******** PACKAGES ********

const express = require ('express');
const bodyParser = require('body-parser');
const AWS = require("aws-sdk");
const request = require('superagent');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ******** AWS STUFF ********
AWS.config.update({
	region: "us-east-1"
});
AWS.config.dynamodb = {
	endpoint: "dynamodb.us-east-1.amazonaws.com"
};



let docClient = new AWS.DynamoDB.DocumentClient();




let myCredential = AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack); 
  else console.log("Access Key and SecretAccessKey Obtained");
});
  
// ******** ROUTE PARAMETERS ********

app.get('/', (req,res) => {
	res.sendFile(__dirname + '/index.html');
})

app.post('/', (req,res) => {

	mailChimpApiKey = c9d440b116a32a6cd1681156f1a4c46d-us17
	mailChimpInstance = us17
	listUniqueId = baa4a9093b
	const table = "newDB";
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
	request
        .post('https://' + mailChimpInstance + '.api.mailChimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailChimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'fname': req.body.firstName,
            'lname': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });
    res.sendFile(__dirname + "emailConfirm.html");
})


app.listen(3000,() => {
	console.log('App has started on port 3000')
});
