# コトナビ開発・運用ガイド

この文書は、過去の会話を参照せずに開発・運用を開始するための入口です。認証情報は記載しません。

## サイトの目的

コトナビは「困りごとから、次の一歩へ。」を掲げ、生活上の困りごとを確認順に整理し、状況に合うスマホアプリ・公式情報・相談先を案内します。掲載料ではなく目的・利用条件との相性を優先し、広告・提携の有無で通常掲載の順位を変えません。

## 技術と主要ディレクトリ

- `app/page.tsx`: トップのテーマ、困りごと、サービス一覧とアフィリエイト枠
- `app/problems/data.ts`: `/problems/[slug]` の記事データ（追加・編集の中心）
- `app/guides/data.ts`: `/guides/[slug]` のガイドデータ
- `app/destinations.ts`: アプリ名から公式サイト・App Store・Google Playへのリンクを解決
- `app/problems/[slug]/`: 困りごと記事の共通表示
- `app/guides/[slug]/`: ガイドの共通表示
- `app/layout.tsx`, `app/google-analytics.tsx`, `app/analytics.tsx`: 共通レイアウトと計測
- `app/sitemap.ts`, `app/robots.ts`: sitemap・robots生成
- `worker/index.ts`: Cloudflare Worker。www転送、ステージングnoindex、`/neko`静的配信、イベント記録
- `public/neko/`: 本体と独立した「ねこ診断」。中身を依頼なしに編集しない
- `public/tsurutsuru/`, `public/app-ads.txt`: アプリ「つるつるにゃんこ」の静的ページ・広告宣言
- `tests/`: Node testによる回帰テスト
- `docs/handover/`: 編集方針、判断履歴、状態、運用記録

## 記事・テーマの変更

1. トップのテーマ・困りごと・候補サービスは `app/page.tsx` を編集する。
2. 詳細記事は `app/problems/data.ts` に一意な `slug` と `problemId` を追加する。個別記事では `steps`、`options`、`seoContent`、`notes`、`related`、`reviewedAt` を公式情報で確認する。
3. 長期的な解説ガイドは `app/guides/data.ts` に追加する。
4. ストア導線は `app/destinations.ts` に追加し、公式サイト・App Store・Google Playを確認する。
5. `problemId` とトップの困りごとのIDを一致させ、詳細CTAと関連リンクを確認する。
6. `app/sitemap.ts` はデータ配列を自動展開する。独立静的ページだけ明示追加する。
7. 最終確認日は実際に公式情報を再確認した日にだけ更新する。

詳細は [編集・掲載ルール](docs/handover/editorial-policy.md) と [記事状態](docs/handover/content-status.md) を参照してください。

## ローカル確認

Node.js 22.13以上を使用します。

```sh
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm test
```

`npm test` は内部でproduction buildも実行します。変更に応じてPC幅・スマホ幅、選択切替、外部リンク、`/problems/`、`/guides/`、独立静的ページも確認します。

## デプロイ

Cloudflare Workersのプロジェクト名は `kotonaviapp`。production build後、認証済みのWranglerで次を実行します。

```sh
npm run build
npx wrangler deploy --name kotonaviapp
```

Cloudflare認証はローカルのWrangler設定またはCloudflare側で行います。認証情報はリポジトリへ保存しません。デプロイ後は本番URL、変更対象URL、`robots.txt`、`sitemap.xml`を確認します。ステージングは `staging.kotonaviapp.com` で、`x-robots-tag: noindex, nofollow, noarchive` が必要です。

## 独立静的ページ

`public/neko/` などはNext.jsの共通レイアウトを通さない独立成果物です。`worker/index.ts` が `/neko` を `/neko/` に308転送し、`/neko/` を `/neko/index.html` として配信します。指定された配布物は中身を整形・翻訳せず、そのまま配置します。`/neko/` は独自GAを含むため本体側の計測を重ねません。

## 作業ルール

- 開始時に `git status --short` を確認し、既存の未コミット変更を編集・整形・stage・破棄しない。
- 推測で商品情報、制度、URL、提携状況を書かない。不明は「不明」と記録する。
- 公式サイト・公式ストア・公的機関を一次情報として確認する。
- 広告リンクには広告表示と `rel="nofollow sponsored"` を付ける。
- lint、TypeScript、production build、testを通してから、対象ファイルだけcommit・pushする。
- push後はGitHubのmain、デプロイ後は本番の実表示とHTTP状態を確認する。

## 引き継ぎ文書

- [編集・掲載ルール](docs/handover/editorial-policy.md)
- [決定事項](docs/handover/decisions.md)
- [記事・テーマ状態](docs/handover/content-status.md)
- [提携状況](docs/handover/affiliate-status.md)
- [日常運用](docs/handover/operations.md)
- [X投稿ログ](docs/handover/x-post-log.md)
- [現在の作業状況](docs/handover/current-status.md)
