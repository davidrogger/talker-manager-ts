import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import connection from '@src/models/connection.model';

import app from '@src/app';

import { mockTalkers } from './_mockData';

chai.use(chaiHttp);
const { expect } = chai;

const talkerEndpoint = '/talker';

describe('Testing route /talker', () => {
  beforeEach(sinon.restore);

  it('Should return all talker register in the data base', async () => {
    sinon.stub(connection, 'execute').resolves([mockTalkers, []]);

    const { status, body } = await chai
      .request(app)
      .get(talkerEndpoint);

    expect(status).to.be.equal(200);
    expect(body.talkers).to.be.deep.equal(mockTalkers);
  });

  it('Should return return 401 when missing or is a invalid token', async () => {
    sinon.stub(connection, 'execute').resolves([[], []]); // to avoid ping the mysql in the first tests
    const tokensTest = [
      {
        token: '',
        expectMessage: 'Missing Token',
      },
      {
        token: 'invalid-token',
        expectMessage: 'Invalid Token',
      },
    ];

    await Promise.all(tokensTest.map(async ({ token, expectMessage }) => {
      const { status, body } = await chai
        .request(app)
        .get(talkerEndpoint)
        .set('Authorization', token);

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal(expectMessage);
    }));
  });
});
