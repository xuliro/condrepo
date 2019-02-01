function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var billController = app.controllers.bill;

    app.route('/bills')
        .get(verificaAutenticacao, billController.listaBills)
        .post(verificaAutenticacao, billController.salvaBill);

    app.route('/bills/:id')
        .get(verificaAutenticacao, billController.obtemBill)
        .delete(verificaAutenticacao, billController.removeBill);

    app.route('/bills/unit/:id')
        .get(verificaAutenticacao, billController.listByUnit);
    app.route('/bills/tower/:id')
        .get(verificaAutenticacao, billController.listByTower);
    app.route('/bills/condom/:id')
        .get(verificaAutenticacao, billController.listByCondom);
};
