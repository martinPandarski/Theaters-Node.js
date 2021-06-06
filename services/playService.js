const Play = require('../models/Play');



const create = (playData) => {
   let play = new Play({...playData, createdAt: new Date()});
   console.log( play)

   return play.save();
}

const getAll = () => {
    return Play.find({}).sort({createdAt: -1}).lean()
}

const getOne = (id) => {
    return Play.findById(id).lean()
}




module.exports = {
    create,
    getAll,
    getOne,
}