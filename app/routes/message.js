function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var messageController = app.controllers.message;

    app.route('/messages')
        .get(verificaAutenticacao, messageController.listaMessages)
        .post(verificaAutenticacao, messageController.salvaMessage);

    app.route('/messages/:id')
        .get(verificaAutenticacao, messageController.obtemMessage)
        .delete(verificaAutenticacao, messageController.removeMessage);

    app.route('/messages/sender/:id')
        .get(verificaAutenticacao, messageController.listBySender);
    app.route('/messages/receiver/:id')
        .get(verificaAutenticacao, messageController.listByReceiver);
};
