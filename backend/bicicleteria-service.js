var BICICLETERIAS = require('./mock-bicicleterias').data;

function findAll(req, res, next) {
    return res.json(BICICLETERIAS);

};

function findById(req, res, next) {
    var id = req.params.id;
    res.json(BICICLETERIAS[id - 1]);
}

exports.findAll = findAll;
exports.findById = findById;