angular.module('prototipo').controller('VisitorController',
function($scope, $http, $window, $location, $routeParams, Visitor, Event, Unit, AuthService) {
    $scope.loggedUser = AuthService.getLoggedUser();
    if($routeParams.visitorId){
        Visitor.get({id: $routeParams.visitorId},
            function(visitor){
                $scope.visitor = visitor;
                $scope.visitor.enter = new Date(visitor.enter);
                if (visitor.exit != null){
                    $scope.visitor.exit = new Date(visitor.exit);
                }
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o visitante'};
                console.log(erro);
            }
        );
    } else {
        $scope.visitor = new Visitor();
        $scope.visitor.exit = null;
    }
    $scope.salvaVisitor = function(){
        if (event != ''){
          $scope.visitor.event = event;
        }
        if (unit != ''){
          $scope.visitor.unit = unit;
        }
        $scope.visitor.condom = $scope.loggedUser.condom;

        $scope.visitor.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Visitante salvo com sucesso'};
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar o visitante'};
            });
    };
    Visitor.query(function(visitors) {
        $scope.visitors = visitors;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var event = '';
    var unit = '';

    Event.query(function(events) {
        $scope.events = events;
    });
    Unit.query(function(units) {
        $scope.units = units;
    });

    $scope.eventVisitorChanged =  function(){
      $scope.filtroEvent = '';
      if ($scope.filtroE != ''){
        event = JSON.parse($scope.filtroE);
        $scope.filtroEvent = event.name;
      }
    }
    $scope.unitVisitorChanged = function(){
      $scope.filtroUnit = '';
      if ($scope.filtroU != ''){
        unit = JSON.parse($scope.filtroU);
        $scope.filtroUnit = unit.name;        
      }
    }
});
