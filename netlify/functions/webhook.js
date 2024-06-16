// /.netlify/functions/webhook
const { TELEGRAM_BOT_TOKEN } = process.env;

exports.handler = async (event, context) => {
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
  console.log("url", url);
    console.log("reply", reply);
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: reply,
    }),
  });

  console.log("result", result);

  return {
    statusCode: 200,
    body: "Webhook received",
  };
};
