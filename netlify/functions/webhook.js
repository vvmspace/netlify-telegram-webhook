// /.netlify/functions/webhook

exports.handler = async (event, context) => {
    console.log('event', event);
    console.log('context', context);

    return {
        statusCode: 200,
        body: JSON.stringify({ event, context}, null, 2)
    };
}
    