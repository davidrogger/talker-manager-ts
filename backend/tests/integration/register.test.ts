import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import jwt from 'jsonwebtoken';

import { ResultSetHeader } from 'mysql2';
import app from '../../src/app';
import connection from '../../src/models/connection.model';

chai.use(chaiHttp);
const { expect } = chai;

const registerEndpoint = '/register';

describe('Route /register', () => {
  beforeEach(sinon.restore);

  describe('Create a new user', () => {
    it('Should return status 201 with a token', async () => {
      sinon.stub(jwt, 'sign').resolves('validtoken');
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 } as ResultSetHeader, []]);

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
