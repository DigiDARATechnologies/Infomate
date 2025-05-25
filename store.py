import qdrant_client
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
import logging
import re

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Connect to Qdrant Cloud
QDRANT_URL = "https://72eade17-727f-4f58-91ad-d9c79196a229.europe-west3-0.gcp.cloud.qdrant.io:6333"
QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.3Oi2ODDSMy4rrawMSC2j-83R64oCLyl64G75Xx1LSJc"
COLLECTION_NAME = "kongunadu_data"

try:
    qdrant_client = qdrant_client.QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)
    logger.info(f"✅ Successfully connected to Qdrant Cloud at {QDRANT_URL}")
except Exception as e:
    logger.error(f"❌ Failed to connect to Qdrant Cloud: {str(e)}")
    exit(1)

# Initialize Sentence Transformer for Embeddings (768-dim)
try:
    embedder = SentenceTransformer("all-MiniLM-L6-v2")
    logger.info("✅ SentenceTransformer model 'all-MiniLM-L6-v2' loaded successfully")
except Exception as e:
    logger.error(f"❌ Error loading SentenceTransformer: {str(e)}")
    exit(1)

# Always recreate the collection with correct vector size (768)
try:
    qdrant_client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(size=384, distance=models.Distance.COSINE)
    )
    logger.info(f"✅ Recreated Qdrant collection: {COLLECTION_NAME} with vector size 768")
except Exception as e:
    logger.error(f"❌ Error creating Qdrant collection: {str(e)}")
    exit(1)

def parse_txt_file(filename):
    """Parse the txt file and extract content for each page."""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Split the content into pages using the page delimiter
        pages = content.split("--- Page")
        parsed_data = []
        
        for page in pages[1:]:  # Skip the first split (empty or header)
            # Extract URL, Title, and Content using regex
            url_match = re.search(r"URL: (.*?)\n", page)
            title_match = re.search(r"Title: (.*?)\n", page)
            content_match = re.search(r"Content: (.*?)(?=\n--- Page|$)", page, re.DOTALL)
            
            if url_match and title_match and content_match:
                url = url_match.group(1).strip()
                title = title_match.group(1).strip()
                content = content_match.group(1).strip()
                parsed_data.append({
                    "url": url,
                    "title": title,
                    "content": content
                })
            else:
                logger.warning(f"Skipping malformed page entry: {page[:100]}...")
        
        logger.info(f"✅ Parsed {len(parsed_data)} pages from the txt file")
        return parsed_data
    except Exception as e:
        logger.error(f"❌ Error parsing txt file: {str(e)}")
        return []
def chunk_text(text, max_words=120, overlap=2):
    """
    Chunk text into overlapping windows of sentences for better semantic search.
    """
    sentences = re.split(r'(?<=[.!?]) +', text)
    chunks = []
    current_chunk = []
    current_words = 0
    max_words=100
    overlap=2


    for i, sentence in enumerate(sentences):
        sentence = sentence.strip()
        if not sentence:
            continue
        words_in_sentence = len(sentence.split())
        current_chunk.append(sentence)
        current_words += words_in_sentence

        # If chunk is large enough or last sentence
        if current_words >= max_words or i == len(sentences) - 1:
            chunks.append(" ".join(current_chunk))
            # Start new chunk with overlap
            current_chunk = current_chunk[-overlap:] if overlap > 0 else []
            current_words = sum(len(s.split()) for s in current_chunk)
    return [c.strip() for c in chunks if c.strip()]


def store_in_qdrant(data):
    points = []
    idx = 1
    for entry in data:
        content = entry["content"]
        if not content:
            continue
        for chunk in chunk_text(content, max_words=120, overlap=2):
            if not chunk.strip():
                continue
            vector = embedder.encode(chunk).tolist()
            point = models.PointStruct(
                id=idx,
                vector=vector,
                payload={
                    "content": chunk,
                    "url": entry["url"],
                    "title": entry["title"]
                }
            )
            points.append(point)
            idx += 1
    # Upsert points into Qdrant
    qdrant_client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

# Main execution
if __name__ == "__main__":
    # Parse the txt file
    filename = "scraped_data/all_extracted_text.txt"
    parsed_data = parse_txt_file(filename)
    
    if not parsed_data:
        logger.error("No data parsed from the file. Exiting.")
        exit(1)
    
    # Store the parsed data in Qdrant
    store_in_qdrant(parsed_data)
    logger.info("🎉 Data storage in Qdrant Cloud completed!")