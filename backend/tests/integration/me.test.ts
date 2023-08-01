import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';

import jwt from 'jsonwebtoken';

import app from '../../src/app';
import { mockPublicUserData } from './_mockData';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testing route "/me"', () => {
  beforeEach(sinon.restore);

  it('Should return the user data', async () => {
    sinon.stub(jwt, 'verify').resolves(mockPublicUserData);

    const { status, body } = await chai
      .request(app)
      .get('/me')
      .set('Authorization', 'valid-token');

    expect(status).to.be.equal(200);
    expect(body.user).to.be.deep.equal(mockPublicUserData);
  });

  it('Should return invalid token, when the token is invalid', async () => {
    sinon.stub(jwt, 'verify').rejects();

    const { status, body } = await chai
      .request(app)
      .get('/me')
      .set('Authorization', 'invalid-token');

    expect(status).to.be.equal(400);
    expect(body.message).to.be.deep.equal('Invalid Token');
  });
});
