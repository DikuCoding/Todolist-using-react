import React, {useState, useEffect} from 'react'
import "./style.css";

//to get data from local storage

const getLocalItems =()=>{
  let list=localStorage.getItem('lists');

  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }
}
const NewTodo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem =()=>{
    if(!inputData){
      alert("Please fill the data");
    }
    else if(inputData && !toggleSubmit){
        setItems(items.map((elem)=>{
          if(elem.id === isEditItem){
            return{...elem, name: inputData}
          }
          return  elem;
        })
        )
        setInputData('');
        setIsEditItem(null);
        setToggleSubmit(true);
    }
    else{
     const allInputData = {id:new Date().getTime().toString(), name:inputData}
     setItems([...items, allInputData]);
     setInputData("");
    }
  }
  const deleteItem=(index)=>{
    const updatedItem = items.filter((elem)=> {
      return index !== elem.id;
    });
    setItems(updatedItem);
  }

  const editItem=(id)=>{
    let newEditItem = items.find((elem)=>{
      return elem.id === id;
    });
    console.log(newEditItem);
    setInputData(newEditItem.name);//This contains updated item
    
    setIsEditItem(id); //id of that updated/edited item
    setToggleSubmit(false);
  }
  //Removing all items
  const clearBtn=()=>{
    setItems([]);
  }
  //Add data to local storage
  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(items))
  },[items])
  return (
    <>
     <div className="main-div">
        <div className="child-div">
            <div className="addItems">
            <input type="text" placeholder='Add items' className='formControl' 
                 value={inputData} 
                onChange={(event)=>setInputData(event.target.value)}  />
                {
                  toggleSubmit?<i className="fa fa-plus add-btn"  onClick={addItem}></i>:
                  <i className="far fa-edit add-btn"  onClick={addItem}></i>
                  }
            </div>
            {/* Show our items */}
            <div className='showItems'>
              {items.map((elem)=>{
                return(
                  <div className='eachItem' key={elem.id}>
                    <h3>{elem.name}</h3>
                    <div className="todo-btn">
                {/* <i className="far fa-edit add-btn" onClick={()=>editItem(curElem
                  .id)}></i> */}
                <i className="far fa-edit add-btn" onClick={()=>editItem(elem.id)}></i>
                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(elem.id)}></i>
                </div>
                  </div>
                )
              }
              )}
            </div>
        {/* Clear all Button */}
        <button onClick={clearBtn}>Clear all</button>
        </div>

       
     </div>
      
    </>
  )
}

export default NewTodo
