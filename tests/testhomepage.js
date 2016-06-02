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
            .get('/categories')
            .end(function (err, res) {
                requestResult = res.body;
                console.log("requestResult = " + requestResult);
                response = res;
                done();
            });
    });

    it('Should return an array object with three objects', function(done){
        expect(response).to.have.status(200);
        expect(requestResult).to.be.an.array;
        expect(requestResult.length).to.have.length.equal(3);
        expect(response).to.have.headers;
        done();
    });

    it('The first entry in the array has known properties', function(done){
        expect(requestResult[0]).to.include.keys('categoryName');
        expect(response).to.have.deep.property('body[0].categoryID', 1);
        expect(response.body).to.not.be.a.string;
        done();
    });

    it('The elements in the array have the expecte properties', function(done){
        expect(response.body).to.satisfy(
            function (body) {
                for (var i = 0; i < body.length; i++) {
                    expect(body[i]).to.have.property('categoryName');
                    expect(body[i]).to.have.property('categoryID');
                }
                return true;
            });
        done();
    });

});