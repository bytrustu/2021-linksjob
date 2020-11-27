import React, { FC, useEffect, useState } from 'react';
import { Modal } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { companyObj } from '../../utils/const';
import { addFavoriteCompanyAction, removeFavoriteCompanyAction } from '../../redux/reducers/companyReducer';

const CompanyModal = ({ visible, setVisible, keyword }) => {

  const dispatch = useDispatch();
  const { companySearchData, favoriteCompanyData } = useSelector(state => state.company);
  const { isAuthenticated } = useSelector(state => state.user);
  const [companyData, setCompanyData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const hideModal = () => {
    setVisible(false);
  };

  const onClickAddFavorite = () => {
    dispatch(addFavoriteCompanyAction(keyword));
  }

  const onClickRemoveFavorite = () => {
    dispatch(removeFavoriteCompanyAction(keyword));
  }

  useEffect(() => {
    if (visible) {
      setCompanyData({ ...companySearchData });
    }
  }, [visible]);
  useEffect(() => {
    const favoriteArray = favoriteCompanyData.map(element => element.name);
    if (favoriteArray.includes(keyword)) {
      setIsFavorite(true)
    } else {
      setIsFavorite(false);
    }
  }, [favoriteCompanyData]);

  return (
    <Modal
      className="modal-company"
      title={keyword}
      visible={visible}
      onCancel={hideModal}
      okText="스크랩"
      cancelText="닫기"
      centered
    >
      <div class="company-favorite">
        {
          isAuthenticated && (
            isFavorite
              ?
              <img src="/image/star.svg" alt="스크랩ON" onClick={onClickRemoveFavorite} />
              :
              <img src="/image/star_blank.svg" alt="스크랩OFF" onClick={onClickAddFavorite} />
          )
        }
      </div>
      <div className="modal-search-text">
        <ul>
          {
            companyData && Object.entries(companyData).map(([key, value]) => {
              const name = companyObj[key].name;
              const src = companyObj[key].image;
              const isPadding = companyObj[key].padding;
              return (
                <li className="link-list">
                  <img className={isPadding && 'logo-padding'} src={src} alt={`${name}로고`} />
                  <span>{name}</span>
                  {
                    value.map((item, index) => (
                      <Link href={item.url}>
                        <a target="_blank">{`Link${index + 1}`}</a>
                      </Link>
                    ))
                  }
                </li>
              );
            })
          }
        </ul>
        <p>- 관심 기업으로 설정 하시면 스크랩에서 확인 가능 합니다.</p>
      </div>
    </Modal>
  );
};

export default CompanyModal;
