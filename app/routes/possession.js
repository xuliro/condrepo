function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}
﻿module.exports = function (app) {
    var possessionController = app.controllers.possession;
    app.route('/possessions')
        .get(verificaAutenticacao, possessionController.listaPossessions)
        .post(verificaAutenticacao, possessionController.salvaPossession);
    app.route('/possessions/:id')
        .get(verificaAutenticacao, possessionController.obtemPossession)
        .delete(verificaAutenticacao, possessionController.removePossession);
};
