angular.module('prototipo').controller('WorkerController',
function($scope, $http, $window, $location, $routeParams, Worker, Condom, Tower, Unit) {
    if($routeParams.workerId){
        Worker.get({id: $routeParams.workerId},
            function(worker){
                $scope.worker = worker;
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o funcionario'};
                console.log(erro);
            }
        );
    } else {
        $scope.worker = new Worker();
    }
    $scope.salvaWorker = function(){
        if (condom != ''){
          $scope.worker.condom = condom;
        }
        if (tower != ''){
          $scope.worker.tower = tower;
        }
        if (unit != ''){
          $scope.worker.unit = unit;
        }

        $scope.worker.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Funcionario salvo com sucesso'};
                //$location.path('/workers/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar o funcionario'};
            });
    };
    Worker.query(function(workers) {
        $scope.workers = workers;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';
    var tower = '';
    var unit = '';

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.coWorkerChanged =  function(filtro){
      $scope.filtroCo = '';
      if (filtro != ''){
        condom = JSON.parse(filtro);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.towers = response.data.towers;
            $scope.filtroCo = condom.name;
        });
      }
    }

    $scope.toWorkerChanged = function(filtro){
      $scope.filtroTo = '';
      if (filtro != ''){
        tower = JSON.parse(filtro);
        $http.get('/towers/' + tower._id)
        .then(function(response) {
            $scope.units = response.data.units;
            $scope.filtroTo = tower.name;
        });
      }
    }
    
    $scope.unWorkerChanged = function(filtro){
      $scope.filtroUn = '';
      if (filtro != ''){
          unit = JSON.parse(filtro);
          $scope.filtroUn = unit.name;
      }
    }
});
