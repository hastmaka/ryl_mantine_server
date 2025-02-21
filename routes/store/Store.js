const {handleDataToReturn} = require("../../util");
module.exports = {
    getStores: (req, res) => {
        const stores = {

        }

        res.json(handleDataToReturn(stores))
    }
}