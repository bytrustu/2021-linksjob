import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';

const ConfirmModal = () => {
  const [visible, setVisible] = useState(true);
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
    <div>
      <Modal
        title="확인창"
        visible={visible}
        onOk={onOk}
        onCancel={hideModal}
        okText="확인"
        cancelText="취소"
        centered
      >
        <p className="modal-search-text">
          <strong>"카카오"</strong> 기업의 정보를 수집 합니다.
        </p>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
