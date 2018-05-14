var args = process.argv;
var request = require('request');
var fs = require("fs");
var dotenv = require('dotenv').config();
var secrets = require('./secrets');

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
    console.log(res.headers);
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on("error", function(err){
    console.log(err);
  })
  .pipe(fs.createWriteStream(filePath));
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

