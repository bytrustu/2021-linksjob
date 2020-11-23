import request from 'supertest';
import app from '../app';

it('GET /api/company/:companyId', done => {
  const companyId = 8;
  request(app)
    .get(`/api/company/${companyId}`)
    .then(res => {
      expect(res.status).toEqual(200);
      done();
    });
});