angular.module('prototipo').controller('WorkersController',
function($scope, $window, $http, Worker, Condom, Tower, Unit, AuthService) {
    $scope.workers = [];
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();
    
    function buscaWorkers() {
        Worker.query(
        function(workers){
            $scope.workers = workers;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de funcionários'};
            console.log(erro);
        });
    }
    buscaWorkers();

    $scope.removeWorker = function(worker) {
      if ($window.confirm("Confirma a exclusão do funcionário " + worker.name + "?")) {
        Worker.delete({id: worker._id},
            buscaWorkers,
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível remover o funcionário'};
                console.log(erro);
            }
        );
      }
    }

    $scope.condoms = [];
    $scope.towers = [];
    $scope.units = [];

    $scope.condom = null;
    $scope.tower = null;
    $scope.unit = null;

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.condomWorkerChanged =  function(filtro){
      $scope.condom = [];
      $scope.towers = [];
      if (filtro != ''){
        $scope.condom = JSON.parse(filtro);
        $http.get('/condoms/' + $scope.condom._id)
        .then(function(response) {
            $scope.towers = response.data.towers;
            $scope.filtroC = $scope.condom.name;
        });
      }
    }

    $scope.towerWorkerChanged = function(filtro){
      $scope.tower = [];
      $scope.units = [];
      if (filtro != ''){
        $scope.tower = JSON.parse(filtro);
        $http.get('/towers/' + $scope.tower._id)
        .then(function(response) {
            $scope.units = response.data.units;
            $scope.filtroT = $scope.tower.name;
        });
      }

    }

    $scope.unitWorkerChanged = function(filtro){
      $scope.tower = [];
      if (filtro != ''){
          $scope.unit = JSON.parse(filtro);
          $scope.filtroU = $scope.unit.name;
      }
    }

    $scope.filterWorkers = function(worker) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (worker.name.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroC != undefined && $scope.filtroC != ''){
          if (worker.condom == undefined || worker.condom == null || worker.condom.name != $scope.filtroC){
            return;
          }
        }
        if ($scope.filtroT != undefined && $scope.filtroT != ''){
          if (worker.tower == undefined || worker.tower == null || worker.tower.name != $scope.filtroT){
            return;
          }
        }
        if ($scope.filtroU != undefined && $scope.filtroU != ''){
          if (worker.unit == undefined || worker.unit == null || worker.unit.name != $scope.filtroU){
            return;
          }
        }
        return worker;
    }

    $scope.showDetails = function(server) {
      var alertMessage = "Funcionário: " + server.name +
          "\nContato: " + server.contact +
          "\nEndereço: " + server.address +
          "\nDocumento: " + server.document +
          (server.tower === null ? "" : ("\nTorre: " + server.tower.name)) +
          (server.unit === null ? "" : ("\nUnidade: " + server.unit.name));
      $window.alert(alertMessage);
    }

    $scope.back = function(){
         $window.history.back();
    };
});
