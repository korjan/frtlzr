export default cb => {
  console.log('onconnect', cb);

  var shart = window.shart || new Asteroid("localhost:3000");
  window.shart = shart;

  shart.on("connected", function () {
      // Asteroid doesn't expose the subscription directly. Fortunately, subscription calls are memoized
      // so you can safely call the subscribe method multiple times and it'll always return the same object
      shart.on("login", function loginWorked(loggedInUserId) {
        console.log('logged in as:' + loggedInUserId);
        shart.userId = loggedInUserId;
      });

      shart.resumeLoginPromise.then(function alreadyLoggedIn() {
        console.log("user is already logged in")
      }).fail(function notAlreadyLoggedIn() {
        console.log('user is not logged in');
        shart.loginWithGoogle();
      });
  });
};
