const chai = require('chai');
const chaiHttp = require('chai-http')

const { configureServer, app} = require('../server')
const utils = require('../utils/db_utils')

chai.use(chaiHttp)

const internals = {};

before(async () => {
    await configureServer();
    internals.requestor = chai.request(app).keepOpen();
    internals.db = utils.internals.db;
    
})

afterEach(async () => {
    await internals.db.dropDatabase()
})

after(async () => {
    await utils.internals.client.close()
    await internals.requestor.close()
})

module.exports = internals 
// before, beforeeach, after, aftereach

// chai - except -> must
// superagent - optional
// have server listen using chai or superagent

// -how to write tests correctly
// -tests structure

// make only the index and descriptions/it (not it content)
