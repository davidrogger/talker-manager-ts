import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import connection from '@src/models/connection.model';

import app from '@src/app';

import { mockTalkers } from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testing route /talker', () => {
  it('Should return all talker register in the data base', async () => {
    sinon.stub(connection, 'execute').resolves([mockTalkers, []]);

    const { status, body } = await chai
      .request(app)
      .get('/talker');

    expect(status).to.be.equal(200);
    expect(body.talkers).to.be.deep.equal(mockTalkers);
  });
});
