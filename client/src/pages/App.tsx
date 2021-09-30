import "../styles/Global.css";
import React, { useState, useEffect } from "react";
import FormControl from "../components/FormControl";
import Axios from "axios";

interface Friend {
    name: string;
    age: number;
    _id: string;
}

function App() {
    const [listOfFriends, setListOfFriends] = useState<Friend[]>([]);
    const [friendAge, setFriendAge] = useState<number>(0);
    const [friendName, setFriendName] = useState<string>("");

    useEffect(() => {
        Axios.get("http://localhost:3001/read").then((response) => {
            console.log(response.data);
            setListOfFriends(response.data);
        });
    }, []);

    const onNameChange = (value: string) => {
        setFriendName(value);
    };

    const onAgeChange = (value: number) => {
        setFriendAge(value);
    };

    const addNewFriend = (e: React.FormEvent) => {
        e.preventDefault();

        Axios.post("http://localhost:3001/addFriend", {
            name: friendName,
            age: friendAge,
        }).then((response) => {
            setListOfFriends((prev): Friend[] => {
                const newFriendList = [
                    ...prev,
                    {
                        _id: response.data._id,
                        name: friendName,
                        age: friendAge,
                    },
                ];
                return newFriendList;
            });
        });
    };

    const updateFriend = (id: string) => {
        const newAge = Number(prompt("Enter the correct age"))!;

        Axios.put("http://localhost:3001/update", {
            age: newAge,
            id: id,
        }).then((response) => {
            setListOfFriends((prev): Friend[] => {
                const previous = [...prev];
                const listUpdated = previous.map((friend) => {
                    return friend._id === id
                        ? { _id: id, name: friend.name, age: newAge }
                        : friend;
                });
                return listUpdated;
            });
        });
    };


    const deleteFriend = (id: string) => {
            Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setListOfFriends((prev): Friend[] => {
                const previous = [...prev];
                const newList = previous.filter((friend) => friend._id !== id );
                return newList;
            })
        })
    }

    return (
        <div className="App">
            <section className="section-1">
                <FormControl
                    onNameChange={onNameChange}
                    onAgeChange={onAgeChange}
                    onAddNewFriend={addNewFriend}
                />
            </section>
            <section className="section-2">
                <ul className="list-of-friends">
                    {listOfFriends.map((val) => {
                        return (
                            <li className="li-item" key={val._id}>
                                <div className="item-content">
                                    <p>
                                        nome: {val.name}, age: {val.age}
                                    </p>
                                </div>
                                <button
                                    onClick={(
                                        e: React.MouseEvent<HTMLButtonElement>
                                    ) => {
                                        e.preventDefault();
                                        updateFriend(val._id);
                                    }}
                                >
                                    Update
                                </button>

                                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    e.preventDefault();
                                    deleteFriend(val._id)
                                }}>Delete</button>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
}

export default App;
