
# Local Boost AI

Local Boost AI is a web application that helps local businesses generate tailored digital marketing strategies, website feature ideas, and social media content in seconds. It uses the Google Gemini API to provide creative and actionable ideas based on the user's business type, location, and brand personality.

This project was built to demonstrate the power of generative AI for small businesses and is promoted by [CIT.org.in](https://www.cit.org.in/) for web design and marketing implementation.

## Features

- **AI-Powered Idea Generation:** Get instant ideas for marketing, website features, and social media.
- **Deep Personalization:** Tailor results by specifying brand personality and target audience.
- **Secure by Design:** API keys are protected using a backend-for-frontend pattern with a serverless function. No keys are exposed to the browser.
- **SEO Optimized:** Includes metadata and social sharing tags for better visibility.
- **Copy-to-Clipboard:** Easily copy any generated idea to use in your own workflow.

---

## 🚀 Deployment & Setup

This project is designed for a secure deployment on a platform that supports serverless functions, like **Vercel** or **Netlify**.

### **CRITICAL: API Key Security**

To use this application, you need a Google Gemini API key. **NEVER commit your API key to GitHub or expose it in your frontend code.**

This project uses a serverless function (`/api/generate.ts`) to act as a proxy, keeping your key secure on the server.

### Deploying with Vercel (Recommended)

1.  **Fork this repository** to your own GitHub account.
2.  **Sign up** for a free account at [Vercel.com](https://vercel.com) and connect your GitHub.
3.  **Create a New Project** on Vercel and import your forked repository.
4.  **Configure Environment Variables:**
    -   In the project settings, go to **Settings > Environment Variables**.
    -   Add a new variable:
        -   **Name:** `API_KEY`
        -   **Value:** `[Your_Google_Gemini_API_Key]`
5.  **Deploy!** Vercel will automatically build and deploy your application. The serverless function in the `/api` directory will be deployed, and your API key will be securely accessible only on the server.

### Local Development

While you can run the `index.html` file directly, the idea generation will fail because it needs the serverless function to be running. For true local development that mimics the production environment, you would use the Vercel CLI.

1.  Install the Vercel CLI: `npm install -g vercel`
2.  Create a file named `.env` in the root of your project.
3.  Add your API key to the `.env` file:
    ```
    API_KEY="[Your_Google_Gemini_API_Key]"
    ```
4.  Run the local development server: `vercel dev`

This will start a local server that runs your frontend and correctly routes requests to `/api/generate` to the serverless function, allowing you to test the full application flow locally.
