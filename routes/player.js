const {
    getAllPlayers,
    getOnePlayer,
    postPlayer,
    deleteOnePlayer
} = require("../controllers/player");
const multer = require('fastify-multer');
const path = require('path');
const { sendCommandEmailController } = require("../controllers/email");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
});

const uploadPath = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Unsupported file type!'), false);
        }
    }
});

function playerRoutes(fastify, options, done) {
    fastify.get(
        "/players",
        getAllPlayers
    );

    fastify.post(
        "/player",
        { preHandler: uploadPath.single('image') },
        postPlayer
    );

    fastify.post(
        "/player/commander",

        sendCommandEmailController
    );

    fastify.get(
        "/player/:id",
        getOnePlayer
    );
    fastify.delete(
        "/player/:id",
        deleteOnePlayer
    );

    done();
}

module.exports = playerRoutes;
