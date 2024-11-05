---

# ConciseGen - AI Text Summarization API Backend

ConciseGen's backend is a high-performance API service that uses state-of-the-art NLP models to generate concise summaries of text content. Built with FastAPI and powered by Hugging Face's transformer models, this backend service is designed for integration into any frontend application requiring summarization capabilities.

## Features

- **Text Summarization**: Converts long text into a short, readable summary.
- **Configurable Summary Length**: Allows frontend control over max and min words.
- **Visitor Count Tracking**: Tracks API usage with a JSON-based counter.
- **API-ready**: Optimized for seamless integration with frontend interfaces.

## Tech Stack

- **FastAPI**: High-performance, Python-based web framework for API development.
- **Transformers (Hugging Face)**: Leverages Hugging Face's pre-trained transformer models for summarization.
- **PyTorch**: Underlying framework for running NLP models efficiently.
- **Environment Configurations**: `.env` file to manage sensitive keys (e.g., Hugging Face API key).

## Getting Started

### Prerequisites

- **Python 3.8+**
- **Hugging Face API Key**: Required for accessing the summarization model. Obtain it [here](https://huggingface.co/settings/tokens).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cyberkutti-iedc/concisegen.git
   cd backend
   ```

2. **Set up environment variables**: Create a `.env` file based on `.env.example`:
   ```plaintext
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the API server**:
   ```bash
   uvicorn main:app --reload
   ```

   The server will start on `http://127.0.0.1:8000`.

### API Endpoints

- **POST** `/summarize/`: Accepts raw text and returns a summarized version.
  - **Body**: JSON with `text` field.
  - **Response**: JSON with `summary` field.

### Example Request

```bash
curl -X POST "http://127.0.0.1:8000/summarize/" -H "Content-Type: application/json" -d '{"text": "Your text here."}'
```

## File Structure

```plaintext
.
├── main.py                 # Core FastAPI server setup
├── requirements.txt        # Backend dependencies
├── .env.example            # Environment variable example
├── visitor_count.json      # JSON file for visitor count tracking
└── README.md               # Documentation
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

---
