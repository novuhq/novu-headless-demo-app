import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from 'react-icons/bs';
import NotificationModal from './NotificationModal';
import '../styles/appBar.css';
import { useNotification } from '../context/NotificationContext';

const AppBar = () => {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);


    const { fetchNotifications, setActive, active } = useNotification();

    const handleShowNotification = async (e) => {
        e.stopPropagation();
        setShowModal((prev) => !prev);
        await fetchNotifications();
        setActive(false);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    }
    useEffect(() => {
        const handleDocumentClick = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleCloseModal();
            }
        }
        if (showModal) {
            document.addEventListener('click', handleDocumentClick);
        }
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [showModal])

    console.log("modal State", showModal);

    return (
        <div>
            <div className='app-bar-container'>
                <span onClick={handleShowNotification} className='bell-icon'>
                    <BsBell />
                    <div className={`${active ? `active` : ''}`}>
                        <div className='dot'></div>
                    </div>
                </span>
            </div>
            <div className={`modal-div ${showModal ? 'modal-show' : ''}`} ref={modalRef}>
                {showModal && (<NotificationModal />)}
            </div>
        </div>
    );
};

export default AppBar;
