import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { processCompanyAction } from '../../redux/reducers/companyReducer';
import { useDispatch } from 'react-redux';

const ConfirmModal = ({ isVisible, setVisible, company }) => {
  const dispatch = useDispatch();
  const [isOk, setIsOk] = useState(false);
  const hideModal = () => {
    setVisible(false);
    setIsOk(false);
  };

  const onOk = () => {
    setVisible(false);
    setIsOk(true);
  };

  useEffect(() => {
    setIsOk(false);
  }, [isVisible])

  useEffect(() => {
    if (isOk) {
      dispatch(processCompanyAction(company));
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
