var fs = require('fs');
var chai = require('chai');
var sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
chai.use(require('chai-things'));

var expect = chai.expect;
var should = chai.should();

var promise = require('q');

var readFile = promise.denodeify(fs.readFile);

var exports = require('../index.js');

function check(done, f) {

	return promise().then(() => {
		try {
			return f();
		} catch (e) {
			return promise.reject(e);
		}
	}).then(() => {
		done();
	}).fail((err) => {
		done(err);
	}); 

}

describe('schema...', function() {

	it('should be defined', function() {
		expect(exports).to.not.be.undefined;
        expect(exports).to.be.a('function');
	});
    
    it('should read 10.0.4 schema json files', function(done) {
        
        exports('10.0.4').then((schema) => {
            check(done, () => {
                expect(schema).to.be.a('object');
                expect(schema).to.have.property('qrs').to.be.a('object');
                expect(schema).to.have.property('types').to.be.a('object');
                expect(schema).to.have.property('relations').to.be.a('array');
                expect(schema).to.have.property('enums').to.be.a('object');
            });
        }).catch(done);

	});
    
    it('should read latest schema json files', function(done) {
        
        exports('latest').then((schema) => {
            check(done, () => {
                expect(schema).to.be.a('object');
                expect(schema).to.have.property('qrs').to.be.a('object');
                expect(schema).to.have.property('types').to.be.a('object');
                expect(schema).to.have.property('relations').to.be.a('array');
                expect(schema).to.have.property('enums').to.be.a('object');
            });
        }).catch(done);

	});

});