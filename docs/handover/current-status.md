# 現在の作業状況

最終更新: 2026-10-11（Claude）

## 運用体制

- 2026-10-05から開発・運用はClaudeが担当。Codexの自動化`x`は2026-10-11に削除済み。
- ClaudeのGitHub連携・GitHub Appは設定済み（2026-10-11）。
- Claudeの作業環境からは npm レジストリと Google Play に接続できない。build・testはGitHub Actions（`.github/workflows/ci-deploy.yml`）で実行する。

## デプロイ

- 方式: `main`へのpushでGitHub Actionsが `npm test` → `npm run build` → `npx wrangler deploy --name kotonaviapp` → 本番スモーク確認を実行する。PRではtestのみ。
- 必要なGitHub Secrets: `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`（値は利用者がGitHubに登録。リポジトリには書かない）。
- 未登録の間は、利用者のMacで `npx wrangler login && npm run build && npx wrangler deploy --name kotonaviapp` を実行する。
- `2c69bfb`（ねこ診断のApp Storeバナー）は本番未反映。次回デプロイで反映される。

## 直近の変更（Claude、未push）

- 新規3テーマ「荷物追跡・再配達」「書類スキャン」「睡眠記録」とごみ分別記事の書き直し（Codex作業分を引き継ぎ）。
- 2026-10-05にClaudeが確認した内容:
  - 7アプリのApp Store ID: 全件、該当アプリ・提供元と一致。
  - Google PlayパッケージID: Claude環境から直接開けないため、第三者サイトの掲載で一致を確認（Google ドライブ・Adobe Scanは既知のID）。デプロイ後に本番から実際の遷移を確認する。
  - 公式ページ: ヤマト運輸アプリLP（追跡・受取変更・再配達の記載あり）、郵便局アプリ紹介（追跡・再配達・ゆうID）、佐川急便公式アプリのストア説明（通知はスマートクラブ会員ログインが必要）、Google ドライブのスキャン手順、Sleep Cycleダウンロードページ、熟睡アラーム機能紹介（有料版あり）を確認。
  - Adobeの公式ページ（`https://www.adobe.com/jp/acrobat/mobile.html`）はClaude環境から読めず未確認。
- `reviewedAt`: 荷物追跡・睡眠記録は2026-10-05に更新。書類スキャンはAdobe公式ページ未確認のため2026-09-19のまま。ごみ分別は今回未再確認のため2026-09-19のまま。

## 既知の問題

- `npm run lint`: 既存ソースに38エラー・8警告。CIでは実行していない。別作業で修正する。
- `npx tsc --noEmit`: Cloudflare型（`cloudflare:workers`、`Fetcher`、`D1Database`）が解決されず失敗。CIでは実行していない。
- AdSense: タグ・publisher ID・申請記録なし。利用者によると未申請。

## 次の手順

1. 済（2026-10-11）: Claude GitHub Appのインストール、GitHub Secretsへの`CLOUDFLARE_API_TOKEN`・`CLOUDFLARE_ACCOUNT_ID`登録。Codex自動化`x`は削除済み。
2. Claude: 変更をpushし、Actionsの結果と本番表示（新3記事、`/neko/`のバナー）を確認。
3. Claude: AdSense申請に向けたサイト整備。
4. Claude: 定期実行（リンク監視、月曜点検、金曜テーマ調査、週次のX投稿下書き）を設定。

## 参考情報（Codexからの引き継ぎ時点）

- GitHub: 公開リポジトリ、デフォルトブランチ`main`、ブランチ保護なし。
- Cloudflare（2026-10-11に利用者の管理画面で確認）: 本番はWorker `kotonaviapp`（`kotonaviapp.com`ほか1ルート）、ステージングは別Worker `kotonaviapp-staging`（`staging.kotonaviapp.com`ほか1ルート）。ほかに`site-creator-vinext-starter`（workers.devのみ、生成設定の既定名で作られたと思われる）がある。ドメイン登録・DNSもCloudflare。Workerコードはホスト名がstagingのとき`x-robots-tag: noindex, nofollow, noarchive`を付与。GitHub Actionsは本番`kotonaviapp`だけにデプロイする。バインディングは`ASSETS`、`IMAGES`。`DB`（D1）は型宣言のみで、`.openai/hosting.json`の`d1`は`null`。
- GA4: `G-3QE4Z77S21`（本体は`app/layout.tsx`、ねこ診断は`public/neko/index.html`）。
- Search Console: プロパティ形式・所有者は不明。
- X（`@kotonaviapp`）: 以前はCodexがログイン済みブラウザで投稿。今後は運用ドキュメントのとおりClaudeが下書きを作り、利用者が予約投稿する。
- PLAY LAB: `5e0fb67`（2026-08-23）でトップページから削除済み。本番にも表示されていない。
