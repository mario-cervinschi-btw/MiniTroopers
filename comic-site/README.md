# XKCD Clone - Frontend Assignment

## Requirements

- Work only in the `/ui` folder. We'll use the `/api` just to have a backend server, don't change the code.
- Try to replicate the site's main functionality `https://xkcd.com/`. Display comic image, title, and alt text.
- Add Previous, Next, Random, First, Last buttons for navigation.
- Hide Previous button when on first comic. Hide Next button when on last comic.
- Design the UI however you like :D no requirements here.

- **important**: Add error handling - the user should be informed in a human-friendly way in case a request fails or something goes wron in the system. You can simulate the errors by doing the requests wrongly, shutting down the server, playing with it. You can rely on the error code or message. Be creative and find a good pattern for showing this. Some inspiration:
https://mobbin.com/glossary/error-message - research some helpful UI patterns: banner, toast notification, dialog or inline messages and check the guidelines

### Bonus

- don't do the same http request each time and cache the responses in a JavaScirpt data structure (array, object, etc.) or in the browser localStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage - read about how it works and persists data in the browser.
- enhance the functionality however you like ;)

## Starting the API

```bash
cd api
npm install
npm start
```

API runs at `http://localhost:3000`

## Testing the API

- You can test it either in Browser/Postman by doin the requests: `http://localhost:3000/comics` or using the swagger documentation at `http://localhost:3000/swagger` (video attached)


## API Endpoints

- `GET /comics` or `GET /comics?position=latest` - Latest comic
- `GET /comics?position=first` - First comic
- `GET /comics?position=random` - Random comic
- `GET /comics/{index}` - Specific comic (0-25)

## Response Structure

```json
{
  "comic": {
    "index": 15,
    "title": "Comic Title",
    "alt": "Alt text",
    "imgUrl": "https://example.com/image.png"
  },
  "prev": 14,
  "next": 16,
  "total": 26
}
```

## Developing Your Frontend

First start the API server:

```bash
cd api
npm install
npm start
```

Then start the UI:

```bash
cd ui
npm install
npm run dev
```


