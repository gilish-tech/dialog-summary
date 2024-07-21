import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"




const BACKEND_URL = "http://localhost:8000/summarize-text/"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}






export const countWords = (text:string)=>{
  return text.trim().split(" ").filter((item)=>{
    if(item !== "" ){
     return item
    }

   })
  
}


export const getSummary =async(text:string)=> {
   console.log("fetecjinh...")
    try{
      const response = await fetch(BACKEND_URL,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({text})

      })
      

      

      return await response.json()
      
    }catch(error){
      throw error
    }
  
}