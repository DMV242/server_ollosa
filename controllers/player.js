const playerService = require("../services/player");
const userService = require("../services/user");

async function getAllPlayers(req, reply) {
    try {
        const players = await playerService.getAllPlayers();
        reply
            .status(200)
            .send({ players });
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function postPlayer(req, reply) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!(await userService.isAdminUser(token))) {
            return reply.status(403).send({ message: "Accès refusé. Admin requis." });
        }
        const BASE_URL = req.protocol + "://" + req.hostname;
        const player = await playerService.createPlayer({ ...req.body, image: BASE_URL + "/" + "public/" + req.file.filename });

        reply.status(201).send(player);
    } catch (error) {
        reply.status(500).send(error);
    }
}

async function getOnePlayer(req, reply) {
    try {

        const id = req.params.id;

        const player = await playerService.getOnePlayer(id);
        if (!player) {
            return reply.status(404).send({ message: "Pas de joueurs avec cet ID" });
        }
        reply.status(200).send({
            player
        });
    } catch (error) {
        reply.status(400).send(error.message);
    }
}
async function deleteOnePlayer(req, reply) {
    try {

        const id = req.params.id;

        await playerService.DeleteOnePlayer(id);

        reply.status(200).send({
            "Mesage": "Supprimé avec succès"
        });
    } catch (error) {
        reply.status(400).send(error.message);
    }
}

module.exports = {
    getOnePlayer,
    getAllPlayers,
    postPlayer,
    deleteOnePlayer
}
