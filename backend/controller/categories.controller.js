const Categories = require("../models/categories.model.js");


exports.findCat = (req, res) => {
    Categories.findCatById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Categories with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Categories with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};