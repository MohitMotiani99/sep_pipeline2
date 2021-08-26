var validate_user = require('./authorize')

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'
var db_name = 'sep'
var col_name_q = 'questions'
var col_name_u = 'users'

MongoClient.connect(url,(err,db)=>{
    if(err) throw err
    dbo = db.db(db_name)

    const check_user = function(token){
        dbo.collection(col_name_u).find({'token':token}).toArray((err,result)=>{
            if(result.length == 1 && validate_user(token,result[0]))
                return result[0]
            else
                return null
        })
    }
    const check_question = function(question_id){
        dbo.collection(col_name_q).find({'self_id':question_id}).toArray((err,result)=>{
            if(result.length == 1)
                return result[0]
            else
                return null
        })
    }

    module.exports={
        check_user,
        check_question
    }
    
})

