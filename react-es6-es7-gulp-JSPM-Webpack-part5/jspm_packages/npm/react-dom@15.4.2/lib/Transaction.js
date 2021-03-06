/* */ 
(function(process) {
  'use strict';
  var _prodInvariant = require('./reactProdInvariant');
  var invariant = require('fbjs/lib/invariant');
  var OBSERVED_ERROR = {};
  var TransactionImpl = {
    reinitializeTransaction: function() {
      this.transactionWrappers = this.getTransactionWrappers();
      if (this.wrapperInitData) {
        this.wrapperInitData.length = 0;
      } else {
        this.wrapperInitData = [];
      }
      this._isInTransaction = false;
    },
    _isInTransaction: false,
    getTransactionWrappers: null,
    isInTransaction: function() {
      return !!this._isInTransaction;
    },
    perform: function(method, scope, a, b, c, d, e, f) {
      !!this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.') : _prodInvariant('27') : void 0;
      var errorThrown;
      var ret;
      try {
        this._isInTransaction = true;
        errorThrown = true;
        this.initializeAll(0);
        ret = method.call(scope, a, b, c, d, e, f);
        errorThrown = false;
      } finally {
        try {
          if (errorThrown) {
            try {
              this.closeAll(0);
            } catch (err) {}
          } else {
            this.closeAll(0);
          }
        } finally {
          this._isInTransaction = false;
        }
      }
      return ret;
    },
    initializeAll: function(startIndex) {
      var transactionWrappers = this.transactionWrappers;
      for (var i = startIndex; i < transactionWrappers.length; i++) {
        var wrapper = transactionWrappers[i];
        try {
          this.wrapperInitData[i] = OBSERVED_ERROR;
          this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
        } finally {
          if (this.wrapperInitData[i] === OBSERVED_ERROR) {
            try {
              this.initializeAll(i + 1);
            } catch (err) {}
          }
        }
      }
    },
    closeAll: function(startIndex) {
      !this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : _prodInvariant('28') : void 0;
      var transactionWrappers = this.transactionWrappers;
      for (var i = startIndex; i < transactionWrappers.length; i++) {
        var wrapper = transactionWrappers[i];
        var initData = this.wrapperInitData[i];
        var errorThrown;
        try {
          errorThrown = true;
          if (initData !== OBSERVED_ERROR && wrapper.close) {
            wrapper.close.call(this, initData);
          }
          errorThrown = false;
        } finally {
          if (errorThrown) {
            try {
              this.closeAll(i + 1);
            } catch (e) {}
          }
        }
      }
      this.wrapperInitData.length = 0;
    }
  };
  module.exports = TransactionImpl;
})(require('process'));
