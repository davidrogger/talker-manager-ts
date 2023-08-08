import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';

import jwt from 'jsonwebtoken';

import connection from '@src/models/connection.model';
import app from '@src/app';
import { missingFieldsPost, mockLecturesGetResponse } from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

const lectureEndpoint = '/lecture';

describe('Testing route /lecure', () => {
  beforeEach(sinon.restore);

  describe('Testing routes get', () => {
    describe('Route GET /lecture', () => {
      it('Should return status 200 with all lecures in the data base', async () => {
        const mockDB = sinon.stub(connection, 'execute').resolves([mockLecturesGetResponse, []]);
        const { status, body } = await chai
          .request(app)
          .get(lectureEndpoint);

        expect(mockDB.called).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(body.lectures).to.be.deep.equal(mockLecturesGetResponse);
      });
    });

    describe('Route POST /lecture', () => {
      describe('Missing required fields', () => {
        it('Should return status 400 with a message when missing field "x"', async () => {
          sinon.stub(jwt, 'verify').returns();
          const mockDBconnection = sinon.stub(connection, 'execute').resolves([[], []]);

          await Promise.all(missingFieldsPost.map(async ({ invalidBody, missingField }) => {
            const { status, body } = await chai
              .request(app)
              .post(lectureEndpoint)
              .set('Authorization', 'valid-token')
              .send(invalidBody);

            expect(mockDBconnection.called).not.to.be.equal(true);
            expect(status).to.be.equal(400);
            expect(body.message).to.be.equal(`Missing field "${missingField}"`);
          }));
        });
      });

      describe('Fields validation format', () => {
        it('Should return status 400 with a message "talkerName", "talkerName need at least 3 characters"', async () => {});
        it('Should return status 400 with a message "title", "title need at least 5 characters"', async () => {});
        it('Should return status 400 with a message "watchedAt", "watchedAt need a valid format, dd/mm/yyyy"', async () => {});
      });
    });
  });
});
