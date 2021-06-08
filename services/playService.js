const Play = require('../models/Play');



const create = (playData, userId) => {
   let play = new Play({...playData, createdAt: new Date(), creator: userId});
   return play.save();
}

const getAll = () => {
    return Play.find({})
     .sort({createdAt: -1})
     .lean();
}

const getOne = (id, userId) => {
     return Play.findById(id)
     .populate('likedByUsers')
     .lean()
     .then(play => {
             play.likedPlays = play.likedByUsers.some(x => x._id = userId)
             play.isOwn = play.creator == userId
             return play
            }
         )
     
}

const likePlay = (playId, userId) => {
    console.log(userId)
    return Play.findById(playId)
    .then(play => {
        play.likedByUsers.push(userId);

        return play.save();
    })

}

const deletePlay = (playId) => {
   return Play.deleteOne({_id : playId})
}

const updateOne = (playId, playData) => {
    return Play.updateOne({_id: playId}, playData )
}

module.exports = {
    create,
    getAll,
    getOne,
    likePlay,
    deletePlay,
    updateOne
}