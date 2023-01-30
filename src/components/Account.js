import React, {useState} from 'react';
import {setKeys} from "../background/account";

const Account = () => {
    const [privateKey, setPrivateKey] = useState('')

    function submitKey() {
        setKeys(privateKey)
    }

    return (
        <div className={"grid grid-cols-2 gap-6"}>
            <input
                className={"p-3 rounded"}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder={"privateKey"}
            />
            <div className={"grid grid-cols-2"}>
                <div className={"flex w-24 bg-gray-400 cursor-pointer rounded items-center justify-center"} onClick={submitKey}>
                    Add
                </div>
            </div>
        </div>
    );
};

export default Account;