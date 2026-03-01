# Auto Blog System

AI研究開発ブログを自動生成・公開するシステム。5つのAIエージェントが連携してブログ記事を企画から SEO 最適化まで自動処理し、Next.js で構築されたブログ UI に表示します。

**Live:** [auto-blog-system.vercel.app](https://auto-blog-system.vercel.app)

## Architecture

```
┌─────────────────────────────────────────────────┐
│                Agent Pipeline                    │
│                                                  │
│  Topic ─→ 企画 ─→ 執筆 ─→ 編集 ─→ 構成 ─→ SEO  │
│            │                              │      │
│            └──────────────────────────────→│      │
│                                    content/blogs/ │
└─────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│              Next.js Blog UI                     │
│                                                  │
│  /blogs          → カード一覧 + 検索 + フィルター │
│  /blogs/[slug]   → 個別記事ページ (Markdown)     │
└─────────────────────────────────────────────────┘
        │
        ▼
   Vercel (Production)
```

## Agent Team

| Agent | 役割 | 入力 → 出力 |
|-------|------|-------------|
| Planning (企画) | トピックから記事構成を企画 | トピック → BlogOutline |
| Writer (執筆) | 約3000文字の日本語本文を執筆 | BlogOutline → BlogDraft |
| Editor (編集) | 品質・正確性・自然さを校正 | BlogDraft → EditedBlog |
| Structure (構成) | 見出し・セクション構造を整理 | EditedBlog → StructuredBlog |
| SEO (SEO処理) | title, description, tags, slug 最適化 | StructuredBlog → FinalBlog |

各エージェントは Anthropic SDK (`@anthropic-ai/sdk`) を使用し、`BaseAgent` 抽象クラスを継承しています。

## Tech Stack

- **Frontend:** Next.js 16 (App Router) / TypeScript / Tailwind CSS v4
- **Markdown:** gray-matter + unified (remark/rehype)
- **Agent:** Anthropic SDK (Claude)
- **Deploy:** Vercel (SSG)
- **CI/CD:** GitHub Actions + Vercel Git Integration

## Getting Started

```bash
# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Build
npm run build
```

## Blog Generation

```bash
# .env.local に API キーを設定
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# デフォルトトピックで生成
npm run generate

# カスタムトピックで生成
npm run generate -- "量子コンピューティングとAIの融合"
```

生成された記事は `content/blogs/{date}-{slug}.md` に保存され、Next.js が自動的に読み込みます。

## Project Structure

```
├── agents/                 # Agent Team
│   ├── agents/             #   5つのエージェント実装
│   ├── prompts/            #   各エージェントのプロンプト
│   ├── utils/              #   ファイル書き出し・slug生成
│   ├── pipeline.ts         #   パイプラインオーケストレーター
│   └── runner.ts           #   CLI エントリポイント
├── content/blogs/          # Markdown ブログ記事
├── src/
│   ├── app/blogs/          # ブログページ (一覧・個別)
│   ├── components/         # UI コンポーネント
│   └── lib/                # データ取得・Markdown処理
└── .github/workflows/      # CI/CD
```

## Blog Categories

`研究動向` · `技術解説` · `論文レビュー` · `開発ツール` · `業界動向` · `チュートリアル`

## Deploy

GitHub の `main` ブランチに push すると Vercel が自動デプロイします。PR には Preview デプロイが作成されます。

## License

MIT
