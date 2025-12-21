import os
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings 
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest

load_dotenv()

def run_ingestion():
    docs_path = "../docs" 
    print(f"🚀 Reading files from: {docs_path}")

    loader = DirectoryLoader(docs_path, glob="**/*.md*", loader_cls=TextLoader, loader_kwargs={'encoding': 'utf-8'})
    documents = loader.load()
    print(f"📖 Loaded {len(documents)} documents.")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)
    print(f"✂️ Split into {len(texts)} chunks.")

    print("🧠 Loading Local Embedding Model...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    url = os.getenv("QDRANT_URL")
    api_key = os.getenv("QDRANT_API_KEY")
    collection_name = "physical_ai_book"

    # --- Modern Tarika: Pehle Collection Setup Karein ---
    print("🛰️ Connecting to Qdrant Cloud...")
    client = QdrantClient(url=url, api_key=api_key)

    # Purani collection delete karke nayi banana
    client.recreate_collection(
        collection_name=collection_name,
        vectors_config=rest.VectorParams(size=384, distance=rest.Distance.COSINE),
    )

    print("📤 Uploading to Qdrant Cloud... Please wait.")
    
    Qdrant.from_documents(
        texts,
        embeddings,
        url=url,
        api_key=api_key,
        collection_name=collection_name,
    )
    print("✅ Success! Your book is now in AI Memory (Qdrant).")

if __name__ == "__main__":
    run_ingestion()