angular.module('prototipo').controller('BillController',
function($scope, $http, $window, $location, $routeParams, Bill, Condom, Tower, Unit) {
    if($routeParams.billId){
        Bill.get({id: $routeParams.billId},
            function(bill){
                $scope.bill = bill;
                $scope.bill.due = new Date(bill.due);
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter a despesa'};
                console.log(erro);
            }
        );
    } else {
        $scope.bill = new Bill();
    }
    $scope.salvaBill = function(){
        if (condom != ''){
          $scope.bill.condom = condom;
        }
        if (tower != ''){
          $scope.bill.tower = tower;
        }
        if (unit != ''){
          $scope.bill.unit = unit;
        }

        $scope.bill.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Despesa salva com sucesso'};
                //$location.path('/bills/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar a despesa'};
            });
    };
    Bill.query(function(bills) {
        $scope.bills = bills;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var condom = '';
    var tower = '';
    var unit = '';

    Condom.query(function(condoms) {
        $scope.condoms = condoms;
    });

    $scope.coBillChanged =  function(filtro){
      $scope.filtroCo = '';
      if (filtro != ''){
        condom = JSON.parse(filtro);
        $http.get('/condoms/' + condom._id)
        .then(function(response) {
            $scope.towers = response.data.towers;
            $scope.filtroCo = condom.name;
        });
      }
    }

    $scope.toBillChanged = function(filtro){
      $scope.filtroTo = '';
      if (filtro != ''){
        tower = JSON.parse(filtro);
        $http.get('/towers/' + tower._id)
        .then(function(response) {
            $scope.units = response.data.units;
            $scope.filtroTo = tower.name;
        });
      }
    }

    $scope.unBillChanged = function(filtro){
      $scope.filtroUn = '';
      if (filtro != ''){
          unit = JSON.parse(filtro);
          $scope.filtroUn = unit.name;
      }
    }
});
