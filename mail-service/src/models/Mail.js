// Dummy Mail model (no external third-party mail service)
class Mail {
    constructor({ to, subject, orderId, totalAmount, items, body, receivedAt }) {
        this.id = `mail_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        this.to = to;
        this.subject = subject;
        this.orderId = orderId;
        this.totalAmount = totalAmount;
        this.items = items || [];
        this.body = body;
        this.receivedAt = receivedAt || new Date().toISOString();
    }
}

module.exports = Mail;
