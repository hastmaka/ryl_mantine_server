const {sendEmail} = require("../../helper/nodeMailer");
const {calculateTotalCharge} = require("../../helper/calculateRate");
const {paymentReceipt, serviceHtml} = require("../../emailTemplate");
module.exports = {
    testEmailTemplate: async (req, res) => {
        let {formData} = req.body,
            isAirportPickup = formData.serviceName === 'AIRPORT PICK UP';
        formData.totalCharge = calculateTotalCharge(formData.howManyHoursOfService, isAirportPickup)

        let {howManyHoursOfService, email, serviceName, totalCharge, roundTrip, ...rest} = formData,
            {datePickUpReturn, howManyReturn, pickUpLocation, ...restD} = rest,
            returnData = {pickUpLocation, howManyReturn, datePickUpReturn},
            staticData = {howManyHoursOfService, email, serviceName, totalCharge, roundTrip, reservationId: 'dynamic-reservation-id'}

        res.send(paymentReceipt({formData: rest, staticData}))

        // await sendEmail({
        //     from: '"Payment Confirmation" <support@jaylimovegas.com>',
        //     to: formData.email,
        //     subject: `Payment Confirmation`,
        //     emailTemplate: 'paymentReceipt',
        //     data: {
        //         formData: rest,
        //         staticData
        //     }
        // })

        // res.send(serviceHtml(restD, roundTrip, returnData))
    },

    serviceRequest: async (req, res) => {debugger

        // setTimeout(() => {
        //     res.json({success: true})
        // }, 2000)

        await sendEmail({
            from: '"Service Request" <admin@bllnotaryservices.com>',
            to: 'luislopezbarbarita@gmail.com',
            subject: `Service Request`,
            emailTemplate: 'serviceRequest',
            data: req.body
        })

        res.json({success: true})

    },

    contactUs: async (req, res) => {
        debugger
        console.log(req.body)
    },
}