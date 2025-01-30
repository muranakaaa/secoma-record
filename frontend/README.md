## エリア一覧: /
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: アプリを開く (`/`)
    Frontend->>Backend: GET /api/areas
    Backend->>Database: エリア一覧を取得
    Database-->>Backend: エリア一覧を返す
    Backend-->>Frontend: JSONレスポンス
    Frontend-->>User: エリア一覧を表示
```

**レスポンス例**
```json
{
  "areas": [
    { "id": 1, "name": "札幌" },
    { "id": 2, "name": "釧路・阿寒・根室・川湯・屈斜路" },
    { "id": 3, "name": "帯広・十勝" }
  ]
}

```

## 詳細エリア一覧: /area/[id]
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: エリアを選択 (`/area/[id]`)
    Frontend->>Backend: GET /api/areas/:id
    Backend->>Database: 選択されたエリアの詳細エリア一覧を取得
    Database-->>Backend: 詳細エリア一覧を返す
    Backend-->>Frontend: JSONレスポンス
    Frontend-->>User: 詳細エリア一覧を表示
```

**レスポンス例**
```json
{
  "area": {
    "id": 1,
    "name": "札幌",
    "sub_areas": [
      { "id": 101, "name": "中央区" },
      { "id": 102, "name": "北区" },
      { "id": 103, "name": "東区" }
    ]
  }
}

```
## 店舗一覧: /shop
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: 詳細エリアを選択 (`/shop?area_id=X`)
    Frontend->>Backend: GET /api/shops?area_id=X
    Backend->>Database: 選択されたエリアの店舗一覧を取得
    Database-->>Backend: 店舗一覧を返す
    Backend-->>Frontend: JSONレスポンス
    Frontend-->>User: 店舗一覧を表示
```

**レスポンス例**
```json
{
  "shops": [
    {
      "id": 1001,
      "name": "セイコーマートあさの店",
      "address": "北海道札幌市中央区南４条西４-１１",
      "latitude": 43.055,
      "longitude": 141.345
    },
    {
      "id": 1002,
      "name": "セイコーマート帯広白樺通店",
      "address": "北海道帯広市西１９条南３丁目５５番２０号",
      "latitude": 42.923,
      "longitude": 143.197
    }
  ]
}
```

## 店舗詳細: /shop/[id]
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    participant GoogleAPI

    User->>Frontend: 店舗を選択 (`/shop/[id]`)
    Frontend->>Backend: GET /api/shops/:id
    Backend->>Database: 店舗詳細情報を取得
    Database-->>Backend: 店舗詳細情報を返す
    Backend->>GoogleAPI: GET Google Places API (店舗の追加情報取得)
    GoogleAPI-->>Backend: 店舗の詳細データを返す
    Backend-->>Frontend: JSONレスポンス
    Frontend-->>User: 店舗詳細を表示
```

**レスポンス例**
```json
{
  "shop": {
    "id": 1001,
    "name": "セイコーマートあさの店",
    "address": "北海道札幌市中央区南４条西４-１１",
    "latitude": 43.055,
    "longitude": 141.345,
    "photo_url": "https://maps.googleapis.com/.../photo_reference"
  }
}
```

## 検索結果: /search
