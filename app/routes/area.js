function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var areaController = app.controllers.area;

    app.route('/areas')
        .get(verificaAutenticacao, areaController.listaAreas)
        .post(verificaAutenticacao, areaController.salvaArea);

    app.route('/areas/:id')
        .get(verificaAutenticacao, areaController.obtemArea)
        .delete(verificaAutenticacao, areaController.removeArea);
  
    app.route('/areas/tower/:id')
        .get(verificaAutenticacao, areaController.listByTower);
    app.route('/areas/condom/:id')
        .get(verificaAutenticacao, areaController.listByCondom);
};
