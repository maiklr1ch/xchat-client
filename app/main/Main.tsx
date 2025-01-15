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
                <h1 className="text-4xl font-bold text-center my-6">XChat</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-gray-900 shadow-xl rounded-md px-8 pt-6 pb-6 mb-4 w-96">
                        <div className="mb-4">
                            <label
                                className="block text-white text-sm font-bold mb-2"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                className="shadow bg-gray-800 appearance-none border rounded-md w-full py-2 px-3 bg border-gray-900 text-white leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Username"
                                autoComplete="off"
                                {...register("username", { required: "true" })}
                            />
                            <div className="text-red-700 text-sm font-bold h-4 py-1">
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
                                className="shadow bg-gray-800 appearance-none border rounded-md w-full py-2 px-3 bg border-gray-900 text-white leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Room"
                                autoComplete="off"
                                {...register("room", { required: "true" })}
                            />
                            <div className="text-red-700 text-sm font-bold h-4 pt-1">
                                {errors.room && "This field is required"}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <input
                            type="submit"
                            className="shadow-xl cursor-pointer hover:bg-black bg-gray-900 rounded-md uppercase w-full py-2 font-bold"
                            value={"Join"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Main;
