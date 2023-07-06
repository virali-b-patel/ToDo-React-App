import React from "react";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("Fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputData };
          } else {
            return element;
          }
        })
      );
      setInputData([]);
      setIsEditItem("");
      setToggleButton(false);
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newInputData]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    const editItem = items.find((element) => {
      return element.id === id;
    });
    setInputData(editItem.name);
    setIsEditItem(id);
    setToggleButton(true);
  };

  const deleteItem = (id) => {
    const deleteItem = items.filter((element) => {
      return element.id !== id;
    });
    setItems(deleteItem);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              className="form-control"
              type="text"
              placeholder="✍️ Add Item"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(element.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(element.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
