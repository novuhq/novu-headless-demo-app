import { Novu } from '@novu/node';
// import {createHmac} from "crypto";

export const notification = async (description) => {

    const novu = new Novu('a05b241e266bc4f8cfca3dcba6f4e623');

    // const hmacHash = createHmac('sha256','a05b241e266bc4f8cfca3dcba6f4e623' ).update("555").digest('hex');

    // console.log(hmacHash);


    await novu.subscribers.identify('12345', {
        firstName: 'newSubForHeadless',
    });


    await novu.trigger('headless-demo', {
        to: {
        subscriberId: '12345'
        },
        payload: {
        description: description
        }
    });

}
