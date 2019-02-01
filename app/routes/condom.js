function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}
﻿module.exports = function (app) {
    var condomController = app.controllers.condom;
    app.route('/condoms')
        .get(verificaAutenticacao, condomController.listaCondoms)
        .post(verificaAutenticacao, condomController.salvaCondom);
    app.route('/condoms/:id')
        .get(verificaAutenticacao, condomController.obtemCondom)
        .delete(verificaAutenticacao, condomController.removeCondom);
    app.route('/condoms/code/:code')
        .get(condomController.obtemPorCodigo);
};
