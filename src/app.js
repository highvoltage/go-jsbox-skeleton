go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
//    var Choice = vumigo.states.Choice;
//    var ChoiceState = vumigo.states.ChoiceState;
    var FreeText = vumigo.states.FreeText;
    var EndState = vumigo.states.EndState;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:start');

        self.states.add('states:start', function(name) {
            return new FreeText(name, {
                question: 'Please enter the password',
                next: 'states:nameprompt',
                check: function(content) {
                    if (content === 'password') {
                        return;
                    }
                    return "Wrong Password, try again";
                }
            });
        });

        self.states.add('states:nameprompt', function(name) {
             return new FreeText(name, {
                 question: 'Please enter part of name',
                 next: 'states:end',
                 check: function(content) {
                     if (content === "jonathan") {
                          return "Jonathan: 0731230000";
                     }
                     return "No such user found";
                 }
             });
        });

        self.states.add('states:end', function(name) {
            return new EndState(name, {
                text: 'Thanks, cheers!',
                next: 'states:start'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
