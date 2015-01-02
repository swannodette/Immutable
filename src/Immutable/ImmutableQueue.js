import { toJSON_array, fromJSON_array, toJSON_interface, fromJSON_registry } from "./toJSON";
import { toJS_array, toJS_interface } from "./toJS";
import { hash, hash_interface } from "./hash";
import { join_lines } from "./util";
import { Cons } from "./Cons";
import { nil } from "./nil";
import { ImmutableBase } from "./ImmutableBase";

export function ImmutableQueue(left, right, len) {
  this.left  = left;
  this.right = right;
  this.len   = len;
  this.hash  = null;
}

ImmutableQueue.prototype = Object.create(ImmutableBase);

fromJSON_registry["Queue"] = function (x) {
  return Queue(fromJSON_array(x));
};

ImmutableQueue.prototype[toJSON_interface] = function (x) {
  return toJSON_array("Queue", x);
};

ImmutableQueue.prototype[toJS_interface] = toJS_array;

ImmutableQueue.prototype.isEmpty = function () {
  return this.left === nil && this.right === nil;
};

ImmutableQueue.prototype.forEach = function (f) {
  this.left.forEach(f);
  this.right.forEachRev(f);
};

ImmutableQueue.prototype[hash_interface] = function (x) {
  if (x.hash === null) {
    var a = [];

    x.forEach(function (x) {
      a.push(hash(x));
    });

    x.hash = "(Queue" + join_lines(a, "  ") + ")";
  }

  return x.hash;
};

ImmutableQueue.prototype.size = function () {
  return this.len;
};

ImmutableQueue.prototype.peek = function (def) {
  if (this.isEmpty()) {
    if (arguments.length === 1) {
      return def;
    } else {
      throw new Error("Cannot peek from an empty queue");
    }
  } else {
    return this.left.car;
  }
};

ImmutableQueue.prototype.push = function (value) {
  if (this.isEmpty()) {
    return new ImmutableQueue(new Cons(value, this.left), this.right, this.len + 1);
  } else {
    return new ImmutableQueue(this.left, new Cons(value, this.right), this.len + 1);
  }
};

ImmutableQueue.prototype.pop = function () {
  if (this.isEmpty()) {
    throw new Error("Cannot pop from an empty queue");
  } else {
    var left = this.left.cdr;
    if (left === nil) {
      var right = nil;

      this.right.forEach(function (x) {
        right = new Cons(x, right);
      });

      return new ImmutableQueue(right, nil, this.len - 1);
    } else {
      return new ImmutableQueue(left, this.right, this.len - 1);
    }
  }
};

ImmutableQueue.prototype.concat = function (right) {
  var self = this;

  right.forEach(function (x) {
    self = self.push(x);
  });

  return self;
};


export function isQueue(x) {
  return x instanceof ImmutableQueue;
}

// TODO code duplication with Stack
export function Queue(x) {
  if (x != null) {
    if (x instanceof ImmutableQueue) {
      return x;

    } else {
      // TODO use concat ?
      var o = new ImmutableQueue(nil, nil, 0);

      x.forEach(function (x) {
        o = o.push(x);
      });

      return o;
    }
  } else {
    return new ImmutableQueue(nil, nil, 0);
  }
}
