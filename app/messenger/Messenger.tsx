import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { io } from "socket.io-client";
import EmojiPicker, { Theme } from "emoji-picker-react";
import Messages from "./Messages";

const socket = io(import.meta.env.VITE_SERVER_URL);

interface IParams {
    username?: string;
    room?: string;
}

export interface IUser {
    name: string;
}

export interface IMessage {
    user: IUser;
    text: string;
}

const Messenger = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState<IParams | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
    const [chatUsers, setChatUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        if (searchParams.username && searchParams.room) {
            setParams(searchParams);
            socket.emit("join", searchParams);
        }
    }, [search]);

    useEffect(() => {
        socket.on("message", ({ data }) => {
            setMessages((prevState) => [...prevState, data]);
        });
    }, []);

    useEffect(() => {
        socket.on("joinRoom", ({ data }) => {
            setChatUsers(data.users);
        });
    }, []);

    useEffect(() => {
        socket.on("leftRoom", ({ data }) => {
            setChatUsers(data.users);
        });
    }, []);

    const leaveRoom = () => {
        socket.emit("leave", {
            username: params?.username,
            room: params?.room,
        });
        navigate("/");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!newMessage) return;

        socket.emit("sendMessage", {
            username: params?.username,
            room: params?.room,
            text: newMessage,
        });
        setNewMessage("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setNewMessage(e.target.value);

    const handleEmojiClick = ({ emoji }: { emoji: string }) =>
        setNewMessage(newMessage + emoji);

    return (
        <div className="wrap h-full">
            <div className="container bg-gray-900 shadow-xl rounded-md my-10 h-[-webkit-fill-available] max-sm:m-0 flex flex-col">
                <div className="w-full bg-gray-700 flex justify-between items-center rounded-t-md px-4 py-3">
                    <div className="font-bold text-xl select-none">
                        {params?.room}
                    </div>
                    <div className="select-none">{chatUsers.length} users</div>
                    <button
                        className="py-2 px-4 bg-red-500 hover:bg-red-700 rounded-md shadow-md text-white"
                        onClick={leaveRoom}
                    >
                        Leave room
                    </button>
                </div>
                <Messages
                    messages={messages}
                    user={{ name: params?.username ?? "No name" }}
                />
                <form onSubmit={handleSubmit}>
                    <div className="w-full bg-gray-700 flex items-center rounded-b-md px-4 py-3">
                        <input
                            type="text"
                            placeholder="What do you want to say?"
                            className="w-full py-3 px-4 text-white placeholder:text-gray-500 bg-gray-600 border-gray-600 rounded-md leading-tight focus:outline-none focus:shadow-outline mr-4"
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <div className="mr-4 relative cursor-pointer">
                            <div
                            className="text-lg"
                                onClick={() =>
                                    setIsEmojiPickerOpen(!isEmojiPickerOpen)
                                }
                            >
                                😃
                            </div>
                            {isEmojiPickerOpen && (
                                <EmojiPicker
                                    theme={Theme.AUTO}
                                    style={{
                                        position: "absolute",
                                        top: -450,
                                        left: -165,
                                    }}
                                    onEmojiClick={handleEmojiClick}
                                />
                            )}
                        </div>
                        <input
                            className="bg-blue-500 hover:bg-blue-700 rounded-md shadow-md px-3 py-2 text-nowrap cursor-pointer"
                            value="Send message"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Messenger;
