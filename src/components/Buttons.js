import React, { useState } from "react";
import "./Buttons.css";

export const Buttons = () => {
return (
<div>
    <div className="buttons">
    <button
        className="button"
        onClick={() =>
        console.log("This button will open a modal to send a payment")
        }
    >
        Send
    </button>
    <button
        className="button"
        onClick={() =>
        console.log("This button will open a modal to receive a payment")
        }
    >
        Receive
    </button>
    </div>
    {/* <PaymentsModal modalState={modalState} setModalState={setModalState} /> */}
</div>
);
};

export default Buttons;
