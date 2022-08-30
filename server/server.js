const express = require('express');
const app = express();
const Router = require('./Routes/index');
const utils = require('./utils/db_utils')
const path = require('path')

app.use(express.json());

app.use('/api/v1', Router);


app.use(express.static(path.join(__dirname,"..",'dist')));

app.get('/',(req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const port= 3000;


const run = async () => {

  await utils.connectToDB();

  app.listen(port,()=>{
      console.log(`server listening on port ${port}...`);
  })
}

run();