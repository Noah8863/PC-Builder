const data = require('../../client/src/data/parts.json')

exports.partsControllers = (req, res) => {
    res.json(data)
}
