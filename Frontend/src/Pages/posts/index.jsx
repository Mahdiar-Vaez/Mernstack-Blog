import React, { useState } from 'react';
import Main from '../../ui/Main';
import Content from '../../ui/Content';
import Profile from '../../components/Profile/Profile';
import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import CreatePost from './Create/CreatePost';
import './style.css'
Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Posts({ darkMode }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Main>
      <Content>
        <button
          className='p-4 self-center  rounded-sm text-blue-400 cursor-pointer w-64 hover:bg-gray-300 dark:text-gray-100 hover:text-gray-800'
          onClick={openModal}
        >
          ساخت پست جدید
        </button>
        <Outlet />
      </Content>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Post Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <CreatePost closeModal={closeModal} />
      </Modal>
    </Main>
  );
}