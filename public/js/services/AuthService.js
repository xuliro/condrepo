angular.module('prototipo').factory('AuthService', function($window) {
  function setLoggedUser(logged) {
    window.localStorage['loggedUser'] = JSON.stringify(logged);
  }
  function getLoggedUser() {
    return angular.fromJson(window.localStorage['loggedUser']);
  }
  function logout() {
    $rootScope.loggedUser = null;
  }
  return {
    setLoggedUser: setLoggedUser,
    getLoggedUser: getLoggedUser,
    logout: logout,
  };
});
