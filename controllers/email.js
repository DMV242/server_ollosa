const { findById } = require("../models/user");
const {
  createAndSaveCode,
  sendVerificationEmail,
  sendCommandEmail,
} = require("../services/email");
const { getOnePlayer } = require("../services/player");
const { findUserById, decodeToken } = require("../services/user");

async function sendVerificationCode(req, reply) {
  const { email } = req.body;

  const verificationCode = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  await createAndSaveCode(email, verificationCode);

  await sendVerificationEmail(email, verificationCode);

  return "Verification code sent.";
}

async function sendCommandEmailController(req, reply) {
  try {
    const { message, playerId } = req.body

    const token = req.headers.authorization.split(" ")[1];
    const userId = decodeToken(token);
    if (!userId) {
      return reply.status(401).send({ message: "Session invalide ou expiré" });
    }
    const user = await findUserById(userId);
    const player = await getOnePlayer(playerId);
    await sendCommandEmail(user.email, message, player);
    reply.status(200).send({

      message: "Commande effectuer avec succès avec succès !",
    });
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
}
module.exports = { sendVerificationCode, sendCommandEmailController };
