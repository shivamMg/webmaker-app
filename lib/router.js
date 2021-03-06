var page = require('page');
var model = require('./model')();

module.exports = function (app) {
    // Track history for session restoration
    page(function (e, next) {
        if (!model._ready) return next();
        model.data.session.path = e.path;
        next();
    });

    page('/sign-in', function () {
        app.$data.isReady = true;
        app.currentView = 'sign-in';
    });

    page('/discover', function () {
        app.$data.isReady = true;
        app.currentView = 'discover';
    });

    page('/templates', function () {
        app.$data.isReady = true;
        app.currentView = 'templates';
    });

    page('/profile', function () {
        app.currentView = 'profile';
    });

    // Interior
    page('/make/:id', function (e) {
        app.currentView = 'make';
        app.params = e.params;
    });
    page('/make/:id/:mode', function (e) {
        if (['add', 'share', 'detail'].indexOf(e.params.mode) === -1) {
            app.currentView = 'error';
            app.params = {code: 404};
            return;
        }
        app.currentView = e.params.mode;
        app.params = e.params;
    });

    page('/template/:id/detail', function (e) {
        app.currentView = 'detail';
        app.params = e.params;
        app.params.template = true;
    });

    page('/make/:id/block/:index', function (e) {
        app.currentView = 'block';
        app.params = e.params;
    });

    // Temp -- probably will be something else
    page('/make/:id/block/:index/color-picker', function (e) {
        app.currentView = 'color-picker';
        app.params = e.params;
    });

    // Configuration
    page('*', function () {
        app.currentView = 'error';
        app.params = {code: 404};
    });

    // Init
    setTimeout(function () {
        page({
            click: true,
            popstate: true
        });
    }, 250);
};
