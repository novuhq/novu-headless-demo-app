import "../styles/body.css"
import { useState } from 'react'
import axios from "axios"
import "../styles/body.css"
const Body = () => {

    const [description, setDescription] = useState('');

    const onSubmitHandler = async e => {
        e.preventDefault()
        await axios.post('http://localhost:3000/api/v1/create-sub', { description })
        // fetch('http://localhost:3000/api/v1/create-sub', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: description
        // }).then((res) => console.log(res)).catch((err) => console.log(err));
        setDescription('')
    }
    const onChangeHandler = e => {
        setDescription(e.target.value)
    }
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