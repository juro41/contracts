const express = require('express');
var elasticsearch = require('elasticsearch');
const router = express.Router();

var client = new elasticsearch.Client({
  host: 'localhost:9200'
});



router.post('/sim', (req, res) => {

  let requestBody = JSON.parse(req.body.body);
  console.log("telo poziadavky -----------------------------");
  console.log(requestBody);

  mustValue = [{
    match: {
      "_all": {
        query: requestBody.expression.toLocaleLowerCase(),
        operator: "and"
      }
    }
  }];

  query = getQuery(mustValue, requestBody.direction, requestBody.size, requestBody.shift);

  console.log(query);
  client.search(
    query
  ).then(function (body) {
    res.send(body);
  }, function (error) {
    console.trace(error.message);
  });



})

router.post('/adv', (req, res) => {

  let requestBody = JSON.parse(req.body.body);
  console.log("telo poziadavky -----------------------------postsADV");
  console.log(requestBody);

  var mustValue = [];
  if (requestBody.nameContract != "") mustValue.push({
    match: {
      "title": {
        query: requestBody.nameContract.toLocaleLowerCase(),
        operator: "and"
      }
    }
  });
  if (requestBody.icoCustomer != "") mustValue.push({
    prefix: {
      "customer.ico": requestBody.icoCustomer
    }
  });
  if (requestBody.nameCustomer != "") mustValue.push({
    match: {
      "customer.name": {
        query: requestBody.nameCustomer.toLocaleLowerCase(),
        operator: "and"
      }
    }
  });
  if (requestBody.icoSupplier != "") mustValue.push({
    prefix: {
      "supplier.ico": requestBody.icoSupplier
    }
  });
  if (requestBody.nameSupplier != "") mustValue.push({
    match: {
      "supplier.name": {
        query: requestBody.nameSupplier.toLocaleLowerCase(),
        operator: "and"
      }
    }
  });

  query = getQuery(mustValue, requestBody.direction, requestBody.size, requestBody.shift);

  console.log(query);
  client.search(
    query
  ).then(function (body) {
    res.send(body);
  }, function (error) {
    console.trace(error.message);
  });



})

function getQuery(mustValue, direction, size, shift) {
  query = {
    body: {
      sort: [{
        "value.amount": {
          "order": direction
        }
      }],
      query: {
        bool: {
          must: mustValue
        }
      }
    },

    size: size,
    from: shift
  };
  return query;
}

module.exports = router;
