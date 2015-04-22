Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster@sandbox7b70565ea5e14eef884fb96ff8cceea5.mailgun.org:a387f8b2975ce2ce3f94bf15f282f258@smtp.mailgun.org:587';
});

Meteor.methods({
  sendEmail: function (to, from, subject, html) {
    if(from == ""){
      //from = "administrador@clubconejitas.cl";
      from = orion.dictionary.get('adminEmail', 'joaquin.diaz@ies.cl');
    }
    check([to, from, subject, html], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: html
    });
  }
});
