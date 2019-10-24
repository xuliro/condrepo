angular.module('prototipo').controller('BillsController',
  function ($scope, $window, $http, Bill, Condom, Tower, Unit, AuthService) {
    $scope.bills = [];
    $scope.mensagem = {
      texto: ''
    };
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaBills() {
      Bill.query(
        function (bills) {
          $scope.bills = bills;
        },
        function (erro) {
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista de despesas'
          };
          console.log(erro);
        });
    }
    buscaBills();

    $scope.removeBill = function (bill) {
      if ($window.confirm("Confirma a exclusão da despesa " + bill.description + "?")) {
        Bill.delete({
            id: bill._id
          },
          buscaBills,
          function (erro) {
            $scope.mensagem = {
              texto: 'Não foi possível remover a despesa'
            };
            console.log(erro);
          }
        );
      }
    }

    $scope.condoms = [];
    $scope.towers = [];
    $scope.units = [];

    $scope.condom = null;
    $scope.tower = null;
    $scope.unit = null;

    Condom.query(function (condoms) {
      $scope.condoms = condoms;
    });

    $scope.condomBillChanged = function (filtro) {
      $scope.condom = [];
      $scope.towers = [];
      if (filtro != '') {
        $scope.condom = JSON.parse(filtro);
        $http.get('/condoms/' + $scope.condom._id)
          .then(function (response) {
            $scope.towers = response.data.towers;
            $scope.filtroC = $scope.condom.name;
          });
      }
    }

    $scope.towerBillChanged = function (filtro) {
      $scope.tower = [];
      $scope.units = [];
      if (filtro != '') {
        $scope.tower = JSON.parse(filtro);
        $http.get('/towers/' + $scope.tower._id)
          .then(function (response) {
            $scope.units = response.data.units;
            $scope.filtroT = $scope.tower.name;
          });
      }
    }

    $scope.unitBillChanged = function (filtro) {
      $scope.tower = [];
      if (filtro != '') {
        $scope.unit = JSON.parse(filtro);
        $scope.filtroU = $scope.unit.name;
      }
    }

    $scope.filterBills = function (bill) {
      if ($scope.filtro != undefined && $scope.filtro != '') {
        if (bill.description.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1) {
          return;
        }
      }
      if ($scope.filtroC != undefined && $scope.filtroC != '') {
        if (bill.condom == undefined || bill.condom == null || bill.condom.name != $scope.filtroC) {
          return;
        }
      }
      if ($scope.filtroT != undefined && $scope.filtroT != '') {
        if (bill.tower == undefined || bill.tower == null || bill.tower.name != $scope.filtroT) {
          return;
        }
      }
      if ($scope.filtroU != undefined && $scope.filtroU != '') {
        if (bill.unit == undefined || bill.unit == null || bill.unit.name != $scope.filtroU) {
          return;
        }
      }
      return bill;
    }

    $scope.showDetails = function (bill) {
      var alertMessage = "Despesa: " + bill.description +
        "\nData de inclusão: " + bill.inclusion +
        "\nData de vencimento: " + bill.due +
        "\nValor: R$ " + bill.value +
        "\nPago: " + (bill.isPaid === true ? "Sim" : "Não") +
        (bill.tower === null ? "" : ("\nTorre: " + bill.tower.name)) +
        (bill.unit === null ? "" : ("\nUnidade: " + bill.unit.name));
      $window.alert(alertMessage);
    }

    $scope.showPDF = function (boleto) {
      var alertMessage = "Boleto: " + boleto;
      $window.alert(alertMessage);
    }

    $scope.back = function () {
      $window.history.back();
    };
  });