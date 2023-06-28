import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import jwt from 'jsonwebtoken';
import app from '../../src/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Route /login', () => {
  beforeEach(sinon.restore);

  describe('Login with success', () => {
    it('Should return status 200 and a token', async () => {
      sinon.stub(jwt, 'sign').resolves('validtoken');
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({ email: 'valid@email.com', password: 'validpassword' });
      expect(status).to.be.equal(200);
      expect(body.token).to.be.equal('validtoken');
    });
  });

  describe('Required fields, email and password', () => {
    it('Should return status 400 message "Missing email field"', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({ password: 'missing-email' });

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('Missing email field');
    });
    it('Should return status 400 message "Missing password field"', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({ email: 'missing@password.com' });

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('Missing password field');
    });
  });

  describe('Valid email and password', () => {
    it('Should return status 409 message "Unauthorized Access" when the user is not registered', async () => {
      const badPayloads = [
        { email: 'not@registered.com', password: 'anything' },
        { email: 'admin@admin.com', password: 'wrongPassword' },
      ];
      await Promise.all(
        badPayloads.map(async (login) => {
          const { status, body } = await chai
            .request(app)
            .post('/login')
            .send(login);
          expect(status).to.be.equal(409);
          expect(body.message).to.be.equal('Unauthorized Access');
        }),
      );
    });
  });
});
