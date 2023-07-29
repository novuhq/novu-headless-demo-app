// import React, { useState } from 'react'
// import { BsBell } from 'react-icons/bs'
// import NotificationModal from './NotificationModal'
// import "../styles/appBar.css"
// const AppBar = () => {

//     const [showModal, setShowModal] = useState(false);

//     const handleShowNotification = () => {
//         setShowModal((prev) => !prev);
//     }
//     console.log(showModal);
//     return (
//         <div >
//             <div className='app-bar-container'>
//                 <span onClick={handleShowNotification} className='bell-icon'><BsBell /></span>
//             </div>
//             <div className='modal-div'>
//                 {showModal && (
//                     <NotificationModal />
//                 )}
//             </div>
//         </div>
//     )
// }

// export default AppBar


import React, { useState } from 'react';
import { BsBell } from 'react-icons/bs';
import NotificationModal from './NotificationModal';
import '../styles/appBar.css';

const AppBar = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowNotification = () => {
        setShowModal((prev) => !prev);
    };

    return (
        <div>
            <div className='app-bar-container'>
                <span onClick={handleShowNotification} className='bell-icon'>
                    <BsBell />
                </span>
            </div>
            <div className={`modal-div ${showModal ? 'modal-show' : ''}`}>
                {showModal && (<NotificationModal />)}
            </div>
        </div>
    );
};

export default AppBar;
