# 📄 index.html Content - Ready to Copy

## **Complete index.html File Content**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OnPurpose - Connection, Not Dating</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #2F6FE4 0%, #22C55E 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .logo {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #FDF7F2, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .tagline {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .description {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0.8;
        }
        
        .status {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(34, 197, 94, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 25px;
            border: 1px solid rgba(34, 197, 94, 0.3);
            margin-bottom: 2rem;
        }
        
        .status-dot {
            width: 8px;
            height: 8px;
            background: #22C55E;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .endpoints {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .endpoint {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .endpoint:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .endpoint-title {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .endpoint-url {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .launch-info {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(47, 111, 228, 0.2);
            border-radius: 10px;
            border: 1px solid rgba(47, 111, 228, 0.3);
        }
        
        .launch-title {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">OnPurpose</div>
        <div class="tagline">Connection, Not Dating</div>
        <div class="description">
            NYC's premier hospitality marketplace connecting guests with local hosts for authentic, meaningful experiences.
        </div>
        
        <div class="status">
            <div class="status-dot"></div>
            <span>Live & Ready for NYC Pilot Launch</span>
        </div>
        
        <div class="endpoints">
            <div class="endpoint">
                <div class="endpoint-title">Health Check</div>
                <div class="endpoint-url">/health</div>
            </div>
            <div class="endpoint">
                <div class="endpoint-title">API Info</div>
                <div class="endpoint-url">/api</div>
            </div>
            <div class="endpoint">
                <div class="endpoint-title">NYC Hosts</div>
                <div class="endpoint-url">/api/hosts</div>
            </div>
            <div class="endpoint">
                <div class="endpoint-title">Users</div>
                <div class="endpoint-url">/api/users</div>
            </div>
        </div>
        
        <div class="launch-info">
            <div class="launch-title">🚀 NYC Pilot Launch</div>
            <div>50 curated hosts • 5 categories • 20% platform fee</div>
        </div>
    </div>
</body>
</html>
```

## **Upload Instructions**
1. **Login to GitHub** at https://github.com/wisserd/queoper
2. **Click "Add file" → "Create new file"**
3. **Filename:** `index.html`
4. **Copy the entire HTML content above**
5. **Commit message:** "Add index.html - launch OnPurpose platform"
6. **Click "Commit new file"**

**This completes the OnPurpose platform launch.**
