var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("GoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("should ask for a password", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:start',
                        reply: [
                            'Please enter the password',
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user enters the correct password", function() {
            it("should accept input as 'password'", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('password')
                    .check.interaction({
                        state: 'states:nameprompt',
                        reply: [
                            'Please enter part of name'
                        ].join('\n')
                    })
                    .run();
            });
        });


        describe("when the user enters a name", function() {
            it("should return phonebook entry if exists'", function() {
                return tester
                    .setup.user.state('states:nameprompt')
                    .input('jonathan')
                    .check.interaction({
                        state: 'states:nameprompt',
                        reply: [
                            'Jonathan: 0731230000'
                        ].join('\n')
                    })
                    .run();
            });
        });


        describe("when the user enters the incorrect password", function() {
            it("should not accept input as 'password1'", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('password1')
                    .check.interaction({
                        state: 'states:start',
                        reply: [
                            'Wrong Password, try again'
                        ].join('\n')
                    })
                    .run();
            });
        });

    });
});
