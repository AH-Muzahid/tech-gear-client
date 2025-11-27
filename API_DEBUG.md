# API Debugging Guide

## Products না দেখাচ্ছে - Troubleshooting

### 1. Browser Console Check করুন:
- F12 চাপুন
- Console tab এ দেখুন:
  - "Fetching products from: [URL]" - API URL দেখাবে
  - "Response status: [number]" - Status code দেখাবে
  - "Products fetched: [number]" - কতগুলো product পাওয়া গেছে

### 2. Network Tab Check করুন:
- F12 > Network tab
- Page refresh করুন
- `/products` request খুঁজুন
- Status code দেখুন:
  - 200 = Success
  - 404 = Not Found
  - 500 = Server Error
  - CORS error = CORS issue

### 3. Environment Variable Check করুন:
`.env.local` file এ check করুন:
```
NEXT_PUBLIC_API_URL=https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app
```

### 4. Server Check করুন:
Server running আছে কিনা check করুন:
- Browser এ সরাসরি API URL open করুন: `https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app/products`
- JSON response দেখতে হবে

### 5. Common Issues:

#### Issue 1: CORS Error
**Solution:** Server এর `ALLOWED_ORIGINS` এ client URL যোগ করুন

#### Issue 2: Network Error
**Solution:** Internet connection check করুন

#### Issue 3: Empty Array
**Solution:** Database এ products আছে কিনা check করুন

#### Issue 4: Timeout
**Solution:** Server response time check করুন

### 6. Quick Fix:
যদি products না দেখায়, manually test করুন:
```javascript
// Browser console এ run করুন:
fetch('https://tech-gear-server-gmu3jry2o-ah-muzahids-projects.vercel.app/products')
  .then(res => res.json())
  .then(data => console.log('Products:', data))
  .catch(err => console.error('Error:', err));
```

