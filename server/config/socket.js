const Message = require("../models/messageModel");
const ErrorHandler = require("../utils/errorhandler");
const parseCookies = require("../utils/parseCookie");

const initializeSocket = (server) => {
    const io = require("socket.io")(server, {
        cors: {
            origin: process.env.CLIENT_DOMAIN,
            credentials: true,
        },
    });

    io.on("connection", async (socket, next) => {
        console.log("New client connected:", socket.id);

        const cookies = parseCookies(socket.handshake.headers.cookie);

        const token = cookies.token;

        if (!token) {
            return next(new ErrorHandler("Authentication error: No token provided", 400));
        }
        const user = await decodeToken(token);

        if (!user) {
            socket.disconnect();
            return next(new ErrorHandler("Unauthorized use", 401));
        }

        socket.on("joinThread", (threadId) => {
            socket.join(threadId);
        });

        socket.on("newMessage", async ({ threadId, text }) => {
            try {
                const message = await Message.create({ threadId, sender: user._id, text });
                message.save();
                io.to(threadId).emit("receiveMessage", message);
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