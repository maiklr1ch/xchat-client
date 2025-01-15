import { createRef, useEffect, type FC } from "react";
import type { IMessage, IUser } from "./Messenger";

interface IMessagesProps {
    messages: IMessage[];
    user: IUser;
}

const Messages: FC<IMessagesProps> = ({ messages, user }) => {
    const messagesEndRef = createRef<HTMLDivElement>();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col py-4 px-6 max-sm:py-2 max-sm:px-3 h-full overflow-y-scroll overflow-x-hidden scroll-smooth">
            {messages.map((message, i) => {
                const itsMe = user.name === message.user.name;

                return (
                    <div
                        key={i}
                        className={`mb-4 max-sm:mb-1 flex flex-col ${itsMe && "self-end"}`}
                    >
                        <div className="text-gray-800 dark:text-gray-600 px-2 py-1">
                            {message.user.name}
                        </div>
                        <div
                            className={`rounded-md px-3 py-2 w-fit md:max-w-4xl ${
                                itsMe
                                    ? "self-end bg-blue-400 dark:bg-blue-700 rounded-br-none text-white dark:text-black"
                                    : "bg-gray-400 dark:bg-gray-600 rounded-bl-none"
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                );
            })}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;
