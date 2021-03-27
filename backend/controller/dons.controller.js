const Dons = require("../models/dons.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const dons = new Dons({
        dons: req.body.dons,
        id: req.body.id
    });

    Dons.create(dons, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Dons.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving dons."
            });
        else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    Dons.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dons with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Dons with id " + req.params.id
                });
            }
        } else
            res.send(data);
    });
};

exports.findArtOne = (req, res) => {
    Dons.findByArtId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Dons with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Dons with id " + req.params.id
                });
            }
        } else
        res.send(data);
    });
};

exports.delete = (req, res) => {
    Dons.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(
                    `Not found Dons with id ${req.params.id}.`
                );
            } else {
                res.status(500).send( "Could not delete Dons with id " + req.params.id
                );
            }
        } else res.send({ message: `Dons was deleted successfully!` });
    });
};