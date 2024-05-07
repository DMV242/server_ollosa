const PlayerModel = require("../models/player");


const createPlayer = async (data) => {
    const newPlayer = await PlayerModel.create(data);
    return newPlayer;
}


const getAllPlayers = async () => {
    const allPlayers = await PlayerModel.find({});
    return allPlayers;
}

const getOnePlayer = async (id) => {
    const player = await PlayerModel.findById({
        _id: id
    });
    return player;
}
const DeleteOnePlayer = async (id) => {
    const player = await PlayerModel.deleteOne({
        _id: id
    })
    return player;
}

module.exports = {
    getAllPlayers,
    getOnePlayer,
    createPlayer,
    DeleteOnePlayer
}