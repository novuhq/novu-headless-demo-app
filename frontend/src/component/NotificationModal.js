import React, { useEffect } from 'react'
import { useNotification } from '../context/NotificationContext'
import "../styles/notifModal.css"
const NotificationModal = () => {

    const { notifications, markNotificationsAsRead, markAllMessagesAsRead, deleteNotification, setPageNum, pageNum, fetchNotifications } = useNotification();

    const handleNotificationRead = (notificationId) => {
        markNotificationsAsRead(notificationId);
    }

    const handleNotificationDelete = (notificationId) => {
        let newClass = document.getElementById(`${notificationId}`);
        newClass.style.display = 'none';
        deleteNotification(notificationId);
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
    return (
        <div className='bell-container'>
            <div className='heading'>
                <div className='title'>
                    <h2>
                        Notifications
                    </h2>
                </div>
                <div className='control-btn'>
                    <button className='modal-btn all-read title-btn' onClick={handleMarkAllAsRead}>Mark all as read</button>
                    <button className={` ${pageNum === 0 ? '' : 'modal-btn title-btn'}`} onClick={onPrvHandler} disabled={pageNum === 0 ? true : false}>Previous</button>
                    <button className={` ${notifications.length < 10 ? '' : 'modal-btn title-btn'}`} onClick={onNxtHandler} disabled={notifications.length < 10 ? true : false}>Next</button>
                </div>
            </div>
            <div>
                {notifications.map(not => (
                    <div key={not.id} className={`individual-notif`} id={`${not.id}`}>
                        <>
                            <span className={`bell-notif ${not.read ? 'read' : ''}`}>
                                {not?.payload?.description}
                            </span>
                            <div className='btn-container'>
                                {!not?.read && (
                                    <button onClick={() => handleNotificationRead(not?.id)} className='read-btn classic-btn'>Read</button>
                                )}
                                <button onClick={() => handleNotificationDelete(not?.id)} className='delete-btn classic-btn'>Delete</button>
                            </div>
                        </>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
export default NotificationModal