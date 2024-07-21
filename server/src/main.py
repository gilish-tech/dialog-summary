from fastapi import FastAPI
from pydantic import BaseModel,field_validator
from fastapi.middleware.cors import CORSMiddleware

from utils import load_model,summarize


# model,tokenizer = load_model()

origins = [
    "http://localhost:5173",
   
]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    global model, tokenizer
    model, tokenizer = load_model()


class PostData(BaseModel):
    text: str

    @field_validator('text')
    def check_text_length(cls, value):
        if len(value) == 300:
            raise Exception("Text length must not exceed 300 characters.")
        return value





@app.post("/summarize-text/")
async def submit_text(request:PostData):
    sum_text = summarize(request.text,model,tokenizer)
    print(sum_text)
    

    return {"data":sum_text}
   