const Sequelize = require('sequelize')

const db = new Sequelize(
  'postgres://uankvgehaqmllq:0ede022dde9ec035f4a515dba620d39222e5e902e8e5de64de20d7cc61848020@ec2-3-216-89-250.compute-1.amazonaws.com:5432/d64mt8jn6sm25q',
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
