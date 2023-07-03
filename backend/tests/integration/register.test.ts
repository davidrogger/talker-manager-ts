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

  describe('Required fields to create a new User', () => {
    it('Should return status 400 message "Missing xx field"', async () => {
      sinon.stub(connection, 'execute').resolves();

      const missingFields = [
        {
          field: 'firstName',
          requestBody: {
            lastName: 'Doe',
            email: 'jonas@doe.com',
            password: '123456',
          },
        },
        {
          field: 'lastName',
          requestBody: {
            firstName: 'Jonas',
            email: 'jonas@doe.com',
            password: '123456',
          },
        },
        {
          field: 'email',
          requestBody: {
            firstName: 'Jonas',
            lastName: 'Doe',
            password: '123456',
          },
        },
        {
          field: 'password',
          requestBody: {
            firstName: 'Jonas',
            lastName: 'Doe',
            email: 'jonas@doe.com',
          },
        },
      ];

      await Promise.all(
        missingFields.map(async ({ requestBody, field }) => {
          const { status, body } = await chai
            .request(app)
            .post(registerEndpoint)
            .send(requestBody);
          expect(status).to.be.equal(400);
          expect(body.message).to.be.equal(`Missing ${field} field`);
        }),
      );
    });
  });
});
