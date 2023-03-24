export default function clientsSchema(req,res,next){
    const bodyY = req.body;
    const errors = []
    if (!bodyY.name) errors.push("'name' is required");
    if (!bodyY.address) errors.push("'address' is required");
    if (!bodyY.phone) errors.push("'phone' is required");
    if(errors.length > 0) return res.status(400).send(errors);

    next();
}