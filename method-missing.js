const TypeCheckUtils = require(process.cwd() + '/lib/utils/type-check-utils')

class MethodMissing {

  constructor() {
    const handler = {
      get: this._handleMethodMissing,
    }
    return new Proxy(this, handler);
  }
  
  _handleMethodMissing(target, name) {
    if (name in target) { return target[name] }
    return (...args) => target.methodMissing(name, ...args)
  }

  methodMissing(name, ...args) {
    console.log(`Method "${name}" does not exist. Please override methodMissing method to add functionality.`);
  }
}

module.exports = MethodMissing