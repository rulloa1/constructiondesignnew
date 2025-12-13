
import sys
import os

try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not installed. Please run: pip install pymupdf")
    sys.exit(1)

pdf_path = r"d:\EPSCAN\20251213_112609.PDF"
output_dir = r"c:\Users\roryu\constructiondesignnew-e33525f5\scanned_pages"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

if not os.path.exists(pdf_path):
    print(f"Error: PDF not found at {pdf_path}")
    sys.exit(1)

try:
    doc = fitz.open(pdf_path)
    print(f"Opened PDF with {len(doc)} pages.")
    for i in range(len(doc)):
        page = doc.load_page(i)
        # Zoom matrix for better resolution (2x)
        mat = fitz.Matrix(2, 2)
        pix = page.get_pixmap(matrix=mat)
        output_file = os.path.join(output_dir, f"page_{i+1}.png")
        pix.save(output_file)
        print(f"Saved {output_file}")
except Exception as e:
    print(f"Error converting PDF: {e}")
