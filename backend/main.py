import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import psycopg2 # Neon connect karne ke liye

from langchain_groq import ChatGroq 
from langchain_qdrant import QdrantVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- NEON POSTGRES CONNECTION ---
try:
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    cur = conn.cursor()
    # Table banayein agar nahi bani hui (Hackathon Proof)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS chat_logs (
            id SERIAL PRIMARY KEY,
            user_query TEXT,
            bot_response TEXT,
            selected_context TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    print("✅ Connected to Neon Postgres!")
except Exception as e:
    print(f"❌ Neon Connection Error: {e}")

# 1. Embeddings & Qdrant
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store = QdrantVectorStore.from_existing_collection(
    embedding=embeddings,
    collection_name="physical_ai_book",
    url=os.getenv("QDRANT_URL").strip(),
    api_key=os.getenv("QDRANT_API_KEY").strip(),
)

# 2. Groq Model
llm = ChatGroq(
    model="llama-3.3-70b-versatile", 
    groq_api_key=os.getenv("GROQ_API_KEY"),
)

# 3. Prompt with Selection Logic
system_prompt = (
    "You are an expert for Physical AI. Use the provided context to answer. "
    "If 'Selected Text' is provided, prioritize it as the main focus.\n\n"
    "Context from Book:\n{context}\n"
    "Selected Text by User:\n{selected_text}"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}")
])

class ChatRequest(BaseModel):
    message: str
    selectedText: str = "" # Requirement #2: Selected text support

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # RAG Search - Yahan invoke use karein
        retriever = vector_store.as_retriever(search_kwargs={"k": 3})
        
        # FIX IS HERE: get_relevant_documents ki jagah invoke
        docs = retriever.invoke(request.message) 
        
        context_text = "\n".join([doc.page_content for doc in docs])

        # Final Chain Execution
        chain = prompt | llm
        response = chain.invoke({
            "context": context_text,
            "selected_text": request.selectedText,
            "input": request.message
        })

        # --- SAVE TO NEON POSTGRES ---
        cur.execute(
            "INSERT INTO chat_logs (user_query, bot_response, selected_context) VALUES (%s, %s, %s)",
            (request.message, response.content, request.selectedText)
        )
        conn.commit()

        return {"answer": response.content}

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))


        

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)