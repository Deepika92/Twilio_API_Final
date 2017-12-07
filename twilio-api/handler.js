const twilioAccountSid = Your Twilio Account SID;
const twilioAuthToken = Your Twilio Auth Token;
const twilioPhoneNumber = Your Twilio Phone Number;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

module.exports.postprocess = (event, context, callback) => {
  const msg = {
    to: "Your Number",
    body: "Your new image has been uploaded to your s3 bucket.",
    from: twilioPhoneNumber,
  };
  twilioClient.messages.create(msg, (error, data) => {
    if (error) {
      const errResponse = {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        statusCode: error.status,
        body: JSON.stringify({
          message: error.message,
          error: error
        }),
      };
      return callback(null, errResponse);
    }

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Message Sent',
        data: data
      }),
    };

    callback(null, response);
  });
};