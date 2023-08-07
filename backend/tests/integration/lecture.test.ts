import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';

import connection from '@src/models/connection.model';
import app from '@src/app';
import { mockLecturesGetResponse } from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing route /lecure', () => {
  describe('Testing routes get', () => {
    describe('Route GET /lecture', () => {
      it('Should return status 200 with all lecures in the data base', async () => {
        const mockDB = sinon.stub(connection, 'execute').resolves([mockLecturesGetResponse, []]);
        const { status, body } = await chai
          .request(app)
          .get('/lecture');

        expect(mockDB.called).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(body.lectures).to.be.deep.equal(mockLecturesGetResponse);
      });
    });
  });
});
