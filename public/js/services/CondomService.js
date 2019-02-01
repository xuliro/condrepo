angular.module('prototipo').factory('Condom',
function ($resource) {
    return $resource('/condoms/:id');
});
