import React, {useState, useEffect} from 'react'
import "./style.css";
import logo from "../images/todo.svg"

// get the localStorage data back
const getLocalData =()=>{
  const lists = localStorage.getItem("myTodoList");
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return([])
  }
}
const Todo = () => {
  const [inputData, setInputData]= useState("");
  const [items, setItems]= useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  // add the items function
  const addItem =()=>{
    if(!inputData){
      alert("Please fill the data");
    }
    else if(inputData && toggleBtn ){
      setItems(
        items.map((curElem)=>{
          if(curElem.id === isEditItem){
            return{...curElem, name:inputData}
          }
         return curElem;
        })
      )
    setInputData("");
    setIsEditItem(null);
    setToggleBtn(false);
    }
    else{
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name:inputData,
      }
      setItems([...items, myNewInputData])
      setInputData("");
    }
  }
  // edit the items
 const editItem=(index)=>{
    const item_todo_edited = items.find((curElem)=>{
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleBtn(true); 
  }

  // how to delete item section
  const deleteItem=(index)=>{
    const updatedItem = items.filter((curElem)=>{
        return curElem.id !== index;
    });
    setItems(updatedItem);
  }
  // remove all elements
  const removeAll = ()=>{
    setItems([]);
  }
  //  Adding localStorage and useEffect hook
  useEffect(()=>{
    localStorage.setItem("myTodoList", JSON.stringify(items))
  },[items])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src={logo} alt="todologo" />
                <figcaption>Add your list here ✌</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='Add items' className='formControl' value={inputData} onChange={(event)=>setInputData(event.target.value)} />
                {toggleBtn ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>) :(
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
                )}
            </div>
           
           {/* Show our items */}
            <div className="showItems">
              {items.map((curElem )=>{
                return(
              <div className="eachItem" key={curElem.id}>
                <h3>{curElem.name}</h3>
                <div className="todo-btn">
                <i className="far fa-edit add-btn" onClick={()=>editItem(curElem
                  .id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                </div>
              </div>
                )
              })}
            </div>
            {/* remove all button */}
            <div className="showItems">
              <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll}>
                    <span>Check list</span> 
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
