# ConciseGen

**ConciseGen** is a next-gen AI-powered text summarization web app, designed to take your long text inputs and turn them into concise, digestible summaries with ease. Built with a combination of Next.js, Tailwind CSS, FastAPI, and Hugging Face’s `distilbart-cnn-12-6` model, ConciseGen is optimized for performance, usability, and a seamless user experience. 

> **Made by Sreeraj V Rajesh**

---

## 🌟 Features

- **Summarize Text in Seconds**: Enter text and get an immediate, readable summary.
- **Adjustable Summary Length**: Control max and min word count with an interactive slider.
- **Sleek, Modern UI**: Built with Tailwind CSS, React, and Next.js.
- **Visitor Tracking**: Built-in tracking system to monitor API usage.
- **Expandable Backend**: Easily swap out models, and configure for advanced NLP tasks.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**: Framework for React applications with server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for crafting responsive and customizable UIs.
- **Heroicons** and **Headless UI**: Accessible components and icons to elevate the design.
- **React Hook Form**: Intuitive form handling and validation.
- **PDF.js** and **Mammoth**: PDF and .docx file handling for future expansion.

### Backend
- **FastAPI**: High-performance web framework for building RESTful APIs.
- **Transformers** and **PyTorch**: Hugging Face’s transformer models and PyTorch framework for natural language processing.
- **dotenv**: Secure environment configuration.
- **Uvicorn**: ASGI server for running FastAPI applications.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** and **npm** for frontend dependencies.
- **Python 3.8+** for backend services.
- **Hugging Face API Key**: Required for accessing the summarization model. Obtain it [here](https://huggingface.co/settings/tokens).

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/cyberkutti/concisegen.git
cd concisegen
```

#### 2. Environment Setup

Create a `.env` file for backend configurations and copy the following template:

```plaintext
# .env
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

#### 3. Install Frontend Dependencies

```bash
# Navigate to the frontend directory
cd frontend
npm install
```

#### 4. Install Backend Dependencies

```bash
# Navigate to the backend directory
cd backend
pip install -r requirements.txt
```

### Running the Application

#### Backend (API Server)

```bash
# Start the FastAPI server
uvicorn main:app --reload
```

The backend API will start at `http://127.0.0.1:8000`.

#### Frontend (Next.js App)

In another terminal, run the frontend application:

```bash
# Start the Next.js development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## 📝 API Endpoints

### **POST** `/summarize/`

Summarize text content. Accepts JSON payload with `text`, `min_words`, and `max_words` fields.

- **Body**: 
  ```json
  {
    "text": "Your text here.",
    "min_words": 30,
    "max_words": 130
  }
  ```

- **Response**: 
  ```json
  {
    "summary": "Summarized content here.",
    "visitor_count": 42
  }
  ```

---

## 🖥️ Project Structure

```
.
├── backend
│   ├── main.py                # FastAPI server and routes
│   ├── requirements.txt       # Backend dependencies
│   └── visitor_count.json     # JSON file for tracking visitor count
│
├── frontend
│   ├── components             # Reusable UI components
│   ├── pages                  # Next.js pages
│   ├── styles                 # Tailwind CSS configuration
│   └── public                 # Static assets
│
└── README.md                  # Project documentation
```

---

## 📦 Dependencies

### Backend
- FastAPI
- PyTorch
- Transformers (Hugging Face)
- Uvicorn
- dotenv

### Frontend
- Next.js
- Tailwind CSS
- Heroicons
- Headless UI
- React Hook Form
- React Hot Toast

---

## 🧪 Testing

You can test the summarization endpoint using `curl`:

```bash
curl -X POST "http://127.0.0.1:8000/summarize/" \
-H "Content-Type: application/json" \
-d '{"text": "Your lengthy text here."}'
```

---

## 💡 Future Enhancements

- **File Uploads**: Summarize PDFs and .docx files directly.
- **Multi-language Support**: Add summarization for various languages.
- **Improved UI Elements**: More interactive features and animations.
- **User Authentication**: Limit API access and enable user preferences.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

For any inquiries or support, please reach out to **Sreeraj V Rajesh**.

Enjoy using **ConciseGen** to simplify and elevate your text! ✨