import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';

import jwt from 'jsonwebtoken';

import connection from '@src/models/connection.model';
import app from '@src/app';

import {
  badTokensTest,
  invalidLectureFieldsPost,
  missingLectureFieldsPost,
  mockLecturesGetResponse,
  mockTalker,
  validLecturePost,
} from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

const lectureEndpoint = '/lecture';

describe('Testing route /lecure', () => {
  beforeEach(sinon.restore);
  describe('Route GET', () => {
    it('Should return status 200 with all lectures in the data base', async () => {
      const mockDB = sinon.stub(connection, 'execute').resolves([mockLecturesGetResponse, []]);
      const { status, body } = await chai
        .request(app)
        .get(lectureEndpoint);

      expect(mockDB.called).to.be.equal(true);
      expect(status).to.be.equal(200);
      expect(body.lectures).to.be.deep.equal(mockLecturesGetResponse);
    });
  });

  describe('Route POST', () => {
    describe('Missing or invalid token', () => {
      it('Should return 401 missing token', async () => {
        const mockJWT = sinon.stub(jwt, 'verify').returns();
        const mockDBconnection = sinon.stub(connection, 'execute').resolves([[], []]);

        const { status, body } = await chai
          .request(app)
          .post(lectureEndpoint)
          .send(validLecturePost);

        expect(mockDBconnection.called).not.to.be.equal(true);
        expect(mockJWT.called).not.to.be.equal(true);
        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('Missing Token');
      });

      it('Should return 401 invalid token', async () => {
        const mockJWT = sinon.stub(jwt, 'verify').throws();
        const mockDBconnection = sinon.stub(connection, 'execute').resolves([[], []]);

        const { status, body } = await chai
          .request(app)
          .post(lectureEndpoint)
          .set('Authorization', 'invalid-token')
          .send(validLecturePost);

        expect(mockDBconnection.called).not.to.be.equal(true);
        expect(mockJWT.called).to.be.equal(true);
        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('Invalid Token');
      });
    });

    describe('Missing required fields', () => {
      it('Should return status 400 with a message when missing field "x"', async () => {
        sinon.stub(jwt, 'verify').returns();
        sinon.stub(connection, 'execute').resolves([[mockTalker], []]);

        await Promise.all(missingLectureFieldsPost.map(async ({ invalidBody, missingField }) => {
          const { status, body } = await chai
            .request(app)
            .post(lectureEndpoint)
            .set('Authorization', 'valid-token')
            .send(invalidBody);

          expect(status).to.be.equal(400);
          expect(body.message).to.be.equal(`Missing field "${missingField}"`);
        }));
      });
    });

    describe('Fields validation', () => {
      it('Should have an existing talkerId field', async () => {
        sinon.stub(jwt, 'verify').returns();
        sinon.stub(connection, 'execute').resolves([[], []]);

        const invalidIdTest = {
          talkerId: 'invalid-id',
          title: 'Invalid Talker Id field',
          watchedAt: '08/08/2023',
        };

        const { status, body } = await chai
          .request(app)
          .post(lectureEndpoint)
          .set('Authorization', 'valid-token')
          .send(invalidIdTest);

        expect(status).to.be.equal(400);
        expect(body.message).to.be.equal('Talker not found');
      });

      it('Should return status 400 with a message showing the requiment for that field', async () => {
        sinon.stub(jwt, 'verify').returns();
        sinon.stub(connection, 'execute')
          .resolves([[mockTalker], []]);

        await Promise.all(invalidLectureFieldsPost.map(async ({ invalidBody, expectedMsg }) => {
          const { status, body } = await chai
            .request(app)
            .post(lectureEndpoint)
            .set('Authorization', 'valid-token')
            .send(invalidBody);

          expect(status).to.be.equal(400);
          expect(body.message).to.be.equal(expectedMsg);
        }));
      });
    });

    describe('Success lecture post', () => {
      it('Should return 201, with a message "Lecture recorded with success"', async () => {
        const mockJWT = sinon.stub(jwt, 'verify').returns();
        const mockDBconnection = sinon.stub(connection, 'execute').resolves([[mockTalker], []]);

        const { status, body } = await chai
          .request(app)
          .post(lectureEndpoint)
          .set('Authorization', 'valid-token')
          .send(validLecturePost);

        expect(mockDBconnection.called).to.be.equal(true);
        expect(mockJWT.called).to.be.equal(true);
        expect(status).to.be.equal(201);
        expect(body.message).to.be.equal('Lecture recorded with success');
      });
    });
  });

  describe('Route PUT', () => {
    it('Should required a valid token', async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
      sinon.stub(jwt, 'verify').throws();

      await Promise.all(badTokensTest.map(async ({ expectMessage, token }) => {
        const { status, body } = await chai
          .request(app)
          .put(`${lectureEndpoint}/valid-id`)
          .set('Authorization', token)
          .send(validLecturePost);

        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal(expectMessage);
      }));
    });
  });
});
