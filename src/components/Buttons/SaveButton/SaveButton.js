import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function SaveButton(props) {

  const { handleClick } = props;

  const saveButtonStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    color: "#00A86B",
    backgroundColor: "white",
    borderRadius: "50%",
    fontSize: 28
  }
  
  return (
    <>
    <div style={saveButtonStyles} onClick={handleClick}>
      <FontAwesomeIcon icon={faCircleCheck} />
    </div>
    </>
  )

}

export default SaveButton;