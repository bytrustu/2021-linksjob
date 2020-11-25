import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';

const ConfirmModal = ({ isVisible, setVisible, company }) => {
  const [isOk, setIsOk] = useState(false);
  const hideModal = () => {
    setVisible(false);
  };

  const onOk = () => {
    setVisible(false);
    setIsOk(true);
  };

  useEffect(() => {
    if (isOk) {
      alert('ok');
    }

  }, [isOk]);

  return (
    <Modal
      className="modal-confirm"
      title={company}
      visible={isVisible}
      onOk={onOk}
      onCancel={hideModal}
      okText="확인"
      cancelText="취소"
      centered
    >
      <p className="modal-search-text">
        기업의 정보를 수집 합니다.
      </p>
    </Modal>
  );
};

export default ConfirmModal;
