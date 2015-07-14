describe('mc-carousel', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/demo/index.html');
  });

  it('should initialize properly', function() {
    var moduleElement = element.all(by.className('mc-carousel'));
    expect(moduleElement.count()).toEqual(1);
  });
});
