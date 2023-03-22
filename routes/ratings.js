var express = require('express');
var router = express.Router();
const { rating } = require('../controllers');

router.get('/', function (req, res) {

    const ipAddress = req.socket.remoteAddress;
    console.log(ipAddress);
    res.send(ipAddress);
});

router.post('/create_rating', rating.create);

router.put('/update_rating', rating.updateRating);

router.put('/update_comment', rating.updateComment);

router.delete('/delete_rating', rating.deleteRating);

module.exports = router;
