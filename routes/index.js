const express = require('express');
const router = express.Router();
const Square = require('./square/Square');
const Email = require('./email/Email');
const Article = require('./article/Article');
const Tag = require('./tag/Tag');
const Store = require('./store/Store');

router.get('/', (req, res) => {
    res.send('test root')
})

//test email template
const {paymentReceipt} = require("../emailTemplate");
router.get('/api', (req, res) => {
    res.send(paymentReceipt({name: 'luis'}))
})
router.post('/api/service-request', Email.serviceRequest)
router.post('/api/contact-us', Email.contactUs)


//articles
router.post('/api/article', Article.createArticle)
router.put('/api/article/:article_id', Article.updateArticle)
router.get('/api/articles', Article.getArticles)
router.get('/api/articleById', Article.getArticleById)
router.get('/api/articleByTag', Article.getArticlesByTag)
router.get('/api/articlesSearch', Article.articleSearch)
router.get('/api/pagination', Article.handlePagination)
router.post('/api/articleStatus', Article.articleStatus)

//tags
router.get('/api/tags', Tag.getTags)

//stores
router.get('/api/stores', Store.getStores)

//login
router.post('/api/login', (req, res) => {
    let {email, password} = req.body,
        pass = '9990',
        em = 'maka@maka.com';

    if (email !== em || password !== pass) {
        return res.json('incorrect')
    } else {
        res.json({success: true})
    }

})



/** square **/
// router.post('/api/process-payment', Square.processPayment)
// router.post('/api/process-payment-real', Square.processPaymentReal)
// router.get('/api/list-locations', Square.listLocations)

//square webhook
// router.post('/api/webhook/payment-completed', Square.paymentCompleted)



module.exports = router