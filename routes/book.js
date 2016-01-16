var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('READ all items');
});

router.post('/new', function(req, res) {
  var data = req.body
  var response = ''
  for (item in data) {
    response += item,
    response += ': '
    response += data[item]
    response += ', '
  }
  console.log(data)
  res.send('CREATE a new item with this data: ' + response);
});

router.get('/:id', function(req, res) {
    var id = req.params.id
    res.send('READ item ' + id);
});

router.put('/:id', function (req, res){
  var id = req.params.id
  res.send('UPDATE item ' + id);
});

router.delete('/:id', function (req, res){
  var id = req.params.id
  res.send('DELETE item ' + id);
});

module.exports = router;
