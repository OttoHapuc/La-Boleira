export default function ordersSchema(req,res,next){
    const bodyY = req.body;
    const errors = []
    if (!bodyY.clientId) errors.push("'clientId' is required");
    if (!bodyY.cakeId) errors.push("'cakeId' is required");
    if (!bodyY.quantity) errors.push("'quantity' is required");
    if (!bodyY.totalPrice) errors.push("'totalPrice' is required");

    if(errors.length > 0) return res.status(400).send(errors);

    next();
}