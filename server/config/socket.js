const Message = require("../models/messageModel");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");

const initializeSocket = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: process.env.CLIENT_DOMAIN,
            credentials: true,
        },
    });

    io.on("connection", async (socket, next) => {
        console.log("New client connected:", socket.id);

        socket.on("joinThread", (threadId) => {
            socket.join(threadId);
        });

        socket.on("newMessage", async ({ threadId, userId, text }) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    return next(ErrorHandler("User not found", 404));
                }
                const message = await Message.create({ threadId, sender: userId, text });
                message.save();
                const populatedMessage = await Message.findById(message._id).populate("sender");
                io.to(threadId).emit("receiveMessage", populatedMessage);
            } catch (error) {
                console.error("Error saving message:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

module.exports = initializeSocket;