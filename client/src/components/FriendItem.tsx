import React from "react";
import Button from '../components/UI/Button'

interface FriendItemProps {
    // updateFriend: (a :string) => void;
    // deleteFriend: (a :string) => void;
    name: string;
    id:string;
    age: number;
    onUpdateFriend:(id:string) => void;
    onDeleteFriend:(id:string) => void
}


const FriendItem = (props: FriendItemProps) => {
    return (
        <li className="li-item" key={props.id}>
            <div className="item-content">
                <p>
                    nome: {props.name}, age: {props.age}
                </p>
            </div>
            <Button onClick={() => props.onUpdateFriend(props.id)}>Update</Button>
            <Button onClick={() => props.onDeleteFriend(props.id)}>Delete</Button>
        </li>
    );
};

export default FriendItem;
