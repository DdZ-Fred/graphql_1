const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/data/db.json');
const db = low(adapter);
db.defaults({
  idInc: 3,
  videos: [
    {
      id: '1',
      title: 'foo',
      duration: 120,
      watched: false,
      released: true,
    },
    {
      id: '2',
      title: 'foo2',
      duration: 3200,
      watched: false,
      released: false
    }
  ]
}).write();

module.exports = db;