import React from 'react'
import { useNotification } from '../context/NotificationContext'
import "../styles/notifModal.css"
const NotificationModal = () => {

    const { notifications ,markNotificationsAsRead,markAllMessagesAsRead} = useNotification();
    console.log("notif",notifications)

    const handleNotificationRead = (notificationId) => {
        markNotificationsAsRead(notificationId);
    }

    const handleMarkAllAsRead = ()=>{
        markAllMessagesAsRead();
    }

    return (
        <div className='bell-container'>
            <button onClick={handleMarkAllAsRead}>Marl All as Read</button>
            {notifications.map(not => (
                <div key={not.id}>
                    <>
                    <span className={`bell-notif ${not.read ? 'read' : ''}`}>
                        {not?.payload?.description}
                    </span>
                    {!not?.read && (
                        <button onClick={()=>handleNotificationRead(not?.id)}>Read</button>
                    )}

                    </>
                </div>
            ))
            }
        </div>
    )
}
export default NotificationModal