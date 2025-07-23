# Quick OpenAI API Setup

## The Issue
The "Generate Outfit" button is not working because the OpenAI API key is not configured.

## Solution

### 1. Get Your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to "API Keys" in your dashboard
4. Create a new API key
5. Copy the key (starts with `sk-`)

### 2. Create Environment File
1. Create a file named `.env.local` in the root directory
2. Add this line to the file:
   ```
   REACT_APP_OPENAI_API_KEY=sk-your_actual_api_key_here
   ```
3. Replace `sk-your_actual_api_key_here` with your real API key

### 3. Restart the App
1. Stop your development server (Ctrl+C)
2. Run `npm start` again

### 4. Test
1. Go to the outfit generation page
2. Click "Generate Outfit"
3. Check the browser console (F12) for any error messages

## Example .env.local file:
```
REACT_APP_OPENAI_API_KEY=sk-1234567890abcdef1234567890abcdef1234567890abcdef
```

## Troubleshooting
- Make sure the file is named exactly `.env.local` (not `.env`)
- Make sure there are no spaces around the `=` sign
- Restart the development server after creating the file
- Check the browser console for error messages 