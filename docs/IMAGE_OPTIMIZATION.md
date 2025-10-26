# Image Optimization Guide

## Current Situation

**Problem**: Chapter images are extremely large, causing slow page loads:
- Average size: **2-9MB per PNG image**
- Example: `chapter-576-1.png` is **2.0MB** for a 1024x1024 image
- This causes **slow initial page load** and **high bandwidth usage**

## Immediate Solutions (No Additional Tools Required)

### 1. Browser-Level Optimizations ✅ IMPLEMENTED
- ✅ **Lazy loading**: Images load only when scrolled into view (`loading="lazy"`)
- ✅ **Fallback spinner**: Shows loading state while image loads
- ✅ **Responsive sizing**: `maxW="full"` prevents oversized images

### 2. Recommended: Manual Image Optimization

For **best performance**, optimize images before adding them to the repository:

#### Option A: Online Tools (Easiest)
1. **TinyPNG** (https://tinypng.com/)
   - Upload PNG → Download optimized (typically 70-80% smaller)
   - Free for up to 20 images at a time
   - Example: 2.0MB → ~400KB

2. **Squoosh** (https://squoosh.app/)
   - Google's image optimizer
   - Convert to WebP or optimize PNG
   - Side-by-side quality comparison

#### Option B: Command-Line Tools (For Batch Processing)

```bash
# Install tools (macOS)
brew install pngquant optipng webp

# Compress PNG (lossy, 70-80% smaller)
pngquant --quality=65-80 --ext .png --force chapter-*.png

# Optimize PNG (lossless, 10-30% smaller)
optipng -o5 chapter-*.png

# Convert to WebP (70-90% smaller)
cwebp -q 80 chapter-576-1.png -o chapter-576-1.webp
```

### 3. Target Sizes

For 1024x1024 images:
- **PNG (optimized)**: Target <400KB (currently 2.0MB)
- **WebP**: Target <200KB (best option)

## Future Enhancements

### Phase 1: WebP Support with PNG Fallback
```typescript
// Use <picture> element for modern format support
<picture>
  <source srcSet="/path/image.webp" type="image/webp" />
  <img src="/path/image.png" alt="..." loading="lazy" />
</picture>
```

### Phase 2: Responsive Images
```typescript
<img
  srcSet="
    /path/image-400.webp 400w,
    /path/image-800.webp 800w,
    /path/image-1024.webp 1024w
  "
  sizes="(max-width: 768px) 400px, 800px"
  loading="lazy"
/>
```

### Phase 3: Automated Optimization in CI/CD
Add GitHub Actions workflow to automatically optimize images on push:
```yaml
- name: Optimize Images
  run: |
    npm install -g imagemin-cli imagemin-webp
    imagemin public/content/**/*.png --plugin=webp > /dev/null
```

## Immediate Action Items

### For Existing Images
1. **Download optimization tool**: Install TinyPNG or use Squoosh
2. **Batch optimize**: Run through all chapter images in `public/content/`
3. **Re-upload**: Replace with optimized versions
4. **Verify**: Check file sizes are <500KB per image

### For New Images
1. **Before adding to repo**: Always optimize first
2. **Use WebP when possible**: Create both .webp and .png versions
3. **Check file size**: Should be <500KB for 1024x1024 images

## Performance Impact

**Before optimization** (current state):
- Chapter 576 image: 2.0MB
- Load time on 3G: ~15-20 seconds
- Mobile data usage: Very high

**After optimization** (estimated):
- Chapter 576 image: ~300KB (PNG) or ~150KB (WebP)
- Load time on 3G: ~2-3 seconds
- Mobile data usage: 85% reduction

## Quick Reference

| Format | Quality | Size for 1024x1024 | Browser Support |
|--------|---------|-------------------|-----------------|
| PNG (unoptimized) | 100% | 2.0MB ❌ | All |
| PNG (optimized) | 95% | 300-400KB ✅ | All |
| WebP | 90% | 150-200KB ✅✅ | Modern (95%+) |
| AVIF | 90% | 100-150KB ⚠️ | Limited (80%) |

**Recommendation**: Use **optimized PNG** (works everywhere) or **WebP with PNG fallback** (best performance + compatibility)

## Checklist

Before committing new images:
- [ ] Image is in correct directory (`public/content/{sutra-id}/`)
- [ ] File size is <500KB (preferably <300KB)
- [ ] Dimensions are appropriate (1024x1024 or smaller)
- [ ] Image has been optimized (TinyPNG, Squoosh, or CLI tools)
- [ ] WebP version created (optional but recommended)
- [ ] YAML file references correct image path
