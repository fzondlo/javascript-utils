const Decorator = require(process.cwd() + '/lib/shared/decorator')

describe('Decorator', function() {
  class TestConnection {
    testFunc() {
      return 'test model string';
    }
  }

  it('should call method testFunc on the model', function() {
    const testConnection = new TestConnection() 
    const decoratedModel = new Decorator({connection: testConnection});
    expect(decoratedModel.testFunc()).toEqual('test model string')
  });

  it('should throw an error when a method does not exist', function() {
    const testConnection = new TestConnection() 
    const decoratedModel = new Decorator({connection: testConnection});
    expect(decoratedModel.unknownFunc).to.throw('unknownFunc is not a method on decorated class')
  });

  it('should return testFunc value set in decorator', function() {
    class TestDecorator extends Decorator {
      testFunc() {
        return 'test decorator string'
      }
    }
    
    const testConnection = new TestConnection();
    const testDecorator = new TestDecorator({connection: testConnection});
    expect(testDecorator.testFunc()).toEqual('test decorator string')
  });
});