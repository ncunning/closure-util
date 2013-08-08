var path = require('path');

var scripts = require('../../lib/scripts');
var Manager = require('../../lib/manager').Manager;
var helper = require('../helper');

var assert = helper.assert;
var fixtures = path.join(__dirname, '..', 'fixtures');

describe('manager', function() {

  describe('Manager', function() {

    describe('constructor', function() {
      it('creates a Manager instance', function() {
        var manager = new Manager();

        assert.instanceOf(manager, Manager);
      });
    });

    describe('#getDependencies()', function() {

      it('sorts', function(done) {
        var manager = new Manager();
        scripts.read(path.join(fixtures, 'dependencies/fruit/banana.js'))
            .then(function(s) {
                manager.addScript(s);
                return scripts.read(
                    path.join(fixtures, 'dependencies/food.js'));
              })
            .then(function(s) {
                manager.addScript(s);
                return scripts.read(
                    path.join(fixtures, 'dependencies/fruit/fruit.js'));
              })
            .then(function(s) {
                manager.addScript(s);
                var dependencies = manager.getDependencies();
                var names = dependencies.map(function(s) {
                  return path.basename(s.name);
                });
                assert.deepEqual(names, ['food.js', 'fruit.js', 'banana.js']);
                done();
              })
            .fail(done);
      });

    });

  });
});