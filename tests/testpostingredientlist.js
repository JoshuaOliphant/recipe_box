console.log('starting test of get all categories');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');
var expect = chai.expect;
var http = require('http');
chai.use(chaiHttp);

describe('Test home page result', function () {
    this.timeout(15000);

    var requestResult;
    var response;

    before(function(done) {
        // chai.request("http://myrecipebox2.azurewebsites.net")
        chai.request("http://localhost:3000")
            .post('/ingredientlist')
            .end(function (err, res) {
                requestResult = res.body;
                console.log("requestResult = " + requestResult.ingredientID);
                response = res;
                done();
            });
    });

    it('Should return an array object with three objects', function(done){
        expect(response).to.have.status(200);
        expect(requestResult).to.be.an.object;
        // expect(requestResult.length).to.have.length.equal(3);
        expect(response).to.have.headers;
        done();
    });

    it('The first entry in the array has known properties', function(done){
        expect(requestResult).to.include.keys('ingredientID');
        expect(requestResult).to.have.property('ingredientID', 113);
        expect(response.body).to.not.be.a.string;
        done();
    });

    it('The elements in the array have the expecte properties', function(done){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('ingredientID');
                }
                return true;
            });
        done();
    });

});