angular.module('prototipo').factory('Possession',
function ($resource) {
    return $resource('/possessions/:id');
});
