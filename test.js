'use strict';

var test = require('tape');
var toString = require('./index.js');

test('mdast-util-to-string', function (t) {
  t.throws(
    function () {
      toString();
    },
    'should fail without node'
  );

  t.equal(
    toString({value: 'foo'}),
    'foo',
    'should not fail on unrecognised nodes'
  );

  t.equal(
    toString({
      value: 'foo',
      children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]
    }),
    'foo',
    'should prefer `value` over all others'
  );

  t.equal(
    toString({
      value: 'foo',
      alt: 'bar',
      title: 'baz'
    }),
    'foo',
    'should prefer `value` over `alt` or `title`'
  );

  t.equal(
    toString({alt: 'bar', title: 'baz'}),
    'bar',
    'should prefer `alt` over `title`'
  );

  t.equal(
    toString({
      title: 'baz',
      children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]
    }),
    'baz',
    'should use `title` over `children`'
  );

  t.equal(
    toString({
      children: [{value: 'foo'}, {alt: 'bar'}, {title: 'baz'}]
    }),
    'foobarbaz',
    'should prefer `children`'
  );

  t.equal(
    toString({}),
    '',
    'should fall back on an empty string'
  );

  t.end();
});
