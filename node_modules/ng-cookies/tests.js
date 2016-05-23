describe('ngCookie', function() {
  'use strict';

  var $document;

  beforeEach(angular.mock.module(require('./index').name));
  beforeEach(angular.mock.module(function($provide) {
    $document = {};
    $provide.value('$document', [$document]);
  }));

  it('gets existing cookies', inject(function(cookies) {
    $document.cookie = 'foo=bar';

    expect(cookies.get('foo')).toEqual('bar');

    $document.cookie = 'foo=bar; test=%7B%22foo%22%3A%22bar%22%7D';

    expect(cookies.get('foo')).toEqual('bar');
    expect(cookies.get('test')).toEqual('{"foo":"bar"}');
  }));

  it('sets new cookies', inject(function(cookies) {
    cookies.set('foo', 'bar');
    expect($document.cookie).toEqual('foo=bar');
    cookies.set('test', '{"foo":"bar"}');
    expect($document.cookie).toEqual('test=%7B%22foo%22%3A%22bar%22%7D');
  }));

  it('uses default and provided options', function() {
    angular.mock.module(function(cookiesProvider) {
      cookiesProvider.useDefaults({
        path: '/test',
        domain: 'example.com',
        maxAge: 24*60*60
      });
    });

    inject(function(cookies) {
      cookies.set('foo', 'bar');
      expect($document.cookie).toEqual('foo=bar; Max-Age=86400; Domain=example.com; Path=/test');

      cookies.set('foo', 'bar', {
        path: '/new-path',
        domain: 'example.org'
      });
      expect($document.cookie).toEqual('foo=bar; Max-Age=86400; Domain=example.org; Path=/new-path');
    });
  });
});
