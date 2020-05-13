angular.module('prototipo').controller('EventsController',
function($scope, $window, $http, Event, User, Area, AuthService) {
    $scope.events = [];
    $scope.selectedEvent = '';
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaEvents() {
        Event.query(
        function(events){
            $scope.events = events;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de eventos'};
            console.log(erro);
        });
    }
    buscaEvents();

    $scope.removeEvent = function(event) {
        if ($window.confirm("Confirma a exclusão do evento " + event.name + "?")) {
          Event.delete({id: event._id},
              buscaEvents,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover o evento'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.users = [];
    $scope.areas = [];
    $scope.user = null;
    $scope.area = null;

    User.query(function(users) {
        $scope.users = users;
    });

    Area.query(function(areas) {
        $scope.areas = areas;
    });

    $scope.userEventChanged =  function(filtro){
      if (filtro != ''){
        user = JSON.parse(filtro);
        $scope.filtroU = user.name;
      }
    }

    $scope.areaEventChanged = function(filtro){
      if (filtro != ''){
        area = JSON.parse(filtro);
        $scope.filtroA = area.name;        
      }
    }

    $scope.filterEvents = function(event) {
      if ($scope.filtro != undefined && $scope.filtro != ''){
        if (event.name.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
          return;
        }
      }
      if ($scope.filtroU != undefined && $scope.filtroU != ''){
        if (event.user == undefined || event.user == null || event.user.name != $scope.filtroU){
          return;
        }
      }
      if ($scope.filtroA != undefined && $scope.filtroA != ''){
        if (event.area == undefined || event.area == null || event.area.name != $scope.filtroA){
          return;
        }
      }
      return event;
    }

    $scope.showDetails = function(event) {
      var alertMessage = "Evento: " + event.name +
          "\nData: " + event.date +
          "\nDescrição: " + event.description +
          (event.user === null ? "" : ("\nusuário: " + event.user.name)) +
          (event.area === null ? "" : ("\nArea: " + event.area.name));
      $window.alert(alertMessage);
    }

    $scope.back = function(){
         $window.history.back();
    };
});
