var TypeCheckUtils = require(process.cwd() + "/lib/utils/type-check-utils");
var MethodMissing = require(process.cwd() + "/lib/shared/method-missing");

class Decorator extends MethodMissing {

  constructor({connection, dbName, collectionName, tableName}={}) {
    if(connection === undefined) {
      throw 'Decorator requires a connection!'
    }

    super();
    this.connection = connection;
    this.dbName = dbName;
    this.collectionName = collectionName;
    this.tableName = tableName;
  }

  methodMissing(name, ...args) {
    let connectionMethod = this.connection[name];
    if (!TypeCheckUtils.isFunction(connectionMethod)) {
      throw `${name} is not a method on decorated class`;
    }
    return connectionMethod(...args);
  }
}

module.exports = Decorator;
