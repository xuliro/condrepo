angular.module('prototipo').controller('TowersController',
function($scope, Tower) {
    $scope.towers = [];
    $scope.filtro = '';

    function buscaTowers() {
        Tower.query(
        function(towers){
            $scope.towers = towers;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de torres'};
            console.log(erro);
        });
    }
    buscaTowers();

    $scope.removeTower = function(tower) {
        if ($window.confirm("Confirma a exclusão da torre " + tower.name + "?")) {
          Tower.delete({id: tower._id},
              buscaTowers,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover a torre'};
                  console.log(erro);
              }
          );
        }

    }
});
