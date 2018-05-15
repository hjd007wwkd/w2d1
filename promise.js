function longRunningFunction(cb) {
  setTimeout(function () {cb('hello')}, 2000)
}

longRunningFunction(function (greeting) {
  var name = 'Jin';
  console.log(greeting + name);
})

var greetingPromise = new Promise(function (resolve, reject) {
  longRunningFunction(function (greeting) {
    resolve(greeting);
  });
});

//then 먼저 읽지만 then은 promise 에 있는 function이 resolve 될때까지 기다리고
//그다음 resolve된 result를 then에있는 function으로 보낸다.
greetingPromise
  .then(function (greet) {
    return greet + 'Bill';
  })
  .then(function (wholeGreeting) {
    console.log(wholeGreeting);
  });

//promise all에 적힌 function을 먼저 다하고 Array로 result를 보낸다.
Promise
.all([greetingPromise, anotherPromise])
.then(function(resultsArray) {
   resultsArray[0];
   resultsArray[1];
   return 999;
})
.then()