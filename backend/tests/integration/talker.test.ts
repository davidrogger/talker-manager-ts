import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';

import jwt from 'jsonwebtoken';

import connection from '@src/models/connection.model';
import app from '@src/app';

import {
  badTalkersPostTest,
  badTokensTest, mockPublicUserData, mockTalkers, talkerPostTest,
} from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

const talkerEndpoint = '/talker';

describe('Testing route /talker', () => {
  beforeEach(sinon.restore);

  describe('Get request', () => {
    it('Should return all talker register in the data base', async () => {
      const mockDBConnection = sinon.stub(connection, 'execute').resolves([mockTalkers, []]);
      const mockJWT = sinon.stub(jwt, 'verify').callsFake(() => mockPublicUserData);

      const { status, body } = await chai
        .request(app)
        .get(talkerEndpoint)
        .set('authorization', 'valid-token');

      expect(mockDBConnection.called).to.be.equal(true);
      expect(mockJWT.called).to.be.equal(true);
      expect(status).to.be.equal(200);
      expect(body.talkers).to.be.deep.equal(mockTalkers);
    });

    it('Should return return 401 when missing or is a invalid token', async () => {
      const mockDBConnection = sinon.stub(connection, 'execute').resolves([[], []]);
      const mockJWT = sinon.stub(jwt, 'verify').throws();

      await Promise.all(badTokensTest.map(async ({ token, expectMessage }) => {
        const { status, body } = await chai
          .request(app)
          .get(talkerEndpoint)
          .set('Authorization', token);

        expect(mockDBConnection.called).not.to.be.equal(true);
        expect(mockJWT.called).to.be.equal(true);
        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal(expectMessage);
      }));
    });
  });

  describe('POST request', () => {
    describe('Token required in the route', () => {
      it('Should return status 401 when missing or containing an invalid token', async () => {
        const mockDBConnection = sinon.stub(connection, 'execute').resolves([[], []]);
        const mockJWT = sinon.stub(jwt, 'verify').throws();

        await Promise.all(badTokensTest.map(async ({ token, expectMessage }) => {
          const { status, body } = await chai
            .request(app)
            .post(talkerEndpoint)
            .set('Authorization', token)
            .send(talkerPostTest);

          expect(mockJWT.called).to.be.equal(true);
          expect(mockDBConnection.called).not.to.be.equal(true);
          expect(status).to.be.equal(401);
          expect(body.message).to.be.equal(expectMessage);
        }));
      });
    });

    describe('Need Required fields to request properly', () => {
      it('Should return status 400 with a error message when missing any required field', async () => {
        sinon.stub(jwt, 'verify').returns();

        await Promise.all(badTalkersPostTest.map(async ({ field, bodyTest }) => {
          const { status, body } = await chai
            .request(app)
            .post(talkerEndpoint)
            .set('Authorization', 'valid-token')
            .send(bodyTest);

          expect(status).to.be.equal(400);
          expect(body.message).to.be.equal(`Missing ${field} field`);
        }));
      });
    });
  });
});
