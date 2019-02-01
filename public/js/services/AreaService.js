angular.module('prototipo').factory('Area',
function ($resource) {
    return $resource('/areas/:id');
});
