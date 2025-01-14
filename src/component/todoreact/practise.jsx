import React, { useState } from 'react'
import "./style.css";

const Practise = () => {
  
    const [inputData, setInputData] = useState('');
    const [item, setItem] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);


    const addItem=()=>{
        if(!inputData){
            alert("Fill the data");
        }
        else if(inputData && !toggleSubmit){
            setItem(item.map((elem)=>{
                if(elem.id === isEditItem){
                    return {...item, name: inputData}
                }
                return elem;
            })
            ) 
            setInputData('');
            setIsEditItem(null);
            setToggleSubmit(true);
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name: inputData};
            setItem([...item, allInputData]);
            setInputData("");
        }
    }
    const deleteBtn=(id)=>{
        const updatedItem = item.filter((curElem)=>{
            return  id !== curElem.id;
        })
        setItem(updatedItem);
    }

    const editItem =(id)=>{
        let newEditItem = item.find((elem)=>{
            return elem.id=== id;
        });
        console.log(newEditItem);
        setInputData(newEditItem.name);
        setIsEditItem(id);
        setToggleSubmit(false);
    }

  return (
    <div>
    <div className="addItems">
        <input type="text" placeholder='Add items' className='formControl' value={inputData} onChange={(event)=>setInputData(event.target.value)}/> 
        {toggleSubmit?
            <button onClick={addItem}><h2>Add Item</h2></button> :
            <i className="far fa-edit add-btn" onClick={addItem}></i>
        }
    </div>
        

        <br />
        {/* Displaying items */}
        <div className='showItems'>
        {item.map((elem)=>{
            return(
                <div className='eachItem' key={elem.id}><h2>{elem.name}</h2>
                <div className="todo-btn">
                <i className="far fa-trash-alt add-btn" onClick={()=>deleteBtn(elem.id)}></i> <br /><br /><br />
                <i className="far fa-edit add-btn" onClick={()=>editItem(elem.id)}></i> 
                </div>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default Practise
