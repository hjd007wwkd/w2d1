var args = process.argv;
var request = require('request');
var fs = require("fs");
var dotenv = require('dotenv').config();
var secrets = require('./secrets');

console.log('Who has most stars!!!!');
var star = {};
var contribute = 0;
var final = [];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    if(res.statusCode === 404){
      console.log("the provided owner/repo does not exist");
    } else if(process.env.GITHUB_TOKEN === undefined){
      console.log("missing authorized informations");
    } else if(res.statusCode === 401){
      console.log("you are unautorized");
    }
    else {
      cb(err, body);
    }
  });
}
function getStarred(item){
  var starredOption = {
    url: "https://api.github.com/users/"+item.login+"/starred",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    }
  };
  request(starredOption, function(err, res, body){
    if(err){
      console.log(err);
    } else {
      var starredPeople = JSON.parse(body);
      starredPeople.forEach(function(person){
        if(star[person.name] === undefined) {
          star[person.name] = {name: person.name, login: person.owner.login, count: 1}
        } else {
          star[person.name].count++;
        }
      })
      contribute--;
      if(contribute === 0 ){
        for(var P in star) {
          final.push(star[P]);
        }
        final.sort(function(a,b){
          return b.count - a.count;
        })
        for(var i = 0; i < 5; i++){
          console.log("[ "+final[i].count+" stars ] "+final[i].name+" / "+final[i].login);
        }
        console.log("This is it!!")
      }
    }
    // count one finished
  })
}

if(args.length === 4){
  getRepoContributors(args[2], args[3], function(err, result){
    if(err){
      console.log(err);
    } else {
      var contributors = JSON.parse(result);
      contribute = contributors.length
      // remember how many will start  ( resultj.length )
      contributors.forEach(function(item){
        getStarred(item)
      });
    }
  });
} else {
  console.log("Invalid input!!");
}



