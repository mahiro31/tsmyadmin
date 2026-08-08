-- =============================================
-- mydatabase 初期化用スキーマ定義 (MySQL 8.0対応)
-- =============================================

-- 既存のテーブルが存在する場合は削除（開発・テスト用途）
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;


-- 1. users テーブル: ユーザー情報管理
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT 'ユーザー名',
    email VARCHAR(100) UNIQUE NOT NULL COMMENT 'メールアドレス',
    password_hash VARCHAR(255) NOT NULL COMMENT 'パスワードハッシュ値',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE COMMENT 'アカウント有効/無効'
);

-- ユーザーの初期データ挿入例 (adminユーザーを想定)
INSERT INTO users (username, email, password_hash) VALUES
('admin', 'admin@example.com', '$2a$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); -- ハッシュ値は適宜変更してください


-- 2. products テーブル: 商品カタログ管理
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '商品名',
    description TEXT COMMENT '商品説明',
    price DECIMAL(10, 2) NOT NULL COMMENT '価格',
    stock_quantity INT DEFAULT 0 COMMENT '在庫数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 商品の初期データ挿入例
INSERT INTO products (name, description, price, stock_quantity) VALUES
('高性能ノートPC', '最新世代CPUを搭載した高機能モデルです。', 150000.00, 50),
('ワイヤレスマウス', 'エルゴノミクスデザインの快適なマウス。', 3500.00, 200);


-- 3. posts テーブル: ブログ/記事コンテンツ管理
CREATE TABLE posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL COMMENT '記事タイトル',
    content TEXT NOT NULL COMMENT '記事本文',
    author_id INT NOT NULL COMMENT '投稿者ID (users.user_idを参照)',
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '公開日時',
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE -- ユーザーが削除されたら関連する投稿も削除
);

-- 記事の初期データ挿入例 (adminユーザーが作成したと仮定)
INSERT INTO posts (title, content, author_id) VALUES
('初めてのブログ投稿', 'これはサンプルコンテンツです。アプリケーションの機能紹介をします。', 1);


-- =============================================
-- スキーマ定義完了
-- =============================================
