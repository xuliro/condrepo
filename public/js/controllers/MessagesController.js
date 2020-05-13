angular.module('prototipo').controller('MessagesController',
function($scope, $window, $http, Message, User, AuthService) {
    $scope.messages = [];
    $scope.selectedMessage = '';
    $scope.mensagem = {texto: ''};
    $scope.loggedUser = AuthService.getLoggedUser();

    function buscaMessages() {
        Message.query(
        function(messages){
            $scope.messages = messages;
        },
        function(erro){
            $scope.mensagem = {texto: 'Não foi possível obter a lista de mensagens'};
            console.log(erro);
        });
    }
    buscaMessages();

    $scope.removeMessage = function(message) {
        if ($window.confirm("Confirma a exclusão da mensagem " + message.title + "?")){
          Message.delete({id: message._id},
              buscaMessages,
              function(erro){
                  $scope.mensagem = {texto: 'Não foi possível remover a mensagem'};
                  console.log(erro);
              }
          );
        }
    }

    $scope.showDetails = function(message) {

      var msgType = "N/A";
      switch(message.type){
        case 0: msgType = "Comunicado"; break;
        case 1: msgType = "Alerta"; break;
        case 2: msgType = "Entrega"; break;
        case 3: msgType = "Portaria"; break;
        case 4: msgType = "Segurança"; break;
        case 5: msgType = "Entre Moradores"; break;
        case 6: msgType = "Sugestão de pauta"; break;
        case 7: msgType = "Reclamação"; break;
        case 8: msgType = "Denúncia"; break;
        case 9: msgType = "Solicitação"; break;
        default: msgType = "Outro"; break;
      }

      var alertMessage =
          "Data: " + message.inclusion +
          "\nRemetente: " + message.sender.name +
          "\nTipo: " + msgType +
          "\n\nTítulo: " + message.title +
          "\nMensagem: " + message.message +
          "\nInformações Adicionais: " + message.more;
      $window.alert(alertMessage);
    }

    $scope.users = [];
    $scope.sender = null;
    $scope.receiver = null;

    User.query(function(users) {
        $scope.users = users;
    });

    $scope.senderMessageChanged =  function(filtro){
      if (filtro != ''){
        $scope.sender = JSON.parse(filtro);
        $scope.filtroS = $scope.sender.name;        
      }
    }

    $scope.receiverMessageChanged = function(filtro){
      if (filtro != ''){
        $scope.receiver = JSON.parse(filtro);
        $scope.filtroR = $scope.receiver.name;        
      }
    }

    $scope.filterMessages = function(message) {
        if ($scope.filtro != undefined && $scope.filtro != ''){
          if (message.title.toLowerCase().indexOf($scope.filtro.toLowerCase()) == -1){
            return;
          }
        }
        if ($scope.filtroS != undefined && $scope.filtroS != ''){
          if (message.sender == undefined || message.sender == null || message.sender.name != $scope.filtroS){
            return;
          }
        }
        if ($scope.filtroR != undefined && $scope.filtroR != ''){
          if (message.receiver == undefined || message.receiver == null || message.receiver.name != $scope.filtroR){
            return;
          }
        }
        return message;
    }

    $scope.back = function(){
         $window.history.back();
    };
});
