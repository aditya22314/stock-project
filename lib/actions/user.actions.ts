"use server"

import { connectToDatabase } from "@/database/mongoose";

export const getAllUsersForNewsEmail = async()=>{
    try {
        const mongoose = await connectToDatabase(); 

        const db = mongoose.connection.db;
        if(!db){
            throw new Error("Database connection not found");
        }
        const users = await db.collection("user").find({
            email:{
                $ne:null,
                $exists:true
            }
        },{
            projection:{
                email:1,
                name:1,
               id:1,
               _id:1
            }
        }).toArray();
        return users.filter(user=>user.email && user.name).map((user)=>({
            id:user.id || user._id?.toString() || "",
            email:user.email,
            name:user.name,
        }));
    } catch (error) {
        
        console.error("Error in getting all users for news email",error);
        throw error;
        return []
    }
}