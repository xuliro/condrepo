angular.module('prototipo').controller('MessageController',
function($scope, $http, $window, $location, $routeParams, Message, User, AuthService) {
  $scope.loggedUser = AuthService.getLoggedUser();
    if($routeParams.messageId){
        Message.get({id: $routeParams.messageId},
            function(message){
                $scope.message = message;
            },
            function(erro){
                $scope.mensagem = {texto: 'Não foi possível obter a mensagem'};
                console.log(erro);
            }
        );
    } else {
        $scope.message = new Message();
    }
    $scope.salvaMessage = function(){
        if (sender != ''){
          $scope.message.sender = sender;
        }
        if (receiver != ''){
          $scope.message.receiver = receiver;
        }

        $scope.message.$save()
            .then(function(){
                $window.location.reload();
                $scope.mensagem = {texto: 'Mensagem salva com sucesso'};
                //$location.path('/messages/');
            })
            .catch(function(){
                $scope.mensagem = {texto: 'Não foi possível salvar a mensagem'};
            });
    };
    Message.query(function(messages) {
        $scope.messages = messages;
    });
    $scope.back = function(){
         $window.history.back();
    };

    var sender = '';
    var receiver = '';

    User.query(function(users) {
        $scope.users = users;
    });
    $scope.senderMessageChanged =  function(){
      $scope.filtroSe = '';
      if ($scope.filtroS != ''){
        sender = JSON.parse($scope.filtroS);
      }
    }
    $scope.receiverMessageChanged = function(){
      $scope.filtroRe = '';
      if ($scope.filtroR != ''){
        receiver = JSON.parse($scope.filtroR);
      }
    }
});
