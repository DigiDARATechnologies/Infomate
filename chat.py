import logging
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
from langchain_ollama import OllamaLLM
from langchain.prompts import PromptTemplate

# Set up logging for better debugging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Qdrant configuration
QDRANT_URL = "<cluster url>"
QDRANT_API_KEY = "<create an API key>"
COLLECTION_NAME = "kongunadu_data"

def initialize_qdrant_client(url=QDRANT_URL, api_key=QDRANT_API_KEY, collection_name=COLLECTION_NAME):
    """Initialize and return a Qdrant client."""
    try:
        client = QdrantClient(url=url, api_key=api_key)
        logging.info(f"Successfully connected to Qdrant at {url}")
        return client, collection_name
    except Exception as e:
        logging.error(f"Failed to connect to Qdrant: {e}")
        raise

def load_embedding_model(model_name='all-MiniLM-L6-v2'):
    """Load and return the embedding model."""
    try:
        model = SentenceTransformer(model_name)
        logging.info(f"Loaded embedding model: {model_name}")
        return model
    except Exception as e:
        logging.error(f"Failed to load embedding model: {e}")
        raise

def embed_query(query, embedding_model):
    """Generate embedding for the user query."""
    try:
        query_embedding = embedding_model.encode(query).tolist()
        logging.info(f"Generated embedding for query: {query}")
        return query_embedding
    except Exception as e:
        logging.error(f"Failed to embed query: {e}")
        raise

def search_documents(qdrant_client, collection_name, query_embedding, limit=5):
    """Search Qdrant for relevant documents based on the query embedding."""
    try:
        search_result = qdrant_client.search(
            collection_name=collection_name,
            query_vector=query_embedding,
            limit=limit,
            with_payload=True
        )
        documents = [result.payload.get('content', '') for result in search_result]
        logging.info(f"Retrieved {len(documents)} documents from Qdrant")
        return documents
    except Exception as e:
        logging.error(f"Failed to search Qdrant: {e}")
        raise

def initialize_llm(model_name="mistral:latest", base_url="http://localhost:11434"):
    """Initialize the local Mistral model via Ollama."""
    try:
        llm = OllamaLLM(model=model_name, base_url=base_url)
        logging.info(f"Initialized Ollama LLM: {model_name}")
        return llm
    except Exception as e:
        logging.error(f"Failed to initialize Ollama LLM: {e}")
        raise

def generate_answer(llm, documents, user_query):
    """Generate an answer using the retrieved documents and the LLM."""
    try:
        # Create a more specific prompt to guide the model
        prompt_template = """
        You are an assistant tasked with answering a question based on the provided documents.
        
        Focus on extracting the most relevant information to answer the question directly.
        If the answer is not found, say "I couldn't find the answer in the provided documents."
        
        Documents:
        {context}
        
        Question:
        {question}
        
        Answer:
        """
        prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        
        # Combine documents into a single context
        context = "\n".join([doc.strip() for doc in documents if doc.strip()])
        if not context:
            logging.warning("No valid documents retrieved for context")
            return "I couldn't find any relevant documents to answer the question."
        
        # Generate the answer
        chain = prompt | llm
        response = chain.invoke({"context": context, "question": user_query})
        
        # Clean up the response
        answer = response.strip()
        if "Answer:" in answer:
            answer = answer.split("Answer:")[-1].strip()
        
        if not answer or "I couldn't find" in answer.lower():
            logging.info(f"No answer found for question: {user_query}")
            return "I couldn't find the answer in the provided documents."
        
        logging.info(f"Generated answer for question '{user_query}': {answer}")
        return answer
    except Exception as e:
        logging.error(f"Failed to generate answer: {e}")
        return "An error occurred while generating the answer."

def answer_question(user_query, qdrant_url=QDRANT_URL, api_key=QDRANT_API_KEY, collection_name=COLLECTION_NAME):
    """Main function to answer a user question using RAG."""
    # Initialize components
    qdrant_client, collection_name = initialize_qdrant_client(qdrant_url, api_key, collection_name)
    embedding_model = load_embedding_model()
    llm = initialize_llm()
    
    # Process the query
    query_embedding = embed_query(user_query, embedding_model)
    documents = search_documents(qdrant_client, collection_name, query_embedding)
    answer = generate_answer(llm, documents, user_query)
    
    return answer

if __name__ == "__main__":
    print("Welcome to the Kongunadu College Chatbot! Type 'quit' to end the chat.")
    while True:
        user_query = input("\n📝 Enter your question: ")
        if user_query.lower() == "quit":
            print("Goodbye! Chat ended.")
            break

        
        try:
            final_answer = answer_question(user_query)
            print(f"\n🎯 Final Answer:\n{final_answer}")
        except Exception as e:
            print(f"Error: {e}")
            
            
            
       

        
        
