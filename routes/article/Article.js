const {handleDataToReturn} = require("../../util");
const {readFile, writeFile} = require("../../helper/file");

const calcPagination = (page, limit, data) => {
    const startIndex = (+page-1) * +limit;
    const endIndex = startIndex + +limit;

    return data.slice(startIndex, endIndex);
}
let dataByTagStore = {},
    searchResults = {}
module.exports = {
    getArticles: async (req, res) => {
        let {limit, page, crm} = req.query,
            ArticleData = await readFile('ArticleData.json'),
            filteredData = ArticleData.filter(item => item.article_status === 'active'),
            data = calcPagination(page, limit, crm ? ArticleData : filteredData),
            sessionId = req.client.server.sessionIdContext;

        if (dataByTagStore[sessionId]) delete dataByTagStore[sessionId]
        res.json(handleDataToReturn({data, count: Math.ceil(filteredData.length/limit)}))
    },
    getArticleById: async (req, res) => {
        let {articleId} = req.query,
            ArticleData = await readFile('ArticleData.json'),
            data = ArticleData.find(item => +item['article_id'] === +articleId);
        res.json(handleDataToReturn(data))
    },
    getArticlesByTag: async (req, res) => {
        const {limit, page, tagName} = req.query;
        const sessionId = req.client.server.sessionIdContext
        console.log(sessionId)
        const ArticleData = await readFile('ArticleData.json');
        const filterData = ArticleData.filter(item =>
            Array.isArray(item.article_tags) &&
            item.article_status === 'active' &&
            item.article_tags.some(tag => tag.toLowerCase().includes(tagName.toLowerCase()))
        );
        const data = calcPagination(page, limit, filterData);

        dataByTagStore[sessionId] = filterData

        res.json(handleDataToReturn({data, count: Math.ceil(filterData.length/limit)}))
    },
    handlePagination: async (req, res) => {
        let {limit, page} = req.query,
            ArticleData = await readFile('ArticleData.json'),
            filteredData = ArticleData.filter(item => item.article_status === 'active'),
            sessionId = req.client.server.sessionIdContext,
            data,count;

        if (dataByTagStore.hasOwnProperty(sessionId)) {
            data = calcPagination(page, limit, dataByTagStore[sessionId]);
            count = Math.ceil(dataByTagStore[sessionId].length/limit)
        } else {
            if (dataByTagStore[sessionId]) delete dataByTagStore[sessionId]
            data = calcPagination(page, limit, filteredData)
            count = Math.ceil(filteredData.length/limit)
        }

        res.json(handleDataToReturn({data, count}))
    },
    articleSearch: async (req, res) => {
        let {limit, page, searchParam} = req.query,
            lowerCaseSearchParam = searchParam.toLowerCase(),

            ArticleData = await readFile('ArticleData.json'),
            filteredData = ArticleData.filter(item => item.article_status === 'active');
        // Filter articles based on matching criteria
        const filterData = filteredData.filter(article => {
            const titleMatch = article.article_title.toLowerCase().includes(lowerCaseSearchParam);
            const tagsMatch = article.article_tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchParam));
            const summaryMatch = article.article_summary.toLowerCase().includes(lowerCaseSearchParam);

            // Return true if any field matches
            return titleMatch || tagsMatch || summaryMatch;
        });

        const data = calcPagination(page, limit, filterData)

        res.json(handleDataToReturn({data, count: Math.ceil(filterData.length/limit)}))
    },
    articleStatus: async (req, res) => {
        let {id, status} = req.body,
            ArticleData = await readFile('ArticleData.json'),
            indexToUpdate = ArticleData.findIndex(article => +article.article_id === +id);

        ArticleData[indexToUpdate] = {
            ...ArticleData[indexToUpdate],
            article_status: status,
        }

        writeFile('ArticleData.json', ArticleData)
            .then(() => res.json({success: true}))
            .catch(err => res.json({success: false, err}))


    },
    createArticle: async (req, res) => {
        let ArticleData = await readFile('ArticleData.json'),
            data = req.body,
            orderBoj = {
                article_id: ArticleData.length > 0 ? Math.max(...ArticleData.map(article => article.article_id)) + 1 : 0,
                ...data
            }
        ArticleData = [...ArticleData, orderBoj];

        writeFile('ArticleData.json', ArticleData)
            .then(() => res.json({success: true}))
            .catch(err => res.json({success: false, err}))

        res.json({success: true})
    },
    updateArticle: async (req, res) => {
        let {article_id} = req.params,
            ArticleData = await readFile('ArticleData.json'),
            indexToUpdate = ArticleData.findIndex(article => +article.article_id === +article_id);
        ArticleData[indexToUpdate] = req.body;

        writeFile('ArticleData.json', ArticleData)
            .then(() => res.json({success: true}))
            .catch(err => res.json({success: false, err}))
    }
}