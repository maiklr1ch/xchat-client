import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

type Inputs = {
    username: string;
    room: string;
};

const Main = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Inputs> = ({ username, room }) =>
        navigate(`/chat?username=${username}&room=${room}`);

    return (
        <div className="wrap h-full">
            <div>
                <h1 className="text-4xl font-bold text-center my-6 text-white">XChat</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-gray-600 dark:bg-gray-900 shadow-xl rounded-md px-8 pt-6 pb-6 mb-4 w-96">
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                className="main-input"
                                type="text"
                                placeholder="Username"
                                autoComplete="off"
                                {...register("username", { required: "true" })}
                            />
                            <div className="error-text">
                                {errors.username && "This field is required"}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="room"
                            >
                                Room
                            </label>
                            <input
                                className="main-input"
                                type="text"
                                placeholder="Room"
                                autoComplete="off"
                                {...register("room", { required: "true" })}
                            />
                            <div className="error-text">
                                {errors.room && "This field is required"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <input
                            type="submit"
                            className="text-white shadow-md cursor-pointer hover:bg-gray-700 dark:hover:bg-black bg-gray-600 dark:bg-gray-900 rounded-md uppercase w-full py-2 font-bold"
                            value={"Join"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Main;
