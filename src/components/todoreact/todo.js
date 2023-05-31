import React,{useState,useEffect} from "react";
import "./style.css";

const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist")

  if(lists){
    return JSON.parse(lists)
  }else{
   return[]
  }
}

const Todo = () => {
  const [inputdata,setInputdata]=useState("")
  const [items,setItems]=useState(getLocalData())
  const [isEditItem,setIsEditItem]=useState("")
  const [toggleButton,setToggleButton]=useState(false)

const addItem=()=>{
  if(!inputdata){
    alert("Fill the data")
  }else if(inputdata && toggleButton){
    setItems(
      items.map((element)=>{
        if(element.id===isEditItem){
          return {...element,name:inputdata}
        }
        return element
      })
    )
    setInputdata("")
    setIsEditItem(null)
    setToggleButton(false)
  } else{
  const newInputData={
    id:new Date().getTime().toString(),
    name:inputdata,
  }
  setItems([...items,newInputData])
  setInputdata("")
}
}


const editItem=(index)=>{
  const Item_todo_edited=items.find((element)=>{
    return element.id===index
  })
  setInputdata(Item_todo_edited.name)
  setIsEditItem(index)
  setToggleButton(true)
}

const deleteItem=(index)=>{
  const updatedItems=items.filter((element)=>{
    return element.id!=index
  })
  setItems(updatedItems)
}

const removeAll=()=>{
  setItems([])
}

useEffect(()=>{
localStorage.setItem("mytodolist",JSON.stringify(items))
},[items])

 
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./image/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder="Add Item" className="form-control" value={inputdata} onChange={e=>setInputdata(e.target.value)}/>
            {
              toggleButton?(<i className="fa fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          </div>
          <div className="showItems">
            {
              items.map((element)=>{
                return ( 
                  <div className="eachItem" key={element.id}>
                    <h3>{element.name}</h3>
                    <div className="todo-btn">
                      <i className="fa fa-plus add-btn" onClick={()=>editItem(element.id)}></i>
                      <i className="fa fa-plus add-btn" onClick={()=>deleteItem(element.id)}></i>
                  </div>
                </div>
              )
              })
            }
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
             <span>CHECK LIST</span> 
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
