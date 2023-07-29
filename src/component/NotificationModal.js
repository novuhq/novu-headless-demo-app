import React, { useEffect } from 'react'
import { useNotification } from '../context/NotificationContext'
import "../styles/notifModal.css"
const NotificationModal = () => {

    const { notifications, markNotificationsAsRead, markAllMessagesAsRead, deleteNotification, setPageNum, pageNum, fetchNotifications } = useNotification();
    // console.log("notif", notifications)

    const handleNotificationRead = (notificationId) => {
        markNotificationsAsRead(notificationId);
    }

    const handleMarkAllAsRead = () => {
        markAllMessagesAsRead();
    }
    const onPrvHandler = () => {
        setPageNum((prv) => prv - 1)

    }
    const onNxtHandler = () => {
        setPageNum((prv) => prv + 1)

    }
    useEffect(() => {
        fetchNotifications();
    }, [pageNum, fetchNotifications])
    console.log(pageNum);
    return (
        <div className='bell-container'>
            <div className='heading'>
                <span className='title'>All notifications</span>
                <button onClick={handleMarkAllAsRead}>Mark all as read</button>
                <div>
                    <button onClick={onPrvHandler} disabled={pageNum === 0 ? true : false}>Previous</button>
                    <button onClick={onNxtHandler} disabled={notifications.length < 10 ? true : false}>Next</button>
                </div>
            </div>
            {notifications.map(not => (
                <div key={not.id} className='individual-notif'>
                    <>
                        <span className={`bell-notif ${not.read ? 'read' : ''}`}>
                            {not?.payload?.description}
                        </span>
                        <div className='btn-container'>
                            {!not?.read && (
                                <button onClick={() => handleNotificationRead(not?.id)} className='read-btn'>Read</button>
                            )}
                            <button onClick={() => deleteNotification(not?.id)} className='delete-btn'>Delete</button>
                        </div>
                    </>
                </div>
            ))
            }
        </div>
    )
}
export default NotificationModal