import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Route /signup', () => {
  describe('Signup with success', () => {
    it('Should return status 200 and a token', async () => {
      const { status, body } = await chai
        .request(app)
        .post('/signup')
        .send({ email: 'valid@email.com', password: 'validpassword' });
      expect(status).to.be.equal(200);
      expect(body.token).to.be.equal('validtoken');
    });
  });
});
