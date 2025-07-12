#!/bin/bash

# OpenHands Deployment Script for VPS (Simplified)
set -e

echo "🚀 Starting OpenHands deployment..."

# Create application directory
sudo mkdir -p /opt/openhands
cd /opt/openhands

# Extract deployment package
echo "📦 Extracting deployment package..."
sudo tar -xzf /tmp/deskdev-deploy.tar.gz

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nginx

# Create virtual environment
sudo python3 -m venv venv
sudo ./venv/bin/pip install --upgrade pip

# Install OpenHands
echo "⚙️ Installing OpenHands..."
sudo ./venv/bin/pip install /tmp/openhands_ai-0.47.0-py3-none-any.whl

# Create systemd service
echo "🔧 Creating systemd service..."
sudo tee /etc/systemd/system/openhands.service > /dev/null <<EOF
[Unit]
Description=OpenHands AI Assistant
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/openhands
Environment=PATH=/opt/openhands/venv/bin
ExecStart=/opt/openhands/venv/bin/uvicorn openhands.server.listen:app --host 0.0.0.0 --port 3000
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

# Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/openhands > /dev/null <<EOF
server {
    listen 80;
    server_name _;

    # Serve static frontend files
    location / {
        root /opt/openhands/frontend;
        try_files \$uri \$uri/ /index.html;
        
        # Enable CORS for development
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization";
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/openhands /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Start services
echo "🔄 Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable openhands
sudo systemctl start openhands
sudo systemctl enable nginx
sudo systemctl restart nginx

echo "✅ OpenHands deployment completed!"
echo "🌐 Access your application at: http://31.97.61.137"
echo "📊 Check service status: sudo systemctl status openhands"
echo "📝 View logs: sudo journalctl -u openhands -f"