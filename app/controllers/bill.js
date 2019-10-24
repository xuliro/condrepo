var sanitize = require('mongo-sanitize');
var fileUpload;
module.exports = function (app) {
    var Bill = app.models.bill;
    var billController = {};
    billController.listaBills = function (req, res) {
        Bill.find().populate('condom').populate('tower').populate('unit').exec()
            .then(function (bills) {
                res.json(bills);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    billController.setFile = function (file) {
        fileUpload = file;
    }
    billController.listByUnit = function (req, res) {
        var _id = sanitize(req.params.id);
        Bill.find({
                unit: _id
            }).exec()
            .then(function (bills) {
                res.json(bills);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    billController.listByTower = function (req, res) {
        var _id = sanitize(req.params.id);
        Bill.find({
                tower: _id
            }).exec()
            .then(function (bills) {
                res.json(bills);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    billController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        Bill.find({
                condom: _id
            }).exec()
            .then(function (bills) {
                res.json(bills);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    billController.obtemBill = function (req, res) {
        var _id = sanitize(req.params.id);
        Bill.findById(_id).populate('condom').populate('tower').populate('unit').exec()
            .then(function (bill) {
                if (!bill) throw new Error("Despesa não encontrada");
                fileUpload = bill.boleto;
                res.json(bill);
            }, function (erro) {
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    billController.removeBill = function (req, res) {
        var _id = sanitize(req.params.id);
        Bill.remove({
                "_id": _id
            }).exec()
            .then(function () {
                res.status(204).end();
            }, function (erro) {
                return console.error(erro);
            });
    };
    billController.salvaBill = function (req, res) {
        var _id = req.body._id;
        var dados = {
            "description": req.body.description,
            "condom": req.body.condom || null,
            "tower": req.body.tower || null,
            "unit": req.body.unit || null,
            //"inclusion": req.body.inclusion, //Automaticamente inserido pelo model
            "due": req.body.due,
            "value": req.body.value,
            "boleto": fileUpload,
            "isPaid": req.body.isPaid || false
        };
        if (_id) {
            Bill.findByIdAndUpdate(_id, dados).exec()
                .then(function (bill) {
                    res.json(bill);
                }, function (erro) {
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
            Bill.create(dados)
                .then(function (bill) {
                    res.status(201).json(bill);
                }, function (erro) {
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return billController;
};