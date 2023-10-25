
import "./index.css"

const MyTasks = (props)=>{
    const {eachObject,checkBoxProp,deleteButtonClickedProp}=props
    const {todo,completed,id}=eachObject 
    // console.log(eachObject)

    const checkBoxTiggerred=(event)=>{
        checkBoxProp(id)
    }

    const addlabelTextDecoration = completed===1 ? "label-textDecoration" : "" 
    
    const status = completed===1 ? true:false


    const deleteButtonClicked = ()=>{
        deleteButtonClickedProp(id)
    }

    return (
    <li className='todo-item-container'>
        <input id={id} type="checkbox" className="checkbox-input" onChange={checkBoxTiggerred} checked={status} />
        <div className='label-container'>
          <label htmlFor={id} className={`checkbox-label ${addlabelTextDecoration}`}>{todo}</label>
          <button type="button" className="deleteButton" onClick={deleteButtonClicked}>
            <img className='delete-icon' alt="delete Icon" src="https://cdn-icons-png.flaticon.com/128/6096/6096937.png" />
          </button>
        </div>
    </li>
    )
}

export default MyTasks


