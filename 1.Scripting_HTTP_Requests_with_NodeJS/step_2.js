function getAndPrintHTML () {
  var https = require("https");

  var requestOptions = {
    host: 'sytantris.github.io',
    path: '/http-examples/step2.html'
  };

  https.get(requestOptions, function(response){
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
getAndPrintHTML();