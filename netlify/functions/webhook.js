// /.netlify/functions/webhook

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

  // reply to the user
    const response = {
        method: "sendMessage",
        chat_id: chatId,
        text: `Hello, ${chatFirstName}!`,
    };

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ event, context }, null, 2),
//   };
};
