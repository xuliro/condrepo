angular.module('prototipo').controller('PossessionsController',
function($scope, $window, Possession) {
    $scope.possessions = [];
    $scope.filtro = '';

    function buscaPossessions() {
        Possession.query(
        function(possessions){
            $scope.possessions = possessions;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de posses'};
            console.log(erro);
        });
    }
    buscaPossessions();

    $scope.removePossession = function(possession) {
        if ($window.confirm("Confirma a exclusão de " + possession.category + " " + possession.details + "?")){
          Possession.delete({id: possession._id},
              buscaPossessions,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover a posse'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.back = function(){
         $window.history.back();
    };
});
