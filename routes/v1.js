var express = require('express');
var router = express.Router();
var v1 = require('../controllers/v1');

router.get('/search/:val', async (req, res) => {
    if(req.params.val) {
        let results = await v1.getResults(req.params.val);
        res.send(results.data.children);
    }
    else res.send([]);
});

router.get('/', (req, res) => {
    res.send('v1 is working');
});


//export this router to use in our index.js
module.exports = router;