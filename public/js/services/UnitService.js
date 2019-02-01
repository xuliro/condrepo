angular.module('prototipo').factory('Unit',
function ($resource) {
    return $resource('/units/:id');
});
