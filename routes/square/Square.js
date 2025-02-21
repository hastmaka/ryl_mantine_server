const { paymentsApi, locationsApi } = require('../../util/square-client');
const { createIdempotencyKey } = require('../../util/createIdempotencyKey');
const {calculateTotalCharge} = require("../../helper/calculateRate");
const {sendEmail} = require("../../helper/nodeMailer");

module.exports = {
    processPayment: async (req, res) => {
        let token = req.body.token,
            idempotencyKey = await createIdempotencyKey(),
            formData = req.body.formData;

        try {
            let isAirportPickup = formData.serviceName === 'AIRPORT PICK UP',
                amount = calculateTotalCharge(
                    formData.howManyHoursOfService,
                    isAirportPickup,
                    formData.roundTrip
                );
            // debugger
            formData.totalCharge = amount
            const { result: { payment } } = await paymentsApi.createPayment({
                idempotencyKey,
                sourceId: token,
                amountMoney: {
                    amount, // $1.00 charge
                    currency: 'USD'
                },
                acceptPartialAuthorization: false
            });
            debugger
            if (payment.status === 'COMPLETED') {
                let {howManyHoursOfService, totalCharge, serviceName, roundTrip, ...rest} = formData,
                    staticData = {
                        howManyHoursOfService: howManyHoursOfService,
                        email: formData.email,
                        serviceName: formData.serviceName,
                        totalCharge,
                        roundTrip,
                        reservationId: payment.orderId
                    };

                //send email to client
                await sendEmail({
                    from: '"Payment Confirmation" <support@jaylimovegas.com>',
                    to: formData.email,
                    subject: `Payment Confirmation`,
                    emailTemplate: 'paymentReceipt',
                    data: {
                        formData: rest,
                        staticData
                    }
                })

                //send email to admin
                await sendEmail({
                    from: '"Service Request" <support@jaylimovegas.com>',
                    to: 'jaylimovegas@gmail.com',
                    subject: serviceName,
                    emailTemplate: 'serviceRequest',
                    data: {
                        formData: rest,
                        staticData
                    }
                })

                res.json({success: true})
            }

            //only way to parse this result
            // const result = JSON.stringify(payment, (key, value) => {
            //     return typeof value === "bigint" ? parseInt(value) : value;
            // }, 4);
            //
            // res.json(JSON.parse(result));

        } catch (error) {
            res.json({success: false, error})
        }
    },

    processPaymentReal: async (req, res) => {
        let token = req.body.token,
            idempotencyKey = await createIdempotencyKey();

        try {

            const { result: { payment } } = await paymentsApi.createPayment({
                idempotencyKey,
                sourceId: token,
                amountMoney: {
                    amount: 100, // $1.00 charge
                    currency: 'USD'
                },
                acceptPartialAuthorization: false
            });

            if (payment.status === 'COMPLETED') {
                console.log('payment completed')
                res.json({success: true})
            }
        } catch (error) {
            res.json({success: false, error})
        }
    },

    listLocations: async (req, res) => {
        try {
            const response = await locationsApi.listLocations();
            console.log(response.result);
            res.json(response.result)
        } catch(error) {
            console.log(error);
        }
    },

    // paymentCompleted: async (req, res) => {
    //     // debugger
    //     //send email to client
    //     let {howManyHoursOfService, serviceName, totalCharge, roundTrip, ...rest} = formData,
    //         staticData = {howManyHoursOfService, email: formData.email, serviceName, totalCharge, roundTrip, reservationId: 'dynamic-reservation-id'};
    //
    //     // res.send(paymentReceipt(rest, staticData))
    //
    //     await sendEmail({
    //         from: '"Payment Confirmation" <support@jaylimovegas.com>',
    //         to: formData.email,
    //         subject: `Payment Confirmation`,
    //         emailTemplate: 'paymentReceipt',
    //         data: {
    //             formData: rest,
    //             staticData
    //         }
    //     })
    //
    //     //send email to admin
    //     await sendEmail({
    //         from: '"Service Request" <support@jaylimovegas.com>',
    //         to: 'jaylimovegas@gmail.com',
    //         subject: `Service Request`,
    //         emailTemplate: 'serviceRequest',
    //         data: {
    //             formData: rest,
    //             staticData
    //         }
    //     })
    //
    //     // Acknowledge receipt of the webhook
    //     res.status(200).json({ message: 'Webhook received successfully' });
    // }
}