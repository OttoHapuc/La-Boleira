export default function cakeSchema(req,res,next){
    const bodyY = req.body;
    const errors = []
    if (!bodyY.name) errors.push("'name' is required");
    if (!bodyY.price) errors.push("'price' is required");
    if (!bodyY.image) errors.push("'image' is required");
    if (!bodyY.description) errors.push("'description' is required");

    if(errors.length > 0) return res.status(400).send(errors);

    if (bodyY.name === "") errors.push("'name' cannot be empty");
    if (bodyY.name.length < 2) errors.push("'name' cannot be less than 2 characters");

    if (bodyY.price === "") errors.push("'price' cannot be empty");
    if (typeof bodyY.price == "string") errors.push("'price' is not a string");
    if (!bodyY.price > 0) errors.push("'price' cannot be less than 0");

    if (!/^(ftp|http|https):\/\/[^ "]+$/.test(bodyY.image)) return res.status(422).send("'image' is not a                                          url");

    if (bodyY.description === "") errors.push("'description' cannot be empty");
    

    if (errors.length > 0) return res.status(400).send(errors);

    next()
}