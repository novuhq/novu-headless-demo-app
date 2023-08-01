import { Novu } from '@novu/node';

export const notification = async (description) => {
    const novu = new Novu(process.env.NOVU_API_KEY);
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
