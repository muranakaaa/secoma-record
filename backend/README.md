## API エンドポイント

### **認証**
| メソッド | エンドポイント | 説明 |
|----------|--------------|------|
| POST     | `/api/auth/sign_in` | ログイン |
| DELETE   | `/api/auth/sign_out` | ログアウト |
| POST     | `/api/auth` | ユーザー登録 |

### **ユーザー関連**
| メソッド | エンドポイント | 説明 |
|----------|--------------|------|
| GET      | `/api/v1/current/users` | ログイン中のユーザー取得 |

### **店舗関連**
| メソッド | エンドポイント | 説明 |
|----------|--------------|------|
| GET      | `/api/v1/shops` | 店舗一覧取得 |
| GET      | `/api/v1/shops/:id` | 店舗詳細取得 |
| PUT      | `/api/v1/shops/update_places_info` | Google Placesデータ更新 |

### **訪問記録関連**
| メソッド | エンドポイント | 説明 |
|----------|--------------|------|
| GET      | `/api/v1/visits` | 訪問記録一覧取得 |
| POST     | `/api/v1/visits` | 訪問記録作成 |
| PUT      | `/api/v1/visits/:id` | 訪問記録更新 |
| DELETE   | `/api/v1/visits/:id` | 訪問記録削除 |
