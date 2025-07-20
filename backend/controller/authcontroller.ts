import {Request,Response} from 'express';
import FitgenixUsermodel,{FitgenixUser} from '../models/usermodel';

export const login=async(req:Request,res:Response)=>{
    const{email,password}=req.body;
    try{
        const user=await FitgenixUsermodel.findOne({email});
        if(!user || user.password !== password){
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        else{
            return res.status(200).json({ message: 'Login successful' });
        }
    }catch(err){
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export const register=async(req:Request,res:Response)=>{
    const user=req.body;
    try{
        const existinguser=await FitgenixUsermodel.findOne({email:user.email});
        if(existinguser){
            return res.status(400).json({error:"user.already exists"});

        }
        else{
            const newuser=await FitgenixUsermodel.create(user);
            return res.status(201).json({message:"user created successfully",user:newuser});

            
        }
    }catch(err){
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}