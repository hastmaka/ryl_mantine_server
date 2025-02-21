module.exports = {
    calculateTotalCharge(hours, isAirportPickup, isRoundTrip) {
        let hourlyRate = 125, // $100 per hour
            roundTripRate = 135, // $100 per hour
            gasFeePerHour = 6, // $6 per hour
            airportPickupFee = 10, // $10 flat fee for airport pickup
            taxRate = 0.0824; // 8.24% Nevada tax rate

        // Calculate the total charge in dollars before tax
        let totalCharge = (hourlyRate + gasFeePerHour) * +hours;

        // Add the airport pickup fee if applicable
        if (isAirportPickup) {
            totalCharge += airportPickupFee;
        }

        // Calculate tax
        const taxAmount = totalCharge * taxRate;

        // Total charge including tax
        const totalChargeWithTax = totalCharge + taxAmount + (isRoundTrip ? roundTripRate : 0);

        // Convert the total charge to the amount required by Square (cents)
        return Math.round(totalChargeWithTax * 100); // Convert dollars to cents
    }
}