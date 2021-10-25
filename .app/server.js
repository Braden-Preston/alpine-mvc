var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// app/routes/root.coffee
var root_exports = {};
__export(root_exports, {
  default: () => root_default
});
function root_default(app, opts, done) {
  app.get("/", function(req, res) {
    res.type("text/html");
    return res.send(`<html>
  <head>
  <link rel="stylesheet" type="text/css" href="/dist/app.css" />
  <script type="module" src="/dist/app.js"><\/script>
  </head>
  <body>
    <h2>this is an example app</h2>
  </body>
</html>`);
  });
  app.get("/test", function(req, res) {
    return res.send("Test!");
  });
  app.get("/pug", function(req, res) {
    res.type("text/html");
    return res.view("dashboard", {
      cat: "kittens"
    });
  });
  return done();
}
var init_root = __esm({
  "app/routes/root.coffee"() {
  }
});

// app/controllers/customer.coffee
var require_customer = __commonJS({
  "app/controllers/customer.coffee"(exports, module2) {
    (function() {
      module2.exports = {
        index: function(req, res) {
          return res.send("Get all customers");
        },
        show: function(req, res) {
          return res.send("Get customer " + req.params.id);
        },
        edit: function(req, res) {
          return res.send("Edit customer " + req.params.id);
        },
        new: function(req, res) {
          return res.send("New customer");
        },
        create: function(req, res) {
          console.log(req.body);
          return res.send("Created customer");
        },
        update: function(req, res) {
          console.log(req.body);
          return res.send("Updated customer " + req.params.id);
        },
        delete: function(req, res) {
          return res.send("Deleted customer " + req.params.id);
        }
      };
    }).call(exports);
  }
});

// app/routes/customer.coffee
var customer_exports = {};
__export(customer_exports, {
  default: () => customer_default
});
function customer_default(app, opts, next) {
  app.get("/", customer.index);
  app.get("/:id", customer.show);
  app.get("/:id/edit", customer.edit);
  app.get("/new", customer.new);
  app.post("/", customer.create);
  app.patch("/:id", customer.update);
  app.delete("/:id", customer.delete);
  return next();
}
var customer;
var init_customer = __esm({
  "app/routes/customer.coffee"() {
    customer = require_customer();
  }
});

// app/routes/index.coffee
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
function routes_default(app, opts, done) {
  app.register(root, {
    prefix: "/"
  });
  app.register(customer2, {
    prefix: "/customers"
  });
  return done();
}
var customer2, root;
var init_routes = __esm({
  "app/routes/index.coffee"() {
    root = (init_root(), root_exports);
    customer2 = (init_customer(), customer_exports);
  }
});

// app/server.coffee
__export(exports, {
  default: () => server_default
});
var chalk;
var fs;
var killport;
var middie;
var path;
var publicPath;
var serverPath;
fs = require("fs");
path = require("path");
chalk = require("chalk");
middie = require("middie");
killport = require("kill-port");
serverPath = path.join(__dirname, "../.app");
publicPath = path.join(__dirname, "../.app/public");
async function server_default(app, opts, done) {
  await app.register(require("middie"));
  app.use(require("connect-livereload")());
  app.use(require("cors")());
  app.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
    prefix: "/"
  });
  app.register(require("fastify-static"), {
    root: path.join(__dirname, "dist"),
    decorateReply: false,
    prefix: "/dist/"
  });
  app.register(require("point-of-view"), {
    root: path.join(__dirname, "views"),
    engine: {
      pug: require("pug")
    }
  });
  return app.register((init_routes(), routes_exports));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
