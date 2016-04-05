(function () {
    'use strict';

    angular
        .module('app')
        .run(setupFakeBackend);

    // setup fake backend for backend-less development
    function setupFakeBackend($httpBackend) {
        var testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

        // fake authenticate api end point
        $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
            // get parameters from post request
            var params = angular.fromJson(data);

            // check user credentials and return fake jwt token if valid
            if (params.username === testUser.username && params.password === testUser.password) {
                return [200, { token: 'fake-jwt-token' }, {}];
            } else {
                return [200, {}, {}];
            }
        });

        // pass through any urls not handled above so static files are served correctly
        $httpBackend.whenGET(/^\w+.*/).passThrough();
    }
})();