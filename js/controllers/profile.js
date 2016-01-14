app.filter('firstName', function () {
  return function (tel) {
    var firstName = tel.split(' ').slice(0, -1).join(' ');
    return firstName;
  };
});

app.controller('UserProfileCtrl', function ($scope) {

});
