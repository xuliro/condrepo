angular.module('prototipo').controller('EventController',
function($scope, $http, $window, $location, $routeParams, Event, User, Area, AuthService) {
    $scope.loggedUser = AuthService.getLoggedUser();
    if($routeParams.eventId){
        Event.get({id: $routeParams.eventId},
            function(event){
                $scope.event = event;
                $scope.event.date = new Date(event.date);
                $http.get('/visitors/event/' + event._id)
                .then(function(response) {
                    $scope.visitors = response.data;
                });
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o evento'};
                console.log(erro);
            }
        );
    } else {
        $scope.event = new Event();
    }
    $scope.salvaEvent = function(){
        if (user != ''){
          $scope.event.user = user;
        }
        if (area != ''){
          $scope.event.area = area;
        }

        $scope.event.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Evento salvo com sucesso'};
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar o evento'};
            });
    };
    Event.query(function(events) {
        $scope.events = events;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var user = '';
    var area = '';

    User.query(function(users) {
        $scope.users = users;
    });
    Area.query(function(areas) {
        $scope.areas = areas;
    });

    $scope.userEventChanged =  function(){
      $scope.filtroUser = '';
      if ($scope.filtroU != ''){
        user = JSON.parse($scope.filtroU);
        $http.get('/users/' + user._id)
        .then(function(response) {
            $scope.filtroUser = user.name;
        });
      }
    }
    $scope.areaEventChanged = function(){
      $scope.filtroArea = '';
      if ($scope.filtroA != ''){
        area = JSON.parse($scope.filtroA);
        $http.get('/areas/' + area._id)
        .then(function(response) {
            $scope.filtroArea = area.name;
        });
      }
    }
});
