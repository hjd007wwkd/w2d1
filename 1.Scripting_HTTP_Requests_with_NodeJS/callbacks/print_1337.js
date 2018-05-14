var getHTML = require('../http-functions');

function printHTML (html) {
  var letters = {
    a : '4', e : '3', l : '1', o : '0', s : '5', t : '7', 'ck' : 'x', 'er' : '0r', 'you' : 'j00'
  }
  var htmlData = "";
  for(var i = 0; i < html.length; i++){
    if(letters[html[i] + html[i+1] + html[i+2]] !== undefined){
      htmlData += letters[html[i] + html[i+1] + html[i+2]];
      i += 2;
    } else if (letters[html[i] + html[i+1]] !== undefined){
      htmlData += letters[html[i] + html[i+1]];
      i += 1;
    } else if(letters[html[i]] !== undefined) {
      htmlData += letters[html[i]];
    } else {
      htmlData += html[i];
    }
  }
  console.log(htmlData);
}

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step6/1337.html'
};

getHTML(requestOptions, printHTML);