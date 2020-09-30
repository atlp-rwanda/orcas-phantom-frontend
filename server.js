const Express = require('express');
const {join} =require('path');
const app = Express();
require('dotenv').config();

app.use(Express.static(join(__dirname, '/')));
if(process.env.NODE_ENV==='production'){
  app.use(Express.static('build'));
  app.get('*',(req, res)=>{
    res.sendFile(join('build', 'index.html'));
  });
}

const PORT = process.env.PORT||8080;
app.listen(PORT, ()=>{
  console.log(`app running on port ${PORT}`);
});
