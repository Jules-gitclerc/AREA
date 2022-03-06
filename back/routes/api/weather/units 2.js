
async function unitsData(req, res) {
    res.status(200).send([
        {label: 'metric', id: 1},
        {label: 'imperial', id: 2},
    ])
}

module.exports = {
    unitsData
}