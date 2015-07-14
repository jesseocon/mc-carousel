exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/e2e/mc-carousel.js'],
  capabilities: {
    'browserName': 'firefox'
  }
};
