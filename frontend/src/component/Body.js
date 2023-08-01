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
        await axios.post('https://headless-backend-qx89.onrender.com/api/v1/create-sub', { description })

        setDescription('')
        setActive(true)
    }
    const onChangeHandler = e => {
        setDescription(e.target.value);
    }
    return (
        <div className='body-container'>
            <p>Enter notification text</p>
            <form onSubmit={onSubmitHandler} className="input-form">
                <input className="input" value={description} onChange={onChangeHandler} placeholder="Enter notification text" />
                <button className="form-btn">Send</button>
            </form>
        </div>
    )
}

export default Body