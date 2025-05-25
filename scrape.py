import requests
from bs4 import BeautifulSoup
import os
import easyocr
import PyPDF2
import re
from urllib.parse import urljoin
import io
import logging
import time

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Configuration
TARGET_URLS = [
    "https://kongunadu.ac.in/about-us/",
    "https://kongunadu.ac.in/chairman-message/",
    "https://kongunadu.ac.in/trustees/",
    "https://kongunadu.ac.in/principal-message/",
    "https://kongunadu.ac.in/vision-mission/",
    "https://kongunadu.ac.in/grievance-redressal-cell/",
    "https://kongunadu.ac.in/governing-council/",
    "https://kongunadu.ac.in/contact-us/"
]
OUTPUT_DIR = "scraped_data"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "all_extracted_text.txt")
PAGE_COUNT = 0  # Track page numbers for output

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'], gpu=False)  # Set to False if no GPU, True if you have a compatible GPU

# Ensure output directory exists
try:
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        logger.info(f"Created output directory: {OUTPUT_DIR}")
except Exception as e:
    logger.error(f"Failed to create output directory {OUTPUT_DIR}: {e}")
    raise

def clean_text(text):
    """Clean extracted text by removing excessive whitespace and invalid characters."""
    text = re.sub(r'\s+', ' ', text).strip()
    text = ''.join(c for c in text if c.isprintable())
    return text

def append_to_output(url, title, content):
    """Append extracted content to the output file in the specified format."""
    global PAGE_COUNT
    if not content:
        logger.warning(f"No content to write for URL: {url}, Title: {title}")
        return
    
    PAGE_COUNT += 1
    content_block = f"--- Page {PAGE_COUNT} ---\nURL: {url}\nTitle: {title}\nContent: {content}\n\n"
    try:
        with open(OUTPUT_FILE, 'a', encoding='utf-8') as f:
            f.write(content_block)
        logger.info(f"Successfully appended content for URL: {url} (Page {PAGE_COUNT})")
    except Exception as e:
        logger.error(f"Failed to write to {OUTPUT_FILE}: {e}")
        raise

def extract_image_text_from_url(image_url):
    """Extract text from an image URL using EasyOCR without saving the image."""
    try:
        response = requests.get(image_url, stream=True, timeout=10)
        if response.status_code == 200:
            # Convert image content to a format EasyOCR can read
            image_data = io.BytesIO(response.content)
            # EasyOCR reads the image and returns a list of (text, bounding box, confidence) tuples
            result = reader.readtext(image_data, detail=0)  # detail=0 returns only the text
            text = ' '.join(result)  # Combine all detected text into a single string
            cleaned_text = clean_text(text)
            if cleaned_text:
                logger.info(f"Extracted text from image: {image_url}")
            return cleaned_text
        return ""
    except Exception as e:
        logger.error(f"Error extracting text from image {image_url}: {e}")
        return ""

def extract_pdf_text_from_url(pdf_url):
    """Extract text from a PDF URL without saving the PDF."""
    try:
        response = requests.get(pdf_url, stream=True, timeout=10)
        if response.status_code == 200:
            pdf_file = io.BytesIO(response.content)
            reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            cleaned_text = clean_text(text)
            if cleaned_text:
                logger.info(f"Extracted text from PDF: {pdf_url}")
            return cleaned_text
        return ""
    except Exception as e:
        logger.error(f"Error extracting text from PDF {pdf_url}: {e}")
        return ""

def scrape_page(url):
    """Scrape a single webpage and extract text, image text, and PDF text."""
    logger.info(f"Scraping: {url}")
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            logger.warning(f"Failed to access {url}: Status code {response.status_code}")
            return
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Get page title
        title = soup.title.string if soup.title else "No Title"
        title = clean_text(title)
        
        # Extract normal text from page
        for tag in soup(['script', 'style']):
            tag.decompose()  # Remove script and style tags
        page_text = soup.get_text(separator=' ', strip=True)
        page_text = clean_text(page_text)
        
        # Append page text to output
        append_to_output(url, title, page_text)
        
        # Extract text from images
        for img in soup.find_all('img'):
            img_url = img.get('src')
            if not img_url:
                continue
            img_url = urljoin(url, img_url)
            img_ext = os.path.splitext(img_url)[1].lower()
            if img_ext not in ['.jpg', '.jpeg', '.png']:
                continue
            img_text = extract_image_text_from_url(img_url)
            if img_text:
                img_title = f"Text from Image at {url}"
                append_to_output(url, img_title, img_text)
        
        # Extract text from PDFs
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            if href and href.lower().endswith('.pdf'):
                pdf_url = urljoin(url, href)
                pdf_text = extract_pdf_text_from_url(pdf_url)
                if pdf_text:
                    pdf_title = f"Text from PDF at {url}"
                    append_to_output(url, pdf_title, pdf_text)
                
    except Exception as e:
        logger.error(f"Error scraping {url}: {e}")

if __name__ == "__main__":
    # Clear the output file if it exists
    try:
        if os.path.exists(OUTPUT_FILE):
            os.remove(OUTPUT_FILE)
            logger.info(f"Cleared existing output file: {OUTPUT_FILE}")
    except Exception as e:
        logger.error(f"Failed to clear output file {OUTPUT_FILE}: {e}")
        raise
    
    # Scrape only the specified URLs
    for url in TARGET_URLS:
        scrape_page(url)
        time.sleep(1)  # Add delay to avoid overwhelming the server
    
    # Verify output file
    if os.path.exists(OUTPUT_FILE):
        file_size = os.path.getsize(OUTPUT_FILE)
        if file_size > 0:
            logger.info(f"Scraping completed. Data saved in {OUTPUT_FILE} (Size: {file_size} bytes)")
        else:
            logger.warning(f"Output file {OUTPUT_FILE} is empty")
    else:
        logger.error(f"Output file {OUTPUT_FILE} was not created")