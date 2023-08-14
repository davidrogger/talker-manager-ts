import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';

import jwt from 'jsonwebtoken';

import connection from '@src/models/connection.model';
import app from '@src/app';

import * as idService from '@services/id.service';

import {
  badTalkersPostFormatTest,
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
      it('Should return status 400 with a error message when missing name field', async () => {
        sinon.stub(jwt, 'verify').returns();

        const { status, body } = await chai
          .request(app)
          .post(talkerEndpoint)
          .set('Authorization', 'valid-token')
          .send({});

        expect(status).to.be.equal(400);
        expect(body.message).to.be.equal('Missing name field');
      });
    });

    describe('Required fields need to have there right format', () => {
      it('Should return status 400 with a message when the field is out the standard', async () => {
        sinon.stub(jwt, 'verify').returns();

        await Promise.all(badTalkersPostFormatTest.map(async ({ expectedMessage, bodyTest }) => {
          const { status, body } = await chai
            .request(app)
            .post(talkerEndpoint)
            .set('Authorization', 'valid-token')
            .send(bodyTest);

          expect(status).to.be.equal(400);
          expect(body.message).to.be.equal(expectedMessage);
        }));
      });
    });

    describe('When posting a new talker successfully', () => {
      it('Should return status 201 with the talker registered', async () => {
        const mockId = 'fa9d1bdf-4f3b-4eed-8f3f-2356f3faa7a6';
        const mockDBConnection = sinon.stub(connection, 'execute').resolves();
        sinon.stub(idService, 'generateId').returns(mockId);
        sinon.stub(jwt, 'verify').returns();

        const talker = {
          name: 'Jonas Doe',
        };

        const { status, body } = await chai
          .request(app)
          .post(talkerEndpoint)
          .set('Authorization', 'valid-token')
          .send(talker);

        expect(mockDBConnection.called).to.be.equal(true);
        expect(status).to.be.equal(201);
        expect(body.talker).to.be.deep.equal({ id: mockId, ...talker });
      });
    });
  });

  describe('PUT request', () => {
    it('Should require a valid token', async () => {
      const mockJWT = sinon.stub(jwt, 'verify').throws();

      const id = '53aed9b7-85cb-4887-a28e-1931132492a9';

      await Promise.all(
        badTokensTest.map(async ({ expectMessage, token }) => {
          const { status, body } = await chai
            .request(app)
            .put(`${talkerEndpoint}/${id}`)
            .set('Authorization', token);

          expect(status).to.be.equal(401);
          expect(body.message).to.be.equal(expectMessage);
        }),
      );

      expect(mockJWT.callCount).to.be.equal(1);
    });
  });

  it('Should be a valid existing talker id', async () => {
    const mockDB = sinon.stub(connection, 'execute').resolves([[], []]);
    sinon.stub(jwt, 'verify').returns();
    const badId = '490688f1-0a19-42c7-af71-30d09e23537b';

    const { status, body } = await chai
      .request(app)
      .put(`${talkerEndpoint}/${badId}`)
      .set('Authorization', 'valid-token');

    expect(mockDB.called).to.be.equal(true);
    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('Talker not found');
  });

  it('Should have a valid name to update', async () => {
    const mockDB = sinon.stub(connection, 'execute').resolves([[[{ ...mockTalkers[0] }]], []]);
    sinon.stub(jwt, 'verify').returns();
    const id = '53aed9b7-85cb-4887-a28e-1931132492a9';

    await Promise.all(
      badTalkersPostFormatTest.map(async ({ expectedMessage, bodyTest }) => {
        const { status, body } = await chai
          .request(app)
          .put(`${talkerEndpoint}/${id}`)
          .set('Authorization', 'valid-token')
          .send(bodyTest);

        expect(mockDB.called).to.be.equal(true);
        expect(status).to.be.equal(400);
        expect(body.message).to.be.equal(expectedMessage);
      }),
    );
  });

  it('Should update talker name successfully', async () => {
    const mockDB = sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[[{ ...mockTalkers[0] }]], []])
      .onSecondCall()
      .resolves([[], []]);

    sinon.stub(jwt, 'verify').returns();
    const id = '53aed9b7-85cb-4887-a28e-1931132492a9';

    const { status } = await chai
      .request(app)
      .put(`${talkerEndpoint}/${id}`)
      .set('Authorization', 'valid-token')
      .send({ name: 'Jonas Doe' });

    expect(mockDB.callCount).to.be.equal(2);
    expect(status).to.be.equal(204);
  });
});
