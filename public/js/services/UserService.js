angular.module('prototipo').factory('User',
function ($resource) {
    return $resource('/users/:id');
});
