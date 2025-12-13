
import sys
import os

try:
    # Try importing pypdf first, then PdfReader from it
    try:
        from pypdf import PdfReader
    except ImportError:
        try:
            from PyPDF2 import PdfReader
        except ImportError:
            print("Error: Neither pypdf nor PyPDF2 is installed.")
            sys.exit(1)

    pdf_path = r"d:\EPSCAN\20251213_112609.PDF"
    
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        sys.exit(1)

    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    print(text)

except Exception as e:
    print(f"An error occurred: {e}")
