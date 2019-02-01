function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}
﻿module.exports = function (app) {
    var unitController = app.controllers.unit;
    app.route('/units')
        .get(verificaAutenticacao, unitController.listaUnits)
        .post(verificaAutenticacao, unitController.salvaUnit);
    app.route('/units/:id')
        .get(verificaAutenticacao, unitController.obtemUnit)
        .delete(verificaAutenticacao, unitController.removeUnit);
};
