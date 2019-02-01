angular.module('prototipo').controller('ServersController',
function($scope, $window, $http, Server, Condom, Tower, Unit,AuthService) {
    $scope.servers = [];
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaServers() {
        Server.query(
        function(servers){
            $scope.servers = servers;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de funcionários'};
            console.log(erro);
        });
    }
    buscaServers();

    $scope.removeServer = function(server) {
        if ($window.confirm("Confirma a exclusão do funcionário " + server.name + "?")) {
          Server.delete({id: server._id},
              buscaServers,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover o funcionário'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.condoms = [];
    $scope.condom = null;

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.condomServerChanged =  function(filtro){
      $scope.condom = [];
      if (filtro != ''){
        $scope.condom = JSON.parse(filtro);
        $http.get('/condoms/' + $scope.condom._id)
        .then(function(response) {
            $scope.filtroC = $scope.condom.name;
        });
      }
    }

    $scope.filterServers = function(server) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (server.name.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroC != undefined && $scope.filtroC != ''){
          if (server.condom == undefined || server.condom == null || server.condom.name != $scope.filtroC){
            return;
          }
        }
        return server;
    }

    $scope.showDetails = function(server) {
      var alertMessage = "Prestador: " + server.name +
          "\nCategoria: " + server.category +
          "\nContato: " + server.contact +
          "\nDescrição: " + server.description;
      $window.alert(alertMessage);
    }

    $scope.back = function(){
         $window.history.back();
    };
});
