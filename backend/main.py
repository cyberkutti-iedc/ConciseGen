from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
from dotenv import load_dotenv
import os
import json

# Load environment variables from .env file
load_dotenv()

# Access the Hugging Face API key
hf_api_key = os.getenv("HUGGINGFACE_API_KEY")
if not hf_api_key:
    raise ValueError("HUGGINGFACE_API_KEY is not set in the .env file")

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")


# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this to your Next.js app's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define the request body structure
class Article(BaseModel):
    text: str
    min_length: int  # Minimum length for the summary
    max_length: int  # Maximum length for the summary

# Helper function to read and increment the visitor count
def increment_visitor_count():
    try:
        # Read the current visitor count from the JSON file
        with open("visitor_count.json", "r") as file:
            data = json.load(file)
        
        # Increment the visit count
        data["visit_count"] += 1

        # Write the updated count back to the JSON file
        with open("visitor_count.json", "w") as file:
            json.dump(data, file)

        # Return the updated visit count
        return data["visit_count"]
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update visitor count")

@app.post("/summarize/")
async def summarize_article(article: Article):
    try:
        # Update the visitor count
        visit_count = increment_visitor_count()

        # Perform summarization with user-defined min and max length
        summary = summarizer(
            article.text,
            max_length=article.max_length,
            min_length=article.min_length,
            do_sample=False
        )

        # Return the summary along with the visitor count
        return {
            "summary": summary[0]['summary_text'],
            "visitor_count": visit_count
        }
    except Exception as e:
        print(f"Error during summarization: {str(e)}")  # Log the error
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
