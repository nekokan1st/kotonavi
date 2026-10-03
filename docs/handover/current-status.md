# 現在の作業状況

最終更新: 2026-10-04

## 直近の実装コミット

- コミット: `2c69bfb`（`ねこ診断のつるつるにゃんこ紹介をApp Storeリンクに変更`）
- 変更ファイル: `public/neko/index.html` のみ
- GitHub: `nekokan1st/kotonavi` の`main`へpush済み
- 内容: ねこ診断の結果ページにある「つるつるにゃんこ」の紹介枠をApp Storeリンクバナーへ変更

## 検証

- `npm run build`: 成功
- `npm test`: 成功（17テスト）
- `npm run lint`: 失敗。既存ソースに38エラー（主に内部遷移の`<a>`とeffect内setState）・8警告。今回追加したMarkdownにはエラーなし。
- `npx tsc --noEmit`: 失敗。Cloudflare型（`cloudflare:workers`、`Fetcher`、`D1Database`）がローカル型検査環境で解決されない。
- `npm run build`: 成功。
- `npm test`: 成功（17テスト）。

## 本番デプロイ

未完了。WranglerのCloudflare OAuthコールバックが`localhost:8976`へ戻る際に接続拒否となり、認証が完了しなかったため、`2c69bfb`の内容は本番へ反映されていません。Cloudflareプロジェクト名は`kotonaviapp`です。

## 作業ツリー

引き継ぎ文書作成開始時点で、以下は既存の未コミット変更です。内容を確認・編集・stage・破棄しないこと。

- `app/destinations.ts`
- `app/page.tsx`
- `app/problems/data.ts`
- `tests/app-chooser-regression.test.mjs`

## 未完了タスクと次の手順

1. Cloudflare認証を、OAuthコールバックを受け取れる環境または有効な非対話認証で再設定する。認証情報はリポジトリへ置かない。
2. `main`の最新を使って`npm run build`後、`npx wrangler deploy --name kotonaviapp`を実行する。
3. `https://kotonaviapp.com/neko/`で診断を最後まで進め、「App Storeで無料ダウンロード」ボタンの表示とApp Store遷移を確認する。
4. 本番ソースに新しいバナー文言・リンクがあることを確認し、この文書を更新する。
5. 既存未コミット変更の所有者・目的を人間が確認する。
6. lintの既存38エラーと、Cloudflare型が解決されないTypeScript設定を別作業で修正する。

## Claude側で再設定が必要なもの

### 1. GitHub

- リポジトリ: `nekokan1st/kotonavi`。オーナーアカウントは`nekokan1st`、公開リポジトリ、デフォルトブランチは`main`。
- 認証方式: remoteはHTTPS。グローバルGit設定でGitHub CLIのcredential helperを使い、GitHub CLIはmacOSのkeyringに保存された認証を参照する構成。設定場所は`~/.gitconfig`とGitHub CLIのkeyring。認証情報そのものはリポジトリにない。
- 注意: `/usr/local/bin/gh`は現在のCPUで実行できなかったため、2026-10-03のpushは一時配置したarm64版GitHub CLIをcredential helperとして使った。アカウントは`nekokan1st`。
- GitHub Actions: workflowは0件で、`.github/workflows`も存在しない。
- ブランチ保護: GitHub APIで`main`は「Branch not protected」。
- 関連リポジトリ: `nekokan1st`配下の参照可能なリポジトリ一覧を名称・説明で検索したが、「つるつる」「tsuru」「ねこ」「neko」に該当する別リポジトリは確認できなかった。別アカウントや参照権限のないリポジトリの有無は不明。

### 2. Cloudflare

- Worker名: `kotonaviapp`。
- GitHub/Workers Builds連携: リポジトリにActionsや連携設定はなく、Cloudflare管理画面へ入れないため自動デプロイの有無は不明。pushだけで本番反映されたことは確認できていない。
- これまで確認できたデプロイ方法: このMac上のローカルcheckoutで`npm run build`後、`npx wrangler deploy --name kotonaviapp`を実行。WranglerのブラウザOAuthでCloudflareへログインする方式だった。Wranglerのユーザー設定・ログはmacOSユーザー領域にあり、認証情報はリポジトリにない。現在はOAuth token取得が400となり`wrangler whoami`は「Not logged in」。
- staging: `worker/index.ts`はホスト名`staging.kotonaviapp.com`を判定し、同じWorkerコードで`x-robots-tag: noindex, nofollow, noarchive`を付ける。本番とステージングをどのroute・custom domain・deploy操作で割り当てているかはリポジトリに記録がなく不明。2026-10-04のHTTP確認ではstagingは200で、上記ヘッダーあり。
- バインディング名: `ASSETS`（静的asset fetch）、`IMAGES`（画像変換）。`worker/index.ts`には`DB`（D1）宣言もあるが、`.openai/hosting.json`の`d1`は`null`、生成済み`dist/server/wrangler.json`のD1一覧も空で、現デプロイに実体が設定されているか不明。
- 環境変数・シークレット: 生成済みWrangler設定の`vars`、KV、R2、Queues、Secrets Storeはいずれも空。Cloudflare管理画面だけに設定された値の有無は不明。
- `.openai/hosting.json`にはSites用project IDがあるが、Cloudflare Workerの認証情報ではない。

### 3. 定期実行

- 実行場所: Codexアプリのheartbeat自動化。設定ファイルは`~/.codex/automations/x/automation.toml`、自動化IDは`x`、名称は「コトナビ 日次X・外部リンク品質・週次候補発掘」。cronやGitHub Actionsではない。
- スケジュール: 日本時間の毎日8:00。毎日のX投稿・全外部リンク監視、月曜の本番/SEO点検、金曜の新規テーマ調査を一つのpromptで実行する。
- 現在の状態: `ACTIVE`。Claude側で同じ運用を開始する前に、二重投稿・二重監視を避けるためCodex側を停止または削除する必要がある。停止はまだ行っていない。

### 4. X（`@kotonaviapp`）

- 投稿方法: Codexの自動化から、ログイン済みブラウザを操作して投稿していた。会話上、利用者がブラウザでログイン後、確認なしで投稿してよい旨を許可している。完全な投稿履歴は[x-post-log.md](x-post-log.md)に未復元。
- X API: リポジトリと自動化設定にX API利用コードやキー設定名は確認できない。APIを別の場所で使っていたかは不明。
- Claude側では`@kotonaviapp`へブラウザで再ログインが必要。認証情報の保管場所・方式は不明。

### 5. Google系

- Search Console: プロパティ名、ドメインプロパティ/URLプレフィックスの別、所有者Googleアカウントの種別はいずれも不明。
- GA4: 測定IDは`G-3QE4Z77S21`。`app/layout.tsx`で本体へ、`public/neko/index.html`でねこ診断へ設定。
- AdSense: リポジトリにAdSenseタグ、publisher ID、申請・サイト登録の記録は確認できない。申請状況は不明。

### 6. 既存の未コミット変更4ファイル

- 作業目的: 新規3テーマ「荷物追跡・再配達」「書類スキャン」「睡眠記録」の追加と、既存「ごみ分別・収集日・粗大ごみ」記事の書き直し。
- `app/destinations.ts`: ヤマト運輸、郵便局、佐川急便、Adobe Scan、Google ドライブ、Sleep Cycle、熟睡アラームのApp Store/Google Playリンクを追加済み。
- `app/page.tsx`: 上記7アプリをモバイルアプリ一覧へ追加し、トップの3困りごと・候補比較を追加。ごみ分別のトップ文言と手順も更新済み。
- `app/problems/data.ts`: 3件の詳細記事、SEO補足、注意点、関連リンクを追加。ごみ分別記事に補足本文を追加し、最終確認日を2026-09-19へ更新済み。
- `tests/app-chooser-regression.test.mjs`: 3テーマの詳細導線、候補順、ストアIDの存在と重複を検査する回帰テストを追加済み。
- 進捗: 実装と回帰テスト追加までは完了しており、2026-10-03の`npm run build`と17テストは成功。4ファイルは未commit・未push・未deploy。
- 残作業: 人間による内容確認、外部リンク再確認、lint/TypeScriptの既存問題の扱い決定、4ファイルだけのcommit・push、本番deploy、公開後確認。
- 公式情報確認: コードには各公式サイトと両ストアURLが入り、テストでストアURL形式とiOS ID重複を確認している。ただし、各リンクをいつ・誰が公式ページで再確認したかの監査記録はないため、最新の公式情報を確認済みとは断定できず不明。commit前に再確認する。

### 7. PLAY LAB

- 導入時の場所: `app/page.tsx`の`gamePicks`と`<section className="game-lab">`、スタイルは`app/globals.css`。独立ルートではなくトップページ内のセクションだった（導入コミット`08d02f2`）。
- 現在のコード: `5e0fb67`以降の現行`main`には`gamePicks`、`game-lab`、`PLAY LAB`が存在しない。専用ルートもない。
- 本番表示: 2026-10-04に本番トップのHTMLを確認し、`PLAY LAB`および見出し「ゲームアプリを、条件から選ぶ」は検出されなかった。現在は本番非表示。

### その他

- ASP: A8.net、もしもアフィリエイト、バリューコマースの管理画面上の最新状態と認証方式は[affiliate-status.md](affiliate-status.md)記載のとおり一部不明。Claude側で各管理画面を再確認する。
