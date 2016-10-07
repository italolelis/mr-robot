import {IncomingWebhook} from '@slack/client'

const createIncomeWebhook = () => {
    return new IncomingWebhook(process.env.SLACK_WEBHOOK, {
        username: process.env.APP_NAME,
        iconEmoji: process.env.APP_ICON,
        channel: process.env.SLACK_CHANNEL
    });
}

export const sendMessage = (msg) => {
    console.log("Sending message to slack");
    const wh = createIncomeWebhook();
    wh.send(msg, function onSendEnd() {
        console.log('Message sent');
    });
}
