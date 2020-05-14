angular.module('prototipo').controller('VisitorsController',
function($scope, $window, $http, Visitor, Event, Unit, AuthService) {
    $scope.visitors = [];
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaVisitors() {
        Visitor.query(
        function(visitors){
            $scope.visitors = visitors;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de visitantes'};
            console.log(erro);
        });
    }
    buscaVisitors();

    $scope.removeVisitor = function(visitor) {
      if ($window.confirm("Confirma a exclusão do visitante " + visitor.name + "?")) {
        Visitor.delete({id: visitor._id},
            buscaVisitors,
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível remover o visitante'};
                console.log(erro);
            }
        );
        $window.location.reload();
      }
    }

    $scope.units = [];
    $scope.events = [];
    $scope.unit = null;
    $scope.event = null;

    Event.query(function(events) {
        $scope.events = events;
    });
    Unit.query(function(units) {
        $scope.units = units;
    });

    $scope.eventVisitorChanged =  function(filtro){
      $scope.event = [];
      if (filtro != ''){
        $scope.event = JSON.parse(filtro);
        $http.get('/events/' + $scope.event._id)
        .then(function(response) {
            $scope.filtroE = $scope.event.name;
        });
      }
    }

    $scope.unitVisitorChanged =  function(filtro){
      $scope.unit = [];
      if (filtro != ''){
        $scope.unit = JSON.parse(filtro);
        $http.get('/units/' + $scope.unit._id)
        .then(function(response) {
            $scope.filtroU = $scope.unit.name;
        });
      }
    }

    $scope.filterVisitors = function(visitor) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (visitor.name.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroE != undefined && $scope.filtroE != ''){
          if (visitor.event == undefined || visitor.event == null || visitor.event.name != $scope.filtroE){
            return;
          }
        }
        if ($scope.filtroU != undefined && $scope.filtroU != ''){
          if (visitor.unit == undefined || visitor.unit == null || visitor.unit.name != $scope.filtroU){
            return;
          }
        }
        return visitor;
    }

    $scope.showDetails = function(visitor) {
      var alertMessage = "Visitante: " + visitor.name +
          "\nContato: " + visitor.contact +
          "\nDocumento: " + visitor.document +
          "\nDetalhes: " + visitor.details +
          "\nData de entrada: " + visitor.enter +
          (visitor.exit === null ? "" : ("\nData de saída: " + visitor.exit));
      $window.alert(alertMessage);
    }

    $scope.back = function(){
         $window.history.back();
    };
});
