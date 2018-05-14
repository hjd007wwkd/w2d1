// Is there any reason not to just pass the URL as a string?
// Is there any reason not to pass the host and path as two individual parameters?
// Don't get too hung up on these questions if you aren't sure - it's more important that you implement a solution. Feel free to ask a mentor if you're curious!
function getAndPrintHTML (options) {
  var https = require("https");

  https.get(options, function(response){
    response.setEncoding('utf8');

    var dataChunk = ""
    response.on('data', function(data){
      dataChunk += data+"\n";
    })

    response.on('end', function() {
      console.log(dataChunk);
      console.log('Response stream complete.');
    });
  })
}

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step3.html'
};

getAndPrintHTML(requestOptions);