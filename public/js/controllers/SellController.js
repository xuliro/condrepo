angular.module('prototipo').controller('SellController',
function($scope, $http, $window, $location, $routeParams, Sell, Condom, User) {
    if($routeParams.sellId){
        Sell.get({id: $routeParams.sellId},
            function(sell){
                $scope.sell = sell;
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter o anúncio'};
                console.log(erro);
            }
        );
    } else {
        $scope.sell = new Sell();
    }
    $scope.salvaSell = function(){
        if (condom != ''){
          $scope.sell.condom = condom;
        }
        if (user != ''){
          $scope.sell.user = user;
        }
        $scope.sell.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Anúncio salvo com sucesso'};
                //$location.path('/sells/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar o anúncio'};
            });
    };
    Sell.query(function(sells) {
        $scope.sells = sells;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';
    var user = '';
    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });
    User.query(function(users) {
        $scope.users = users;
    });
    $scope.coSellChanged =  function(){
      $scope.filtroCo = '';
      if ($scope.filtroC != ''){
        condom = JSON.parse($scope.filtroC);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.filtroCo = condom.name;
        });
        $http.get('/users/condom/' + condom._id)
        .then(function(response) {
            $scope.users = response.data;
        });
      }
    }
    $scope.userSellChanged =  function(){
      $scope.filtroUser = '';
      if ($scope.filtroU != ''){
        user = JSON.parse($scope.filtroU);
        $http.get('/users/' + user._id)
        .then(function(response) {
            $scope.filtroUser = user.name;
        });
      }
    }
});
