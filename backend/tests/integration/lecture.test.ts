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
  mockAllLecturesResponse,
  mockOneLectureResponse,
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
      const mockDB = sinon.stub(connection, 'execute').resolves([mockAllLecturesResponse, []]);
      const { status, body } = await chai
        .request(app)
        .get(lectureEndpoint);

      expect(mockDB.called).to.be.equal(true);
      expect(status).to.be.equal(200);
      expect(body.lectures).to.be.deep.equal(mockAllLecturesResponse);
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
    it('Should require a valid token', async () => {
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

    it('Should have an lecture id valid to update', async () => {
      sinon.stub(connection, 'execute').resolves([[], []]);
      sinon.stub(jwt, 'verify').returns();

      const { status, body } = await chai
        .request(app)
        .put(`${lectureEndpoint}/invalid-id`)
        .set('Authorization', 'valid-token')
        .send(validLecturePost);

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('Lecture not found');
    });

    it('Should validate all need fields to update a lecture', async () => {
      sinon.stub(connection, 'execute').resolves([[mockOneLectureResponse], []]);
      sinon.stub(jwt, 'verify').returns();

      await Promise.all(missingLectureFieldsPost.map(async ({ invalidBody, missingField }) => {
        const { status, body } = await chai
          .request(app)
          .put(`${lectureEndpoint}/valid-id`)
          .set('Authorization', 'valid-token')
          .send(invalidBody);

        expect(status).to.equal(400);
        expect(body.message).to.equal(`Missing field "${missingField}"`);
      }));
    });

    it('Should return status 200 "Updated Successfully Completed"', async () => {
      sinon.stub(jwt, 'verify').returns();
      const mockDBconnection = sinon.stub(connection, 'execute');
      mockDBconnection.onFirstCall().resolves([[mockOneLectureResponse], []]);
      mockDBconnection.onSecondCall().resolves([[mockTalker], []]);

      const { status, body } = await chai
        .request(app)
        .put(`${lectureEndpoint}/valid-id`)
        .set('Authorization', 'valid-token')
        .send(validLecturePost);

      expect(status).to.be.equal(200);
      expect(body.message).to.be.equal('Updated Successfully Completed');
    });
  });

  describe('Route DELETE', () => {
    it('Should required a valid token', async () => {
      sinon.stub(jwt, 'verify').throws();
      const mockDBConnection = sinon.stub(connection, 'execute').resolves([[], []]);

      await Promise.all(badTokensTest.map(async ({ expectMessage, token }) => {
        const { status, body } = await chai
          .request(app)
          .delete(`${lectureEndpoint}/valid-lecture-id`)
          .set('Authorization', token);

        expect(mockDBConnection.called).not.to.be.equal(true);
        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal(expectMessage);
      }));
    });

    it('Should required a valid lecture id', async () => {
      sinon.stub(jwt, 'verify').returns();
      sinon.stub(connection, 'execute').resolves([[], []]);

      const { status, body } = await chai
        .request(app)
        .delete(`${lectureEndpoint}/invalid-lecture-id`)
        .set('Authorization', 'valid-token');

      expect(status).to.be.equal(400);
      expect(body.message).to.be.equal('Lecture id not found');
    });

    it('Should call the database and remove the row from the database when success', async () => {
      sinon.stub(jwt, 'verify').returns();
      const mockDBConnection = sinon.stub(connection, 'execute');
      mockDBConnection.onFirstCall().resolves([[mockOneLectureResponse], []]);
      mockDBConnection.onSecondCall().resolves([[], []]);

      const { status } = await chai
        .request(app)
        .delete(`${lectureEndpoint}/valid-lecture-id`)
        .set('Authorization', 'valid-token');

      expect(mockDBConnection.calledTwice).to.be.equal(true);
      expect(status).to.be.equal(204);
    });
  });
});
