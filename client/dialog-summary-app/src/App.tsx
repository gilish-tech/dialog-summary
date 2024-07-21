import { useEffect, useState } from 'react'
import { Textarea } from './components/ui/textarea'
import {countWords,getSummary} from "./lib/utils"
import { useMutation } from '@tanstack/react-query'


function App() {
   const [rawText, setRawtext] = useState("")

   const [wordRawTextCount, setWordRawTextCount] = useState(0)
   const [summarizeTextCount, setSummarizeTextCount] = useState(0)
   


   const {data,error,isPending,mutateAsync} = useMutation({
    mutationFn: async() => await getSummary(rawText)
   })


   const handleClick = async()=>{
       await mutateAsync()
       console.log("ask",data)

   }



   useEffect(()=>{
    const preprocessedText = countWords(rawText)
    setWordRawTextCount(preprocessedText.length)
   },[rawText])

 
   useEffect(()=>{
    const preprocessedText = countWords(data ? data["data"] : "")
    setSummarizeTextCount(preprocessedText.length)

    console.log("dataoooo",data)
   },[data])
 

  return (
    <div className='bg-black/85 min-h-screen w-full py-4 px-2 '>
        <div className=" flex flex-col justify-center items-center w-auto gap-2">
          <h1 className="text-4xl text-white text-center font-medium w-full">Dialogue Summarizer</h1>
          <div className="w-[90px] h-1 bg-purple-500"></div>
        </div>

          <div className="grid grid-cols-1 gap-5 my-10 px-4  md:grid-cols-2">

            <div className="w-full ">
                <h1 className='text-2xl text-purple-400 '>Summarizer</h1>
                <Textarea value={rawText} onChange={(e)=>setRawtext(e.target.value)}/>
                <h1 className='text-white'>WordCount: {wordRawTextCount}</h1>
            </div>

            <div className="w-full">
                <h1 className='text-2xl text-purple-400 '>Summarized Text</h1>
                
                <Textarea value={data?.data} />
                <h1 className='text-white'>WordCount: {summarizeTextCount}</h1>
            </div>
              
          </div>
           <div className="w-full flex justify-center">
              <button disabled={isPending || countWords(rawText).join().length < 200  } className='flex justify-center itew-20px bg-purple-500 py-3 px-6 rounded-[50px] text-white hover:bg-purple-600 disabled:bg-gray-600'
              onClick={handleClick }>Summarize text</button>
           </div>

           <p className="text-exl text-red-300">{error ? error.message : "l"}</p>



           
           
      
        
    </div>
  )
}

export default App
