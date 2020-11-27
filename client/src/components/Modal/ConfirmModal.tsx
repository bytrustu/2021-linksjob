import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { processCompanyAction } from '../../redux/reducers/companyReducer';
import { useDispatch } from 'react-redux';

type ConfirmModalProps = {
  isVisible: boolean;
  setVisible: any;
  company: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isVisible, setVisible, company }) => {
  const dispatch = useDispatch();
  const [isOk, setIsOk] = useState<boolean>(false);
  const hideModal = ():void => {
    setVisible(false);
    setIsOk(false);
  };

  const onOk = ():void => {
    setVisible(false);
    setIsOk(true);
  };

  useEffect(() => {
    setIsOk(false);
  }, [isVisible]);

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
