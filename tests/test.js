console.log('starting test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var server = require('../server');
var request = require('request');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

// describe("Create new ingredient", function() {
//     var requestResult;
//     var response;
//
//     chai.request("http://myrecipebox2.azurewebsites.net/#/create")
//         .post('/ingredientlist')
//         .send({quantity: '3', units: 'lbs', ingredient: 'beef', caloriecount: '5'})
//         .end(function (err, res) {
//             requestResult = res.body;
//             console.log("requestResult = " + requestResult);
//             response = res;
//             done();
//         });
//
//     it('Should return an array object with three objects', function(done){
//         expect(response).to.have.status(200);
//         expect(requestResult).to.be.an.object;
//         done();
//     });
// });

describe("Tests the server", function() {
    describe("Test that server is working", function() {
        var url = "http://myrecipebox2.azurewebsites.net/categories";
        it("returns status 200", function (done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns a non-empty body", function(done) {
            request(url, function(error, response, body) {
                expect(body).to.be.an.array;
                expect(body).to.have.length.equal(3);
                done();
            });
        });
    });
});