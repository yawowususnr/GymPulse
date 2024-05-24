var moment = require('moment');

const data = [
    { dataora: "2019-10-20T04:00:00Z", valore: -0.04 },
    { dataora: "2019-10-20T05:00:00Z", valore: -0.03 },
    { dataora: "2019-10-20T06:00:00Z", valore: -0.03 },
    { dataora: "2019-10-20T07:00:00Z", valore: -0.03 },
    { dataora: "2019-10-21T10:00:00Z", valore: -0.04 },
    { dataora: "2019-10-21T23:00:00Z", valore: -0.04 },
    { dataora: "2019-10-22T00:00:00Z", valore: -0.04 }
  ];

data.forEach(d => {
  d.dataora = moment(d.dataora).valueOf(); // date -> epoch
});

