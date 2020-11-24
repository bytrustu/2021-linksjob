import React, { FC, ReactElement } from 'react';

interface Props {
  type: string;
  value: string;
}

const Button: FC<Props> = ({ type, value }) => {
  return (
    <button className={`btn btn-${type}`}>{value}</button>
  );
};

export default Button;
