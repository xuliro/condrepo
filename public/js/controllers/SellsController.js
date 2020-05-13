angular.module('prototipo').controller('SellsController',
function($scope, $window, $http, Sell, Condom, User, AuthService) {
    $scope.sells = [];
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaSells() {
        Sell.query(
        function(sells){
            $scope.sells = sells;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de anúncios'};
            console.log(erro);
        });
    }
    buscaSells();

    $scope.removeSell = function(sell) {
        if ($window.confirm("Confirma a exclusão do anúncio " + sell.title + "?")) {
          Sell.delete({id: sell._id},
              buscaSells,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover o anúncio'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.condoms = [];
    $scope.users = [];
    $scope.condom = null;
    $scope.user = null;

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });
    User.query(function(users) {
        $scope.users = users;
    });

    $scope.condomSellChanged =  function(filtro){
      $scope.condom = [];
      if (filtro != ''){
        $scope.condom = JSON.parse(filtro);
        $scope.filtroC = $scope.condom.name;        
      }
    }
    $scope.userSellChanged =  function(filtro){
      $scope.user = [];
      if (filtro != ''){
        $scope.user = JSON.parse(filtro);
        $scope.filtroU = $scope.user.name;        
      }
    }

    $scope.filterSells = function(sell) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (sell.title.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroC != undefined && $scope.filtroC != ''){
          if (sell.condom == undefined || sell.condom == null || sell.condom.name != $scope.filtroC){
            return;
          }
        }
        if ($scope.filtroU != undefined && $scope.filtroU != ''){
          if (sell.user == undefined || sell.user == null || sell.user.name != $scope.filtroU){
            return;
          }
        }
        return sell;
    }

    $scope.showDetails = function(sell) {
      var alertMessage = "Anúncio: " + sell.title +
          "\nDetalhes: " + sell.details +
          "\nValor: R$ " + sell.value +
          "\nForma de contato: " + sell.contact +
          (sell.user === null ? "" : ("\nUsuário: " + sell.user.name));
      $window.alert(alertMessage);
    }

    $scope.back = function(){
         $window.history.back();
    };
});
