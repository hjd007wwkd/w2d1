var https = require("https");

module.exports = function getHTML (options, callback) {
  https.get(options, function(response){
    response.setEncoding('utf8');

    var dataChunk = ""
    response.on('data', function(data){
      dataChunk += data+"\n";
    })

    response.on('end', function() {
      callback(dataChunk);
      console.log('Response stream complete.');
    });
  })
};