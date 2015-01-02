import { toJSON_array, fromJSON_array, toJSON_interface, fromJSON_registry } from "./toJSON";
import { toJS_array, toJS_interface } from "./toJS";
import { hash, hash_interface } from "./hash";
import { join_lines } from "./util";
import { ImmutableBase } from "./ImmutableBase";
import { nil } from "./nil";
import { Cons } from "./Cons";

export function ImmutableStack(root, len) {
  this.root = root;
  this.len  = len;
  this.hash = null;
}

ImmutableStack.prototype = Object.create(ImmutableBase);

fromJSON_registry["Stack"] = function (x) {
  return Stack(fromJSON_array(x));
};

ImmutableStack.prototype[toJSON_interface] = function (x) {
  return toJSON_array("Stack", x);
};

ImmutableStack.prototype[toJS_interface] = toJS_array;

// TODO code duplication with ImmutableSet
ImmutableStack.prototype.isEmpty = function () {
  return this.root === nil;
};

// TODO code duplication
ImmutableStack.prototype[hash_interface] = function (x) {
  if (x.hash === null) {
    var a = [];

    x.forEach(function (x) {
      a.push(hash(x));
    });

    x.hash = "(Stack" + join_lines(a, "  ") + ")";
  }

  return x.hash;
};

ImmutableStack.prototype.forEach = function (f) {
  this.root.forEachRev(f);
};

// TODO code duplication with ImmutableQueue
ImmutableStack.prototype.size = function () {
  return this.len;
};

ImmutableStack.prototype.peek = function (def) {
  if (this.isEmpty()) {
    if (arguments.length === 1) {
      return def;
    } else {
      throw new Error("Cannot peek from an empty stack");
    }
  } else {
    return this.root.car;
  }
};

ImmutableStack.prototype.push = function (value) {
  return new ImmutableStack(new Cons(value, this.root), this.len + 1);
};

ImmutableStack.prototype.pop = function () {
  if (this.isEmpty()) {
    throw new Error("Cannot pop from an empty stack");
  } else {
    return new ImmutableStack(this.root.cdr, this.len - 1);
  }
};

// TODO code duplication with ImmutableQueue
ImmutableStack.prototype.concat = function (right) {
  var self = this;

  right.forEach(function (x) {
    self = self.push(x);
  });

  return self;
};


export function isStack(x) {
  return x instanceof ImmutableStack;
}

// TODO code duplication with Queue
export function Stack(x) {
  if (x != null) {
    if (x instanceof ImmutableStack) {
      return x;

    } else {
      // TODO use concat ?
      var o = new ImmutableStack(nil, 0);

      x.forEach(function (x) {
        o = o.push(x);
      });

      return o;
    }
  } else {
    return new ImmutableStack(nil, 0);
  }
}
