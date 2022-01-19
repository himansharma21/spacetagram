# Spacetagram

A web-app built on the [NASA APOD](https://apod.nasa.gov/apod/astropix.html) API. Displays a gallery of images from NASA APOD collection. 

Click [**HERE**](https://himansharma21.github.io/spacetagram/) to see it in action.

## Usage 
- Single tap images to expand the explanation for each image
- Double tap images to like 

## Extras 
- Features an infinite scrolling experience! New images will automatically be fetched when you get to the bottom of a page.
  - Automatic fetching is limited to 100 images to reduce API usage. This is not due to technical limitations.
-  Loading states and transitions. The app communicates with the user when it is loading new data and when it is ready. 

## Running locally 
Built and tested on Node version `17.x.x`.

### Installing
Install the required packages with: 
```
npm install
```

### API Key
Change the value of `REACT_APP_NASA_API_KEY` in `.env.example` to your API key. Do this by replacing `YOUR_API_KEY_HERE` with your API key. Afterwards run: 
```
mv .env.example .env
```
If this does not work you could manually create a `.env` file and paste the contents of `.env.example` inside.

Remember to remove any keys inside `.env.example` before you commit it publicly. 

### Starting
After installing the required packages you can run the web-app with: 
```
npm start
```
Visit [`localhost:3000`](http://localhost:3000/) to view the web-app. 

## Deployment 

You can change `homepage` in `package.json` to your own Github pages URL. Then you may run: 

```
npm run deploy
```
to deploy the web-app.
