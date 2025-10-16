#!/bin/bash

# ===============================
# 配置
# ===============================
# 本地路径
LOCAL_BACKEND="/mnt/d/新建文件夹/react/Vue_node/backend/"
LOCAL_FRONTEND="/mnt/d/新建文件夹/react/Vue_node/frontend/"

# 服务器信息
REMOTE_USER="root"
REMOTE_HOST="1.92.114.63"
REMOTE_BACKEND="/root/backend/"
REMOTE_FRONTEND="/var/www/html/"

# pm2 后端服务名
PM2_BACKEND_NAME="website-server"

# 初次部署是否推 node_modules（yes/no）
PUSH_NODE_MODULES="yes"

# ===============================
# 后端同步
# ===============================
echo "同步后端文件..."

RSYNC_EXCLUDES="--exclude-from='.gitignore' \
  --exclude '.git/' \
  --exclude '.gitignore' \
  --exclude 'config/config.prod.js'"

if [ "$PUSH_NODE_MODULES" = "no" ]; then
    RSYNC_EXCLUDES="$RSYNC_EXCLUDES --exclude 'node_modules'"
fi

rsync -avz --delete $RSYNC_EXCLUDES "$LOCAL_BACKEND" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BACKEND"

# ===============================
# 安装依赖（只安装新增依赖）
# ===============================
echo "检查是否需要安装新增依赖..."
ssh $REMOTE_USER@$REMOTE_HOST "
cd $REMOTE_BACKEND
if [ -f package.json ]; then
    echo '运行 npm install（只安装新增依赖）...'
    npm install
fi
"

# ===============================
# 重启 pm2 后端服务
# ===============================
echo "重启 pm2 后端服务..."
ssh $REMOTE_USER@$REMOTE_HOST "pm2 restart $PM2_BACKEND_NAME"

# ===============================
# 前端部署
# ===============================
echo "构建前端..."
cd "$LOCAL_FRONTEND"
npm run build

echo "同步前端文件..."
rsync -avz --delete ./dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_FRONTEND"

echo "部署完成！"
