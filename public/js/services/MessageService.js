angular.module('prototipo').factory('Message',
function ($resource) {
    return $resource('/messages/:id');
});
