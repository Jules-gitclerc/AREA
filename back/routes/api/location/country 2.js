const dataCountry = require("./data/country.json").country

function getDataCountry(req, res) {
    const filterSearch = dataCountry.filter(element => element.country.toLowerCase().includes(req.query.search.toLowerCase())).slice(0, 7);
    let target = []

    filterSearch.forEach(item => target.push({
        iso2: item.iso2,
        iso3: item.iso3,
        country: item.country
    }))
    res.status(200).send(target)
}

module.exports = {
    getDataCountry
}