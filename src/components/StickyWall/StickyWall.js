import React from 'react'
import styles from "./StickyWall.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import SaveButton from '../Buttons/SaveButton/SaveButton';
import CancelButton from '../Buttons/CancelButton/CancelButton';

function StickyWallPage() {

  const [isIconClicked, setIsIconClicked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [headerInput, setHeaderInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [colorIndex, setColorIndex] = useState(0);

  let colors = ["lightblue", "yellow", "tomato", "lightpink", "#ff007f", "#66ff00","#c5be77", "#c48494"];

  function addNote() 
  {
    if (colorIndex + 1 === colors.length)
    {
      setColorIndex(0);
    } else 
    {
      setColorIndex(colorIndex + 1);
    }
    setNotes([...notes, 
      { header : headerInput, 
        text : textInput, 
        backgroundColor : colors[colorIndex], 
        readOnly : true,
        isMenuClicked : false,
        isFocused : false,
        isEditButtonClicked : false }
      ]);
    setIsIconClicked(!isIconClicked);
    setHeaderInput("");
    setTextInput("");
  }

  function cancel() 
  {
    setIsIconClicked(!isIconClicked);
    setHeaderInput("");
    setTextInput("");
  }

  function removeNote(note)
  {
    setNotes(notes.filter((item) => 
    {
      if (note !== item) return item;
    }));
  }

  const menu_options = useRef(null);
  const input = useRef(null);

  function openMenu(note) 
  {
    setNotes(notes.map((item) => {
      return (item === note) ? {...item, isMenuClicked : !item.isMenuClicked} : item;
    }))
  }

  function editNote(note) 
  {
    setNotes(notes.map(item => {
      return (note === item) ? {
        ...item, 
        isMenuClicked : false, 
        readOnly : false, 
        isEditButtonClicked: true,
        beforeEdit : item.text
      } : item;
    }));
  }

  useEffect(() => 
  {
    document.onmousedown = (e) => 
    {
      if (menu_options.current && !menu_options.current.contains(e.target))
      {
        setNotes(notes.map((item) => {
          return {...item, isMenuClicked : false};
        }))
      }
    }
  });

  function changeNote(e, note)
  {
    setNotes(notes.map((item) => {
      return (item === note) ? {...item, text: e.target.value} : item;
    }));
  }

  function saveChanges(note)
  {
    setNotes(notes.map((item) => {
      return (item === note) ? {...item, isEditButtonClicked: false, readOnly: true} : item;
    }));
  }

  function cancelEdit(note)
  {
    setNotes(notes.map((item) => {
      return (item === note) ? {...item, text: item.beforeEdit, isEditButtonClicked: false, readOnly: true} : item;
    }));
  }

  return (
    <>
    <div className={styles.stickyWall}>
      <div className={styles.pageName}>Sticky Wall</div>
      <div className={styles.notes}>
        <div className={styles.createNoteButton}>
          {isIconClicked ? (
            <div className={styles.noteForm}>
              <div className={styles.buttons}>
                {textInput.length > 0 && (
                  <SaveButton handleClick={addNote} />
                )}
                <CancelButton onClick={cancel} />
              </div>
              <div className={styles.inputs}>
                <input value={headerInput} className={styles.noteTitleInput} placeholder="Title (optional)" maxLength={27} onChange={(e) => setHeaderInput(e.target.value)} />
                <textarea value={textInput} rows="11" wrap='hard' className={styles.noteBodyInput} placeholder="Start your note here..." maxLength={372} onChange={(e) => setTextInput(e.target.value)} />
              </div>
            </div>
          ) : (
            <div className={styles.plusIcon} onClick={() => setIsIconClicked(!isIconClicked)}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          )}
        </div>
        {notes.length > 0 ? (
          notes.map((item, index) => {
            return (
              <div key={index} className={styles.note} style={{ backgroundColor: item.backgroundColor }}>
                {item.isEditButtonClicked ? (
                  <div className={styles.buttons}>
                    <SaveButton handleClick={() => saveChanges(item)} />
                    <CancelButton onClick={() => cancelEdit(item)} />
                  </div>
                  ) : (
                    <div className={styles.menu}>
                      <div className={styles.menuIcon} onClick={() => openMenu(item)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                      </div>
                      {item.isMenuClicked && (
                        <div className={styles.menuOptions} ref={menu_options}>
                          <div className={styles.editButton} onClick={() => editNote(item)}>
                            <div>Edit</div>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </div>
                          <div className={styles.deleteButton} onClick={() => removeNote(item)}>
                            <div>Delete</div>
                            <FontAwesomeIcon icon={faTrash} />
                          </div>
                        </div>
                       )}
                    </div>
                  )}
                <div className={styles.inputs}>
                  <input readOnly={item.readOnly} value={item.header} className={styles.noteTitleInput} />
                  <textarea ref={input} maxLength={372} readOnly={item.readOnly} value={item.text} className={styles.noteBodyInput} onChange={() => changeNote(item)} />
                </div>
              </div>
            )
          })
        ) : (
          null
        )}
      </div>
    </div>
    </>
  )
}

export default StickyWallPage;