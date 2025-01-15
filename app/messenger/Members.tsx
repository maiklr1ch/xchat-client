import { type FC } from "react";
import type { IUser } from "./Messenger";

interface IMembers {
    list: IUser[];
    myUsername?: string;
}

const Members: FC<IMembers> = ({ list, myUsername }) => {
    return (
        <div className="absolute bg-white dark:bg-gray-600 rounded-b-md w-60 h-80 shadow-md top-11 -left-16 flex flex-col items-center overflow-y-auto overflow-x-hidden scroll-smooth">
            {list.map((user) => (
                <div key={user._id} className={`py-2 ${myUsername === user.name ? 'text-blue-400 dark:text-white font-bold' : 'text-black dark:text-gray-300'}`}>
                    {user.name}
                </div>
            ))}
        </div>
    );
};

export default Members;
