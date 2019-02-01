angular.module('prototipo').controller('ServerController',
function($scope, $http, $window, $location, $routeParams, Server, Condom, Tower, Unit) {
    if($routeParams.serverId){
        Server.get({id: $routeParams.serverId},
            function(server){
                $scope.server = server;
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o funcionario'};
                console.log(erro);
            }
        );
    } else {
        $scope.server = new Server();
    }
    $scope.salvaServer = function(){
        if (condom != ''){
          $scope.server.condom = condom;
        }

        $scope.server.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Funcionario salvo com sucesso'};
                //$location.path('/servers/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar o funcionario'};
            });
    };
    Server.query(function(servers) {
        $scope.servers = servers;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });
    $scope.coServerChanged =  function(){
      $scope.filtroCo = '';
      if ($scope.filtroC != ''){
        condom = JSON.parse($scope.filtroC);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.filtroCo = condom.name;
        });
      }
    }    
});
