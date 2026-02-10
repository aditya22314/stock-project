'use server'

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async(formData:SignUpFormData)=>{
    
    try {
        const response = await auth.api.signUpEmail({
            body:{
                name:formData.fullName,
                email:formData.email,
                password:formData.password,
            }
        })
        if(response){
        await inngest.send({
            name:"app/user.created",
            data:{
                email:formData.email,
                name:formData.fullName,
                country:formData.country,
                investmentGoals:formData.investmentGoals,
                riskTolerance:formData.riskTolerance,
                preferredIndustry:formData.preferredIndustry,
            }
        })
        }
    return {success:true,message:"User created successfully"} 

    }
    catch(error){
        console.error("Error in sign up with email",error);
        throw error;
    }
}
export const signInWithEmail    = async(formData:SignInFormData)=>{
    
    try {
        const response = await auth.api.signInEmail({
            body:{
                email:formData.email,
                password:formData.password,
            }
        })
       
    return {success:true,message:"User signed in successfully"} 

    }
    catch(error){
        console.error("Error in sign in with email",error);
        throw error;
    }
}


export const signOut = async()=>{
    try {
        await auth.api.signOut({
            headers: await headers()
        })
    }
    catch(error){
        console.error("Error in sign out",error);
        throw error;
    }
}