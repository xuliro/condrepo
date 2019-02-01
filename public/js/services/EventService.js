angular.module('prototipo').factory('Event',
function ($resource) {
    return $resource('/events/:id');
});
