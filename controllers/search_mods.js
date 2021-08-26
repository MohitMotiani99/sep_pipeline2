var validate_user = require('./authorize')

var url = 'mongodb+srv://pradyumnakedilaya:secret123%23@cluster0.vlavb.mongodb.net/skillenhancement?retryWrites=true&w=majority'
var db_name = 'skillenhancement'
var col_name_q = 'questionAnswer'
var col_name_u = 'user'

var MongoClient = require('mongodb').MongoClient


module.exports = function search_user(token){


    MongoClient.connect(url,(err,db)=>{
        if(err)throw err
        dbo = db.db(db_name)
    
        console.log('sep Database Connected')
    
        var q_counter;
        var initial_q_counter
    
        
        dbo.collection(col_name_u).find({'token':token}).toArray((err,result)=>{
            if(result.length == 1 && validate_user(token,result[0]))
                return result
            else
                return null
        })
    })
    

    
}
