const {handleDataToReturn} = require("../../util");
const {readFile} = require("../../helper/file");
module.exports = {
    getTags: async (req, res) => {
        let ArticleData = await readFile('ArticleData.json'),
            filteredData = ArticleData.filter(item => item.article_status === 'active'),
            // Flatten all tags into a single array and create a Set for unique values
            uniqueTags = new Set();

        filteredData.forEach(item => {
            item.article_tags.forEach(tag => uniqueTags.add(tag));
        });

        res.json(handleDataToReturn(Array.from(uniqueTags)))
    },

}