
import sys
import os

try:
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
    print(f"Number of pages: {len(reader.pages)}")
    text_content = ""
    for i, page in enumerate(reader.pages):
        page_text = page.extract_text()
        print(f"--- Page {i+1} ---")
        if page_text:
            text_content += page_text
            print(page_text)
        else:
            print("[No text extracted]")
    
    if not text_content:
        print("\nSUMMARY: No text could be extracted. The PDF might contain images (scanned).")

except Exception as e:
    print(f"An error occurred: {e}")
