var args = process.argv;
var request = require('request');
var fs = require("fs");
var dotenv = require('dotenv').config();
var secrets = require('./secrets');


// if (dotenv && dotenv.error && dotenv.error.code === 'ENOENT') {
//   console.log("fuck fuck fuck fuck fuck!!!!!!!!!");
//   throw "FUCK!!"
// }


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    if(res.statusCode === 404) {
      console.log("the provided owner/repo does not exist");
    } else if(process.env.GITHUB_TOKEN === undefined){
      console.log("missing authorized informations: .env file should exist, and should contain GITHUB_TOKEN key");
    } else if(res.statusCode === 401){
      console.log("you are unautorized");
    } else if (!fs.existsSync('avatars/')) {
        console.log("there is no avatars/ directory");
    } else {
      cb(err, body);
    }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on("error", function(err){
    console.log(err);
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function(err){
    console.log("download completed")
  })
}

if(args.length === 4){
  getRepoContributors(args[2], args[3], function(err, result){
    if(err){
      console.log(err);
    } else {
      var resultJ = JSON.parse(result);
      resultJ.forEach(function(item){
        downloadImageByURL(item.avatar_url, "avatars/"+item.login+".jpg")
      });
    }
  });
} else {
  console.log("Invalid input!!");
}

