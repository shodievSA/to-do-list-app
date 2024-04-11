import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function CancelButton({ onClick }) 
{
    const cancelButtonStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: "50%",
        fontSize: 28,
        color: "red"
    }

    return (
        <>
        <div style={cancelButtonStyles} onClick={onClick}>
            <FontAwesomeIcon icon={faCircleXmark} />
        </div>
        </>
    );
}
