var sanitize = require('mongo-sanitize');
var md5 = require('md5');
module.exports = function (app) {
    var User = app.models.user;
    var userController = {};
    userController.listaUsers = function (req, res) {
        User.find().populate('condom').populate('tower').populate('unit').populate('possessions').exec()
            .then(function (users) {
                res.json(users);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    userController.listByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        User.find({
                condom: _id
            }).populate('condom').populate('tower').populate('unit').populate("possessions").exec()
            .then(function (users) {
                res.json(users);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    userController.listByUnit = function (req, res) {
        var _id = sanitize(req.params.id);
        User.find({
                unit: _id
            }).exec()
            .then(function (users) {
                res.json(users);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    userController.listAdmsByCondom = function (req, res) {
        var _id = sanitize(req.params.id);
        User.find({
                condom: _id,
                isAdmin: true
            }).populate('condom').populate('tower').populate('unit').populate("possessions").exec()
            .then(function (users) {
                res.json(users);
            }, function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };
    userController.obtemUser = function (req, res) {
        var _id = sanitize(req.params.id);
        User.findById(_id).populate('condom').populate('tower').populate('unit').populate('possessions').exec()
            .then(function (user) {
                if (!user) throw new Error("Usuário não encontrado");
                res.json(user);
            }, function (erro) {
                console.error(erro)
                res.status(404).json(erro);
            });
    };
    userController.removeUser = function (req, res) {
        var _id = sanitize(req.params.id);
        User.remove({
                "_id": _id
            }).exec()
            .then(function () {
                res.status(204).end();
            }, function (erro) {
                return console.error(erro);
            });
    };
    userController.salvaUser = function (req, res) {
        var _id = req.body._id;
        var pwd = req.body.password;
        /*if (req.body.password.length <= 30) {
            pwd = md5(req.body.password);
        }*/

        var dados = {
            "login": req.body.login,
            "password": pwd,
            "name": req.body.name,
            "email": req.body.email,
            "contact": req.body.contact,
            "id": req.body.id,
            "provider": req.body.provider,
            "isAdmin": req.body.isAdmin,
            "isSuper": req.body.isSuper,
            "isEntrance": req.body.isEntrance,
            "isBlocked": req.body.isBlocked,
            "condom": req.body.condom || null,
            "tower": req.body.tower || null,
            "unit": req.body.unit || null,
            "possessions": req.body.possessions || null,
            //"inclusion": req.body.inclusion, //Automaticamente inserido pelo model
        };
        if (_id) {
            User.findByIdAndUpdate(_id, dados).exec()
                .then(function (user) {
                    res.json(user);
                }, function (erro) {
                    console.error(erro)
                    res.status(500).json(erro);
                });
        } else {
            User.create(dados)
                .then(function (user) {
                    res.status(201).json(user);
                }, function (erro) {
                    console.error(erro)
                    res.status(500).json(erro);
                });
        }
    };
    return userController;
};