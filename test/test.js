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
    
    describe('default', function() {
        
        it('should be defined', function(done) {

            exports('latest').then((schema) => {
                check(done, () => {
                    expect(schema.default).to.not.be.undefined;
                    expect(schema.default).to.be.a('function');
                });
            }).catch(done);

        });

        it('should return default values', function(done) {

            exports('latest').then((schema) => {
                check(done, () => {
                    expect(() => schema.default('toto')).to.throw(TypeError, 'Unknown type');
                    expect(schema.default('App')).to.be.a('object').to.have.property('id').to.equal('00000000-0000-0000-0000-000000000000');
                    
                    expect(schema.default('guid')).to.be.a('string').to.equal('00000000-0000-0000-0000-000000000000');
                    expect(schema.default('GUID')).to.be.a('string').to.equal('00000000-0000-0000-0000-000000000000');
                    
                    expect(schema.default('int')).to.be.a('number').to.equal(0);
                    expect(schema.default('boolean')).to.be.a('boolean').to.equal(false);
                    expect(schema.default('void')).to.be.null;
                    expect(schema.default('array.<guid>')).to.be.a('array').to.deep.equal(['00000000-0000-0000-0000-000000000000']);
                    
                });
            }).catch(done);

        });

    });

});

describe('schema sync...', function() {

	it('should be defined', function() {
		expect(exports.sync).to.not.be.undefined;
        expect(exports.sync).to.be.a('function');
	});
    
    it('should read 10.0.4 schema json files', function() {
        
        var schema = exports.sync('10.0.4');
        expect(schema).to.be.a('object');
        expect(schema).to.have.property('qrs').to.be.a('object');
        expect(schema).to.have.property('types').to.be.a('object');
        expect(schema).to.have.property('relations').to.be.a('array');
        expect(schema).to.have.property('enums').to.be.a('object');

	});
    
    it('should read latest schema json files', function() {
        
        var schema = exports.sync('latest');
        expect(schema).to.be.a('object');
        expect(schema).to.have.property('qrs').to.be.a('object');
        expect(schema).to.have.property('types').to.be.a('object');
        expect(schema).to.have.property('relations').to.be.a('array');
        expect(schema).to.have.property('enums').to.be.a('object');

	});
    
    describe('default', function() {
        
        it('should be defined', function() {

            var schema = exports.sync('latest');
            expect(schema.default).to.not.be.undefined;
            expect(schema.default).to.be.a('function');

        });

        it('should return default values', function() {

            var schema = exports.sync('latest');
            expect(() => schema.default('toto')).to.throw(TypeError, 'Unknown type');
            expect(schema.default('App')).to.be.a('object').to.have.property('id').to.equal('00000000-0000-0000-0000-000000000000');
            
            expect(schema.default('guid')).to.be.a('string').to.equal('00000000-0000-0000-0000-000000000000');
            expect(schema.default('GUID')).to.be.a('string').to.equal('00000000-0000-0000-0000-000000000000');
            
            expect(schema.default('int')).to.be.a('number').to.equal(0);
            expect(schema.default('boolean')).to.be.a('boolean').to.equal(false);
            expect(schema.default('void')).to.be.null;
            expect(schema.default('array.<guid>')).to.be.a('array').to.deep.equal(['00000000-0000-0000-0000-000000000000']);

        });

    });

});