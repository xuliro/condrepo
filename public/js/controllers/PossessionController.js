angular.module('prototipo').controller('PossessionController',
    function($scope, $http, $window, $routeParams, Possession) {
        if($routeParams.possessionId){
            Possession.get({id: $routeParams.possessionId},
                function(possession){
                    $scope.possession = possession;
                    $http.get('/users/possession/' + $scope.possession._id)
                    .then(function(response) {
                        $scope.possessions = response.data;
                    });
                },
                function(erro){
                    $scope.mensagem = {texto: 'Não foi possível obter a posse do usuário'};
                    console.log(erro);
                }
            );
        } else {
            $scope.possession = new Possession();
        }
        $scope.salvaPossession = function(){
            $scope.possession.$save()
                .then(function(){
                    $window.location.reload();
                    $scope.mensagem = {texto: 'Posse salva com sucesso'};
                })
                .catch(function(){
                    $scope.mensagem = {texto: 'Não foi possível salvar a posse'};
                });
        };
        $scope.back = function(){
             $window.history.back();
        };
        Possession.query(function(possessions) {
            $scope.possessions = possessions;
        });
    });
