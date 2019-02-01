angular.module('prototipo').factory('Tower',
function ($resource) {
    return $resource('/towers/:id');
});
