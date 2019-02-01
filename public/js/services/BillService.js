angular.module('prototipo').factory('Bill',
function ($resource) {
    return $resource('/bills/:id');
});
