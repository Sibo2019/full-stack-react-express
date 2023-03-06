const express = require("express"); //Import express
const app = express(); //Import express
const bodyParser = require("body-parser"); //Import body parser
const request = require("request");   //Import request
const helmet = require("helmet");   //Import helmet

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

//Landing page. 
app.get("/", function (req, res) {
  res.send("The API works");
});

//Handles the github API call

app.get("/search/github/:username", async (req, res) => {
  var username = req.params.username;   //Get username from user
  const urlGithub = `https://api.github.com/users/${username}/repos`; //Create github url

  //Call the github API

  const requestOptions = {
    url: urlGithub,
    method: "GET",
    json: {},
    qs: {
      offset: 20,
    },
    headers: { "user-agent": "node.js" },
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      res.send("error");
    } else {
      res.send(body);
    }
  });

});

//Define the port, and then listen on it

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); //Console log which port the server is listening on
});

app.use(express.static("public"));
