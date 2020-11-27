import React, { FC } from 'react';
import { Modal } from 'antd';

const AlertModal:FC = ({ isVisible, setVisible, text }) => {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      className="modal-alert"
      title=" "
      visible={isVisible}
      onCancel={hideModal}
      cancelText="닫기"
      centered
    >
      <p className="modal-search-text">
        {text}
      </p>
    </Modal>
  );
};

export default AlertModal;
