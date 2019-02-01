function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var workerController = app.controllers.worker;

    app.route('/workers')
        .get(verificaAutenticacao, workerController.listaWorkers)
        .post(verificaAutenticacao, workerController.salvaWorker);

    app.route('/workers/:id')
        .get(verificaAutenticacao, workerController.obtemWorker)
        .delete(verificaAutenticacao, workerController.removeWorker);

    app.route('/workers/unit/:id')
        .get(verificaAutenticacao, workerController.listByUnit);
    app.route('/workers/tower/:id')
        .get(verificaAutenticacao, workerController.listByTower);
    app.route('/workers/condom/:id')
        .get(verificaAutenticacao, workerController.listByCondom);
    app.route('/workers/condom/all/:id')
        .get(verificaAutenticacao, workerController.listAllByCondom);
};
