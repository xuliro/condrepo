angular.module('prototipo').controller('TowerController',
    function($scope, $http, $window, $routeParams, Tower, Unit) {
        if($routeParams.towerId){
            Tower.get({id: $routeParams.towerId},
                function(tower){
                    $scope.tower = tower;
                    $http.get('/areas/tower/' + tower._id)
                    .then(function(response) {
                        $scope.areas = response.data;
                    });
                    $http.get('/workers/tower/' + tower._id)
                    .then(function(response) {
                        $scope.workers = response.data;
                    });
                },
                function(erro){
                    $scope.mensagem = {texto: 'Não foi possível obter a torre'};
                    console.log(erro);
                }
            );
        } else {
            $scope.tower = new Tower();
        }
        $scope.salvaTower = function(){
            $scope.tower.$save()
                .then(function(){
                    $window.location.reload();
                    $scope.mensagem = {texto: 'Torre salva com sucesso'};
                })
                .catch(function(){
                    $scope.mensagem = {texto: 'Não foi possível salvar a torre'};
                });
        };
        $scope.addUnitToTower = function(newUnit){
            var unit = new Unit();
            unit.name = newUnit;
            unit.$save()
                .then(function(){
                  $scope.tower.units.push(unit);
                  $scope.mensagem = {texto: 'Unidade adicionada à torre com sucesso. Salve os dados da torre antes de editar os dados de qualquer unidade.'};
                })
                .catch(function(){
                    $scope.mensagem = {texto: 'Não foi possível salvar a unidade da torre'};
                });
        };
        $scope.removeUnitFromTower = function(unit){
          if ($window.confirm("Confirma a exclusão da unidade " + unit.name + "?")) {
            var position = $scope.tower.units.indexOf(unit);
            $scope.tower.units.splice(position, 1);
            Unit.delete({id: unit._id},
                function(erro){
                    $scope.mensagem = {texto: 'Removido com sucesso'};
                }
            );
          }
        };
        $scope.back = function(){
             $window.history.back();
        };
        Tower.query(function(towers) {
            $scope.towers = towers;
        });
    });
