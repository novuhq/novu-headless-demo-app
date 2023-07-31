import "../styles/body.css"
import { useState } from 'react'
import axios from "axios"
import "../styles/body.css"
import { useNotification } from "../context/NotificationContext"
const Body = () => {

    const [description, setDescription] = useState('');
    const { active, setActive } = useNotification();
    const onSubmitHandler = async e => {
        e.preventDefault()
        await axios.post('http://localhost:3000/api/v1/create-sub', { description })

        setDescription('')
        setActive(true)
    }
    const onChangeHandler = e => {
        setDescription(e.target.value);
    }
    console.log('stateeeeeee', active);
    return (
        <div className='body-container'>
            <form onSubmit={onSubmitHandler}>
                <input className="input" value={description} onChange={onChangeHandler} />
                <button>Send</button>
            </form>
        </div>
    )
}

export default Body