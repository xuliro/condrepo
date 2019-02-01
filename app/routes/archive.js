function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var archiveController = app.controllers.archive;

    app.route('/archives')
        .get(verificaAutenticacao, archiveController.listaArchives)
        .post(verificaAutenticacao, archiveController.salvaArchive);

    app.route('/archives/:id')
        .get(verificaAutenticacao, archiveController.obtemArchive)
        .delete(verificaAutenticacao, archiveController.removeArchive);

    app.route('/archives/condom/:id')
        .get(verificaAutenticacao, archiveController.listByCondom);
};
