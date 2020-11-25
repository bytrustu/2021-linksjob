import { IMessage } from '../type/Interfaces';

const Message: IMessage = {
  validationError: 'Please check your validation.',
  notFoundCompanyData: 'Not Found Company Data',
  paramError: 'Please check parameter',
  validationExpired: 'Your session is expired. Please login again.',
  loginFail: 'Invalid email address or password.',
  alreadyExist: 'Already exist',
  emailFail: 'Please check email',
  PROTOCOL_CONNECTION_LOST: 'Database connection was closed.',
  ER_CON_COUNT_ERROR: 'Database has too many connections.',
  ECONNREFUSED: 'Database connection was refused.',
};

export default Message;