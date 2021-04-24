const Articles = require("../models/articles.model.js");

exports.findAll = (req, res) => {
    Articles.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        else
            res.send(data);
    });
};

exports.findPrixAll = (req, res) => {
    Articles.getPrixAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving articles."
            });
        else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    Articles.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Articles with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Articles with id " + req.params.id
                });
            }
        } else
            if (data.photo != null) {
                data.photo = data.photo.toString("base64");
            }
        res.send(data);
    });
};

exports.findCatOne = (req, res) => {
    Articles.findByCatId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Articles with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Articles with id " + req.params.id
                });
            }
        } else
            res.send(data);
    });
};

exports.delete = (req, res) => {
    Articles.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(
                    `Not found Articles with id ${req.params.id}.`
                );
            } else {
                res.status(500).send("Could not delete Articles with id " + req.params.id
                );
            }
        } else res.send({ message: `Articles was deleted successfully!` });
    });
};