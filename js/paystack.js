// Replace with your real Paystack public key later
const PAYSTACK_PUBLIC_KEY = "pk_test_69b849e511834009fbc0f99347c80e6fe67d1709"; // Get from Paystack dashboard

function payWithPaystack(amount, category) {
  const user = JSON.parse(localStorage.getItem('currentUser')) || { email: "client@twinx.com" };

  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: user.email,
    amount: amount,           // in pesewas (GHS 1000 = 100000)
    currency: "GHS",
    ref: "TXN_" + Math.floor(Math.random() * 1000000000),
    callback: function(response) {
      alert("🎉 Payment successful! Reference: " + response.reference);
      
      // Save booking
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push({
        client: user.email,
        category: category,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
        reference: response.reference
      });
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      alert("Booking recorded! Admin will contact you shortly.");
    },
    onClose: function() {
      alert("Transaction cancelled.");
    }
  });

  handler.openIframe();
}