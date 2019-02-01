angular.module('prototipo').factory('Archive',
function ($resource) {
    return $resource('/archives/:id');
});
