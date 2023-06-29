import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import jwt from 'jsonwebtoken';

import app from '../../src/app';

chai.use(chaiHttp);
const { expect } = chai;

const registerEndpoint = '/register';

describe('Route /register', () => {
  afterEach(sinon.restore);

  describe('Create a new user', () => {
    it('Should return status 201 with a token', async () => {
      sinon.stub(jwt, 'sign').resolves('validtoken');

      const { status, body } = await chai
        .request(app)
        .post(registerEndpoint)
        .send({
          firstName: 'Jonas',
          lastName: 'Doe',
          email: 'jonas@doe.com',
          password: '123456',
        });

      expect(status).to.be.equal(201);
      expect(body.token).to.be.equal('validtoken');
    });
  });
});
