import React from 'react'
import './modal.scss'
import { FaTimes } from 'react-icons/fa'

function Modal({ children, close, label }) {
    const handleModalClose = (e) => {
        if (e.target.classList.contains('modal')) {
            close()
        }
    }
    return (
        <div className='modal' onClick={handleModalClose}>
            <div className='modal__container'>
                <div className='modal__container--header'>
                    <h2 size='lg' fontFamily>
                        {label}
                    </h2>
                    <span onClick={close}>
                        <FaTimes className='icon' />
                    </span>
                </div>
                <div className='modal__container--children'>{children}</div>
            </div>
        </div>
    )
}

export default Modal
