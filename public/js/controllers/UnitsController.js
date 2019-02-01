angular.module('prototipo').controller('UnitsController',
function($scope, Unit) {
    $scope.units = [];
    $scope.filtro = '';

    function buscaUnits() {
        Unit.query(
        function(units){
            $scope.units = units;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de unidades'};
            console.log(erro);
        });
    }
    buscaUnits();

    $scope.removeUnit = function(unit) {
        if ($window.confirm("Confirma a exclusão da unidade " + unit.name + "?")) {
          Unit.delete({id: unit._id},
              buscaUnits,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover a unidade'};
                  console.log(erro);
              }
          );
        }
    }
});
