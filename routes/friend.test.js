// process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

let Friend = require("../models/friend");

describe('FriendsAPI', () => {
    before((done) => { //Before each test we empty data
      Friend.removeAll();
      done();         
     });     

  describe('GET /api', () => {
    it('it should get api version', (done) => {
      chai.request(server)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
/*
  * Test the /createFriendship route
  */
  describe('Postive tests', () => {

    it('it should create friendship', (done) => {
      chai.request(server)
      .post('/api/createFriendship')
      .send({
        friends:
        [
        "andy@example.com",
        "john@example.com"
        ]
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        done();
      });
    });

    it('it should get friends', (done) => {
      chai.request(server)
      .post('/api/getFriends')
      .send({
        email:"andy@example.com"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.friends.should.be.a('array');
        res.body.friends.length.should.eql(1);
        done();
      });
    });

    it('it should get common friends', (done) => {
      chai.request(server)
      .post('/api/createFriendship')
      .send({
        friends:
        [
        "andy@example.com",
        "common@example.com"
        ]
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
      });

    chai.request(server)
      .post('/api/createFriendship')
      .send({
        friends:
        [
        "john@example.com",
        "common@example.com"
        ]
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
      });

    chai.request(server)
      .post('/api/getCommonFriends')
      .send({
        friends:
        [
        "john@example.com",
        "andy@example.com"
        ]
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.friends.should.be.a('array');
        res.body.friends.length.should.eql(1);
        done();
      });
    });
  });
});