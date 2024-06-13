// /.netlify/functions/webhook

exports.handler = async (event, context) => {
    const { body } = event;
    const { payload } = JSON.parse(body);
    
    console.log('payload', payload);
    console.log('event', event);
    console.log('context', context);

    return {
        statusCode: 200,
        body: JSON.stringify({ event, context}, null, 2)
    };
}
    