import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import app from '@src/app';
import connection from '@src/models/connection.model';
import { IUser } from '@types';
import { loginInput, mockedUser } from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

describe('Route /login', () => {
  beforeEach(sinon.restore);

  describe('Login with success', () => {
    it('Should return status 200 and a token', async () => {
      sinon.stub(jwt, 'sign').resolves('validtoken');
      sinon.stub(connection, 'execute').resolves([[mockedUser], []]);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(loginInput);
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
    it('Should return status 401 message "Unauthorized Access" when the user is not registered', async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({ email: 'not@registered.com', password: 'anything' });
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Unauthorized Access');
    });
    it('Should return status 401 message "Unauthorized Access" when the password is wrong', async () => {
      sinon.stub(connection, 'execute').resolves([[{ password: 'mockPassword' } as IUser], []]);
      const { status, body } = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'wrongPassword' });
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Unauthorized Access');
    });
  });
});
