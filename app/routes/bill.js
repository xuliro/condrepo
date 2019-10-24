function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function (app) {
  var billController = app.controllers.bill;
  var multer = require('multer');
  var fs = require('fs');
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, "Boleto_" + Date.now() + ".pdf");
    }
  })
  var upload = multer({
    storage
  });
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

  app.route('/uploadFile')
    .post(upload.single('file'), function (req, res, next) {
      if (req.file.mimetype != 'application/pdf') {
        try {
          fs.unlinkSync(req.file.path)
        } catch (err) {
          console.log("Could not remove " + req.file.path);
          console.error(err);
        }
        console.error("FORMATO INVALIDO");
      } else {
        console.error("FORMATO OK: PATH " + req.file.path);
        billController.setFile(req.file.path);
      }
    });

  app.route('/uploads/:boleto')
    .get(verificaAutenticacao, function (req, res) {
      const file = 'uploads/' + req.params.boleto;
      res.download(file);
    })
};