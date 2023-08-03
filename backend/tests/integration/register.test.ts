import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import jwt from 'jsonwebtoken';

import { ResultSetHeader } from 'mysql2';
import app from '../../src/app';
import connection from '../../src/models/connection.model';
import { IUser } from '../../src/types';

chai.use(chaiHttp);
const { expect } = chai;

const registerEndpoint = '/register';

describe('Route /register', () => {
  beforeEach(sinon.restore);

  describe('Create a new user', () => {
    it('Should return status 201 with a token', async () => {
      sinon.stub(jwt, 'sign').resolves('validtoken');
      const mysqlStub = sinon.stub(connection, 'execute');
      mysqlStub.onFirstCall().resolves([[], []]);
      mysqlStub.onSecondCall().resolves([{ insertId: 1 } as ResultSetHeader, []]);

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

  describe('Email need to be unique', () => {
    it('Should return status 409 message "Email address already in use"', async () => {
      const user = {
        firstName: 'Jonas',
        lastName: 'Doe',
        email: 'jonas@doe.com',
        password: '123456',
      };

      sinon.stub(connection, 'execute').resolves([[{ id: 'generated-id', ...user } as IUser], []]);

      const { status, body } = await chai
        .request(app)
        .post(registerEndpoint)
        .send(user);
      expect(status).to.be.equal(409);
      expect(body.message).to.be.equal('Email address already in use');
    });
  });

  describe('Email and password need to follow a standard format', () => {
    it('Should return status 400 when the email is in a bad format', async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);

      const badEmails = [
        {
          firstName: 'Jonas1',
          lastName: 'Doe1',
          email: 'invalidemail.com',
          password: '123456',
        },
        {
          firstName: 'Jonas2',
          lastName: 'Doe2',
          email: 'invalidemailcom',
          password: '123456',
        },
        {
          firstName: 'Jonas3',
          lastName: 'Doe3',
          email: 'invalid@emailcom',
          password: '123456',
        },
      ];

      await Promise.all(badEmails.map(async (newAccount) => {
        const { status, body } = await chai
          .request(app)
          .post(registerEndpoint)
          .send(newAccount);

        expect(status).to.be.equal(400);
        expect(body.message).to.be.equal('Invalid Email format');
      }));
    });
  });
});
