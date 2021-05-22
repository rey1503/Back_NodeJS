var NewUser = require('../Models/NewUser');
const enigma = require('enigma-code');
const jwt = require('jsonwebtoken');
const valorEncriptacion = 10
var key = process.env.SECRET;
enigma.genHash(valorEncriptacion, key, 'lreyhernandez')

exports.Delete =(req,res)=>{
        NewUser.findByIdAndDelete({ _id: req.params.id })
            .then(doc =>
                res.json({message:"Removed"}))
            .catch(err => {
                console.log('Error while deleting data', err.message);
                res.status(400).json({ message: 'failed' });
            })}

exports.BringAllTheData =(req,res)=>{    
    NewUser.find()
        .then(doc =>
            res.json(doc))
        .catch(err => {
            console.log('Error getting data', err.message);
            res.status(400).json({ message: 'failed' });
        });}

        exports.Recove = (req, res) =>{
           NewUser.aggregate([{
            $match: {
                Gender:"Woman",
                Age: {$gt: 18}  
            }
        },{
            $project: {
                Name:"$Name", 
                Telephone:"$Telephone",
                Hobby:"$Hobby",
            }
        },
        {
            $group: {
            _id: {
                Hobby: "$Hobby",
                Name: "$Name",
                Telephone:"$Telephone"
            }
        }
    }, {
        $sort: {
          Date: -1
        }
      }]).then(doc =>
                    res.json(doc))
                .catch(err => {
                    console.log('Error getting data', err.message);
                    res.status(400).json({ message: 'failed' });
                })
            }

            exports.Login = async(req,res) =>{
                var usuario = req.body.Name;
                try {
                    await NewUser.findOne({Name:usuario})
            .then(doc =>{
               var hash=doc.Password;
                enigma.Desencriptar(hash,(err,des)=>{
                    if(err) return console.log(err);
                    if(des===req.body.Password){
                        const token = jwt.sign({
                           id:doc.id,
                           usuario:doc.Name,
                           correo:doc.Mail,
                        },'Pack',)
                        res.json({
                      token: token,
                        })
                    }else{
                        return res.json({
                          message:'Invalid Password'
                        })
                    }
                })
            })
                } catch (error) {
                    return res.status(400).json({
                      message: 'Wrong credentials',
                })
            }
        }
            exports.DecryptPassword=(req,res)=>{
                var contra =  req.body.pass;
                enigma.Desencriptar(contra,function(err,des){
                  if(err) return console.log(err);
                  console.log(des);
                })
            }

        exports.Add =(req, res)=>{  
            if(req.body.Name == "" || req.body.Mail == "" || req.body.Telephone == ""
            || req.body.Password == "" || req.body.Age == ""|| req.body.Gender == "" 
            || req.body.Hobby == "" ){
                res.json({
                    message: 'there are empty fields'
                })
                return false
            }
            var date = new Date()
            enigma.genHash(valorEncriptacion, key, req.body.Password,(err, hash) =>{
                if (err) return console.log(err), res.json({
                    status: 400,
                    err:err,
                    message: 'failed'
                });
                var Pass = hash
                const New = NewUser({
                    Name: req.body.Name,
                    Mail: req.body.Mail,
                    Telephone: req.body.Telephone,
                    Password: Pass,
                    Age: req.body.Age,
                    Gender: req.body.Gender,
                    Hobby: req.body.Hobby,
                    Date: date
                })
                    New.save().then(
                        res.json({
                            status: 200,
                            message: 'Save'
                        }))    
            })
        }
