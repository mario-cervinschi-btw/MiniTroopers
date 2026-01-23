# XKCD Clone Mock API

This is a pre-built backend API for your XKCD clone homework assignment. You should **NOT** make any changes to this folder. Your work should be done in the `ui/` directory.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the API Server
```bash
npm start
```

The server will start at: `http://localhost:3000`

---

## API Documentation (Swagger)

Once the server is running, access the interactive API documentation at:

```
http://localhost:3000/swagger
```

This Swagger UI lets you explore all endpoints and try them directly in your browser.

---

## Available Endpoints

### Get Latest Comic (Default)
```bash
GET http://localhost:3000/comics
```

**Example Response:**
```json
{
  "comic": {
    "index": 25,
    "title": "Document Forgery",
    "alt": "Comic Sans didn't exist in 1985, so your \"vintage\" letter is clearly fake.",
    "img": "https://imgs.xkcd.com/comics/document_forgery.png"
  },
  "prev": 24,
  "next": null,
  "total": 26
}
```

---

### Get First Comic
```bash
GET http://localhost:3000/comics?position=first
```

---

### Get Random Comic
```bash
GET http://localhost:3000/comics?position=random
```

---

### Get Comic by Number
```bash
GET http://localhost:3000/comics/0
GET http://localhost:3000/comics/15
GET http://localhost:3000/comics/25
```

**Valid comic numbers:** 0 through 25 (26 comics total)

**Example Response:**
```json
{
  "comic": {
    "index": 15,
    "title": "Hyperacute Interdynamics",
    "alt": "Using unnecessarily complex terminology to sound impressive at conferences.",
    "img": "https://imgs.xkcd.com/comics/hyperacute_interdynamics.png"
  },
  "prev": 14,
  "next": 16,
  "total": 26
}
```

---

## Response Structure

Every comic response includes:

- **`comic`**: The comic data
  - `index`: Comic index (0-25)
  - `title`: Comic title
  - `alt`: Alt text description
  - `img`: Image URL
- **`prev`**: Previous comic number (or `null` if first)
- **`next`**: Next comic number (or `null` if last)
- **`total`**: Total number of comics available

---

## Error Responses

### 404 - Comic Not Found
```bash
GET http://localhost:3000/comics/999
```

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Comic 999 not found",
  "code": "COMIC_NOT_FOUND"
}
```

### 400 - Invalid Comic Number
```bash
GET http://localhost:3000/comics/abc
```

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Comic number must be a non-negative integer",
  "code": "INVALID_COMIC_NUMBER"
}
```

---

## Testing with cURL from command line (you can do the same thing by opening the urls in the browser or by using Postman)

```bash
# Get latest comic
curl http://localhost:3000/comics

# Get first comic
curl http://localhost:3000/comics?position=first

# Get random comic
curl http://localhost:3000/comics?position=random

# Get specific comic
curl http://localhost:3000/comics/10
```

---

## Testing with JavaScript Fetch

```javascript
// Get latest comic
fetch('http://localhost:3000/comics')
  .then(res => res.json())
  .then(data => console.log(data));

// Get comic by number
fetch('http://localhost:3000/comics/5')
  .then(res => res.json())
  .then(data => console.log(data));

// Get random comic
fetch('http://localhost:3000/comics?position=random')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Troubleshooting

**Port 3000 already in use?**
- Stop any other process using port 3000
- Or set a different port: `PORT=3001 npm start`

**CORS errors?**
- The API is configured to accept requests from any `localhost` port
- Make sure your frontend is running on `localhost` (not `127.0.0.1`)

---

## Need Help?

1. Check the Swagger docs: `http://localhost:3000/swagger`
2. Verify the server is running: `http://localhost:3000/comics`
3. Check terminal output for error messages

**Remember:** Do not modify any files in this folder!
