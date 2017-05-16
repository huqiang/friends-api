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
        res.body.friends.should.include('john@example.com');
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
        res.body.friends.should.include('common@example.com');
        done();
      });
    });

    it('it should add to subscribe list', (done) => {
      chai.request(server)
      .post('/api/subscribeUpdates')
      .send({
        requestor: "lisa@example.com",
        target:"john@example.com"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        done();
      });
    });

    it('it should add to a block list', (done) => {
      chai.request(server)
      .post('/api/blockUpdates')
      .send({
        requestor: "andy@example.com",
        target: "john@example.com"
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        done();
      });
    });

    it('it should get correct recipient list', (done) => {
      chai.request(server)
      .post('/api/getRecipients')
      .send({
        sender: "john@example.com",
        text: "Hello World! kate@example.com"
      })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.success.should.equal(true);
        res.body.recipients.should.be.a('array');
        res.body.recipients.length.should.eql(3);
        res.body.recipients.should.include('lisa@example.com');
        res.body.recipients.should.include('kate@example.com');
        res.body.recipients.should.include('common@example.com');
        done();
      });
    });
  });
});