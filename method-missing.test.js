var MethodMissing = require(process.cwd() + '/lib/shared/method-missing')

describe('MethodMissing', () => {
  class TestClass extends MethodMissing {
    constructor() {
      super();
      this.dummyMember = true;
      this.falseMember = false;
    }

    methodMissing(name, ...args) {
      return {name, args};
    }

    dummyMethod() {
      return true;
    }
  }

  // Catch, impossible to tell function from member
  // Catch, you have to call super() in the constructor, only if you want to add anything else on it.

  it('should create an instance', () => {
    const testInstance = new TestClass();
    expect(testInstance).to.exist;
  });

  it('should access its own methods', () => {
    const testInstance = new TestClass();
    expect(testInstance.dummyMethod()).toEqual(true);
  });

  it('should access its own members', () => {
    const testInstance = new TestClass();
    expect(testInstance.dummyMember).toEqual(true);
  });

  it('should call method missing', () => {
    const testInstance = new TestClass();
    expect(testInstance.inexistentMethod()).to.exist;
  })

  it('should access the method name from method missing', () => {
    const testInstance = new TestClass();
    const response = testInstance.inexistentMethod();
    expect(response.name).toEqual('inexistentMethod');
  });

  it('should access the method args from method missing', () => {
    const testInstance = new TestClass();
    const response = testInstance.inexistentMethod(true);
    expect(response.args[0]).toEqual(true);
  });

  it('should access get every method args from method missing', () => {
    const testInstance = new TestClass();
    const response = testInstance.inexistentMethod(1, 2, 3, 4);
    expect(response.args.length).toEqual(4);
  });

  it('should return falsey setted members as they are', () => {
    const testInstance = new TestClass();
    expect(testInstance.falseMember).toEqual(false);
  });
});