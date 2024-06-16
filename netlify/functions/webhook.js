// /.netlify/functions/webhook
const fetch = require("node-fetch");
const { TELEGRAM_BOT_TOKEN } = process.env;

exports.handler = async (event, context) => {
  console.log("event", event);
  console.log("context", context);
  const bodyAsText = event.body;
  if (!bodyAsText) {
    return {
      statusCode: 400,
      body: "No body provided",
    };
  }

  const body = JSON.parse(bodyAsText);
  const {
    update_id,
    message: {
      message_id,
      from: { id, is_bot, first_name, username, language_code },
      chat: {
        id: chatId,
        first_name: chatFirstName,
        username: chatUsername,
        type: chatType,
      },
      date,
      text,
      entities,
    },
  } = body;

  console.log(body);

  const reply = JSON.stringify(body, null, 2);
  // reply to the user via post request
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply,
    }),
  });

  return {
    statusCode: 200,
    body: "Webhook received",
  };
};
