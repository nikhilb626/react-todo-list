import React,{useState,useEffect} from "react";
import "./todo.css";


// to get from localstorage

const getLocalItems=()=>{
    let list=localStorage.getItem("lists");

    if(list){
        return JSON.parse(localStorage.getItem("lists"));
    }else{
        return [];
    }
}



const Todo=()=>{
    const [inputData,setInputData]=useState();
    const [items,setItems]=useState(getLocalItems());

    const [toggleSubmit,setToggleSubmit]=useState(true);


    const [finalEdit,setEditItem]=useState(null);

    const addItem=()=>{
        if(!inputData){
         alert("please fill the data");   
        }else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id===finalEdit){
                        return {...elem,name:inputData}
                    }
                    return elem;
                    
                })
            )
            setInputData("");
            document.getElementById("listinp").value=" ";
            setToggleSubmit(true);
        }else{
            const allInputData={id:new Date().getTime().toString(),name:inputData};
            setItems([...items,allInputData]);
            setInputData("");
            document.getElementById("listinp").value=" ";

        }
    }

    // get the id and name of the data which user clicked to edit
    // set the toggle mode to change the sibmit button into edit button
    // now update the valuer of the setInput with the new updated value to edit
    // to pass the current element id to new state variable for refrence

    const editItem=(index)=>{
        let newEditItem=items.find((elem)=>{
            return elem.id===index
        });

        setToggleSubmit(false);

        setInputData(newEditItem.name);

        setEditItem(index);
    }



    const deleteItem=(index)=>{
      const updatedItems=items.filter((elem)=>{
          return index!==elem.id;
      })
      setItems(updatedItems);
    }


    const removeAll=()=>{
        setItems([]);
    }


    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(items))
    },[items])


    return (
        <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="todo.png" alt="todo Logo" />
            </figure>

            <div className="addItems">
                <input type="text" placeholder="add  items" onChange={(e)=>setInputData(e.target.value)} id="listinp" />
            {
                toggleSubmit? <button type="button"  onClick={addItem}>+</button>:
                <button type="button"   onClick={addItem}> <i className="far fa-edit add-btn"  ></i></button>
            }
            </div>
            <div className="showItems">
            {
                items.map((elem)=>{
                    return (
                        <div className="eachItems" key={elem.id}>
                    <h3>{elem.name}</h3>
                    <div className="iconhere">
                    <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(elem.id)}></i>

                    <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(elem.id)}></i>
                    </div>
                </div>
                    )
                })
            }
            
            </div>

            <div className="showItems">
                <button className="btn effect04" onClick={removeAll}>delete all</button>
            </div>
        </div>
    </div>

        </>
    )
}


export default Todo;