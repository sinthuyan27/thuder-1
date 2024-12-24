import express, { query } from 'express';
import pool from '../repostory/database';
import { promises } from 'dns';




//get user
export const getUser = async (req:any, res:any):Promise<void> => {
    try{
        const result = await pool.query(`SELECT * From user`);
        res.json(result.rows)
    } 

    catch(err){
        console.log('error found');
        res.status.json('server Error')
    }
}

// //post user // create user

// export const createUser = async (req:any,res:any):promise<void> => {
//     const {!name ||!Age ||!Email ||!}


export const creatUser =  async (req: any, res: any): Promise<void> => {
    const { username, email } = req.body;  
      if (!username || !email) {

         res.status(400).json({ error: 'All fields (name, brand, model, year) are required.' })
         return;
    } 
       const query = `
        INSERT INTO users (username, email)
        VALUES ($1, $2)
        RETURNING *;`;

    const values: [string, string ] = [username, email];  
      try {
        console.log('Query:', query);
        console.log('Values:', values);       
         const result = await pool.query(query, values);
        res.status(201).json({ message: 'user added successfully', car: result.rows[0] });
    } 
    catch (err) {
        console.error('Database Insert Error:', (err as Error).message);
        res.status(500).json({ error: 'Failed to add the user. Please try again later.' });
    }
}


//edit user
export const editUser= async(req:any,res:any):Promise<void> =>{
    const {id}= req.parms
    const  {username,email} =req.body
    if( !id || (!username && email))
    {
        res.status(400).json({
            error:'error'
        })
    }

    try{
        const update:string[]=[]
        const value:(string |number)[]=[]

        if(username) update.push(`username = $${update.length+1}`),value.push(username)
            if(email) update.push(`email = $${update.length+1}`),value.push(email)
                value.push(id)

        const query=`
        UPDATE user SET ${update.join(', ')}
        WHERE id = $${value.length}
        RETURNING * ; `;

        const result=await pool.query(query,value);
         if(result.rowCount===0 ){req.status(400).json({error:"user not found"})} 
         res.status(200).json({message:"user create succesfully",user:result.rows[0]})
    }


    catch (err){
        console.error("error")
        res.status(500).json({error:"failed"})
        
    }

}