angular.module('prototipo').factory('Sell',
function ($resource) {
    return $resource('/sells/:id');
});
