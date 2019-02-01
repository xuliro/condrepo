angular.module('prototipo').controller('CondomsController',
function($scope, $window, Condom) {
    $scope.condoms = [];
    $scope.mensagem = {texto: ''};

    function buscaCondoms() {
        Condom.query(
        function(condoms){
            $scope.condoms = condoms;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de condominios'};
            console.log(erro);
        });
    }
    buscaCondoms();

    $scope.removeCondom = function(condom) {
        if ($window.confirm("Confirma a exclusão do condomínio " + condom.name + "?")) {
          Condom.delete({id: condom._id},
              buscaCondoms,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover o condominio'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.back = function(){
         $window.history.back();
    };
});
