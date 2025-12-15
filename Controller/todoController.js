import todoCollection from "../Model/todoModel.js";

//store todo data  post
export const addTodo = async (req, res) => {
    try {
        const data = new todoCollection(req.body);
        await data.save()
        res.status(201).json({ mess: "Data has been stored" })
    } catch (err) {
        res.status(400).json({ message: err })
    }

}

//get
export const getTodo = async (req,res) => {
    try{
        const data = await todoCollection.find();
        res.json(data)
    }catch(err){
        res.status(500).json({message: err})
    }
}

//put
export const updateTodo = async (req,res) => {
    try{
        const data = await todoCollection.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(data)
    }catch(err){
        res.status(400).json({message: err})
    }
}

//delete
export const deleteTodo = async(req,res) => {
    try{
        await todoCollection.findByIdAndDelete(req.params.id)
        res.json({message:"todo has been deleted"})
    }catch(err){
        res.status(500).json({message: err})
    }
}

 