const Sequelize = require('sequelize')

const db = new Sequelize(
  'postgres://postgres:Supervinom12@localhost:5432/capstone',
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
