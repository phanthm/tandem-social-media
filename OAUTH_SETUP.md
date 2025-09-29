# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your Tandem Social Media application.

## Prerequisites

- Node.js and npm installed
- A Google Cloud Console account
- Your application running on `localhost:3000` (backend) and `localhost:5173` (frontend)

## Step 1: Google Cloud Console Setup

### 1.1 Create a New Project (or use existing)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown and create a new project or select an existing one
3. Name your project (e.g., "Tandem Social Media")

### 1.2 Enable Google+ API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google+ API" and enable it
3. Also enable "Google People API" for profile information

### 1.3 Configure OAuth Consent Screen

1. Go to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (unless you have a Google Workspace account)
3. Fill in the required fields:
   - **App name**: Tandem Social Media
   - **User support email**: Your email
   - **Developer contact information**: Your email
4. Add scopes:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. Add test users (your email and any other emails you want to test with)
6. Save and continue

### 1.4 Create OAuth 2.0 Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Configure the settings:
   - **Name**: Tandem Social Media Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000`
     - `http://localhost:5173`
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/google/callback`
5. Click **Create**
6. Copy the **Client ID** and **Client Secret** (you'll need these for your `.env` file)

## Step 2: Backend Configuration

### 2.1 Install Dependencies

```bash
cd backend
npm install cors dotenv express express-session passport passport-google-oauth20
```

### 2.2 Create Environment File

1. In the `backend` directory, create a `.env` file:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here

# Session Configuration (use a strong random string)
SESSION_SECRET=your_super_secret_session_key_here_make_it_long_and_random

# Server Configuration
PORT=3000

# Frontend URL (for CORS and redirects)
FRONTEND_URL=http://localhost:5173
```

2. Replace the placeholder values:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID from step 1.4
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret from step 1.4
   - `SESSION_SECRET`: A long, random string (you can generate one [here](https://randomkeygen.com/))

### 2.3 Verify Backend Files

Make sure your backend has these files with the correct content:
- `server.js` (already configured)
- `routes/auth.routes.js` (already configured)
- `package.json` (already updated)

## Step 3: Frontend Configuration

### 3.1 Install Dependencies

```bash
cd frontend
npm install axios
```

### 3.2 Verify Frontend Files

Your frontend should have these new files:
- `src/context/AuthContext.tsx`
- `src/pages/Login.tsx` (updated)
- `src/pages/Dashboard.tsx` (new)
- `src/stylesheets/Login.css`
- `src/stylesheets/Dashboard.css`

## Step 4: Start the Application

### 4.1 Start Backend Server

```bash
cd backend
npm start
```

The backend should start on `http://localhost:3000`

### 4.2 Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend should start on `http://localhost:5173`

## Step 5: Test the OAuth Flow

1. Open your browser and go to `http://localhost:5173/login`
2. Click the "Continue with Google" button
3. You should be redirected to Google's OAuth consent screen
4. Sign in with your Google account
5. Grant the requested permissions
6. You should be redirected back to your app's dashboard

## Troubleshooting

### Common Issues and Solutions

#### 1. "OAuth Error: redirect_uri_mismatch"
- **Problem**: The redirect URI in your Google Console doesn't match the one in your app
- **Solution**: Make sure `http://localhost:3000/auth/google/callback` is added to authorized redirect URIs

#### 2. "Error 403: access_blocked"
- **Problem**: Your app is in testing mode and the user isn't added as a test user
- **Solution**: Add the user's email to test users in OAuth consent screen

#### 3. CORS Errors
- **Problem**: Frontend can't communicate with backend
- **Solution**: Make sure CORS is properly configured in `server.js` and both servers are running

#### 4. Session/Cookie Issues
- **Problem**: User doesn't stay logged in
- **Solution**: 
  - Check that `SESSION_SECRET` is set in your `.env` file
  - Make sure `credentials: true` is set in your axios configuration
  - Verify that cookies are being sent (check browser dev tools)

#### 5. "Cannot GET /" Error
- **Problem**: Backend server isn't running or wrong port
- **Solution**: Make sure backend is running on port 3000 and frontend on 5173

### Debug Mode

To see detailed OAuth information, check the browser console and backend console for logs.

## Security Notes

1. **Never commit your `.env` file** - it contains sensitive credentials
2. **Use HTTPS in production** - update `cookie: { secure: true }` in production
3. **Use strong session secrets** - generate a new one for each environment
4. **Verify redirect URIs** - only allow your actual domain in production

## Production Deployment

When deploying to production:

1. Update your Google OAuth credentials with your production URLs
2. Update environment variables with production values
3. Set `cookie: { secure: true }` in session configuration
4. Update CORS origins to your production domain
5. Update redirect URIs in your OAuth consent screen

## API Endpoints

Your backend provides these OAuth endpoints:

- `GET /auth/google` - Initiates OAuth flow
- `GET /auth/google/callback` - OAuth callback handler
- `GET /auth/user` - Get current user info (JSON)
- `GET /auth/logout` - Logout user
- `GET /auth/profile` - Protected route example (HTML)

## Frontend Integration

The frontend uses:
- **AuthContext**: Manages authentication state
- **Login page**: Handles OAuth initiation
- **Dashboard**: Protected page showing user info
- **useAuth hook**: Easy access to auth state and functions

## Next Steps

After successful setup, you can:
1. Add more user information to your database
2. Implement protected routes
3. Add more OAuth providers (Facebook, GitHub, etc.)
4. Customize the UI further
5. Add user profile management features

For additional help, check the Google OAuth 2.0 documentation: https://developers.google.com/identity/protocols/oauth2