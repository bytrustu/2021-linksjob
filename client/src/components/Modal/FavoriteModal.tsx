import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Modal } from 'antd';
import { companyObj } from '../../utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { uniqueTypeArray } from 'src/utils';
import { removeFavoriteCompanyAction } from 'src/redux/reducers/companyReducer';


type FavoriteModalProps = {
  visible: boolean;
  setVisible: any;
}

const FavoriteModal: FC<FavoriteModalProps> = ({ visible, setVisible }) => {

  const dispatch = useDispatch();
  const { favoriteCompanyData } = useSelector((state: RootState) => state.company);

  const hideModal = (): void => {
    setVisible(false);
  };

  const onClickRemoveFavorite = (company: string) => {
    dispatch(removeFavoriteCompanyAction(company));
  };

  return (
    <Modal
      className="modal-favorite"
      title="스크랩"
      visible={visible}
      onCancel={hideModal}
      okText="스크랩"
      cancelText="닫기"
      centered
    >

      <ul className="favorite-list">
        {favoriteCompanyData.map((element: { name: string, link: any[] }, index:number) => {
          const uniqueLink = uniqueTypeArray(element.link);
          const imageElements = uniqueLink.map((item, i) => {
            const name = companyObj[item.type].name;
            const src = companyObj[item.type].image;
            const isPadding = companyObj[item.type].padding;
            return (
              <Link key={i} href={item.url}>
                <a title={name} target="_blank">
                  <img className={isPadding ? 'logo-padding' : ''} src={src} />
                </a>
              </Link>
            );
          });
          return (
            <li key={element.name}>
              <em>{index + 1}</em>
              <span className="favorite-name ellipsis">{element.name}</span>
              <div className="company-wrap">
                {
                  imageElements
                }
              </div>
              <div className="remove" onClick={() => onClickRemoveFavorite(element.name)}>
                <span />
              </div>
            </li>
          );
        })}

      </ul>
    </Modal>
  );
};

export default FavoriteModal;
