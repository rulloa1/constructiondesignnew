# Logo Update Guide
**Date**: April 22, 2026  
**Project**: Michael Chandler Construction & Design Portfolio

---

## 📋 Required Logo Files

You need to upload **2 logo files** to complete the logo update:

### 1. MC Monogram (for Header/Navigation)
**File**: `mc-logo-monogram.svg` or `mc-logo-monogram.png`  
**Location**: `constructiondesignnew/src/assets/`  
**Usage**: Header, navigation, mobile menu  
**Recommended Size**: 
- SVG (preferred - scalable)
- PNG: 200x200px minimum, transparent background

**Description**: The "MC" letters only in gold color

---

### 2. Full Logo (for Footer)
**File**: `mc-logo-full.svg` or `mc-logo-full.png`  
**Location**: `constructiondesignnew/src/assets/`  
**Usage**: Footer, branding sections  
**Recommended Size**:
- SVG (preferred - scalable)
- PNG: 800x200px minimum, transparent background

**Description**: Full logo with "MC | MICHAEL CHANDLER" and "DESIGN | BUILD | ELEVATE" tagline

---

## 🎨 Logo Specifications

### Color Palette
- **Primary Gold**: `#D4AF37` (or your specific gold shade)
- **Text**: Charcoal/Dark gray for "MICHAEL CHANDLER"
- **Tagline**: Light gray for "DESIGN | BUILD | ELEVATE"
- **Background**: Transparent

### Typography
- **MC Letters**: Serif font (Playfair Display style)
- **Name**: Sans-serif (Inter or similar)
- **Tagline**: Light sans-serif, uppercase, letter-spaced

---

## 📂 File Upload Instructions

### Option 1: Manual Upload (Recommended)
1. Save your logo files with these exact names:
   - `mc-logo-monogram.svg` (or `.png`)
   - `mc-logo-full.svg` (or `.png`)

2. Place them in: `constructiondesignnew/src/assets/`

3. The code is already updated to reference these files!

### Option 2: Using Git
```bash
cd constructiondesignnew/src/assets
# Copy your logo files here
git add mc-logo-monogram.svg mc-logo-full.svg
git commit -m "Add new MC brand logos"
```

---

## 🔧 Code Changes Already Made

The following components have been updated to use the new logos:

### ✅ Updated Components

1. **Header.tsx** (`src/components/Header.tsx`)
   - Now imports and uses `mc-logo-monogram.svg`
   - Logo appears in main navigation
   - Hover effect: scale on hover

2. **Footer.tsx** (`src/components/Footer.tsx`)
   - Now imports and uses `mc-logo-full.svg`
   - Full branding in footer
   - Includes company tagline

3. **Footer.tsx** (`src/sections/Footer.tsx`)
   - Also updated to use full logo
   - Consistent branding across sections

### Logo Component Implementation

```typescript
// Monogram (Header)
import logoMonogram from "@/assets/mc-logo-monogram.svg";

const Logo = ({ className = "" }: { className?: string }) => (
  <img 
    src={logoMonogram} 
    alt="MC - Michael Chandler" 
    className={`h-10 w-auto ${className}`}
  />
);

// Full Logo (Footer)
import logoFull from "@/assets/mc-logo-full.svg";

const Logo = ({ className = "" }: { className?: string }) => (
  <img 
    src={logoFull} 
    alt="Michael Chandler - Design | Build | Elevate" 
    className={`h-16 w-auto ${className}`}
  />
);
```

---

## 🖼️ Favicon Generation

### Current Favicons
The site currently has these favicon files in `public/`:
- `favicon.ico`
- `favicon.svg`
- `favicon.png`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`

### To Update Favicons

#### Option 1: Use Online Generator
1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your `mc-logo-monogram.svg` or `.png`
3. Generate all sizes
4. Download and replace files in `constructiondesignnew/public/`

#### Option 2: Use Existing Script
The project has a favicon generation script:

```bash
cd constructiondesignnew
npm run generate-favicons
```

**Note**: You'll need to update `scripts/generate-favicons.js` to use your new logo file as the source.

### Recommended Favicon Sizes
- `favicon.ico` - 16x16, 32x32, 48x48 (multi-size)
- `favicon-16x16.png` - 16x16
- `favicon-32x32.png` - 32x32
- `apple-touch-icon.png` - 180x180
- `favicon.svg` - Scalable vector

---

## 🎯 Logo Usage Guidelines

### Where Each Logo Appears

#### MC Monogram (`mc-logo-monogram.svg`)
- ✅ Header navigation (desktop)
- ✅ Mobile menu header
- ✅ Sticky navigation bar
- 🔄 Favicon (after generation)

#### Full Logo (`mc-logo-full.svg`)
- ✅ Footer (main branding)
- ✅ Section footers
- 📋 Could be used in: About page, hero sections

### Sizing Guidelines

**Header/Navigation**:
- Height: 40px (h-10 in Tailwind)
- Width: Auto (maintains aspect ratio)
- Hover: Scales to 110%

**Footer**:
- Height: 64px (h-16 in Tailwind)
- Width: Auto (maintains aspect ratio)
- Hover: Brightness increases to 110%

---

## ✅ Verification Checklist

After uploading your logo files, verify:

- [ ] `mc-logo-monogram.svg` exists in `src/assets/`
- [ ] `mc-logo-full.svg` exists in `src/assets/`
- [ ] Run `npm run dev` - no import errors
- [ ] Header shows monogram logo
- [ ] Footer shows full logo
- [ ] Logos are crisp on all screen sizes
- [ ] Hover effects work (scale/brightness)
- [ ] Mobile menu shows logo correctly
- [ ] Generate and update favicons

---

## 🚀 Build & Deploy

After uploading logos:

```bash
# Test locally
npm run dev

# Build for production
npm run build

# Verify build
npm run preview
```

The build will fail if logo files are missing, so make sure they're uploaded first!

---

## 🎨 Design Notes

### Current Brand Colors (from codebase)
- **Gold/Accent**: `#D4AF37` or similar
- **Charcoal**: Dark background
- **Cream**: Light text/backgrounds
- **White**: Primary text

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

Make sure your logo files match these brand guidelines for consistency.

---

## 📞 Need Help?

If you encounter issues:

1. **Import Errors**: Make sure file names match exactly:
   - `mc-logo-monogram.svg` (not `MC-Logo-Monogram.svg`)
   - `mc-logo-full.svg` (not `mc-logo-full.png` if code expects SVG)

2. **Logo Not Showing**: Check browser console for 404 errors

3. **Wrong Size**: Adjust the `h-10` or `h-16` classes in the components

4. **File Format**: SVG is preferred, but PNG works too. Just update the import extension in the code if needed.

---

## 📝 Summary

**Status**: ✅ Code updated, ready for logo files  
**Required**: 2 logo files (monogram + full)  
**Location**: `constructiondesignnew/src/assets/`  
**Next Step**: Upload logo files and test!

Once you upload the files, the site will automatically use your new branded logos throughout.
