angular.module('prototipo').factory('Visitor',
function ($resource) {
    return $resource('/visitors/:id');
});
