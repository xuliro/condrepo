angular.module('prototipo').factory('Server',
function ($resource) {
    return $resource('/servers/:id');
});
