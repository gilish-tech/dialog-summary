from transformers import BartTokenizer, BartForConditionalGeneration, Trainer, TrainingArguments





def load_model():
    print("loading model")
    model = BartForConditionalGeneration.from_pretrained("model-stuffs/corrector-model/fine_tuned_model")
    tokenizer = BartTokenizer.from_pretrained("model-stuffs/corrector-model/model-tokenizer")
    return model, tokenizer



def summarize(text,model,tokenizer, max_length=130, min_length=30, do_sample=False):
    inputs = tokenizer.encode(text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = model.generate(inputs, max_length=max_length, min_length=min_length, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary






