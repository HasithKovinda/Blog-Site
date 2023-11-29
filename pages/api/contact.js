import { MongoClient } from "mongodb"

export default async function handler(req,res){
    if(req.method==='POST'){
        const {email,name,message} = req.body
        if(!email || !email.includes('@') || !name || !message){
            return res.status(422).json({message:'Invalid input types'})
        }
        let client
        try {
          client= await  MongoClient.connect('mongodb+srv://hasith300:8GzAgYBqbj66YFT4@cluster0.pifnecs.mongodb.net/?retryWrites=true&w=majority')
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Something went wrong'})
        }
        const db=client.db('blog')

        try {
         await db.collection('message').insertOne({email,name,message})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Something went wrong'})
        }
        client.close()
        return res.status(201).json({message:'Message saved successfully'})
    }
}