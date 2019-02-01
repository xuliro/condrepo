function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}
﻿module.exports = function (app) {
    var towerController = app.controllers.tower;
    app.route('/towers')
        .get(verificaAutenticacao, towerController.listaTowers)
        .post(verificaAutenticacao, towerController.salvaTower);
    app.route('/towers/:id')
        .get(verificaAutenticacao, towerController.obtemTower)
        .delete(verificaAutenticacao, towerController.removeTower);
};
