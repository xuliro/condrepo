function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var userController = app.controllers.user;

    app.route('/users')
        .get(verificaAutenticacao, userController.listaUsers)
        .post(verificaAutenticacao, userController.salvaUser);

    app.route('/users/:id')
        .get(verificaAutenticacao, userController.obtemUser)
        .delete(verificaAutenticacao, userController.removeUser);

    app.route('/users/unit/:id')
        .get(verificaAutenticacao, userController.listByUnit);
    app.route('/users/condom/:id')
        .get(verificaAutenticacao, userController.listByCondom);
    app.route('/users/condom/adms/:id')
        .get(verificaAutenticacao, userController.listAdmsByCondom);
};
