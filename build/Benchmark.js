/**
 * @license
 *
 * Version 6.0.0
 *
 * (c) 2014, 2015 Oni Labs, http://onilabs.com
 *
 * This file is licensed under the terms of the MIT License:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function() {
    "use strict";

    var $$Benchmark$$ = {
            get group() {
                return $$Benchmark$$group;
            },

            get message() {
                return $$Benchmark$$message;
            },

            get time() {
                return $$Benchmark$$time;
            },

            get run() {
                return $$Benchmark$$run;
            }
        },
        $$List$$ = {
            get run() {
                return $$List$$run;
            }
        },
        $$Record$$ = {
            get run() {
                return $$Record$$run;
            }
        },
        $$Queue$$ = {
            get run() {
                return $$Queue$$run;
            }
        },
        $$Tuple$$ = {
            get run() {
                return $$Tuple$$run;
            }
        };

    var $$Benchmark$$Benchmark = require("benchmark");

    var $$Benchmark$$suite = new $$Benchmark$$Benchmark.Suite({
      // TODO is this correct ?
      onComplete: function () {
        $$Benchmark$$display_messages($$Benchmark$$messages);
      },
      onCycle: function (event) {
        var s = "" + event.target;
        s = s.replace(/^(.+) x ([0-9,\.]+) ops\/sec ±\d+\.\d+% \(\d+ runs sampled\)$/g, function (_, text, num) {
          if (/\./.test(num)) {
            num = "" + Math.round(+num);
          }
          return $$Benchmark$$rpad(text, 49) + $$Benchmark$$lpad(" " + $$Benchmark$$lpad(num, 13) + " ops/sec", 21);
        });
        console.log(s);
      }
    });

    function $$Benchmark$$repeat(i, x) {
      return new Array(i + 1).join(x);
    }

    function $$Benchmark$$rpad(x, i) {
      return (x + $$Benchmark$$repeat(i, " ")).slice(0, i);
    }

    function $$Benchmark$$lpad(x, i) {
      return ($$Benchmark$$repeat(i, " ") + x).slice(-i);
    }


    var $$Benchmark$$indent = 0;
    var $$Benchmark$$timers = [];
    var $$Benchmark$$messages = [];

    function $$Benchmark$$display_messages(a) {
      a.forEach(function (x) {
        console.log(x);
      });
    }

    function $$Benchmark$$add_timers() {
      var max = 0;

      $$Benchmark$$timers.forEach(function (x) {
        max = Math.max(max, x.name.length);
      });

      $$Benchmark$$timers.forEach(function (x) {
        $$Benchmark$$suite.add($$Benchmark$$repeat($$Benchmark$$indent, " ") + $$Benchmark$$rpad(x.name, max), x.fn, {
          onStart: function () {
            $$Benchmark$$display_messages(x.messages);
          }
        });
      });
    }

    function $$Benchmark$$group(name, f) {
      $$Benchmark$$message($$Benchmark$$repeat(70 - $$Benchmark$$indent, "-"));
      $$Benchmark$$message(name + ":");

      var old_indent = $$Benchmark$$indent;
      var old_timers = $$Benchmark$$timers;

      $$Benchmark$$indent += 2;
      $$Benchmark$$timers = [];

      try {
        f();
      } finally {
        $$Benchmark$$add_timers();
        $$Benchmark$$indent = old_indent;
        $$Benchmark$$timers = old_timers;
      }
    }

    function $$Benchmark$$message(x) {
      if (arguments.length !== 1) {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }
      $$Benchmark$$messages.push($$Benchmark$$repeat($$Benchmark$$indent, " ") + x);
    }

    function $$Benchmark$$time(s, f) {
      // This is to make sure that the function doesn't
      // have any errors before benchmarking it
      f();

      var a = $$Benchmark$$messages;
      $$Benchmark$$messages = [];

      $$Benchmark$$timers.push({
        name: s,
        fn: f,
        messages: a
      });
    }

    function $$Benchmark$$run() {
      $$Benchmark$$add_timers();
      $$Benchmark$$suite.run();
    }
    var $$Tag$$tag_uuid = "48de6fff-9d11-472d-a76f-ed77a59a5cbc";
    var $$Tag$$tag_id = 0;

    var $$Tag$$uuid = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";
    var $$Tag$$uuid_regexp = new RegExp("^" + $$Tag$$uuid + "$");

    var $$Tag$$is_tag_regexp = new RegExp("^\\(Tag " + $$Tag$$tag_uuid + " [0-9]+\\)$");

    var $$Tag$$is_uuid_tag_regexp = new RegExp("^\\(UUIDTag " + $$Tag$$uuid + "\\)$");

    var $$Tag$$Symbol_iterator = (typeof Symbol !== "undefined" && typeof Symbol.iterator !== "undefined"
                                   ? Symbol.iterator
                                   : null);

    var $$Tag$$Symbol_keyFor = (typeof Symbol !== "undefined" && typeof Symbol.keyFor !== "undefined"
                                 ? Symbol.keyFor
                                 : null);

    function $$Tag$$isUUID(x) {
      return typeof x === "string" && $$Tag$$uuid_regexp.test(x);
    }

    function $$Tag$$isTag(x) {
      return typeof x === "string" &&
             ($$Tag$$is_tag_regexp.test(x) ||
              $$Tag$$is_uuid_tag_regexp.test(x));
    }

    function $$Tag$$isUUIDTag(x) {
      return typeof x === "string" && $$Tag$$is_uuid_tag_regexp.test(x);
    }

    function $$Tag$$Tag() {
      if (arguments.length === 0) {
        return "(Tag " + $$Tag$$tag_uuid + " " + (++$$Tag$$tag_id) + ")";
      } else {
        throw new Error("Expected 0 arguments but got " + arguments.length);
      }
    }

    function $$Tag$$UUIDTag(id) {
      if (arguments.length === 1) {
        if ($$Tag$$isUUID(id)) {
          return "(UUIDTag " + id + ")";
        } else {
          throw new Error("Expected a lower-case UUID, but got: " + id);
        }

      } else {
        throw new Error("Expected 1 argument but got " + arguments.length);
      }
    }
    var $$$Immutable$static$$tag_hash        = $$Tag$$UUIDTag("e1c3818d-4c4f-4703-980a-00969e4ca900");
    var $$$Immutable$static$$tag_iter        = $$Tag$$UUIDTag("6199065c-b518-4cb3-8b41-ab70a9769ec3");
    var $$$Immutable$static$$tag_toJS        = $$Tag$$UUIDTag("1b75a273-16bd-4248-be8a-e4b5e8c4b523");
    var $$$Immutable$static$$tag_toJSON_type = $$Tag$$UUIDTag("89d8297c-d95e-4ce9-bc9b-6b6f73fa6a37");
    var $$$Immutable$static$$tag_toJSON      = $$Tag$$UUIDTag("99e14916-bc99-4c48-81aa-299cf1ad6de3");

    var $$$Immutable$static$$fromJSON_registry = {};

    var $$$Immutable$static$$nil = {};
    $$$Immutable$static$$nil.depth      = 0;
    $$$Immutable$static$$nil.size       = 0;
    function $$$Immutable$Cons$$Cons(car, cdr) {
      this.car = car;
      this.cdr = cdr;
    }

    function $$$Immutable$Cons$$iter_cons(x) {
      return {
        next: function () {
          if (x === $$$Immutable$static$$nil) {
            return { done: true };
          } else {
            var value = x.car;
            x = x.cdr;
            return { value: value };
          }
        }
      };
    }

    function $$$Immutable$Cons$$each_cons(x, f) {
      while (x !== $$$Immutable$static$$nil) {
        f(x.car);
        x = x.cdr;
      }
    }
    function $$$Immutable$Array$$copy(array) {
      var len = array.length;
      var out = new Array(len);

      for (var i = 0; i < len; ++i) {
        out[i] = array[i];
      }

      return out;
    }

    function $$$Immutable$Array$$insert(array, index, value) {
      var len = array.length + 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      out[i] = value;
      ++i;

      while (i < len) {
        out[i] = array[i - 1];
        ++i;
      }

      return out;
    }

    function $$$Immutable$Array$$modify(array, index, f) {
      var old_value = array[index];
      var new_value = f(old_value);

      if (old_value === new_value) {
        return array;

      } else {
        var new_array = $$$Immutable$Array$$copy(array);
        new_array[index] = new_value;
        return new_array;
      }
    }

    function $$$Immutable$Array$$remove(array, index) {
      var len = array.length - 1;

      var out = new Array(len);

      var i = 0;
      while (i < index) {
        out[i] = array[i];
        ++i;
      }

      while (i < len) {
        out[i] = array[i + 1];
        ++i;
      }

      return out;
    }
    function $$Array$$array_has(i, len) {
      return i >= 0 && i < len;
    }

    function $$Array$$array_get(array, i, def) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if ($$Array$$array_has(i, len)) {
        return array[i];
      } else if (arguments.length === 3) {
        return def;
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_insert(array, i, value) {
      var len = array.length;

      if (i < 0) {
        i += (len + 1);
      }

      if (i >= 0 && i <= len) {
        return $$$Immutable$Array$$insert(array, i, value);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_modify(array, i, f) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if ($$Array$$array_has(i, len)) {
        return $$$Immutable$Array$$modify(array, i, f);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_remove(array, i) {
      var len = array.length;

      if (i < 0) {
        i += len;
      }

      if ($$Array$$array_has(i, len)) {
        return $$$Immutable$Array$$remove(array, i);
      } else {
        throw new Error("Invalid index: " + i);
      }
    }

    function $$Array$$array_slice(array, from, to) {
      var len = array.length;

      if (arguments.length < 2) {
        from = 0;
      }
      if (arguments.length < 3) {
        to = len;
      }

      if (from < 0) {
        from += len;
      }
      if (to < 0) {
        to += len;
      }

      if (from === 0 && to === len) {
        return array;

      } else if (from > to) {
        throw new Error("Index " + from + " is greater than index " + to);

      } else if ($$Array$$array_has(from, len)) {
        if (from === to) {
          return [];

        // TODO code duplication with array_has ?
        } else if (to > 0 && to <= len) {
          return array.slice(from, to);

        } else {
          throw new Error("Index " + to + " is not valid");
        }

      } else {
        throw new Error("Index " + from + " is not valid");
      }
    }

    function $$Array$$array_concat(array, other) {
      if (array.length === 0) {
        return other;
      } else if (other.length === 0) {
        return array;
      } else {
        return array.concat(other);
      }
    }
    var $$List$$immutablejs = require("immutable");
    var $$List$$mori        = require("mori");
    var $$List$$immutable   = require("./Immutable.min.js");

    function $$List$$cons_push(x, i) {
      return new $$$Immutable$Cons$$Cons(i, x);
    }


    function $$List$$run(counter) {
      $$Benchmark$$.group("List with " + counter + " values", function () {
        $$Benchmark$$.group("Inserting at the end", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$$.time("Mori Vector", function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }
          });

          $$Benchmark$$.time("Immutable List (insert)", function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }
          });

          $$Benchmark$$.time("Immutable List (push)", function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$$.time("Immutable Queue", function () {
            var a = $$List$$immutable.Queue();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$$.time("Immutable Stack", function () {
            var a = $$List$$immutable.Stack();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }
          });

          $$Benchmark$$.time("Cons", function () {
            var a = $$$Immutable$static$$nil;

            for (var i = 0; i < counter; ++i) {
              a = $$List$$cons_push(a, i);
            }
          });

          /*benchmark.time("Elm Array", function () {
            elm.insert(counter);
          });

          benchmark.time("Elm Array (initialize)", function () {
            elm.insertInit(counter);
          });*/
        });


        $$Benchmark$$.group("Inserting at the start", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.unshift(i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, 0, i);
            }
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.unshift(i);
            }
          });

          $$Benchmark$$.message("Mori Vector");

          /*benchmark.time("Mori List", function () {
            var a = mori.list();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj(a, i);
            }
          });*/

          $$Benchmark$$.time("Immutable List", function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(0, i);
            }
          });

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Inserting at random", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.length);
              a.splice(pivot, 0, i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.length);
              a = $$Array$$array_insert(a, pivot, i);
            }
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.size);
              a = a.splice(pivot, 0, i);
            }
          });

          $$Benchmark$$.message("Mori Vector");

          $$Benchmark$$.time("Immutable List", function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              var pivot = Math.floor(Math.random() * a.size());
              a = a.insert(pivot, i);
            }
          });

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Retrieving at the end", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a[a.length - 1];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(a, -1);
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.last();
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              // `mori.last` is O(n)
              $$List$$mori.get(a, $$List$$mori.count(a) - 1);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.get(-1);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.get(-1);
            });
          })();

          //var elm_array = elm.makeList(counter);

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Retrieving at the start", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a[0];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(a, 0);
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.first();
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.get(a, 0);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.get(0);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.get(0);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Retrieving at random", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              var pivot = Math.floor(Math.random() * a.length);
              a[pivot];
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              var pivot = Math.floor(Math.random() * a.length);
              $$Array$$array_get(a, pivot);
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var pivot = Math.floor(Math.random() * a.size);
              a.get(pivot);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              var pivot = Math.floor(Math.random() * $$List$$mori.count(a));
              $$List$$mori.get(a, pivot);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.get(pivot);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.get(pivot);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Removing at the end", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$Array$$array_remove(b, -1);
              }
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.pop();
              }
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$List$$mori.pop(b);
              }
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(-1);
              }
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(-1);
              }
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Removing at the start", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$Array$$array_remove(b, 0);
              }
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.shift();
              }
            });
          })();

          $$Benchmark$$.message("Mori Vector");

          /*;(function () {
            var a = mori.list();

            for (var i = 0; i < counter; ++i) {
              a = mori.conj(a, i);
            }

            benchmark.time("Mori List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = mori.pop(b);
              }
            });
          })();*/

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(0);
              }
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.remove(0);
              }
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Removing at random", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.length);
                b = $$Array$$array_remove(b, pivot);
              }
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size);
                b = b.splice(pivot, 1);
              }
            });
          })();

          $$Benchmark$$.message("Mori Vector");

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size());
                b = b.remove(pivot);
              }
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                var pivot = Math.floor(Math.random() * b.size());
                b = b.remove(pivot);
              }
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Modifying at the end", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$Array$$array_modify(a, -1, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set(-1, -50);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.assoc(a, $$List$$mori.count(a) - 1, -50);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.set(-1, -50);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.set(-1, -50);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Modifying at the start", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$Array$$array_modify(a, 0, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set(0, -50);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.assoc(a, 0, -50);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.set(0, -50);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.set(0, -50);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Modifying at random", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var pivot = Math.floor(Math.random() * a.length);
              $$Array$$array_modify(a, pivot, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              var pivot = Math.floor(Math.random() * a.size);
              a.set(pivot, -50);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              var pivot = Math.floor(Math.random() * $$List$$mori.count(a));
              $$List$$mori.assoc(a, pivot, -50);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.set(pivot, -50);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              var pivot = Math.floor(Math.random() * a.size());
              a.set(pivot, -50);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Concatenating", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.concat(a);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_concat(a, a);
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.concat(a);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.concat(a, a);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.concat(a);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.concat(a);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Slicing small", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.slice(1, 2);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_slice(a, 1, 2);
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.slice(1, 2);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.subvec(a, 1, 2);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.slice(1, 2);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.slice(1, 2);
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Slicing medium", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.slice(1, Math.floor(a.length / 2));
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_slice(a, 1, Math.floor(a.length / 2));
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.slice(1, Math.floor(a.size / 2));
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.subvec(a, 1, Math.floor($$List$$mori.count(a) / 2));
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.slice(1, Math.floor(a.size() / 2));
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.slice(1, Math.floor(a.size() / 2));
            });
          })();

          //benchmark.message("Elm Array");
        });


        $$Benchmark$$.group("Slicing large", function () {
          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }

            $$Benchmark$$.time("JavaScript Array", function () {
              a.slice(1);
            });
          })();

          ;(function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a = $$Array$$array_insert(a, -1, i);
            }

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_slice(a, 1);
            });
          })();

          ;(function () {
            var a = $$List$$immutablejs.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable-js List", function () {
              a.slice(1);
            });
          })();

          ;(function () {
            var a = $$List$$mori.vector();

            for (var i = 0; i < counter; ++i) {
              a = $$List$$mori.conj(a, i);
            }

            $$Benchmark$$.time("Mori Vector", function () {
              $$List$$mori.subvec(a, 1);
            });
          })();

          /*;(function () {
            var a = immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.insert(-1, i);
            }

            benchmark.time("Immutable List (insert)", function () {
              a.slice(1);
            });
          })();*/

          ;(function () {
            var a = $$List$$immutable.List();

            for (var i = 0; i < counter; ++i) {
              a = a.push(i);
            }

            $$Benchmark$$.time("Immutable List", function () {
              a.slice(1);
            });
          })();

          //benchmark.message("Elm Array");
        });
      });
    }
    var $$Record$$immutablejs = require("immutable");
    var $$Record$$mori        = require("mori");
    var $$Record$$immutable   = require("./Immutable.min.js");

    function $$Record$$copy(input) {
      var output = {};

      for (var s in input) {
        output[s] = input[s];
      }

      return output;
    }

    function $$Record$$random(input) {
      return input[Math.floor(Math.random() * input.length)];
    }

    function $$Record$$run(counter) {
      var only_keys = [];
      var keys = [];
      var record_keys = {};
      var mori_keys = [];

      for (var i = 0; i < counter; ++i) {
        only_keys.push("foo" + i);
        record_keys["foo" + i] = i;
        keys.push(["foo" + i, i]);
        mori_keys.push("foo" + i, i);
      }

      var ImmutableJSRecord = $$Record$$immutablejs.Record(record_keys);

      $$Benchmark$$.group("Record with " + counter + " keys", function () {
        $$Benchmark$$.group("Creating", function () {
          $$Benchmark$$.message("JavaScript Object");

          $$Benchmark$$.time("JavaScript Object Copying", function () {
            $$Record$$copy(record_keys);
          });

          $$Benchmark$$.time("Immutable-js Map", function () {
            $$Record$$immutablejs.Map(keys);
          });

          $$Benchmark$$.time("Immutable-js Record", function () {
            new ImmutableJSRecord(record_keys);
          });

          $$Benchmark$$.time("Mori Hash Map", function () {
            $$Record$$mori.hash_map.apply(null, mori_keys);
          });

          $$Benchmark$$.time("Mori Sorted Map", function () {
            $$Record$$mori.sorted_map.apply(null, mori_keys);
          });

          $$Benchmark$$.time("Immutable Dict", function () {
            $$Record$$immutable.Dict(keys);
          });

          $$Benchmark$$.time("Immutable SortedDict", function () {
            $$Record$$immutable.SortedDict($$Record$$immutable.simpleSort, keys);
          });

          $$Benchmark$$.time("Immutable Record", function () {
            $$Record$$immutable.Record(keys);
          });
        });


        $$Benchmark$$.group("get first", function () {
          $$Benchmark$$.message("JavaScript Object");

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              o["foo0"];
            });

            $$Benchmark$$.time("JavaScript Object Copying (prop)", function () {
              o.foo0;
            });
          })();

          ;(function () {
            var o = $$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.get("foo0");
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.get("foo0");
            });

            $$Benchmark$$.time("Immutable-js Record (prop)", function () {
              o.foo0;
            });
          })();

          ;(function () {
            var o = $$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              $$Record$$mori.get(o, "foo0");
            });
          })();

          ;(function () {
            var o = $$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              $$Record$$mori.get(o, "foo0");
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.get("foo0");
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.SortedDict($$Record$$immutable.simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.get("foo0");
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.get("foo0");
            });
          })();
        });


        $$Benchmark$$.group("get random", function () {
          $$Benchmark$$.message("JavaScript Object");

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              o[$$Record$$random(only_keys)];
            });
          })();

          ;(function () {
            var o = $$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.get($$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.get($$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              $$Record$$mori.get(o, $$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              $$Record$$mori.get(o, $$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.get($$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.SortedDict($$Record$$immutable.simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.get($$Record$$random(only_keys));
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.get($$Record$$random(only_keys));
            });
          })();
        });


        $$Benchmark$$.group("set first", function () {
          ;(function () {
            var o = $$Record$$copy(record_keys);

            $$Benchmark$$.time("JavaScript Object", function () {
              o["foo0"] = -1;
            });

            $$Benchmark$$.time("JavaScript Object (prop)", function () {
              o.foo0 = -1;
            });
          })();

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              var x = $$Record$$copy(o);
              x["foo0"] = -1;
            });

            $$Benchmark$$.time("JavaScript Object Copying (prop)", function () {
              var x = $$Record$$copy(o);
              x.foo0 = -1;
            });
          })();

          ;(function () {
            var o = $$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = $$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              $$Record$$mori.assoc(o, "foo0", -1);
            });
          })();

          ;(function () {
            var o = $$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              $$Record$$mori.assoc(o, "foo0", -1);
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.SortedDict($$Record$$immutable.simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.set("foo0", -1);
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.set("foo0", -1);
            });
          })();
        });


        $$Benchmark$$.group("set random", function () {
          ;(function () {
            var o = $$Record$$copy(record_keys);

            $$Benchmark$$.time("JavaScript Object", function () {
              o[$$Record$$random(only_keys)] = -1;
            });
          })();

          ;(function () {
            var o = record_keys;

            $$Benchmark$$.time("JavaScript Object Copying", function () {
              var x = $$Record$$copy(o);
              x[$$Record$$random(only_keys)] = -1;
            });
          })();

          ;(function () {
            var o = $$Record$$immutablejs.Map(keys);

            $$Benchmark$$.time("Immutable-js Map", function () {
              o.set($$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = new ImmutableJSRecord(record_keys);

            $$Benchmark$$.time("Immutable-js Record", function () {
              o.set($$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Record$$mori.hash_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Hash Map", function () {
              $$Record$$mori.assoc(o, $$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Record$$mori.sorted_map.apply(null, mori_keys);

            $$Benchmark$$.time("Mori Sorted Map", function () {
              $$Record$$mori.assoc(o, $$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Dict(keys);

            $$Benchmark$$.time("Immutable Dict", function () {
              o.set($$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.SortedDict($$Record$$immutable.simpleSort, keys);

            $$Benchmark$$.time("Immutable SortedDict", function () {
              o.set($$Record$$random(only_keys), -1);
            });
          })();

          ;(function () {
            var o = $$Record$$immutable.Record(keys);

            $$Benchmark$$.time("Immutable Record", function () {
              o.set($$Record$$random(only_keys), -1);
            });
          })();
        });
      });
    }
    var $$Queue$$immutablejs = require("immutable");
    var $$Queue$$mori        = require("mori");
    var $$Queue$$immutable   = require("./Immutable.min.js");

    function $$Queue$$array_get(array, i) {
      return array[i];
    }

    function $$Queue$$run(counter) {
      var values = [];

      for (var i = 0; i < counter; ++i) {
        values.push(i);
      }

      $$Benchmark$$.group("Queue with " + counter + " values", function () {
        $$Benchmark$$.group("Creating", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var values = [];

            for (var i = 0; i < counter; ++i) {
              values.push(i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            $$$Immutable$Array$$copy(values);
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            $$Queue$$immutablejs.List(values);
          });

          $$Benchmark$$.time("Mori Queue", function () {
            $$Queue$$mori.queue.apply(null, values);
          });

          $$Benchmark$$.time("Immutable List", function () {
            $$Queue$$immutable.List(values);
          });

          $$Benchmark$$.time("Immutable Queue", function () {
            $$Queue$$immutable.Queue(values);
          });
        });


        $$Benchmark$$.group("Peek left", function () {
          ;(function () {
            var a = values;

            $$Benchmark$$.time("JavaScript Array", function () {
              a[0];
            });

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$Queue$$array_get(a, 0);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutablejs.List(values);

            $$Benchmark$$.time("Immutable-js List (first)", function () {
              a.first();
            });

            $$Benchmark$$.time("Immutable-js List (get)", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = $$Queue$$mori.queue.apply(null, values);

            $$Benchmark$$.time("Mori Queue", function () {
              $$Queue$$mori.peek(a);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.List(values);

            $$Benchmark$$.time("Immutable List", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.Queue(values);

            $$Benchmark$$.time("Immutable Queue", function () {
              a.peek();
            });
          })();
        });


        $$Benchmark$$.group("Pop left", function () {
          ;(function () {
            var a = values;

            $$Benchmark$$.message("JavaScript Array");

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$$Immutable$Array$$remove(a, 0);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutablejs.List(values);

            $$Benchmark$$.time("Immutable-js List (shift)", function () {
              a.shift();
            });

            $$Benchmark$$.time("Immutable-js List (delete)", function () {
              a.delete(0);
            });

            $$Benchmark$$.time("Immutable-js List (rest)", function () {
              a.rest();
            });
          })();

          ;(function () {
            var a = $$Queue$$mori.queue.apply(null, values);

            $$Benchmark$$.time("Mori Queue (pop)", function () {
              $$Queue$$mori.pop(a);
            });

            $$Benchmark$$.time("Mori Queue (rest)", function () {
              $$Queue$$mori.rest(a);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.List(values);

            $$Benchmark$$.time("Immutable List", function () {
              a.remove(0);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.Queue(values);

            $$Benchmark$$.time("Immutable Queue", function () {
              a.pop();
            });
          })();
        });


        $$Benchmark$$.group("Pop left all", function () {
          ;(function () {
            var a = values;

            $$Benchmark$$.message("JavaScript Array");

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              while (b.length) {
                b = $$$Immutable$Array$$remove(b, 0);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$immutablejs.List(values);

            $$Benchmark$$.time("Immutable-js List (shift)", function () {
              var b = a;
              while (b.size) {
                b = b.shift();
              }
            });

            $$Benchmark$$.time("Immutable-js List (delete)", function () {
              var b = a;
              while (b.size) {
                b = b.delete(0);
              }
            });

            $$Benchmark$$.time("Immutable-js List (rest)", function () {
              var b = a;
              while (b.size) {
                b = b.rest();
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$mori.queue.apply(null, values);

            $$Benchmark$$.time("Mori Queue (pop)", function () {
              var b = a;
              while (!$$Queue$$mori.is_empty(b)) {
                b = $$Queue$$mori.pop(b);
              }
            });

            $$Benchmark$$.time("Mori Queue (rest)", function () {
              var b = a;
              while (!$$Queue$$mori.is_empty(b)) {
                b = $$Queue$$mori.rest(b);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.List(values);

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              while (!b.isEmpty()) {
                b = b.remove(0);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.Queue(values);

            $$Benchmark$$.time("Immutable Queue", function () {
              var b = a;
              while (!b.isEmpty()) {
                b = b.pop();
              }
            });
          })();
        });


        $$Benchmark$$.group("Push right", function () {
          ;(function () {
            var a = values;

            $$Benchmark$$.message("JavaScript Array");

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$$Immutable$Array$$insert(a, a.length, 50);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutablejs.List(values);

            $$Benchmark$$.time("Immutable-js List (push)", function () {
              a.push(50);
            });

            $$Benchmark$$.time("Immutable-js List (set)", function () {
              a.set(a.size, 50);
            });
          })();

          ;(function () {
            var a = $$Queue$$mori.queue.apply(null, values);

            $$Benchmark$$.time("Mori Queue", function () {
              $$Queue$$mori.conj(a, 50);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.List(values);

            $$Benchmark$$.time("Immutable List", function () {
              a.push(50);
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.Queue(values);

            $$Benchmark$$.time("Immutable Queue", function () {
              a.push(50);
            });
          })();
        });


        $$Benchmark$$.group("Push right all", function () {
          ;(function () {
            var a = [];

            $$Benchmark$$.message("JavaScript Array");

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$$Immutable$Array$$insert(b, b.length, i);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$immutablejs.List();

            $$Benchmark$$.time("Immutable-js List (push)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.push(i);
              }
            });

            $$Benchmark$$.time("Immutable-js List (set)", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.set(b.size, i);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$mori.queue();

            $$Benchmark$$.time("Mori Queue", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = $$Queue$$mori.conj(b, i);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.List();

            $$Benchmark$$.time("Immutable List", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.push(i);
              }
            });
          })();

          ;(function () {
            var a = $$Queue$$immutable.Queue();

            $$Benchmark$$.time("Immutable Queue", function () {
              var b = a;
              for (var i = 0; i < counter; ++i) {
                b = b.push(i);
              }
            });
          })();
        });
      });
    }
    var $$Tuple$$immutablejs = require("immutable");
    var $$Tuple$$mori        = require("mori");
    var $$Tuple$$immutable   = require("./Immutable.min.js");

    function $$Tuple$$cons_push(x, i) {
      return new $$$Immutable$Cons$$Cons(i, x);
    }

    function $$Tuple$$random(max) {
      return Math.floor(Math.random() * max);
    }

    function $$Tuple$$run(counter) {
      var values = [];

      for (var i = 0; i < counter; ++i) {
        values.push(i);
      }

      $$Benchmark$$.group("Tuple with " + counter + " values", function () {
        $$Benchmark$$.group("Creating", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            var a = [];

            for (var i = 0; i < counter; ++i) {
              a.push(i);
            }
          });

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            $$$Immutable$Array$$copy(values);
          });

          $$Benchmark$$.time("Immutable-js List", function () {
            $$Tuple$$immutablejs.List(values);
          });

          $$Benchmark$$.time("Mori Vector", function () {
            $$Tuple$$mori.vector.apply(null, values);
          });

          /*benchmark.time("Mori List", function () {
            mori.list.apply(null, values);
          });

          benchmark.time("Mori Queue", function () {
            mori.queue.apply(null, values);
          });*/

          $$Benchmark$$.time("Immutable List", function () {
            $$Tuple$$immutable.List(values);
          });

          $$Benchmark$$.time("Immutable Tuple", function () {
            $$Tuple$$immutable.Tuple(values);
          });

          /*benchmark.time("Immutable Queue", function () {
            immutable.Queue(values);
          });*/

          $$Benchmark$$.time("Immutable Stack", function () {
            $$Tuple$$immutable.Stack(values);
          });

          $$Benchmark$$.time("Cons", function () {
            var a = $$$Immutable$static$$nil;

            for (var i = 0; i < counter; ++i) {
              a = $$Tuple$$cons_push(a, i);
            }
          });
        });


        $$Benchmark$$.group("Retrieving at the end", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            values[values.length - 1];
          });

          ;(function () {
            var last = values.length - 1;

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(values, last);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutablejs.List(values);

            var last = a.size - 1;

            /*benchmark.time("Immutable-js List (last)", function () {
              a.last();
            });*/

            $$Benchmark$$.time("Immutable-js List", function () {
              a.get(last);
            });
          })();

          ;(function () {
            var a = $$Tuple$$mori.vector.apply(null, values);

            var last = $$Tuple$$mori.count(a) - 1;

            $$Benchmark$$.time("Mori Vector (nth)", function () {
              $$Tuple$$mori.nth(a, last);
            });

            /*benchmark.time("Mori Vector (last)", function () {
              mori.last(a);
            });*/

            $$Benchmark$$.time("Mori Vector (peek)", function () {
              $$Tuple$$mori.peek(a);
            });
          })();

          /*;(function () {
            var a = mori.list.apply(null, values);

            var last = mori.count(a) - 1;

            benchmark.time("Mori List (nth)", function () {
              mori.nth(a, last);
            });

            benchmark.time("Mori List (last)", function () {
              mori.last(a);
            });
          })();

          ;(function () {
            var a = mori.queue.apply(null, values);

            var last = mori.count(a) - 1;

            benchmark.time("Mori Queue (nth)", function () {
              mori.nth(a, last);
            });

            benchmark.time("Mori Queue (last)", function () {
              mori.last(a);
            });
          })();*/

          ;(function () {
            var a = $$Tuple$$immutable.List(values);

            var last = a.size() - 1;

            $$Benchmark$$.time("Immutable List", function () {
              a.get(last);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.Tuple(values);

            var last = a.size() - 1;

            $$Benchmark$$.time("Immutable Tuple", function () {
              a.get(last);
            });
          })();
        });


        $$Benchmark$$.group("Retrieving at the start", function () {
          $$Benchmark$$.time("JavaScript Array", function () {
            values[0];
          });

          $$Benchmark$$.time("JavaScript Array (error checking)", function () {
            $$Array$$array_get(values, 0);
          });

          ;(function () {
            var a = $$Tuple$$immutablejs.List(values);

            /*benchmark.time("Immutable-js List (first)", function () {
              a.first();
            });*/

            $$Benchmark$$.time("Immutable-js List", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = $$Tuple$$mori.vector.apply(null, values);

            $$Benchmark$$.time("Mori Vector", function () {
              $$Tuple$$mori.nth(a, 0);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.List(values);

            $$Benchmark$$.time("Immutable List", function () {
              a.get(0);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.Tuple(values);

            $$Benchmark$$.time("Immutable Tuple", function () {
              a.get(0);
            });
          })();
        });


        $$Benchmark$$.group("Retrieving at random", function () {
          ;(function () {
            var size = values.length;

            $$Benchmark$$.time("JavaScript Array", function () {
              values[$$Tuple$$random(size)];
            });

            $$Benchmark$$.time("JavaScript Array (error checking)", function () {
              $$Array$$array_get(values, $$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutablejs.List(values);

            var size = a.size;

            $$Benchmark$$.time("Immutable-js List", function () {
              a.get($$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Tuple$$mori.vector.apply(null, values);

            var size = $$Tuple$$mori.count(a);

            $$Benchmark$$.time("Mori Vector", function () {
              $$Tuple$$mori.nth(a, $$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.List(values);

            var size = a.size();

            $$Benchmark$$.time("Immutable List", function () {
              a.get($$Tuple$$random(size));
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.Tuple(values);

            var size = a.size();

            $$Benchmark$$.time("Immutable Tuple", function () {
              a.get($$Tuple$$random(size));
            });
          })();
        });


        $$Benchmark$$.group("Setting at the end", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var last = values.length - 1;

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$Array$$array_modify(values, last, function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutablejs.List(values);

            var last = a.size - 1;

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set(last, -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$mori.vector.apply(null, values);

            var last = $$Tuple$$mori.count(a) - 1;

            $$Benchmark$$.time("Mori Vector", function () {
              $$Tuple$$mori.assoc(a, last, -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.List(values);

            var last = a.size() - 1;

            $$Benchmark$$.time("Immutable List", function () {
              a.set(last, -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.Tuple(values);

            var last = a.size() - 1;

            $$Benchmark$$.time("Immutable Tuple", function () {
              a.set(last, -50);
            });
          })();
        });


        $$Benchmark$$.group("Setting at the start", function () {
          $$Benchmark$$.message("JavaScript Array");

          $$Benchmark$$.time("JavaScript Array Copying", function () {
            $$Array$$array_modify(values, 0, function () {
              return -50;
            });
          });

          ;(function () {
            var a = $$Tuple$$immutablejs.List(values);

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set(0, -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$mori.vector.apply(null, values);

            $$Benchmark$$.time("Mori Vector", function () {
              $$Tuple$$mori.assoc(a, 0, -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.List(values);

            $$Benchmark$$.time("Immutable List", function () {
              a.set(0, -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.Tuple(values);

            $$Benchmark$$.time("Immutable Tuple", function () {
              a.set(0, -50);
            });
          })();
        });


        $$Benchmark$$.group("Setting at random", function () {
          $$Benchmark$$.message("JavaScript Array");

          ;(function () {
            var size = values.length;

            $$Benchmark$$.time("JavaScript Array Copying", function () {
              $$Array$$array_modify(values, $$Tuple$$random(size), function () {
                return -50;
              });
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutablejs.List(values);

            var size = a.size;

            $$Benchmark$$.time("Immutable-js List", function () {
              a.set($$Tuple$$random(size), -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$mori.vector.apply(null, values);

            var size = $$Tuple$$mori.count(a);

            $$Benchmark$$.time("Mori Vector", function () {
              $$Tuple$$mori.assoc(a, $$Tuple$$random(size), -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.List(values);

            var size = a.size();

            $$Benchmark$$.time("Immutable List", function () {
              a.set($$Tuple$$random(size), -50);
            });
          })();

          ;(function () {
            var a = $$Tuple$$immutable.Tuple(values);

            var size = a.size();

            $$Benchmark$$.time("Immutable Tuple", function () {
              a.set($$Tuple$$random(size), -50);
            });
          })();
        });
      });
    }

    var $$src$Benchmark$run$$package = require("../package.json");

    var $$src$Benchmark$run$$dependencies = $$src$Benchmark$run$$package.devDependencies;

    function $$src$Benchmark$run$$header() {
      $$Benchmark$$.group("Information", function () {
        $$Benchmark$$.group("Node.js", function () {
          $$Benchmark$$.message("URL: http://nodejs.org/");
          $$Benchmark$$.message("Version: " + process.version);
        });
        $$Benchmark$$.group("Benchmark.js", function () {
          $$Benchmark$$.message("URL: https://github.com/bestiejs/benchmark.js");
          $$Benchmark$$.message("Version: " + $$src$Benchmark$run$$dependencies.benchmark);
        });
        $$Benchmark$$.group("Immutable-js", function () {
          $$Benchmark$$.message("URL: https://github.com/facebook/immutable-js");
          $$Benchmark$$.message("Version: " + $$src$Benchmark$run$$dependencies.immutable);
        });
        $$Benchmark$$.group("Mori", function () {
          $$Benchmark$$.message("URL: https://github.com/swannodette/mori");
          $$Benchmark$$.message("Version: " + $$src$Benchmark$run$$dependencies.mori);
        });
        $$Benchmark$$.group("Immutable", function () {
          $$Benchmark$$.message("URL: https://github.com/Pauan/Immutable");
          $$Benchmark$$.message("Version: " + $$src$Benchmark$run$$package.version);
        });
        /*benchmark.group("Elm", function () {
          benchmark.message("URL: http://elm-lang.org/");
          benchmark.message("Version: 0.13");
        });*/
      });
    }


    /*header();
    list.run(10);
    list.run(100);
    list.run(1000);*/

    /*header();
    record.run(1);
    record.run(10);
    record.run(100);
    record.run(1000);
    record.run(10000);*/

    /*header();
    queue.run(1);
    queue.run(10);
    queue.run(100);
    queue.run(1000);
    queue.run(10000);*/

    $$src$Benchmark$run$$header();
    $$Tuple$$.run(10);
    $$Tuple$$.run(100);
    $$Tuple$$.run(1000);
    $$Tuple$$.run(10000);

    $$Benchmark$$.run();
}).call(this);

//# sourceMappingURL=Benchmark.js.map