import React, { useState } from 'react'
import { BsBell } from 'react-icons/bs'
import NotificationModal from './NotificationModal'

const AppBar = () => {
    const [showModal,setShowModal]=useState(false);

    const handleShowNotification = () => {
        setShowModal((prev)=>!prev);
    }
    return (
        <div onClick={handleShowNotification}>
            <span><BsBell /></span>
            {showModal && (
            <NotificationModal />
            )}
        </div>
    )
}

export default AppBar