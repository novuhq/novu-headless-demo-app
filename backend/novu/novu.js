import { Novu } from '@novu/node';

export const notification = async (description) => {
    const novu = new Novu(process.env.NOVU_API_KEY);

    // const hmacHash = createHmac('sha256','a05b241e266bc4f8cfca3dcba6f4e623' ).update("555").digest('hex');

    // console.log(hmacHash);


    await novu.subscribers.identify(process.env.SUSBSCRIBER_ID, {
        firstName: 'newSubForHeadless',
    });


    await novu.trigger('headless-demo', {
        to: {
            subscriberId: process.env.SUSBSCRIBER_ID
        },
        payload: {
            description: description
        }
    });

}
