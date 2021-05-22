const mongoose = require('mongoose');
const User=process.env.USERMONGO;
const PassWord=process.env.PASSMONGO;
mongoose.connect('mongodb+srv://'+User+':'+PassWord+'@cluster0.bwhvb.mongodb.net/Pack&Pack?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));