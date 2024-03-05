import { Chats } from "../models/chatsModel";
import { Message } from "../models/messageModels";
import { User } from "../models/userModel";

export const sendMessage = async (req, res, next) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      throw "Invalid data passed to the request ";
    }
    const newMessage = {
      sender: req.user._id,
      content,
      chat: chatId,
    };

    let result = await Message.create(newMessage);
    result = await result.populate("sender", "name pic");
    result = await result.populate("chat");
    result = await User.populate(result, {
      path: "Chat.users",
      select: "name pic email",
    });
    await Chats.findByIdAndUpdate(req.body.chatId, {
      latestMessage: result,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};
