const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Thread = require("../models/threadModel");
const Message = require("../models/messageModel");


exports.getMessage = catchAsyncErrors(async (req, res) => {

    const referenceId = req.params.referenceId;
    const type = req.params.type;

    let thread = await Thread.findOne({ referenceId });

    if (!thread) {

        thread = await Thread.create({ type, referenceId });
        thread.save();
    }

    const messages = await Message.find({ threadId: thread._id }).populate('sender');
    res.json({success: true, threadId: thread._id, messages});
    
});