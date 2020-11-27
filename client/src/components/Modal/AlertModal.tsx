import React, { FC } from 'react';
import { Modal } from 'antd';

type AlertModalProps = {
  isVisible: boolean;
  setVisible: any;
  text: string;
}

const AlertModal:FC<AlertModalProps> = ({ isVisible, setVisible, text }) => {
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
