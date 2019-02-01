angular.module('prototipo').factory('Worker',
function ($resource) {
    return $resource('/workers/:id');
});
