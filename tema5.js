Mesosphere({
  // constrangeri pentru formular
    name: 'newMessage',
    method: 'newM',
    fields: {
        email: {
            required: true,
            format: 'email',
            message: 'Please enter a valid email address'
        },
        name: {
          required: true
        },
        message: {
          required: true,
          rules: { maxLength: 100 },
          message: 'Max message length is 100'
        }
    }

});

// defineste colectia Messages ce va fi utilizata pentru stocarea de mesaje
Messages = new Meteor.Collection("messages");

Meteor.methods({
 newM: function (rawData) {
  //  Validare form
   Mesosphere.newMessage.validate(rawData, function(errors, formData){
       if(!errors){
        //  salveaza datele daca nu sunt erori
           name = formData.name;
           email = formData.email;
           comment = formData.message;

           message = Messages.insert({name: name, email: email, comment: comment});

           return message;
       }else{
        //  afiseaza mesajele de eroare pentru constrangerile care nu sunt respectate
           _(errors).each( function( value, key ) {
             console.log(key+": "+value.message);
           });
       }
   });
 }
});

if (Meteor.isClient) {
  // Lista de mesaje
  Template.tema5.messages = function() {
    return Messages.find({});
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Daca nu e niciun mesaj introduce cateva de demo
    if (Messages.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];

      var comments = ["hello",
                      "Wazzup",
                      "Comment",
                      "First comment ;)",
                      "Another one",
                      "Hello All ;)"]

      var emails = ["me@me.me",
                    "my@ema.il",
                    "e@ma.il",
                    "carl@mail.ro",
                    "hi@the.re",
                    "test@ing.it"]

      for (var i = 0; i < names.length; i++)
        Messages.insert({name: names[i], email: emails[i], comment: comments[i]});
    }
  });
}
