"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ThemeId = "daily" | "home" | "leisure" | "work" | "family" | "health" | "money" | "parenting" | "digital" | "mobility" | "food" | "pets" | "support";
type Service = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  fit: string;
  why?: string;
  watch?: string;
  price: string;
  access: string;
  href: string;
  accent: string;
  sponsored?: boolean;
  affiliate?: boolean;
  affiliateImpression?: string;
};

const mobileAppNames = new Set([
  "Peatix", "Google フォト", "入退去メモ", "UCHITAS", "Cabinote",
  "Misoca", "Toggl Track", "GOOSE", "つなぐノート",
  "マネーフォワード ME", "保険簿", "母子モ", "TimeTree", "Google One バックアップ",
  "Yahoo!乗換案内", "GO", "akippa", "ecbo cloak", "クラシル", "くふう トクバイ",
  "TABETE", "Yieto 2", "ぺとログ", "PetBacker",
  "Yahoo!防災速報", "特務機関NERV防災", "Yahoo!天気", "tenki.jp", "トリセツ",
  "お薬手帳プラス", "頭痛ーる", "CLINICS", "Zaim", "Moneytree", "OsidOri",
  "ぴよログ", "家族アルバム みてね", "Google Authenticator", "Whoscall",
  "ジョルダン乗換案内", "乗換NAVITIME", "クックパッド", "DELISH KITCHEN", "Shufoo!",
  "さんあ〜る", "EPARKお薬手帳", "Google Keep",
]);

export type AppDestinations = { official?: string; ios?: string; android?: string };
export const directStoreLinks: Record<string, AppDestinations> = {
  "詐欺バスターLITE": { ios: "https://apps.apple.com/jp/app/id6756911225" },
  "Apple『探す』": { ios: "https://apps.apple.com/jp/app/%E6%8E%A2%E3%81%99/id1514844621?platform=ipad" },
  "Google デバイスを探す": { android: "https://play.google.com/store/apps/details?id=com.google.android.apps.adm" },
  "Peatix": { ios: "https://apps.apple.com/jp/app/id561632513", android: "https://play.google.com/store/apps/details?id=com.peatix.android.Azuki" },
  "Google フォト": { ios: "https://apps.apple.com/jp/app/id962194608", android: "https://play.google.com/store/apps/details?id=com.google.android.apps.photos" },
  "入退去メモ": { ios: "https://apps.apple.com/jp/app/%E5%85%A5%E9%80%80%E5%8E%BB%E3%83%A1%E3%83%A2/id6767765025" },
  "UCHITAS": { ios: "https://apps.apple.com/jp/app/id1453357489" },
  "Cabinote": { ios: "https://apps.apple.com/jp/app/%E6%8C%81%E3%81%A1%E7%89%A9-%E5%AE%B6%E8%B2%A1%E7%AE%A1%E7%90%86%E6%95%B4%E7%90%93%E4%BF%9D%E8%A8%BC%E6%9B%B8-cabinote/id6755080718" },
  "Misoca": { ios: "https://apps.apple.com/jp/app/id1026534800", android: "https://play.google.com/store/apps/details?id=jp.misoca.misoca" },
  "Toggl Track": { ios: "https://apps.apple.com/jp/app/id1291898086" },
  "GOOSE": { ios: "https://apps.apple.com/jp/app/id1565305966", android: "https://play.google.com/store/apps/details?id=jp.co.tsunamamo.kalert" },
  "つなぐノート": { ios: "https://apps.apple.com/jp/app/id6451205576" },
  "マネーフォワード ME": { ios: "https://apps.apple.com/jp/app/id594145971", android: "https://play.google.com/store/apps/details?id=com.moneyforward.android.app" },
  "保険簿": { ios: "https://apps.apple.com/jp/app/id1447375500", android: "https://play.google.com/store/apps/details?id=com.ib.hokenbo" },
  "母子モ": { ios: "https://apps.apple.com/jp/app/id1106750564", android: "https://play.google.com/store/apps/details?id=jp.co.mti.BoshiAuthorize" },
  "TimeTree": { ios: "https://apps.apple.com/jp/app/id952578473", android: "https://play.google.com/store/apps/details?id=works.jubilee.timetree" },
  "Google One バックアップ": { ios: "https://apps.apple.com/jp/app/id1451784328", android: "https://play.google.com/store/apps/details?id=com.google.android.apps.subscriptions.red" },
  "Yahoo!乗換案内": { ios: "https://apps.apple.com/jp/app/id291676451", android: "https://play.google.com/store/apps/details?id=jp.co.yahoo.android.apps.transit" },
  "GO": { ios: "https://apps.apple.com/jp/app/id1254341709", android: "https://play.google.com/store/apps/details?id=com.dena.automotive.taxibell" },
  "akippa": { ios: "https://apps.apple.com/jp/app/id894446397" },
  "ecbo cloak": { ios: "https://apps.apple.com/jp/app/id1443707795", android: "https://play.google.com/store/apps/details?id=io.ecbo.cloak" },
  "クラシル": { ios: "https://apps.apple.com/jp/app/id1059134258", android: "https://play.google.com/store/apps/details?id=com.kurashiru" },
  "くふう トクバイ": { ios: "https://apps.apple.com/jp/app/id1124772645", android: "https://play.google.com/store/apps/details?id=jp.co.tokubai.android.bargain" },
  "TABETE": { ios: "https://apps.apple.com/jp/app/id1392919676", android: "https://play.google.com/store/apps/details?id=me.tabete.tabete" },
  "Yieto 2": { ios: "https://apps.apple.com/jp/app/id6745941580" },
  "ぺとログ": { ios: "https://apps.apple.com/jp/app/id6756508276", android: "https://play.google.com/store/apps/details?id=jp.nooon.petlog" },
  "PetBacker": { ios: "https://apps.apple.com/jp/app/id1168037472", android: "https://play.google.com/store/apps/details?id=com.petbacker.android" },
  "Yahoo!防災速報": { ios: "https://apps.apple.com/jp/app/id481914139", android: "https://play.google.com/store/apps/details?id=jp.co.yahoo.android.emg" },
  "特務機関NERV防災": { ios: "https://apps.apple.com/jp/app/id1472338480", android: "https://play.google.com/store/apps/details?id=app.nerv" },
  "Yahoo!天気": { ios: "https://apps.apple.com/jp/app/id521974902" },
  "tenki.jp": { ios: "https://apps.apple.com/jp/app/id433865746", android: "https://play.google.com/store/apps/details?id=jwa.or.jp.tenkijp3" },
  "トリセツ": { ios: "https://apps.apple.com/jp/app/id1085923883", android: "https://play.google.com/store/apps/details?id=com.trygle.instructionmanualapp" },
  "お薬手帳プラス": { ios: "https://apps.apple.com/jp/app/id947740067", android: "https://play.google.com/store/apps/details?id=jp.co.nicho.jpokusuri" },
  "頭痛ーる": { ios: "https://apps.apple.com/jp/app/id602991338", android: "https://play.google.com/store/apps/details?id=jp.co.pocke.android.zutsu" },
  "CLINICS": { ios: "https://apps.apple.com/jp/app/id1106261604", android: "https://play.google.com/store/apps/details?id=life.medley.clinics" },
  "Zaim": { ios: "https://apps.apple.com/jp/app/id445850671", android: "https://play.google.com/store/apps/details?id=net.zaim.android" },
  "Moneytree": { ios: "https://apps.apple.com/jp/app/id586847189", android: "https://play.google.com/store/apps/details?id=jp.moneytree.moneytree" },
  "OsidOri": { ios: "https://apps.apple.com/jp/app/id1473751623" },
  "ぴよログ": { ios: "https://apps.apple.com/jp/app/id1252857347", android: "https://play.google.com/store/apps/details?id=jp.co.sakabou.piyolog" },
  "家族アルバム みてね": { ios: "https://apps.apple.com/jp/app/id935672069", android: "https://play.google.com/store/apps/details?id=us.mitene" },
  "Google Authenticator": { ios: "https://apps.apple.com/jp/app/id388497605", android: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" },
  "Whoscall": { ios: "https://apps.apple.com/jp/app/id929968679", android: "https://play.google.com/store/apps/details?id=gogolook.callgogolook2" },
  "ジョルダン乗換案内": { ios: "https://apps.apple.com/jp/app/id299490481", android: "https://play.google.com/store/apps/details?id=jp.co.jorudan.nrkj" },
  "乗換NAVITIME": { ios: "https://apps.apple.com/jp/app/id528532387" },
  "クックパッド": { ios: "https://apps.apple.com/jp/app/id340368403", android: "https://play.google.com/store/apps/details?id=com.cookpad.android.activities" },
  "DELISH KITCHEN": { android: "https://play.google.com/store/apps/details?id=tv.every.delishkitchen" },
  "Shufoo!": { ios: "https://apps.apple.com/jp/app/id373909230", android: "https://play.google.com/store/apps/details?id=com.toppan.shufoo.android" },
  "さんあ〜る": { ios: "https://apps.apple.com/jp/app/id977071564", android: "https://play.google.com/store/apps/details?id=jp.co.delight_system.threeR.android" },
  "EPARKお薬手帳": { ios: "https://apps.apple.com/jp/app/id952969231", android: "https://play.google.com/store/apps/details?id=jp.epark.medicinenote" },
  "Google Keep": { ios: "https://apps.apple.com/jp/app/id1029207872", android: "https://play.google.com/store/apps/details?id=com.google.android.keep" },
};
const isStoreUrl = (url: string) => url.includes("apps.apple.com/") || url.includes("play.google.com/store/apps/");
const destinationsFor = (service: Service): AppDestinations => {
  const stores = directStoreLinks[service.name] ?? {};
  return { official: isStoreUrl(service.href) ? undefined : service.href, ...stores };
};

const disasterKitAffiliateUrl = "https://rpx.a8.net/svt/ejp?a8mat=4BA39A+BFEJSI+2HOM+BW8O1&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0ea62065.34400275.0ea62066.204f04c0%2Fa26081143426_4BA39A_BFEJSI_2HOM_BW8O1%3Fpc%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Firisplaza-r%252F288353%252F%26m%3Dhttps%253A%252F%252Fitem.rakuten.co.jp%252Firisplaza-r%252F288353%252F";
const misocaAffiliateUrl = "https://px.a8.net/svt/ejp?a8mat=4BA4T7+BRWNHU+2ZJ4+BW8O2&a8ejpredirect=https%3A%2F%2Fwww.misoca.jp%2F";
const misocaAffiliateImpressionUrl = "https://www11.a8.net/0.gif?a8mat=4BA4T7+BRWNHU+2ZJ4+BW8O2";
const disasterKitProblemIds = new Set([
  "daily-emergency", "family-basics", "family-medical-share", "family-absence", "family-emergency",
]);
export type Problem = {
  id: string;
  theme: ThemeId;
  phase: string;
  eyebrow: string;
  title: string;
  description: string;
  duration: string;
  tasks: { id: string; title: string; note: string; timing: string }[];
  services: Service[];
};
type Theme = {
  id: ThemeId;
  label: string;
  mark: string;
  description: string;
  available: boolean;
  phases: { id: string; label: string; short: string }[];
};

const themes: Theme[] = [
  {
    id: "daily",
    label: "日常生活",
    mark: "日",
    description: "探し物・片づけ・契約・安全",
    available: true,
    phases: [
      { id: "now", label: "今すぐ困っている", short: "探す・対処" },
      { id: "organize", label: "片づけたい", short: "捨てる・整理" },
      { id: "review", label: "見直したい", short: "契約・家計" },
      { id: "prepare", label: "備えたい", short: "防犯・防災" },
    ],
  },
  {
    id: "home",
    label: "引越し・住まい",
    mark: "住",
    description: "探す・入居・暮らす・退去",
    available: true,
    phases: [
      { id: "before", label: "引越し前", short: "探す・契約" },
      { id: "movein", label: "入居するとき", short: "記録・開始" },
      { id: "living", label: "暮らしている間", short: "管理・備える" },
      { id: "moveout", label: "退去するとき", short: "解約・片づけ" },
    ],
  },
  {
    id: "work",
    label: "仕事・フリーランス",
    mark: "仕",
    description: "受注・進行・納品・振り返り",
    available: true,
    phases: [
      { id: "accept", label: "依頼を受ける前", short: "確認・見積もり" },
      { id: "doing", label: "仕事を進める", short: "記録・合意" },
      { id: "deliver", label: "納品・請求する", short: "提出・回収" },
      { id: "review", label: "仕事を見直す", short: "収支・改善" },
    ],
  },
  {
    id: "family",
    label: "家族・もしも",
    mark: "家",
    description: "平時・入院・緊急時・引継ぎ",
    available: true,
    phases: [
      { id: "normal", label: "元気なうちに", short: "整理・共有" },
      { id: "absence", label: "入院・長期不在", short: "生活を引継ぐ" },
      { id: "emergency", label: "急なもしも", short: "確認・連絡" },
      { id: "after", label: "その後の手続き", short: "解約・整理" },
    ],
  },
  {
    id: "health",
    label: "健康・介護",
    mark: "健",
    description: "症状・受診・薬・介護",
    available: true,
    phases: [
      { id: "symptom", label: "体調が悪い", short: "判断・相談" },
      { id: "visit", label: "受診したい", short: "探す・予約" },
      { id: "manage", label: "健康を管理する", short: "薬・医療費" },
      { id: "care", label: "介護を考える", short: "相談・比較" },
    ],
  },
  {
    id: "money",
    label: "お金・契約",
    mark: "金",
    description: "家計・保険・税金・相談",
    available: true,
    phases: [
      { id: "budget", label: "家計を知る", short: "収支・固定費" },
      { id: "protect", label: "保険を整理する", short: "補償・請求" },
      { id: "tax", label: "税金を手続きする", short: "準備・申告" },
      { id: "trouble", label: "契約で困った", short: "確認・相談" },
    ],
  },
  {
    id: "parenting",
    label: "子育て・学び",
    mark: "育",
    description: "健康・預け先・成長・予定",
    available: true,
    phases: [
      { id: "sick", label: "急な体調不良", short: "相談・受診" },
      { id: "find", label: "預け先を探す", short: "保育・一時利用" },
      { id: "grow", label: "成長を記録する", short: "健診・予防接種" },
      { id: "schedule", label: "家族で回す", short: "予定・分担" },
    ],
  },
  {
    id: "digital",
    label: "デジタル・安全",
    mark: "電",
    description: "アカウント・詐欺・紛失・保存",
    available: true,
    phases: [
      { id: "account", label: "アカウントを守る", short: "認証・整理" },
      { id: "scam", label: "怪しい連絡が来た", short: "確認・報告" },
      { id: "lost", label: "端末をなくした", short: "探す・保護" },
      { id: "backup", label: "データを守る", short: "保存・復旧" },
    ],
  },
  {
    id: "leisure",
    label: "遊び・趣味",
    mark: "遊",
    description: "探す・計画・参加・記録",
    available: true,
    phases: [
      { id: "find", label: "楽しみを探す", short: "発見・比較" },
      { id: "plan", label: "予定を立てる", short: "日程・予約" },
      { id: "join", label: "参加する", short: "準備・同行" },
      { id: "keep", label: "思い出を残す", short: "写真・記録" },
    ],
  },
  {
    id: "mobility",
    label: "移動・外出",
    mark: "移",
    description: "遅延・配車・駐車・荷物",
    available: true,
    phases: [
      { id: "delay", label: "電車が止まった", short: "確認・迂回" },
      { id: "ride", label: "すぐ移動したい", short: "配車・予約" },
      { id: "parking", label: "車で出かける", short: "駐車・決済" },
      { id: "luggage", label: "荷物が邪魔", short: "預ける・受取る" },
    ],
  },
  {
    id: "food",
    label: "食事・家事",
    mark: "食",
    description: "献立・買い物・食品ロス・分担",
    available: true,
    phases: [
      { id: "cook", label: "献立に迷う", short: "食材・レシピ" },
      { id: "shop", label: "買い物をする", short: "価格・チラシ" },
      { id: "rescue", label: "食品ロスを減らす", short: "発見・受取" },
      { id: "chores", label: "家事を分ける", short: "可視化・分担" },
    ],
  },
  {
    id: "pets",
    label: "ペット",
    mark: "ペ",
    description: "健康・病院・留守番・迷子",
    available: true,
    phases: [
      { id: "health", label: "健康を記録する", short: "体重・投薬" },
      { id: "hospital", label: "病院を探す", short: "受診・相談" },
      { id: "sitter", label: "留守番を頼む", short: "比較・予約" },
      { id: "missing", label: "迷子になった", short: "連絡・捜索" },
    ],
  },
  {
    id: "support",
    label: "相談・人間関係",
    mark: "相",
    description: "こころ・法律・孤独・家庭",
    available: true,
    phases: [
      { id: "mind", label: "心がつらい", short: "話す・相談" },
      { id: "legal", label: "法的に困った", short: "制度・窓口" },
      { id: "alone", label: "誰かに聞いてほしい", short: "チャット・電話" },
      { id: "home", label: "家庭で不安がある", short: "安全・支援" },
    ],
  },
];

const problems: Problem[] = [
  {
    id: "daily-lost", theme: "daily", phase: "now", eyebrow: "気づいたらすぐに",
    title: "落とし物を効率よく探したい",
    description: "最後に使った場所、移動経路、連絡先を順番に整理し、同じ問い合わせを繰り返さずに探します。",
    duration: "所要 10分",
    tasks: [
      { id: "daily-route", title: "最後に確認した時刻と場所を書く", note: "曖昧でも時間帯と移動経路を残します。", timing: "すぐ" },
      { id: "daily-stop", title: "立ち寄った施設と交通機関へ確認する", note: "色・形・中身など識別できる特徴を伝えます。", timing: "当日" },
      { id: "daily-police", title: "見つからなければ遺失届を確認する", note: "カードや端末は利用停止も並行します。", timing: "当日" },
    ], services: [
      { name: "警察庁 落とし物の届出・検索", category: "公的案内・オンライン手続", description: "都道府県警察ごとの遺失届と、警察に届いた拾得物の検索窓口を案内。対応地域ではオンライン届出も可能。", tags: ["全国案内", "遺失届", "拾得物検索"], fit: "落とした場所や地域から探したい", price: "無料", access: "Webで地域を選択", href: "https://www.npa.go.jp/bureau/soumu/ishitsubutsu/ishitsu-todokedekensaku.html", accent: "#275a88" },
    ],
  },
  {
    id: "daily-dispose", theme: "daily", phase: "organize", eyebrow: "捨てる前に分類",
    title: "大きな家具や家電の処分方法を知りたい",
    description: "自治体回収、家電リサイクル、譲渡や買取のどれが使えるかを品目ごとに切り分けます。",
    duration: "所要 15分",
    tasks: [
      { id: "daily-item", title: "品目・大きさ・状態を記録する", note: "型番や製造年も分かれば控えます。", timing: "最初に" },
      { id: "daily-rule", title: "自治体とリサイクル対象のルールを確認する", note: "通常の粗大ごみで出せない品目があります。", timing: "申込前" },
      { id: "daily-book", title: "費用と搬出方法を比べて予約する", note: "自力搬出が難しい場合は運び出し条件も確認。", timing: "希望日の前" },
    ], services: [
      { name: "環境省 家電リサイクル案内", category: "公的案内", description: "家電4品目、小型家電、粗大ごみを正しく処分するための区分と、無許可回収業者への注意点を確認。", tags: ["家電4品目", "自治体ルール", "不用品処分"], fit: "処分方法の区分から確認したい", price: "閲覧無料", access: "Webで確認", href: "https://www.env.go.jp/recycle/kaden/tvrecycle.html", accent: "#368665" },
      { name: "さんあ〜る", category: "ごみ分別・収集日通知アプリ", description: "対応自治体のごみ収集日、分別方法、品目検索、自治体からのお知らせを確認できるアプリ。", tags: ["ごみ収集日", "分別検索", "対応自治体"], fit: "住んでいる自治体のごみ出し日と分別をスマホで確認したい", why: "地域設定に合わせて収集日と分別ルールを確認できる", watch: "利用できる自治体か、初回設定時に必ず確認", price: "無料", access: "アプリで利用", href: "https://threer.delight-system.co.jp/", accent: "#4c9a72" },
    ],
  },
  {
    id: "daily-subscriptions", theme: "daily", phase: "review", eyebrow: "月に一度の棚卸し",
    title: "使っていない定額サービスを整理したい",
    description: "明細から継続課金を拾い、残す・下げる・解約するに分けて固定費を見直します。",
    duration: "所要 20分",
    tasks: [
      { id: "daily-statements", title: "カードと口座の明細を3か月分見る", note: "年払いのサービスもメモします。", timing: "最初に" },
      { id: "daily-use", title: "最終利用日と代替手段を確認する", note: "家族が利用していないかも確認します。", timing: "解約前" },
      { id: "daily-cancel", title: "解約日と完了画面を保存する", note: "利用期限とデータの扱いも控えます。", timing: "手続き時" },
    ], services: [
      { name: "消費者庁 サブスク注意情報", category: "公的案内", description: "サブスクリプションの契約内容、更新、解約方法を見直す際に確認したい公式の注意情報。", tags: ["契約確認", "解約", "消費者保護"], fit: "解約条件や表示に不安がある", price: "閲覧無料", access: "Webで確認", href: "https://www.caa.go.jp/policies/policy/consumer_research/international_affairs/icpen_2023/", accent: "#c97937" },
    ],
  },
  {
    id: "daily-emergency", theme: "daily", phase: "prepare", eyebrow: "まず3日分から",
    title: "災害時に必要なものと連絡方法を整えたい",
    description: "水や電源だけでなく、服薬、避難先、家族との連絡ルールまで生活に合わせて準備します。",
    duration: "初回 30分",
    tasks: [
      { id: "daily-risk", title: "自宅周辺の避難先とリスクを確認する", note: "昼と夜の移動方法も考えます。", timing: "今週" },
      { id: "daily-stock", title: "家にある備蓄を数える", note: "人数、薬、ペット用品も含めます。", timing: "今週" },
      { id: "daily-contact", title: "家族の集合場所と連絡方法を決める", note: "電話がつながらない前提で決めます。", timing: "準備時" },
    ], services: [
      { name: "ハザードマップポータル", category: "国土交通省・国土地理院", description: "住所や現在地から洪水、土砂災害、高潮、津波などのリスクと自治体のハザードマップを確認。", tags: ["住所検索", "避難先", "災害リスク"], fit: "自宅や勤務先周辺の危険を知りたい", price: "無料", access: "登録不要で利用", href: "https://disaportal.gsi.go.jp/", accent: "#2876a8" },
      { name: "Yahoo!防災速報", category: "防災情報通知", description: "現在地と登録地点の地震、豪雨、避難情報、Jアラートなどを通知。", tags: ["災害通知", "登録地点", "防災手帳"], fit: "自宅や家族の地域の災害情報を受け取りたい", watch: "通知には位置情報・通知設定が必要。避難判断は自治体の最新情報を優先", price: "無料", access: "アプリで利用", href: "https://emg.yahoo.co.jp/", accent: "#e15b4b" },
      { name: "特務機関NERV防災", category: "防災気象情報", description: "地震・津波・噴火・大雨などを、現在地や登録地点に合わせて配信。", tags: ["地震速報", "雨雲", "音声読み上げ"], fit: "災害情報を地図と通知で詳しく確認したい", watch: "重大な通知には位置情報など端末側の設定が必要", price: "無料・任意の有料支援あり", access: "アプリで利用", href: "https://nerv.app/", accent: "#222b34" },
      { name: "Yahoo!天気", category: "天気・防災", description: "雨雲レーダー、警報、台風、地域ごとの天気を確認。", tags: ["雨雲レーダー", "警報", "台風"], fit: "日常の天気と急な雨を同じアプリで確認したい", watch: "避難情報は自治体・気象庁の最新発表も確認", price: "無料", access: "アプリで利用", href: "https://weather.yahoo.co.jp/weather/promo/app/", accent: "#4c8bd9" },
      { name: "tenki.jp", category: "日本気象協会公式", description: "天気、雨雲、台風、地震、防災情報を地域ごとに確認。", tags: ["天気予報", "防災情報", "日本気象協会"], fit: "気象情報と防災情報をまとめて見たい", watch: "警報時は自治体の避難情報も確認", price: "無料版あり", access: "アプリで利用", href: "https://tenki.jp/pr/app-lp.html", accent: "#287cb9" },
    ],
  },
  {
    id: "leisure-find", theme: "leisure", phase: "find", eyebrow: "空いた時間から探す",
    title: "休日に何をするか決めたい",
    description: "時間、予算、移動距離、誰と行くかを先に決め、候補を増やしすぎずに選びます。",
    duration: "所要 10分",
    tasks: [
      { id: "leisure-conditions", title: "使える時間と予算を決める", note: "移動時間も含めて考えます。", timing: "最初に" },
      { id: "leisure-mood", title: "屋内・屋外と気分を選ぶ", note: "休みたい、体を動かしたいなど一言で。", timing: "最初に" },
      { id: "leisure-shortlist", title: "候補を3つまでに絞る", note: "営業時間と当日参加の可否を確認します。", timing: "決定前" },
    ], services: [
      { name: "Peatix", category: "イベント・体験検索", description: "場所、カテゴリー、キーワード、開催時期、オンライン開催などを組み合わせてイベントを検索。", tags: ["イベント検索", "地域", "当日候補"], fit: "新しい体験やコミュニティを探したい", price: "検索無料", access: "Web・アプリ", href: "https://feature.peatix.com/discover", accent: "#00a0df" },
    ],
  },
  {
    id: "leisure-plan", theme: "leisure", phase: "plan", eyebrow: "みんなの予定を一度で",
    title: "友人との日程調整を簡単にしたい",
    description: "候補日、締切、場所の条件を一つにまとめ、個別メッセージの往復を減らします。",
    duration: "所要 5分",
    tasks: [
      { id: "leisure-dates", title: "候補日を3〜5日に絞る", note: "開始時間の幅も示します。", timing: "募集前" },
      { id: "leisure-deadline", title: "回答期限を決めて共有する", note: "未回答の扱いも添えます。", timing: "共有時" },
      { id: "leisure-confirm", title: "決定事項を一つの場所にまとめる", note: "日時、場所、予約名を残します。", timing: "決定後" },
    ], services: [
      { name: "TimeRex", category: "日程調整", description: "候補日を提示する調整や、複数人の出欠を確認して日程を確定するためのWebサービス。", tags: ["複数人", "候補日", "カレンダー連携"], fit: "個別連絡の往復を減らしたい", price: "無料プランあり", access: "Webで利用", href: "https://timerex.net/", accent: "#4667d8" },
    ],
  },
  {
    id: "leisure-join", theme: "leisure", phase: "join", eyebrow: "前日までに確認",
    title: "イベント当日の忘れ物や遅刻を防ぎたい",
    description: "チケット、本人確認、会場ルール、移動時間を順番に確認して当日の不安を減らします。",
    duration: "所要 10分",
    tasks: [
      { id: "leisure-ticket", title: "チケットと本人確認条件を確認する", note: "電子チケットは端末の充電も確認します。", timing: "前日" },
      { id: "leisure-route", title: "入場時刻から逆算して経路を決める", note: "混雑や乗換時間に余裕を持ちます。", timing: "前日" },
      { id: "leisure-rules", title: "持込み・撮影・荷物のルールを見る", note: "会場の公式案内を優先します。", timing: "出発前" },
    ], services: [
      { name: "Peatix 参加者ヘルプ", category: "イベント参加ガイド", description: "チケットの確認、イベント参加、主催者への連絡など、Peatix掲載イベントの当日までの操作を確認。", tags: ["電子チケット", "参加方法", "公式ヘルプ"], fit: "Peatixのイベントへ参加する", price: "閲覧無料", access: "Webで確認", href: "https://help-attendee.peatix.com/ja-JP/support/home", accent: "#00a0df" },
    ],
  },
  {
    id: "leisure-photos", theme: "leisure", phase: "keep", eyebrow: "熱が冷めないうちに",
    title: "旅行やイベントの写真を見返せる形にしたい",
    description: "重複を減らし、日付や出来事でまとめ、同行者にも共有しやすいアルバムを作ります。",
    duration: "所要 20分",
    tasks: [
      { id: "leisure-import", title: "全員の写真を一か所に集める", note: "元画質で受け取る期限を決めます。", timing: "当日〜翌日" },
      { id: "leisure-select", title: "似た写真と失敗写真を整理する", note: "お気に入りを先に選ぶと進めやすくなります。", timing: "1週間以内" },
      { id: "leisure-album", title: "日付と出来事でアルバムを分ける", note: "同行者が探しやすい名前を付けます。", timing: "整理後" },
    ], services: [
      { name: "Google フォト", category: "写真整理・共有", description: "写真や動画のバックアップ、検索、アルバム作成、アプリを使っていない相手への共有にも対応。", tags: ["共有アルバム", "検索", "バックアップ"], fit: "旅行やイベント写真をまとめて共有したい", price: "無料容量あり", access: "Googleアカウントで利用", href: "https://www.google.com/intl/ja/photos/about/", accent: "#4285f4" },
    ],
  },
  {
    id: "choose-mover", theme: "home", phase: "before", eyebrow: "1〜2か月前がおすすめ",
    title: "引越し業者と見積もりを整理したい",
    description: "金額だけでなく、作業範囲・補償・時間指定・追加料金を同じ基準で比較します。",
    duration: "所要 30分",
    tasks: [
      { id: "home-inventory", title: "荷物量と大型家具を整理する", note: "各社へ同じ条件を伝える準備です。", timing: "見積もり前" },
      { id: "home-quotes", title: "同じ条件で見積もりを取る", note: "時間指定とオプションの有無を揃えます。", timing: "1〜2か月前" },
      { id: "home-extras", title: "追加料金の条件を確認する", note: "階段、養生、待機、資材費を確認します。", timing: "契約前" },
      { id: "home-cancel", title: "キャンセル条件を保存する", note: "見積書と約款を一緒に保管します。", timing: "契約時" },
    ], services: [
      { name: "引越し侍", category: "引越し見積もり比較", description: "荷物量や移動条件を入力し、対応する引越し会社の料金やサービスを比較するための見積もりサービス。", tags: ["複数社比較", "見積もり", "引越し業者"], fit: "同じ条件で候補会社を比較したい", price: "利用無料", access: "Webで条件入力", href: "https://hikkoshizamurai.jp/", accent: "#e98622" },
    ],
  },
  {
    id: "record-condition", theme: "home", phase: "movein", eyebrow: "入居初日がおすすめ",
    title: "入居前からある傷や汚れを残したい",
    description: "撮り忘れを防ぎながら部屋の状態を記録し、数年後でも管理会社へ共有できる形にまとめます。",
    duration: "所要 25〜40分",
    tasks: [
      { id: "home-wide", title: "各部屋を入口から広角で撮る", note: "全体の状態が分かる写真を最初に残します。", timing: "入居当日" },
      { id: "home-damage", title: "傷・汚れ・設備不良を接写する", note: "位置が分かる写真と接写をセットで。", timing: "荷物搬入前" },
      { id: "home-form", title: "現況確認書に写真番号を記載する", note: "管理会社指定の方法があれば優先します。", timing: "提出期限内" },
      { id: "home-export", title: "記録をPDFで保管・共有する", note: "後から探せる場所にも保存します。", timing: "提出後" },
    ],
    services: [
      { name: "入退去メモ", category: "個人向けアプリ", description: "部屋別チェック、写真の改変確認、入退去比較、PDF出力まで一つで管理。", tags: ["個人で開始可", "iPhone", "オフライン"], fit: "自分で証拠を整理したい", price: "無料", access: "すぐ使える", href: "https://apps.apple.com/jp/app/%E5%85%A5%E9%80%80%E5%8E%BB%E3%83%A1%E3%83%A2/id6767765025", accent: "#5d6bff" },
      { name: "更新退去くん", category: "不動産管理サービス", description: "入居者の現況確認と写真提出をオンライン化。管理会社導入型のサービス。", tags: ["現況確認", "オンライン提出", "法人導入"], fit: "指定フォームで提出したい", price: "管理会社契約", access: "対応物件のみ", href: "https://prtimes.jp/main/html/rd/p/000000203.000014691.html", accent: "#1e9f7a" },
    ],
  },
  {
    id: "start-utilities", theme: "home", phase: "movein", eyebrow: "入居1週間前から",
    title: "電気・ガス・水道の開始漏れを防ぎたい",
    description: "入居日に必要なライフラインを、立会いの有無と開始日まで一緒に整理します。",
    duration: "所要 10〜20分",
    tasks: [
      { id: "home-electric", title: "電気の開始日を登録する", note: "契約先とお客さま番号を控えます。", timing: "1週間前" },
      { id: "home-gas", title: "ガス開栓の立会いを予約する", note: "繁忙期は希望枠が埋まりやすいため早めに。", timing: "1〜2週間前" },
      { id: "home-water", title: "水道の使用開始を届け出る", note: "自治体や水道局の案内を確認します。", timing: "1週間前" },
    ], services: [
      { name: "引越れんらく帳", category: "引越し手続き一括サービス", description: "電気、ガス、水道、電話、放送など、対応事業者の住所変更や開始・停止手続きをまとめて進める。", tags: ["ライフライン", "住所変更", "手続き一覧"], fit: "開始・停止の手続き漏れを減らしたい", price: "無料", access: "Webで利用", href: "https://www.hikkoshi-line.com/", accent: "#ef6b35" },
    ],
  },
  {
    id: "home-manuals", theme: "home", phase: "living", eyebrow: "暮らし始めてから",
    title: "家電や設備の説明書・保証をまとめたい",
    description: "型番、取扱説明書、保証期限、消耗品を家族で探せる状態にします。",
    duration: "初回 20分",
    tasks: [
      { id: "home-model", title: "家電・設備の型番を撮影する", note: "本体ラベルを撮ると登録しやすくなります。", timing: "設置後" },
      { id: "home-warranty", title: "保証書と購入証明を保存する", note: "期限と修理窓口も一緒に記録します。", timing: "購入後" },
      { id: "home-family", title: "家族が見られる場所へ共有する", note: "故障時に誰でも確認できる状態に。", timing: "登録後" },
    ],
    services: [
      { name: "UCHITAS", category: "家電管理サービス", description: "家電の取扱説明書や保証書を整理し、家族で製品情報を共有。", tags: ["説明書", "保証書", "家族共有"], fit: "家電情報を家族でまとめたい", price: "公式サイトで確認", access: "個人利用可", href: "https://uchitas.com/", accent: "#f0a02f" },
      { name: "Cabinote", category: "持ち物・家財管理", description: "家財、保証書、収納場所を写真で管理。引越し時の箱管理にも対応。", tags: ["持ち物管理", "保証通知", "iPhone"], fit: "家財と収納場所も管理したい", price: "無料プランあり", access: "すぐ使える", href: "https://apps.apple.com/jp/app/%E6%8C%81%E3%81%A1%E7%89%A9-%E5%AE%B6%E8%B2%A1%E7%AE%A1%E7%90%86%E6%95%B4%E7%90%93%E4%BF%9D%E8%A8%BC%E6%9B%B8-cabinote/id6755080718", accent: "#5d6bff" },
      { name: "トリセツ", category: "取扱説明書管理", description: "製品を登録して取扱説明書や関連情報をまとめて確認できるアプリ。", tags: ["説明書", "型番登録", "製品管理"], fit: "紙の説明書を探す手間を減らしたい", watch: "未登録製品やメーカー提供終了の説明書は表示できない場合がある", price: "無料", access: "アプリで利用", href: "https://torisetsu.biz/", accent: "#4b86c5" },
    ],
  },
  {
    id: "moveout-evidence", theme: "home", phase: "moveout", eyebrow: "荷物を出したあとに",
    title: "退去時の部屋の状態を残したい",
    description: "入居時の記録と同じ構図で撮影し、破損箇所と通常損耗を整理します。",
    duration: "所要 20〜30分",
    tasks: [
      { id: "home-empty", title: "荷物搬出後に部屋全体を撮る", note: "床・壁・天井が見える状態で撮影します。", timing: "退去当日" },
      { id: "home-compare", title: "入居時写真と並べて比較する", note: "同じ位置・角度に近づけます。", timing: "立会い前" },
      { id: "home-meters", title: "メーターと鍵返却を記録する", note: "最後の状態を写真で残します。", timing: "退出直前" },
    ], services: [
      { name: "入退去メモ", category: "個人向け記録アプリ", description: "部屋別の写真記録、入居時と退去時の比較、PDF出力まで一つにまとめて保管。", tags: ["写真比較", "PDF", "iPhone"], fit: "退去時の状態を証拠として整理したい", price: "無料", access: "App Storeから利用", href: "https://apps.apple.com/jp/app/%E5%85%A5%E9%80%80%E5%8E%BB%E3%83%A1%E3%83%A2/id6767765025", accent: "#5d6bff" },
    ],
  },

  {
    id: "work-scope", theme: "work", phase: "accept", eyebrow: "着手前に決めておく",
    title: "依頼範囲と追加料金の条件を明確にしたい",
    description: "成果物、修正回数、対象外の作業、追加時の扱いを言葉にして、仕事の基準線を作ります。",
    duration: "所要 20〜30分",
    tasks: [
      { id: "work-deliverables", title: "成果物と納品形式を書き出す", note: "個数、サイズ、ファイル形式まで具体的に。", timing: "見積もり前" },
      { id: "work-exclusions", title: "対応しない作業を明記する", note: "撮影、原稿作成、公開作業などを分けます。", timing: "契約前" },
      { id: "work-revisions", title: "修正回数と追加単価を決める", note: "軽微な修正の定義も添えます。", timing: "契約前" },
      { id: "work-approval", title: "クライアントの承認を残す", note: "メールや承認リンクで基準線を確定します。", timing: "着手前" },
    ],
    services: [
      { name: "Spectempo", category: "スコープ管理", description: "AIを使って業務範囲を定義し、変更を管理してクライアントとの認識を揃えるサービス。", tags: ["英語", "AI", "変更管理"], fit: "着手前の条件を整理したい", price: "公式サイトで確認", access: "Webから利用", href: "https://www.spectempo.ai/", accent: "#6d62df" },
      { name: "Dairakar", category: "フリーランス向け", description: "初期スコープ、追加依頼、クライアント承認を履歴として残す。", tags: ["英語", "承認履歴", "追加請求"], fit: "範囲外作業を防ぎたい", price: "無料開始", access: "Webから利用", href: "https://dairakar.com/", accent: "#df704f" },
    ],
  },
  {
    id: "work-change", theme: "work", phase: "doing", eyebrow: "追加依頼が来たら",
    title: "途中の仕様変更を言った・言わないにしたくない",
    description: "変更内容、工数・料金・納期への影響、承認を一つの履歴にまとめます。",
    duration: "1件 5〜10分",
    tasks: [
      { id: "work-capture", title: "依頼文をそのまま保存する", note: "日時と発言者が分かる形で残します。", timing: "依頼時" },
      { id: "work-compare", title: "当初範囲との差分を確認する", note: "新規、変更、削除に分類します。", timing: "返信前" },
      { id: "work-impact", title: "料金と納期への影響を伝える", note: "着手する前に合意を取ります。", timing: "着手前" },
      { id: "work-log", title: "承認結果を変更履歴に残す", note: "最新版のスコープへ反映します。", timing: "承認後" },
    ],
    services: [
      { name: "ScopeDue", category: "スコープクリープ対策", description: "チャットから生まれる範囲外作業を記録し、追加料金と承認を管理。", tags: ["英語", "証拠履歴", "承認"], fit: "チャット依頼が多い", price: "公式サイトで確認", access: "Webから利用", href: "https://scopedue.com/", accent: "#126c51" },
      { name: "Dairakar", category: "フリーランス向け", description: "変更前後の基準線を版管理し、クライアント承認をタイムスタンプ付きで保存。", tags: ["英語", "版管理", "追加請求"], fit: "変更の経緯を残したい", price: "無料開始", access: "Webから利用", href: "https://dairakar.com/", accent: "#df704f" },
    ],
  },
  {
    id: "work-delivery", theme: "work", phase: "deliver", eyebrow: "提出前の最終確認",
    title: "納品条件と請求漏れを防ぎたい",
    description: "納品物、検収条件、追加作業、請求日を一度に確認して仕事を閉じます。",
    duration: "所要 15分",
    tasks: [
      { id: "work-final-list", title: "納品物を契約内容と照合する", note: "最新版のスコープを基準にします。", timing: "納品前" },
      { id: "work-extra-bill", title: "承認済みの追加作業を請求へ反映する", note: "変更履歴から拾います。", timing: "請求前" },
      { id: "work-acceptance", title: "検収日と修正期限を伝える", note: "仕事が完了する条件を明確に。", timing: "納品時" },
      { id: "work-invoice", title: "請求書と入金予定日を保存する", note: "未入金の確認日も設定します。", timing: "納品後" },
    ], services: [
      { name: "Misoca", category: "クラウド請求書", description: "見積書、納品書、請求書の作成・送付と、請求状況の管理をオンラインで行うサービス。", tags: ["請求書", "見積書", "入金管理"], fit: "納品後の請求漏れを防ぎたい", watch: "利用条件は公式サイトで確認。広告提携は掲載順位に影響しません。", price: "無料プランあり", access: "Web・アプリ", href: misocaAffiliateUrl, accent: "#38a3d1", affiliate: true, affiliateImpression: misocaAffiliateImpressionUrl },
    ],
  },
  {
    id: "work-profit", theme: "work", phase: "review", eyebrow: "案件が終わったら",
    title: "この仕事が本当に利益になったか振り返りたい",
    description: "見積もり時間と実作業時間、追加対応、入金額を比べて次回の単価に反映します。",
    duration: "所要 10分",
    tasks: [
      { id: "work-hours", title: "実際に使った時間を集計する", note: "打合せと修正対応も含めます。", timing: "完了後" },
      { id: "work-rate", title: "実質時給を計算する", note: "外注費や手数料も差し引きます。", timing: "完了後" },
      { id: "work-overrun", title: "想定を超えた原因を一つ選ぶ", note: "次回の見積もり条件に変えます。", timing: "振り返り時" },
    ], services: [
      { name: "Toggl Track", category: "作業時間管理", description: "案件やクライアント別に作業時間を記録し、レポートで実績を振り返れるタイムトラッキングサービス。", tags: ["時間計測", "案件別", "レポート"], fit: "見積もり時間と実績を比べたい", price: "無料プランあり", access: "Web・アプリ", href: "https://toggl.com/track/", accent: "#e65b73" },
    ],
  },

  {
    id: "family-basics", theme: "family", phase: "normal", eyebrow: "10分ずつで十分",
    title: "家族に伝えるべき情報を少しずつ整理したい",
    description: "保険、かかりつけ医、重要書類の場所など、緊急時に最初に必要な情報から始めます。",
    duration: "初回 20分",
    tasks: [
      { id: "family-contact", title: "緊急連絡先を3人登録する", note: "家族以外の連絡先も一人含めます。", timing: "今日" },
      { id: "family-medical", title: "かかりつけ医と服薬情報を整理する", note: "最新のお薬手帳の場所も記録します。", timing: "今週" },
      { id: "family-docs", title: "重要書類の保管場所を共有する", note: "番号そのものではなく、まず場所から。", timing: "今週" },
      { id: "family-review", title: "半年後の見直し日を決める", note: "古い情報のままにしない仕組みを作ります。", timing: "登録後" },
    ],
    services: [
      { name: "GOOSE", category: "家族共有・ライフログ", description: "病歴、保険、かかりつけ医、ペットなど、今ともしもの情報を家族で共有。", tags: ["家族共有", "見守り", "個人利用"], fit: "親子で情報を共有したい", price: "無料版あり", access: "アプリで利用", href: "https://goose-net.com/", accent: "#147f73" },
      { name: "つなぐノート", category: "ライフノート", description: "資産、健康、IDなどを整理し、今すぐ・死亡後・認知症診断後など公開時期を指定。", tags: ["公開時期", "家族リクエスト", "暗号化"], fit: "共有タイミングを選びたい", price: "無料", access: "アプリで利用", href: "https://tsunagu-note.jp/", accent: "#e18b58" },
    ],
  },
  {
    id: "family-medical-share", theme: "family", phase: "normal", eyebrow: "救急時に迷わないために",
    title: "家族の服薬・通院情報をすぐ確認できるようにしたい",
    description: "薬の名前を暗記するのではなく、お薬手帳、かかりつけ医、アレルギーの確認場所を家族でそろえます。",
    duration: "初回 15分",
    tasks: [
      { id: "family-med-photo", title: "お薬手帳の最新ページを確認する", note: "変更があった薬には日付を添えます。", timing: "今日" },
      { id: "family-med-doctor", title: "かかりつけ医の連絡先を登録する", note: "診療科と休診日も一緒に残します。", timing: "今日" },
      { id: "family-med-allergy", title: "アレルギーと緊急時の注意を共有する", note: "本人が説明できない場合を想定します。", timing: "今週" },
    ],
    services: [
      { name: "GOOSE", category: "家族共有・ライフログ", description: "病歴、保険、かかりつけ医など、もしもの時に必要な情報を家族で共有。", tags: ["医療情報", "家族共有", "見守り"], fit: "家族が同じ情報を確認できるようにしたい", price: "無料版あり", access: "アプリで利用", href: "https://goose-net.com/", accent: "#147f73" },
    ],
  },
  {
    id: "family-access-plan", theme: "family", phase: "normal", eyebrow: "見せる範囲も先に決める",
    title: "重要情報を、必要なときだけ家族へ伝えたい",
    description: "資産、契約、IDなどを一度に共有せず、何を・誰に・いつ見せるかを分けて整理します。",
    duration: "初回 20分",
    tasks: [
      { id: "family-access-list", title: "伝える情報を種類ごとに分ける", note: "医療、契約、資産、デジタル情報に分けます。", timing: "最初に" },
      { id: "family-access-person", title: "情報ごとに受取人を決める", note: "一人へ集中させず役割で考えます。", timing: "今週" },
      { id: "family-access-time", title: "共有するタイミングを決める", note: "今すぐ、入院時、判断が難しい時など。", timing: "登録前" },
    ],
    services: [
      { name: "つなぐノート", category: "ライフノート", description: "資産、健康、IDなどを整理し、情報ごとに公開時期を指定。", tags: ["公開時期", "受取人", "暗号化"], fit: "情報ごとに共有する相手と時期を選びたい", price: "無料", access: "アプリで利用", href: "https://tsunagu-note.jp/", accent: "#e18b58" },
    ],
  },
  {
    id: "family-absence", theme: "family", phase: "absence", eyebrow: "72時間を乗り切る",
    title: "急な入院でも家のことを引き継げるようにしたい",
    description: "ペット、子ども、仕事、定期配送など、本人が動けない間に止められない生活を優先します。",
    duration: "所要 30分",
    tasks: [
      { id: "family-people", title: "最初に連絡する人を決める", note: "家族、勤務先、学校などを順番に。", timing: "平時" },
      { id: "family-daily", title: "毎日必要な世話を書き出す", note: "ペット、薬、送迎、ゴミ出しなど。", timing: "平時" },
      { id: "family-pause", title: "止める契約・予定を整理する", note: "定期配送と予約を中心に。", timing: "不在時" },
      { id: "family-key", title: "家に入る方法を安全に共有する", note: "鍵そのものではなく受け渡し手順を。", timing: "平時" },
    ],
    services: [
      { name: "もしもの家族ノート", category: "緊急時の情報共有", description: "一定期間本人確認が取れない場合に、許可した範囲を家族や大切な人へ共有。", tags: ["長期不在", "公開範囲", "Web対応"], fit: "一人暮らしや急な入院に備えたい", price: "無料開始", access: "Webから利用", href: "https://kazoku-note.com/", accent: "#526bc2" },
      { name: "GOOSE", category: "家族共有・ライフログ", description: "日常の情報と、もしもの時に必要な医療・保険・ペット情報を一緒に記録。", tags: ["家族共有", "医療情報", "ペット"], fit: "日頃から少しずつ共有したい", price: "無料版あり", access: "アプリで利用", href: "https://goose-net.com/", accent: "#147f73" },
    ],
  },
  {
    id: "family-emergency", theme: "family", phase: "emergency", eyebrow: "まず連絡と医療情報",
    title: "家族が倒れたとき、最初に何を確認するか知りたい",
    description: "緊急連絡、服薬、保険、ペットや子どもの対応を優先順に確認します。",
    duration: "確認 10分",
    tasks: [
      { id: "family-em-contact", title: "緊急連絡先へ状況を共有する", note: "誰が窓口になるか決めます。", timing: "すぐ" },
      { id: "family-em-meds", title: "服薬・アレルギー情報を確認する", note: "医療機関へ伝えられる形に。", timing: "すぐ" },
      { id: "family-em-home", title: "自宅で待つ人・動物を確認する", note: "当日中に必要な対応を優先します。", timing: "当日" },
      { id: "family-em-work", title: "勤務先や予定の連絡を代行する", note: "本人の希望する連絡範囲を尊重します。", timing: "当日" },
    ], services: [
    ],
  },
  {
    id: "family-digital", theme: "family", phase: "after", eyebrow: "見えない契約を探す",
    title: "ネット契約やデジタル資産の手続きを整理したい",
    description: "スマホ、メール、カード明細から継続契約を把握し、確認・解約・保存に分類します。",
    duration: "数日に分けて",
    tasks: [
      { id: "family-device", title: "利用中の端末と契約先を確認する", note: "通信会社と端末の扱いを分けます。", timing: "早めに" },
      { id: "family-sub", title: "定期課金を一覧にする", note: "カード明細や口座履歴から確認します。", timing: "1週間以内" },
      { id: "family-assets", title: "保存すべき写真・データを確認する", note: "解約前に必要なデータを退避します。", timing: "解約前" },
      { id: "family-log", title: "連絡先と手続き結果を記録する", note: "重複連絡や漏れを防ぎます。", timing: "随時" },
    ],
    services: [
      { name: "そなえ", category: "デジタル終活", description: "銀行口座、証券、IDなどの重要情報を整理し、必要な情報を家族へ共有。", tags: ["情報保管", "家族共有", "メッセージ"], fit: "重要情報をまとめて備えたい", price: "無料開始", access: "Webから利用", href: "https://sonae.family/", accent: "#1a775e" },
      { name: "Digital Keeper", category: "デジタル資産引継ぎ", description: "サービス側に重要情報そのものを預けず、情報を開く鍵を分散して保管。", tags: ["分散保管", "デジタル資産", "家族"], fit: "情報の預け方を重視したい", price: "公式サイトで確認", access: "申込みが必要", href: "https://digitalkeeper.jp/service/", accent: "#253b57" },
    ],
  },
  {
    id: "health-urgent", theme: "health", phase: "symptom", eyebrow: "迷ったときの判断材料",
    title: "この症状で救急車を呼ぶべきか知りたい", description: "症状と緊急度を確認し、救急車・早めの受診・様子を見るのどれが必要か整理します。", duration: "確認 5分",
    tasks: [
      { id: "health-state", title: "意識・呼吸・強い痛みを確認する", note: "明らかな緊急時は迷わず119へ。", timing: "すぐ" },
      { id: "health-guide", title: "症状から緊急度を確認する", note: "本人の年齢と症状を正確に選びます。", timing: "すぐ" },
      { id: "health-contact", title: "受診先か相談窓口へ連絡する", note: "服薬と持病を伝えられるようにします。", timing: "判断後" },
    ], services: [
    ],
  },
  {
    id: "health-clinic", theme: "health", phase: "visit", eyebrow: "条件に合う受診先を探す",
    title: "今診てもらえる病院や薬局を探したい", description: "診療科、現在地、診療時間、対応できる治療などから受診先を絞り込みます。", duration: "所要 10分",
    tasks: [
      { id: "health-dept", title: "症状に合う診療科を確認する", note: "迷う場合は電話相談も利用します。", timing: "検索前" },
      { id: "health-open", title: "現在診療中の医療機関を探す", note: "受付終了時刻まで確認します。", timing: "受診前" },
      { id: "health-call", title: "受診可能か電話で確認する", note: "急患や初診の受付条件を聞きます。", timing: "出発前" },
    ], services: [
      { name: "医療情報ネット ナビイ", category: "厚生労働省", description: "診療日、診療科目、対応可能な疾患や治療内容などから全国の医療機関・薬局を検索。", tags: ["全国検索", "病院", "薬局"], fit: "条件に合う医療機関を探したい", price: "無料", access: "Webで検索", href: "https://www.iryou.teikyouseido.mhlw.go.jp/", accent: "#1683a8" },
      { name: "CLINICS", category: "オンライン診療・服薬指導", description: "対応医療機関の予約、オンライン診療、薬の受け取りまでを支援。", tags: ["オンライン診療", "予約", "服薬指導"], fit: "対応する医療機関を予約してオンラインで相談したい", watch: "緊急症状には不向き。診療内容・費用・利用可否は医療機関ごとに確認", price: "診療・医療機関ごと", access: "アプリで利用", href: "https://clinics-app.com/", accent: "#46a5a1" },
    ],
  },
  {
    id: "health-record", theme: "health", phase: "manage", eyebrow: "自分の医療情報を一か所で",
    title: "薬や医療費の履歴を確認したい", description: "処方された薬、医療費、健診や予防接種など、利用できる健康医療情報を確認します。", duration: "所要 10分",
    tasks: [
      { id: "health-login", title: "本人確認の準備をする", note: "マイナンバーカードと暗証番号を確認。", timing: "最初に" },
      { id: "health-meds", title: "処方薬と医療費を確認する", note: "直近だけでなく期間を変えて見ます。", timing: "ログイン後" },
      { id: "health-share", title: "必要な情報を受診時に伝える", note: "自己判断で薬を変更しないようにします。", timing: "受診時" },
    ], services: [
      { name: "マイナポータル 健康医療", category: "デジタル庁", description: "薬、医療費、健診、予防接種、アレルギーなど、連携された本人の健康医療情報を確認。", tags: ["薬", "医療費", "健診"], fit: "自分の医療履歴をまとめて確認したい", price: "無料", access: "マイナンバーカードで利用", href: "https://myna.go.jp/health-medical", accent: "#2e7f6d" },
      { name: "EPARKお薬手帳", category: "電子お薬手帳アプリ", description: "薬の情報、家族分の記録、通院記録、次回通院日のアラームをまとめて確認できるアプリ。", tags: ["家族の薬", "通院記録", "薬局予約"], fit: "家族分を含む薬の情報と通院予定を一か所で管理したい", why: "本人・家族のお薬情報をまとめ、対応薬局では調剤予約も利用できる", watch: "対応薬局、機能の利用条件、共有する健康情報の範囲を確認", price: "無料", access: "アプリで利用", href: "https://okusuritecho.epark.jp/", accent: "#5e9c54" },
      { name: "お薬手帳プラス", category: "電子お薬手帳", description: "薬の記録、服用管理、処方箋の事前送信、家族の薬の管理に対応。", tags: ["薬の記録", "飲み忘れ", "処方箋送信"], fit: "薬の履歴と服用をスマホで管理したい", watch: "処方箋送信の対応薬局と会員機能を確認。薬の変更は医師・薬剤師へ相談", price: "無料", access: "アプリで利用", href: "https://portal.okusuriplus.com/", accent: "#ee7757" },
      { name: "頭痛ーる", category: "気圧・体調記録", description: "気圧予報と頭痛・服薬の記録を重ね、体調変化を振り返れるアプリ。", tags: ["気圧予報", "頭痛記録", "服薬記録"], fit: "天気と頭痛の傾向を記録して備えたい", watch: "予測や分析は診断ではない。強い・急な症状は医療機関へ相談", price: "無料版あり", access: "アプリで利用", href: "https://zutool.jp/", accent: "#6b8cd7" },
    ],
  },
  {
    id: "health-care", theme: "health", phase: "care", eyebrow: "比較する前に希望を整理",
    title: "家族に合う介護サービスを探したい", description: "必要な支援、通所・訪問・入所、地域、費用の条件を整理して事業所を比較します。", duration: "所要 20分",
    tasks: [
      { id: "care-needs", title: "困っている生活動作を書き出す", note: "本人と家族それぞれの負担を分けます。", timing: "相談前" },
      { id: "care-office", title: "地域の相談窓口へ相談する", note: "地域包括支援センターなどを確認。", timing: "早めに" },
      { id: "care-compare", title: "事業所のサービス内容を比較する", note: "空き状況は各事業所へ確認します。", timing: "候補選定時" },
    ], services: [
      { name: "介護サービス情報公表システム", category: "厚生労働省", description: "介護保険法に基づいて公表された全国の介護事業所・施設情報を検索・比較。", tags: ["介護事業所", "全国検索", "公的情報"], fit: "地域の事業所を客観情報から探したい", price: "無料", access: "Webで検索", href: "https://www.kaigokensaku.mhlw.go.jp/", accent: "#697b43" },
    ],
  },
  {
    id: "money-budget", theme: "money", phase: "budget", eyebrow: "まず自動で見える化",
    title: "毎月何にお金を使っているか把握したい", description: "銀行、カード、現金の支出をまとめ、固定費と変動費を分けて改善箇所を見つけます。", duration: "初回 20分",
    tasks: [
      { id: "money-accounts", title: "使っている口座とカードを洗い出す", note: "現金払いの扱いも決めます。", timing: "最初に" },
      { id: "money-link", title: "明細をまとめて分類する", note: "最初は大分類だけで十分です。", timing: "登録後" },
      { id: "money-review", title: "固定費を一つ見直す", note: "通信・保険・定額課金から選びます。", timing: "月末" },
    ], services: [
      { name: "マネーフォワード ME", category: "家計簿・資産管理", description: "銀行、証券、クレジットカードなどをまとめ、家計簿と資産の推移を自動で見える化。", tags: ["口座連携", "自動家計簿", "資産管理"], fit: "複数の明細をまとめて把握したい", price: "無料版あり", access: "Web・アプリ", href: "https://moneyforward.com/me", accent: "#2b77c6" },
      { name: "Zaim", category: "家計簿・予算管理", description: "レシート読取や金融連携で支出を記録し、予算と家計の推移を確認。", tags: ["レシート", "口座連携", "予算"], fit: "手入力と自動連携を使い分けて家計簿を続けたい", watch: "明細の分類やレシート読取結果は定期的に確認", price: "無料版あり", access: "Web・アプリ", href: "https://zaim.net/", accent: "#36a99a" },
      { name: "Moneytree", category: "資産管理", description: "銀行、カード、電子マネー、ポイントなどを一か所で確認。", tags: ["資産一覧", "明細", "口座連携"], fit: "複数サービスの残高と明細をまとめて見たい", watch: "対応金融機関と無料・有料機能の範囲を確認", price: "無料版あり", access: "アプリで利用", href: "https://getmoneytree.com/jp/app/about", accent: "#28a267" },
      { name: "OsidOri", category: "共有家計簿", description: "夫婦・カップルの共有家計と個人のお金を分けて管理。", tags: ["家計共有", "個人ページ", "予算"], fit: "ふたりの支出だけを共有し、個人分は分けたい", watch: "共有範囲と連携できる金融サービスを登録前に確認", price: "無料版あり", access: "アプリで利用", href: "https://www.osidori.co/", accent: "#ef8791" },
    ],
  },
  {
    id: "money-insurance", theme: "money", phase: "protect", eyebrow: "加入内容を使える状態に",
    title: "入っている保険と請求先を整理したい", description: "保険証券、補償内容、更新時期、家族分の契約をまとめ、請求漏れを防ぎます。", duration: "所要 20分",
    tasks: [
      { id: "money-policies", title: "保険証券とWeb証券を集める", note: "生命・損害・カード付帯を確認。", timing: "最初に" },
      { id: "money-coverage", title: "何が起きたら使えるか分類する", note: "入院、けが、物損などで整理します。", timing: "登録時" },
      { id: "money-family", title: "家族と確認方法を共有する", note: "緊急時の問い合わせ先も残します。", timing: "整理後" },
    ], services: [
      { name: "保険簿", category: "保険管理アプリ", description: "紙やPDFの保険証券を登録し、補償、更新時期、請求可能性、家族の契約をまとめて管理。", tags: ["保険証券", "家族共有", "請求漏れ"], fit: "複数社の保険を一か所で管理したい", price: "無料", access: "アプリで利用", href: "https://hokenbo.com/", accent: "#3a9b88" },
    ],
  },
  {
    id: "money-tax", theme: "money", phase: "tax", eyebrow: "期限前に必要書類から",
    title: "確定申告を何から始めればいいか知りたい", description: "収入、経費、控除の資料を集め、対象年分の申告書を作成して提出します。", duration: "数日に分けて",
    tasks: [
      { id: "tax-target", title: "申告が必要か確認する", note: "所得区分と副業収入を整理します。", timing: "最初に" },
      { id: "tax-docs", title: "収入・経費・控除資料を集める", note: "不足資料を先に洗い出します。", timing: "作成前" },
      { id: "tax-submit", title: "画面案内に沿って作成・提出する", note: "受付結果と控えを保存します。", timing: "期限内" },
    ], services: [
      { name: "確定申告書等作成コーナー", category: "国税庁", description: "画面の案内に沿って金額を入力し、所得税などの申告書作成とe-Tax送信を行える公式サービス。", tags: ["確定申告", "自動計算", "e-Tax"], fit: "自分で申告書を作成・提出したい", price: "無料", access: "Webで利用", href: "https://www.keisan.nta.go.jp/", accent: "#315b8c" },
    ],
  },
  {
    id: "money-trouble", theme: "money", phase: "trouble", eyebrow: "支払う前・解約前に相談",
    title: "契約や請求のトラブルを相談したい", description: "契約画面、注文履歴、請求明細、事業者とのやり取りを残し、相談窓口へ状況を伝えます。", duration: "準備 15分",
    tasks: [
      { id: "trouble-save", title: "契約条件と請求画面を保存する", note: "URLと日時も一緒に残します。", timing: "すぐ" },
      { id: "trouble-contact", title: "事業者へ解約・訂正を申し出る", note: "返答期限を決めて記録します。", timing: "相談前" },
      { id: "trouble-consult", title: "解決しなければ188へ相談する", note: "最寄りの消費生活相談窓口につながります。", timing: "早めに" },
    ], services: [
      { name: "消費者ホットライン 188", category: "消費者庁", description: "契約や悪質商法などの消費者トラブルを、最寄りの消費生活センター等へつなぐ相談窓口。", tags: ["契約トラブル", "相談窓口", "全国共通"], fit: "事業者との交渉や解約で困っている", price: "相談無料・通話料あり", access: "電話で188", href: "https://www.caa.go.jp/policies/policy/local_cooperation/local_consumer_administration/hotline/", accent: "#cf6548" },
    ],
  },
  {
    id: "parenting-sick", theme: "parenting", phase: "sick", eyebrow: "夜間・休日に迷ったら",
    title: "子どもの急な症状を相談したい", description: "年齢、症状、体温、経過を整理し、家庭での対処や受診の必要性を相談します。", duration: "確認 5分",
    tasks: [
      { id: "child-state", title: "意識・呼吸・水分摂取を確認する", note: "明らかな緊急時は119へ。", timing: "すぐ" },
      { id: "child-log", title: "症状と始まった時刻をメモする", note: "服薬とアレルギーも確認します。", timing: "相談前" },
      { id: "child-call", title: "#8000へ電話相談する", note: "地域ごとの実施時間を確認します。", timing: "迷ったら" },
    ], services: [
      { name: "子ども医療電話相談 #8000", category: "厚生労働省", description: "休日・夜間の子どもの症状について、小児科医師・看護師へ電話で相談できる全国共通短縮番号。", tags: ["夜間・休日", "電話相談", "子ども"], fit: "受診すべきか判断に迷っている", price: "相談無料・通話料あり", access: "電話で#8000", href: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/newpage_55223.html", accent: "#ef8268" },
    ],
  },
  {
    id: "parenting-care", theme: "parenting", phase: "find", eyebrow: "条件をそろえて探す",
    title: "保育園や一時預かりを探したい", description: "場所、年齢、利用時間、定員、費用、保育内容から候補施設を整理します。", duration: "所要 20分",
    tasks: [
      { id: "child-needs", title: "必要な曜日・時間・開始日を決める", note: "送迎可能な範囲も設定します。", timing: "検索前" },
      { id: "child-search", title: "地域の施設を検索して比較する", note: "一時利用や病児保育も確認します。", timing: "候補選定" },
      { id: "child-visit", title: "自治体と施設へ空き・申込を確認する", note: "掲載情報から変わる場合があります。", timing: "申込前" },
    ], services: [
      { name: "ここdeサーチ", category: "こども家庭庁・WAM NET", description: "住所、教育・保育内容、定員、費用などから保育所や認定こども園、一時利用施設を検索。", tags: ["保育施設", "一時預かり", "全国検索"], fit: "地域の預け先を条件から比較したい", price: "無料", access: "Webで検索", href: "https://www.wam.go.jp/kokodesearch/ANN010100E00.do", accent: "#e0834d" },
    ],
  },
  {
    id: "parenting-grow", theme: "parenting", phase: "grow", eyebrow: "健診と予防接種を忘れずに",
    title: "子どもの成長と予防接種を記録したい", description: "身長・体重、健診、予防接種、地域の子育て情報を家族で確認できる形にします。", duration: "初回 15分",
    tasks: [
      { id: "child-profile", title: "子どもの情報と地域を登録する", note: "自治体版の提供有無を確認します。", timing: "最初に" },
      { id: "child-vaccine", title: "健診と予防接種予定を確認する", note: "医療機関の案内を優先します。", timing: "毎月" },
      { id: "child-share", title: "家族へ成長記録を共有する", note: "紙の母子健康手帳も保管します。", timing: "記録後" },
    ], services: [
      { name: "母子モ", category: "母子手帳・子育て支援アプリ", description: "妊娠から育児までの成長記録、予防接種予定、地域情報、家族共有を支援。自治体版も提供。", tags: ["成長記録", "予防接種", "家族共有"], fit: "健診や予防接種を家族で管理したい", price: "無料", access: "アプリで利用", href: "https://www.mchh.jp/", accent: "#e9687d" },
      { name: "ぴよログ", category: "育児記録", description: "授乳、ミルク、睡眠、排泄などを記録し、家族とリアルタイムで共有。", tags: ["授乳記録", "睡眠", "家族共有"], fit: "赤ちゃんの生活記録を家族で引き継ぎたい", watch: "体調の判断は記録だけに頼らず、異変時は医療機関へ相談", price: "無料版あり", access: "アプリで利用", href: "https://www.piyolog.com/", accent: "#f2a24a" },
      { name: "家族アルバム みてね", category: "写真・動画共有", description: "子どもの写真や動画を家族だけのアルバムで共有し、月ごとに整理。", tags: ["家族共有", "写真", "動画"], fit: "離れて暮らす家族にも成長を共有したい", watch: "招待相手と公開範囲を確認し、個人情報が写る写真に注意", price: "無料版あり", access: "アプリで利用", href: "https://mitene.us/", accent: "#f0a451" },
    ],
  },
  {
    id: "parenting-schedule", theme: "parenting", phase: "schedule", eyebrow: "予定と担当を一つの場所へ",
    title: "学校・習い事・家族の予定を共有したい", description: "行事、送迎、持ち物、締切を共有カレンダーへまとめ、誰が対応するかを明確にします。", duration: "初回 15分",
    tasks: [
      { id: "child-calendar", title: "家族用カレンダーを作る", note: "仕事用とは分けて共有します。", timing: "最初に" },
      { id: "child-deadline", title: "行事・提出物・持ち物を登録する", note: "写真や案内も予定へ添付します。", timing: "受領時" },
      { id: "child-owner", title: "送迎や準備の担当を決める", note: "変更は予定上で共有します。", timing: "毎週" },
    ], services: [
      { name: "TimeTree", category: "共有カレンダー", description: "家族やグループで複数のカレンダーを共有し、予定ごとに画像やコメントもまとめて管理。", tags: ["家族共有", "複数カレンダー", "予定相談"], fit: "家族の予定と担当を同じ場所で見たい", price: "無料版あり", access: "Web・アプリ", href: "https://timetreeapp.com/intl/ja", accent: "#2bb79a" },
    ],
  },
  {
    id: "digital-account", theme: "digital", phase: "account", eyebrow: "被害が出る前に設定",
    title: "アカウントの乗っ取りを防ぎたい", description: "使い回しパスワードを減らし、多要素認証、復旧先、ログイン通知を設定します。", duration: "所要 20分",
    tasks: [
      { id: "digital-important", title: "重要なアカウントを5つ選ぶ", note: "メール、金融、SNSから始めます。", timing: "最初に" },
      { id: "digital-mfa", title: "多要素認証と復旧先を設定する", note: "バックアップコードも安全に保存。", timing: "今日" },
      { id: "digital-review", title: "ログイン履歴と不要な連携を確認する", note: "見覚えのない端末を解除します。", timing: "毎月" },
    ], services: [
      { name: "IPA 情報セキュリティ10大脅威", category: "情報処理推進機構", description: "最新の被害事例と、パスワード管理・認証強化など個人が取るべき基本対策を確認。", tags: ["乗っ取り対策", "パスワード", "公的情報"], fit: "何から安全対策を始めるか知りたい", price: "無料", access: "Webで確認", href: "https://www.ipa.go.jp/security/10threats/index.html", accent: "#345993" },
      { name: "Google Authenticator", category: "認証コード", description: "対応サービスの2段階認証コードをスマホで生成。", tags: ["2段階認証", "認証コード", "オフライン"], fit: "SMS以外の認証方法を設定したい", watch: "機種変更前に移行・同期方法とバックアップコードを確認", price: "無料", access: "アプリで利用", href: "https://safety.google/safety/authentication/", accent: "#4285f4" },
    ],
  },
  {
    id: "digital-scam", theme: "digital", phase: "scam", eyebrow: "リンクを開く前に止まる",
    title: "怪しいSMSやメールが本物か確認したい", description: "送信元、URL、要求内容を確認し、公式アプリから事実を確かめて必要なら報告します。", duration: "確認 5分",
    tasks: [
      { id: "scam-dontclick", title: "リンク・添付・記載番号を使わない", note: "返信もしないで保留します。", timing: "すぐ" },
      { id: "scam-official", title: "公式アプリやブックマークから確認する", note: "請求や配送状況を直接見ます。", timing: "確認時" },
      { id: "scam-report", title: "フィッシング情報を報告する", note: "入力済みならパスワード変更と連絡を。", timing: "確認後" },
    ], services: [
      { name: "フィッシング対策協議会", category: "注意情報・報告窓口", description: "最新のフィッシング事例、身を守る対策、フィッシングサイトURLの報告方法を掲載。", tags: ["事例確認", "詐欺対策", "URL報告"], fit: "届いたメッセージが詐欺か確認したい", price: "無料", access: "Webで確認・報告", href: "https://www.antiphishing.jp/", accent: "#bd4f55" },
      { name: "Whoscall", category: "迷惑電話・SMS対策", description: "着信番号の識別や迷惑電話・SMS対策を支援するアプリ。", tags: ["発信者識別", "迷惑電話", "SMS"], fit: "知らない番号へ出る前の判断材料がほしい", watch: "判定を過信せず、金銭や個人情報を求められたら公式窓口へ確認", price: "無料版あり", access: "アプリで利用", href: "https://whoscall.com/ja", accent: "#45b65c" },
    ],
  },
  {
    id: "digital-phone", theme: "digital", phase: "lost", eyebrow: "別の端末からすぐ操作",
    title: "なくしたスマホを探して情報を守りたい", description: "位置確認、音を鳴らす、遠隔ロック、回線停止の順に対応し、個人情報を保護します。", duration: "所要 10分",
    tasks: [
      { id: "phone-find", title: "端末検索サービスで位置を確認する", note: "安全でない場所へ一人で取りに行かない。", timing: "すぐ" },
      { id: "phone-lock", title: "紛失モードまたは遠隔ロックを使う", note: "連絡先メッセージを表示します。", timing: "すぐ" },
      { id: "phone-carrier", title: "回線・決済・警察への連絡を進める", note: "見つからない場合に順次対応します。", timing: "当日" },
    ], services: [
      { name: "Apple 探す", category: "Apple端末・持ち物検索", description: "Apple端末や対応する持ち物の位置確認、通知、紛失モード、遠隔保護を行う。", tags: ["iPhone", "位置確認", "遠隔保護"], fit: "Apple端末やAirTagを探したい", price: "対応端末で無料", access: "探すアプリ・iCloud", href: "https://www.apple.com/jp/icloud/find-my/", accent: "#4d5968" },
      { name: "Google スマートフォンを探す", category: "Android端末検索", description: "Android端末の現在地表示、音を鳴らす、画面ロックなど、紛失時の保護手順を案内。", tags: ["Android", "位置確認", "画面ロック"], fit: "Android端末を探して保護したい", price: "対応端末で無料", access: "Googleアカウントで利用", href: "https://myaccount.google.com/intro/find-your-phone?hl=ja", accent: "#4285f4" },
    ],
  },
  {
    id: "digital-backup", theme: "digital", phase: "backup", eyebrow: "壊れてからでは戻せない",
    title: "写真や大事なデータを消失から守りたい", description: "端末だけに置かず、自動バックアップと別の保存先を組み合わせ、復元できるか確認します。", duration: "初回 20分",
    tasks: [
      { id: "backup-priority", title: "失いたくないデータを選ぶ", note: "写真、連絡先、書類を優先します。", timing: "最初に" },
      { id: "backup-auto", title: "クラウドの自動バックアップを有効にする", note: "容量と通信設定を確認します。", timing: "今日" },
      { id: "backup-test", title: "別端末から復元できるか確認する", note: "半年ごとに保存状態を見直します。", timing: "設定後" },
    ], services: [
      { name: "Google One バックアップ", category: "クラウド保存", description: "写真、動画、端末データなどのバックアップ容量をGoogleアカウントで管理。", tags: ["自動バックアップ", "写真", "Android・iOS"], fit: "端末データをクラウドへ保存したい", price: "無料容量・有料プランあり", access: "Googleアカウントで設定", href: "https://one.google.com/about", accent: "#4285f4" },
    ],
  },
  {
    id: "mobility-delay", theme: "mobility", phase: "delay", eyebrow: "遅延を見たら到着時刻を再計算",
    title: "電車の遅延時に最短の迂回ルートを知りたい", description: "運行区間と再開見込みを確認し、別路線・バス・徒歩を含めて到着時刻を比較します。", duration: "確認 5分",
    tasks: [
      { id: "move-status", title: "利用路線の運行区間を確認する", note: "全線か一部区間かを切り分けます。", timing: "すぐ" },
      { id: "move-route", title: "遅延を反映した代替ルートを検索する", note: "乗換回数より到着確度を優先します。", timing: "確認後" },
      { id: "move-share", title: "到着見込みを相手へ共有する", note: "再検索する時刻も決めます。", timing: "出発前" },
    ], services: [
      { name: "Yahoo!乗換案内", category: "乗換・運行情報", description: "乗換検索、時刻表、登録路線の運行情報をまとめて確認。遅延時の再検索に向く。", tags: ["運行情報", "迂回検索", "無料"], fit: "普段使う路線の遅延を見ながら、無料で迂回したい", why: "路線登録と運行情報を乗換検索と同じ画面で確認できる", watch: "実際の振替輸送・入場規制は鉄道会社の案内を優先", price: "無料", access: "Web・アプリ", href: "https://transit.yahoo.co.jp/", accent: "#d84a42" },
      { name: "ジョルダン乗換案内", category: "乗換・運行情報", description: "鉄道・バスの乗換、時刻表、運行情報から別経路を検索。", tags: ["鉄道・バス", "再検索", "運行情報"], fit: "一本前後や別ルートを素早く比較したい", watch: "振替輸送の条件と最新運行情報は交通事業者の公式案内を優先", price: "無料版あり", access: "アプリで利用", href: "https://www.jorudan.co.jp/norikae/", accent: "#ec712c" },
      { name: "乗換NAVITIME", category: "乗換・時刻表", description: "鉄道・バスの乗換、時刻表、路線図を条件付きで検索。", tags: ["乗換検索", "バス", "路線図"], fit: "経由駅や一本後など条件を変えて検索したい", watch: "有料機能の範囲と交通事業者の最新運行情報を確認", price: "無料版あり", access: "アプリで利用", href: "https://www.navitime.co.jp/transfer/", accent: "#2a65bd" },
    ],
  },
  {
    id: "mobility-taxi", theme: "mobility", phase: "ride", eyebrow: "今すぐか、日時指定かで選ぶ",
    title: "電話せずにタクシーを呼びたい", description: "乗車位置、到着希望、支払方法を決め、現在配車か日時指定予約を使い分けます。", duration: "所要 5分",
    tasks: [
      { id: "taxi-pin", title: "安全に停車できる乗車位置を指定する", note: "建物名や目印も確認します。", timing: "注文前" },
      { id: "taxi-mode", title: "今すぐ配車か日時指定を選ぶ", note: "空港や早朝は余裕を持って予約。", timing: "注文時" },
      { id: "taxi-fee", title: "運賃以外の手配料金を確認する", note: "エリアや時間帯で異なる場合があります。", timing: "確定前" },
    ], services: [
      { name: "GO", category: "タクシー配車アプリ", description: "現在地への配車、アプリ決済、日時指定のAI予約、車両条件指定などに対応。", tags: ["即時配車", "日時指定", "アプリ決済"], fit: "現在地へすぐ呼びたい、または15分後〜7日後を指定したい", why: "即時配車とAI予約を一つのアプリで使い分けられる", watch: "手配料金や対応機能はエリア・時間帯・決済方法で異なる", price: "アプリ無料・乗車料金等", access: "アプリで配車", href: "https://go.goinc.jp/service", accent: "#111111" },
    ],
  },
  {
    id: "mobility-parking", theme: "mobility", phase: "parking", eyebrow: "混雑イベントほど事前予約",
    title: "目的地近くの駐車場を確実に確保したい", description: "車両サイズ、入出庫時間、再入庫可否を確認し、予約できる駐車場を押さえます。", duration: "所要 10分",
    tasks: [
      { id: "park-size", title: "車種と車両サイズを確認する", note: "高さ・幅・全長を車検証等で確認。", timing: "検索前" },
      { id: "park-time", title: "利用時間と入出庫条件を比較する", note: "連続利用や再入庫の可否も確認します。", timing: "予約前" },
      { id: "park-photo", title: "入口写真と区画番号を保存する", note: "当日迷わないよう同乗者とも共有。", timing: "予約後" },
    ], services: [
      { name: "akippa", category: "予約制駐車場", description: "空いている月極区画や個人宅などを含む全国の駐車場を事前予約・オンライン決済。", tags: ["事前予約", "車両サイズ", "オンライン決済"], fit: "ライブ・スポーツ・観光など、満車を避けたい日", why: "予約完了時点で利用区画を確保できる", watch: "対応車種、利用時間、キャンセル条件を駐車場ごとに確認", price: "駐車場ごと", access: "Web・アプリで予約", href: "https://www.akippa.com/", accent: "#29a9df" },
    ],
  },
  {
    id: "mobility-luggage", theme: "mobility", phase: "luggage", eyebrow: "コインロッカーが埋まる前に",
    title: "旅行中の荷物を店舗に預けたい", description: "預ける大きさ、時間、受取時刻を決め、駅周辺の店舗や施設の空き枠を探します。", duration: "所要 5分",
    tasks: [
      { id: "bag-size", title: "荷物の個数と大きさを確認する", note: "預けられない品物も確認します。", timing: "検索前" },
      { id: "bag-place", title: "移動経路上の預け先を予約する", note: "受取時間から逆算して選びます。", timing: "当日まで" },
      { id: "bag-proof", title: "予約画面と店舗入口を確認する", note: "店舗の営業時間を再確認します。", timing: "預入前" },
    ], services: [
      { name: "ecbo cloak", category: "荷物預かり予約", description: "店舗や施設の空きスペースを荷物預かり場所として検索・予約するサービス。", tags: ["店舗預かり", "事前予約", "大型荷物"], fit: "ロッカーに入らない荷物や、満室リスクを避けたい", why: "駅ロッカー以外の店舗・施設も預け先候補になる", watch: "営業時間、荷物サイズ、禁止物、当日の受取期限を確認", price: "場所・サイズごと", access: "Web・アプリで予約", href: "https://cloak.ecbo.io/ja", accent: "#f5a623" },
    ],
  },
  {
    id: "food-recipe", theme: "food", phase: "cook", eyebrow: "残り食材か所要時間から決める",
    title: "冷蔵庫にある食材で献立を決めたい", description: "使い切りたい食材、調理時間、人数を先に決め、作れるレシピへ絞ります。", duration: "所要 10分",
    tasks: [
      { id: "cook-stock", title: "期限が近い食材を3つ選ぶ", note: "主菜に使える食材を優先します。", timing: "最初に" },
      { id: "cook-filter", title: "時間と予算でレシピを絞る", note: "追加購入を最小限にします。", timing: "検索時" },
      { id: "cook-save", title: "作った結果と変更点をメモする", note: "次回の定番候補に残します。", timing: "食後" },
    ], services: [
      { name: "クラシル", category: "レシピ動画", description: "公式レシピを中心に、食材・時短・節約などから検索し、工程を動画で確認できる。", tags: ["動画レシピ", "食材検索", "時短"], fit: "料理に不慣れで、工程を動画で見ながら作りたい", why: "完成だけでなく切り方や火加減などの工程を視覚的に確認しやすい", watch: "アレルギー、加熱時間、保存方法は個別に確認", price: "無料版あり", access: "Web・アプリ", href: "https://www.kurashiru.com/", accent: "#ef5b54" },
      { name: "クックパッド", category: "レシピ検索", description: "食材名や料理名から多数の投稿レシピを検索し、保存して比較。", tags: ["食材検索", "投稿レシピ", "保存"], fit: "手元の食材から多くの作り方を比較したい", watch: "投稿内容ごとに分量・加熱・衛生面を確認", price: "無料版あり", access: "Web・アプリ", href: "https://cookpad.com/jp", accent: "#e6a024" },
      { name: "DELISH KITCHEN", category: "レシピ動画", description: "料理の工程を短い動画で確認し、献立や食材からレシピを探せる。", tags: ["動画", "献立", "時短"], fit: "調理手順を動画で追いながら作りたい", watch: "アレルギー、加熱時間、保存条件は個別に確認", price: "無料版あり", access: "Web・アプリ", href: "https://delishkitchen.tv/", accent: "#e95383" },
    ],
  },
  {
    id: "food-shopping", theme: "food", phase: "shop", eyebrow: "近所の店だけ比べる",
    title: "今日安いスーパーを効率よく探したい", description: "買う品目と移動範囲を決め、近隣店舗のチラシや商品情報を同じ日に比較します。", duration: "所要 5分",
    tasks: [
      { id: "shop-list", title: "必ず買う物を5つ以内に絞る", note: "特売に合わせた買いすぎを防ぎます。", timing: "検索前" },
      { id: "shop-area", title: "行ける距離の店舗だけ比較する", note: "交通費と移動時間も含めます。", timing: "検索時" },
      { id: "shop-route", title: "一店舗か二店舗に決める", note: "価格差より総所要時間も考えます。", timing: "出発前" },
    ], services: [
      { name: "くふう トクバイ", category: "チラシ・買い物情報", description: "近くのスーパーやドラッグストアの商品・チラシを店舗横断で確認できる。", tags: ["近隣店舗", "デジタルチラシ", "商品比較"], fit: "紙のチラシを取っておらず、近所の特売を横断したい", why: "位置情報を基準に複数店舗の商品情報を見比べやすい", watch: "在庫や店頭価格は変わるため、確実性が必要なら店舗へ確認", price: "無料", access: "Web・アプリ", href: "https://tokubai.co.jp/app", accent: "#f06b35" },
      { name: "Shufoo!", category: "デジタルチラシ", description: "近隣店舗のチラシを位置や店舗から探して比較できるアプリ。", tags: ["チラシ", "近隣店舗", "買い物"], fit: "複数店の紙チラシをスマホでまとめて見たい", watch: "掲載期間、在庫、店頭価格は店舗の最新情報を確認", price: "無料", access: "アプリで利用", href: "https://www.shufoo.net/", accent: "#f05c4f" },
    ],
  },
  {
    id: "food-rescue", theme: "food", phase: "rescue", eyebrow: "受取時間に行けるときだけ",
    title: "近所の売れ残り食品をお得に受け取りたい", description: "受取可能な時間と場所から、まだおいしく食べられる商品を選んで事前決済します。", duration: "所要 5分",
    tasks: [
      { id: "rescue-time", title: "受取可能な時間帯を決める", note: "予約後に確実に行ける枠を選びます。", timing: "検索前" },
      { id: "rescue-item", title: "内容とアレルギー情報を確認する", note: "詳細が不明な場合は店舗へ確認。", timing: "購入前" },
      { id: "rescue-pick", title: "指定時間内に店舗で受け取る", note: "受取画面を準備します。", timing: "予約後" },
    ], services: [
      { name: "TABETE", category: "食品ロス削減", description: "閉店時などに余りそうな食品をアプリ上で購入し、指定時間に店舗で受け取るサービス。", tags: ["食品ロス", "当日受取", "事前決済"], fit: "受取時間に合わせて店舗へ行けて、内容に柔軟性がある", why: "廃棄前の商品と近隣ユーザーをリアルタイムでつなぐ", watch: "予約後の受取時間、内容、キャンセル条件を確認", price: "商品ごと", access: "アプリで購入・受取", href: "https://tabete.me/", accent: "#ef7f45" },
    ],
  },
  {
    id: "food-chores", theme: "food", phase: "chores", eyebrow: "誰が多いかより、何がつらいか",
    title: "家事分担の偏りを感情的にならず話したい", description: "見えない家事を洗い出し、お互いの認識と不満を比べて、減らす家事と分ける家事を決めます。", duration: "初回 20分",
    tasks: [
      { id: "chore-list", title: "実際にある家事を一覧から選ぶ", note: "名もなき家事も含めます。", timing: "各自" },
      { id: "chore-feel", title: "負担感と理想を別々に回答する", note: "相手の回答を推測しません。", timing: "話合い前" },
      { id: "chore-change", title: "一つ減らし、一つ分担を変える", note: "一週間試して再調整します。", timing: "話合い時" },
    ], services: [
      { name: "Yieto 2", category: "家事分担の可視化", description: "用意された家事育児リストから現状・不満・理想を各自入力し、パートナーと共有して再分担を支援。", tags: ["不満の可視化", "ペア利用", "分担見直し"], fit: "タスク管理より、まず分担への認識差を話し合いたい", why: "『誰が悪いか』ではなく現状・不満・理想の差を見える化する設計", watch: "日々のToDo管理が主目的なら別の共有タスクアプリが向く", price: "無料", access: "アプリ・Web", href: "https://yieto.jp/", accent: "#e36e80" },
      { name: "Google Keep", category: "共有メモ・リストアプリ", description: "メモ、チェックリスト、写真、音声メモを保存し、家族やパートナーと共同編集できます。", tags: ["共同編集", "買い物リスト", "リマインダー"], fit: "家事や買い物の担当を、気軽な共有リストから始めたい", why: "メモやチェックリストを共有して、完了状況を同じ画面で確認できる", watch: "共有するメモと招待相手を確認し、個人情報は必要以上に保存しない", price: "無料", access: "アプリで利用", href: "https://keep.google.com/", accent: "#e3b13d" },
    ],
  },
  {
    id: "pets-record", theme: "pets", phase: "health", eyebrow: "小さな変化を毎日残す",
    title: "ペットの体重・食事・投薬を家族で記録したい", description: "体重、食事、水分、排泄、投薬を同じ形式で記録し、受診時に変化を説明できるようにします。", duration: "1日 3分",
    tasks: [
      { id: "pet-baseline", title: "通常時の体重と生活を登録する", note: "元気な時の基準を作ります。", timing: "最初に" },
      { id: "pet-log", title: "変化があった項目だけ記録する", note: "写真も一緒に残します。", timing: "毎日" },
      { id: "pet-share", title: "家族と病院へ履歴を共有する", note: "自己判断で治療は変更しません。", timing: "受診時" },
    ], services: [
      { name: "ぺとログ", category: "ペット健康管理", description: "犬猫の体重、食事、投薬などを記録し、家族で共有できる健康ログアプリ。", tags: ["体重", "投薬", "家族共有"], fit: "家族の誰が世話しても、同じ健康履歴を見たい", why: "日々の複数項目を一つのペット単位で継続記録できる", watch: "AIの提案は診断ではないため、異変時は獣医師へ相談", price: "無料版あり", access: "アプリで利用", href: "https://play.google.com/store/apps/details?id=jp.nooon.petlog", accent: "#54a98a" },
    ],
  },
  {
    id: "pets-hospital", theme: "pets", phase: "hospital", eyebrow: "動物種と現在診療中で絞る",
    title: "今診てもらえる動物病院を探したい", description: "動物種、症状、現在診療中、救急対応、保険対応などから候補を探し、電話で受診可否を確認します。", duration: "所要 10分",
    tasks: [
      { id: "vet-state", title: "症状・発症時刻・誤食物を整理する", note: "写真や現物を準備します。", timing: "すぐ" },
      { id: "vet-filter", title: "対応動物と診療条件で検索する", note: "夜間・救急の条件も確認。", timing: "検索時" },
      { id: "vet-call", title: "向かう前に必ず電話する", note: "診療時間の変更や受付終了を確認します。", timing: "出発前" },
    ], services: [
      { name: "アニコムどうぶつ病院検索", category: "動物病院検索", description: "現在診療中、動物種、症状、時間外対応、保険対応などの条件から全国の動物病院を検索。", tags: ["現在診療中", "症状検索", "全国"], fit: "夜間や初めての地域で、条件に合う病院を急いで探したい", why: "動物種や救急対応など、人の病院検索にはない条件で絞れる", watch: "掲載時間と実際の受付は異なる場合があるため事前連絡が必要", price: "検索無料", access: "Webで検索", href: "https://www.anicom-ah.com/", accent: "#ef8254" },
    ],
  },
  {
    id: "pets-sitter", theme: "pets", phase: "sitter", eyebrow: "価格より相性と緊急対応",
    title: "旅行中のペットの世話を安心して頼みたい", description: "訪問・預かり、投薬、散歩、報告方法、緊急時の対応をそろえて候補を比較します。", duration: "比較 20分",
    tasks: [
      { id: "sitter-needs", title: "世話内容と健康上の注意を書く", note: "投薬や苦手なことも明記します。", timing: "依頼前" },
      { id: "sitter-meet", title: "レビュー確認と事前面談をする", note: "鍵・逃走防止・緊急連絡を確認。", timing: "予約前" },
      { id: "sitter-backup", title: "キャンセル時の代替案を決める", note: "かかりつけ病院も共有します。", timing: "確定時" },
    ], services: [
      { name: "PetBacker", category: "ペットケア比較・予約", description: "ペットシッター、散歩、預かりなどの依頼を出し、複数の見積もり・レビューを比較して予約。", tags: ["複数見積もり", "レビュー", "予約保証"], fit: "近所の複数候補を価格・レビュー・条件で比較したい", why: "依頼内容に対して複数シッターから見積もりを受け取れる", watch: "資格必須ではないため、経歴・面談・緊急対応を自分で確認", price: "提供者・内容ごと", access: "Web・アプリ", href: "https://www.petbacker.jp/ja-jp/", accent: "#18a88c" },
      { name: "ペットシッターSOS", category: "資格者による訪問型", description: "認定ペットシッター資格を持つスタッフが自宅へ訪問し、普段の環境で世話を行う全国展開サービス。", tags: ["有資格者", "自宅訪問", "事前打合せ"], fit: "価格比較より、資格者と運営会社の体制を重視したい", why: "住み慣れた自宅で、資格者に訪問ケアを依頼できる", watch: "対応エリア、繁忙期の空き、投薬対応を店舗へ事前確認", price: "店舗・内容ごと", access: "店舗へ申込み", href: "https://www.petsitter.co.jp/", accent: "#e89045" },
    ],
  },
  {
    id: "pets-missing", theme: "pets", phase: "missing", eyebrow: "最初の数時間で範囲を広げる",
    title: "逃げた犬や猫をできるだけ早く探したい", description: "脱走地点と特徴を整理し、警察・保健所・近隣動物病院へ連絡しながら、登録情報も確認します。", duration: "すぐ開始",
    tasks: [
      { id: "missing-info", title: "直近写真・特徴・脱走場所をまとめる", note: "首輪とマイクロチップ番号も確認。", timing: "すぐ" },
      { id: "missing-call", title: "警察・保健所・動物愛護窓口へ連絡する", note: "自治体をまたぐ可能性も考えます。", timing: "すぐ" },
      { id: "missing-chip", title: "マイクロチップ登録情報を最新にする", note: "電話番号と住所を確認します。", timing: "当日" },
    ], services: [
      { name: "犬と猫のマイクロチップ情報登録", category: "環境省", description: "犬猫のマイクロチップと飼い主情報を登録・変更し、保護時の身元確認につなげる公的制度。", tags: ["所有者情報", "住所変更", "公的登録"], fit: "マイクロチップ装着済みで、連絡先が最新か確認したい", why: "保護機関等がチップを読み取った際の所有者確認につながる", watch: "GPS追跡機能ではないため、警察・保健所への連絡と捜索も必要", price: "登録・変更内容による", access: "公式Webで手続き", href: "https://reg.mc.env.go.jp/", accent: "#4a8b61" },
    ],
  },
  {
    id: "support-mind", theme: "support", phase: "mind", eyebrow: "ひとりで結論を出す前に",
    title: "気持ちがつらく、公的な相談先につながりたい", description: "今の安全を確認し、地域の公的相談機関へつながる全国共通窓口を利用します。", duration: "まず電話",
    tasks: [
      { id: "mind-safe", title: "今すぐ自分を傷つける危険がないか確認する", note: "差し迫る場合は119・110へ。", timing: "すぐ" },
      { id: "mind-note", title: "困っていることを一言だけ書く", note: "うまく説明できなくても大丈夫です。", timing: "電話前" },
      { id: "mind-call", title: "地域の公的相談窓口へ電話する", note: "つながりにくい場合は別窓口も利用。", timing: "今日" },
    ], services: [
      { name: "こころの健康相談統一ダイヤル", category: "厚生労働省・自治体", description: "全国共通番号から、電話をかけた地域の都道府県・政令指定都市の公的相談機関につながる。", tags: ["公的窓口", "地域接続", "電話相談"], fit: "地域の精神保健・こころの相談窓口へつながりたい", why: "居住地域の公的な相談体制へ全国共通番号から接続される", watch: "受付時間は地域で異なる。緊急の危険がある場合は119・110", price: "相談無料・通話料あり", access: "0570-064-556", href: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/kokoro_dial.html", accent: "#6a78b8" },
    ],
  },
  {
    id: "support-legal", theme: "support", phase: "legal", eyebrow: "問題名が分からなくても相談できる",
    title: "どの法律相談先へ行けばいいか分からない", description: "起きたこと、相手、期限、手元の資料を整理し、利用できる制度と相談窓口の案内を受けます。", duration: "準備 15分",
    tasks: [
      { id: "legal-timeline", title: "出来事を日付順に3行でまとめる", note: "評価ではなく事実を中心に。", timing: "相談前" },
      { id: "legal-docs", title: "契約書・通知・やり取りを集める", note: "原本は手元に保管します。", timing: "相談前" },
      { id: "legal-guide", title: "法制度と適切な相談窓口を聞く", note: "無料法律相談には要件があります。", timing: "早めに" },
    ], services: [
      { name: "法テラス・サポートダイヤル", category: "法制度・相談窓口案内", description: "法的トラブルか分からない段階でも、内容に応じた法制度や相談機関を無料で案内。", tags: ["窓口案内", "電話・メール", "全国"], fit: "弁護士を探す前に、問題の種類と相談先を知りたい", why: "法律相談そのものの前段で、使える制度と適切な窓口を整理してくれる", watch: "無料法律相談や費用立替には収入・資産などの要件がある", price: "案内無料・通話料あり", access: "電話・メール・チャット", href: "https://www.houterasu.or.jp/site/soudanmadoguchi-houseido/index.html", accent: "#2f7291" },
    ],
  },
  {
    id: "support-alone", theme: "support", phase: "alone", eyebrow: "話す内容がまとまっていなくても",
    title: "誰にも言えない悩みを相談できる場所を探したい", description: "電話、SNS、地域、悩みの種類から、自分が今使いやすい相談方法を選びます。", duration: "確認 5分",
    tasks: [
      { id: "alone-mode", title: "電話か文字相談かを選ぶ", note: "話しづらければSNS相談から。", timing: "最初に" },
      { id: "alone-window", title: "受付中の窓口を確認する", note: "対象年齢や地域も確認します。", timing: "今" },
      { id: "alone-next", title: "つながらなければ別窓口を試す", note: "一つの窓口だけで諦めません。", timing: "必要時" },
    ], services: [
      { name: "まもろうよ こころ", category: "厚生労働省 相談先検索", description: "電話・SNSなど、悩みや利用方法に応じた複数の相談窓口をまとめて探せる案内サイト。", tags: ["電話相談", "SNS相談", "窓口一覧"], fit: "特定の窓口を決められず、今使える相談方法から選びたい", why: "相談テーマと連絡手段が異なる複数窓口を一か所で比較できる", watch: "各窓口の受付時間・対象者は個別に異なる", price: "窓口ごと", access: "Webで相談先を選ぶ", href: "https://www.mhlw.go.jp/mamorouyokokoro/soudan/", accent: "#7185c5" },
    ],
  },
  {
    id: "support-home", theme: "support", phase: "home", eyebrow: "履歴を消す必要も含め安全優先",
    title: "パートナーからの暴力や監視について相談したい", description: "今いる場所の安全を最優先にし、電話・チャット・メールから安全に使える相談方法を選びます。", duration: "安全を優先",
    tasks: [
      { id: "dv-danger", title: "今すぐ危険なら110へ連絡する", note: "安全な場所へ移動できる場合は移動。", timing: "緊急時" },
      { id: "dv-device", title: "端末や履歴を見られていないか確認する", note: "安全な別端末の利用も検討します。", timing: "相談前" },
      { id: "dv-consult", title: "使える方法で専門窓口へ相談する", note: "証拠集めより安全確保を優先します。", timing: "安全な時" },
    ], services: [
      { name: "DV相談プラス", category: "内閣府 DV相談", description: "電話、チャット、メール、外国語相談に対応し、必要に応じて地域の支援へつなぐ相談サービス。", tags: ["24時間電話", "チャット", "多言語"], fit: "電話で話しづらい、または安全な時間に文字で相談したい", why: "電話だけでなくチャット・メール・外国語の入口を選べる", watch: "端末を監視されている可能性がある場合は閲覧履歴や安全な端末に注意", price: "相談無料", access: "電話・チャット・メール", href: "https://soudanplus.jp/", accent: "#8d5a94" },
    ],
  },
];

export const appProblems = problems
  .map((problem) => ({ ...problem, services: problem.services.filter((service) => mobileAppNames.has(service.name)) }))
  .filter((problem) => problem.services.length > 0);
export const problemDetailSlugs: Record<string, string> = {
  "digital-scam": "identify-unknown-phone-number", "health-urgent": "ambulance-or-hospital", "health-clinic": "online-medical-appointment",
  "digital-phone": "find-lost-phone", "daily-emergency": "check-disaster-risk", "home-utilities": "moving-procedures",
  "family-medical-share": "share-family-medication", "daily-subscriptions": "cancel-subscriptions",
  "daily-dispose": "dispose-large-appliances", "pets-record": "pet-health-log",
  "digital-account": "set-up-two-factor-authentication", "parenting-sick": "child-fever-night",
  "money-insurance": "insurance-policy-organize", "money-trouble": "consumer-contract-trouble",
  "mobility-delay": "train-delay-detour", "pets-missing": "find-missing-pet", "support-legal": "where-to-get-legal-help",
  "support-mind": "mental-health-public-help", "support-home": "dv-stalking-safe-consultation",
  "daily-emergency": "disaster-alert-apps", "home-manuals": "organize-appliance-manuals",
  "health-record": "manage-medication-app", "money-budget": "choose-household-budget-app",
  "parenting-grow": "baby-care-sharing-app", "food-recipe": "choose-recipe-and-flyer-apps",
};

export default function Home() {
  const firstAppProblem = appProblems[0];
  const [themeId, setThemeId] = useState<ThemeId>(firstAppProblem.theme);
  const [phaseId, setPhaseId] = useState(firstAppProblem.phase);
  const [selectedId, setSelectedId] = useState(firstAppProblem.id);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const theme = themes.find((item) => item.id === themeId) ?? themes[0];
  const selected = appProblems.find((problem) => problem.id === selectedId) ?? firstAppProblem;
  const activePhases = theme.phases.filter((item) => appProblems.some((problem) => problem.theme === themeId && problem.phase === item.id));
  const currentPhase = theme.phases.find((phase) => phase.id === phaseId);
  const visibleProblems = useMemo(
    () => appProblems.filter((problem) => problem.theme === themeId && problem.phase === phaseId),
    [themeId, phaseId],
  );
  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const tokens = normalized.split(/[\s　、。・\/のをがにはへでと]+/).filter(Boolean);
    return appProblems.filter((problem) => {
      const problemTheme = themes.find((item) => item.id === problem.theme);
      const problemPhase = problemTheme?.phases.find((item) => item.id === problem.phase);
      const searchable = [
        problem.title,
        problem.description,
        problem.eyebrow,
        problemTheme?.label ?? "",
        problemTheme?.description ?? "",
        problemPhase?.label ?? "",
        problemPhase?.short ?? "",
        ...problem.tasks.flatMap((task) => [task.title, task.note]),
        ...problem.services.flatMap((service) => [service.name, service.category, service.description, service.fit, ...service.tags]),
      ].join(" ").toLowerCase();
      return tokens.every((token) => searchable.includes(token));
    }).slice(0, 8);
  }, [query]);
  const updateProblemUrl = (problemId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("problem", problemId);
    window.history.replaceState({}, "", url);
  };
  const chooseProblem = (problem: Problem) => {
    setSelectedId(problem.id);
    updateProblemUrl(problem.id);
  };
  const trackOutbound = (service: Service, destination: "official" | "app-store" | "google-play") => {
    const payload = { event: "outbound_app_click", service: service.name, destination, problem: selected.id, sponsored: Boolean(service.sponsored), affiliate: Boolean(service.affiliate) };
    window.dispatchEvent(new CustomEvent("kotonavi:outbound", { detail: payload }));
    const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    analyticsWindow.dataLayer?.push(payload);
  };

  useEffect(() => {
    const requestedId = new URLSearchParams(window.location.search).get("problem");
    const requestedProblem = appProblems.find((problem) => problem.id === requestedId);
    if (requestedProblem) {
      setThemeId(requestedProblem.theme);
      setPhaseId(requestedProblem.phase);
      setSelectedId(requestedProblem.id);
    }
  }, []);
  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) return;
    const timer = window.setTimeout(() => window.dispatchEvent(new CustomEvent("kotonavi:outbound", { detail: { event: searchResults.length ? "site_search" : "site_search_zero", query: normalized.slice(0, 80), resultCount: searchResults.length } })), 700);
    return () => window.clearTimeout(timer);
  }, [query, searchResults.length]);
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const selectTheme = (nextTheme: Theme) => {
    const firstProblem = appProblems.find((problem) => problem.theme === nextTheme.id);
    if (!firstProblem) return;
    setThemeId(nextTheme.id);
    setPhaseId(firstProblem.phase);
    chooseProblem(firstProblem);
  };
  const selectProblem = (problem: Problem) => {
    setThemeId(problem.theme);
    setPhaseId(problem.phase);
    chooseProblem(problem);
    setQuery("");
    document.getElementById("guide")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="コトナビ ホーム"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a>
        <nav className="topnav" aria-label="メインナビゲーション"><a href="#guide">アプリを探す</a><a href="#categories">テーマ一覧</a><a href="/info">運営・掲載方針</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker"><span>GUIDE</span> 困りごと別ナビ</div>
        <h1>困りごとから、次の一歩へ。</h1>
        <p>状況を整理し、困りごとに合うスマホアプリを案内します。</p>
        <div className="search-wrap">
          <span className="search-icon" aria-hidden="true" />
          <input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="困っていることを入力　例：家族の薬、タクシー、写真整理" aria-label="困りごとを検索" />
          <kbd>⌘ K</kbd>
          {query && <div className="search-results" role="listbox"><div className="search-results-label">{searchResults.length}件の候補</div>{searchResults.length ? searchResults.map((problem) => {
            const resultTheme = themes.find((item) => item.id === problem.theme);
            const resultPhase = resultTheme?.phases.find((item) => item.id === problem.phase);
            return <button key={problem.id} type="button" onClick={() => selectProblem(problem)}><span>{resultTheme?.label}<small>{resultPhase?.label}</small></span><strong>{problem.title}</strong><i>→</i></button>;
          }) : <p>別の言葉でも探してみてください。</p>}</div>}
        </div>
        <div className="trust-row"><span>スマホアプリに限定</span><span>公式ストアへ直結</span><span>目的との相性で紹介</span></div>
      </section>

      <section className="navigator" id="guide">
        <div className="section-heading"><div><span className="overline">SCENE NAVIGATOR</span><h2>今の場面から探す</h2></div><p>テーマを選び、いまの状況へ進んでください。</p></div>
        <div className="navigator-grid">
          <div className="category-nav"><aside className="category-rail" id="categories">
            <div className="rail-label">テーマ</div>
            {themes.filter((item) => appProblems.some((problem) => problem.theme === item.id)).map((item) => {
              const count = appProblems.filter((problem) => problem.theme === item.id).length;
              return <button className={themeId === item.id ? "category active" : "category"} key={item.id} type="button" onClick={() => selectTheme(item)}>
                <span className="category-mark">{item.mark}</span><span><strong>{item.label}</strong><small>{count}の困りごと</small></span><i>{themeId === item.id ? "→" : ""}</i>
              </button>;
            })}
            <div className="request-card"><span>探しているテーマがない？</span><strong>困りごとを教えてください</strong><a href="/info#contact">テーマをリクエスト ↗</a></div>
          </aside><p className="category-scroll-hint" aria-hidden="true"><span>←</span> 横にスワイプして他のテーマを見る <span>→</span></p></div>

          <div className={`explorer theme-${themeId}`}>
            <div className="theme-context"><span className="category-mark">{theme.mark}</span><div><b>{theme.label}</b><small>{theme.description}</small></div></div>
            {activePhases.length > 1 ? <div className="phase-tabs" style={{ gridTemplateColumns: `repeat(${activePhases.length}, 1fr)` }} role="tablist" aria-label={`${theme.label}の段階`}>
              {activePhases.map((item, index) => <button key={item.id} className={phaseId === item.id ? "phase-tab active" : "phase-tab"} onClick={() => {
                setPhaseId(item.id);
                const first = appProblems.find((problem) => problem.theme === themeId && problem.phase === item.id);
                if (first) chooseProblem(first);
              }} type="button" role="tab" aria-selected={phaseId === item.id}><b>0{index + 1}</b><span>{item.label}<small>{item.short}</small></span></button>)}
            </div> : <div className="single-phase-context"><span>現在の場面</span><b>{activePhases[0]?.label}</b><small>{activePhases[0]?.short}</small></div>}

            <div className={`problem-layout ${visibleProblems.length === 1 ? "single-problem" : ""}`}>
              {visibleProblems.length > 1 && <div className="problem-list">
                <div className="list-top"><span>{currentPhase?.label}</span><b>{visibleProblems.length}件</b></div>
                {visibleProblems.map((problem) => <button type="button" key={problem.id} className={selected.id === problem.id ? "problem-item active" : "problem-item"} onClick={() => chooseProblem(problem)}>
                  <span className="problem-dot" /><span><small>{problem.eyebrow}</small><strong>{problem.title}</strong><em>整理ポイント {problem.tasks.length}つ ・ {problem.duration}</em></span><i>›</i>
                </button>)}
              </div>}

              <article className="detail-panel">
                <div className="breadcrumb">{theme.label} <i>›</i> {currentPhase?.label}</div>
                <span className="detail-kicker">{selected.eyebrow}</span><h3>{selected.title}</h3><p className="detail-description">{selected.description}</p>
                <a className="problem-detail-cta" href={problemDetailSlugs[selected.id] ? `/problems/${problemDetailSlugs[selected.id]}` : `/problems/view?problem=${encodeURIComponent(selected.id)}`}><span>まずは状況を整理する</span><strong>この困りごとの詳しい確認手順を見る</strong><small>確認する順番と利用前の注意を、約3分で読めます。</small><i aria-hidden="true">→</i></a>
                <div className="steps-intro"><span className="overline">BEFORE YOU CHOOSE</span><h4>サービスを見る前に、整理したい{selected.tasks.length}つのこと</h4><p>自分の状況や希望を先に整理し、下のサービスや窓口が困りごとのどの部分を助けるのか確認してみてください。ここで操作や登録をする必要はありません。</p></div>
                <div className="task-list">{selected.tasks.map((task, index) => <div className="task" key={task.id}>
                  <span className="check">{index + 1}</span><span><strong>{task.title}</strong><small>{task.note}</small></span><em>{task.timing}</em>
                </div>)}</div>

                <div className="solutions-heading"><div><span className="overline">NEXT APPS</span><h4>この困りごとに使えるスマホアプリ</h4></div><span>{selected.services.length}件を掲載</span></div>
                <div className="service-list">{selected.services.map((service, index) => {
                  const destinations = destinationsFor(service);
                  return <div className="service-card" key={service.name}>
                  <div className="service-rank">0{index + 1}</div><div className="service-logo" style={{ background: service.accent }}>{service.name.slice(0, 1)}</div>
                  <div className="service-main"><small>{service.category}</small><h5>{service.name}{service.sponsored && <em className="ad-label">PR</em>}{service.affiliate && <em className="ad-label affiliate">広告</em>}</h5><p>{service.description}</p><div className="service-match"><small>このパターンなら</small><strong>{service.fit}</strong></div><div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                  <div className="service-meta"><dl><dt>選ぶ決め手</dt><dd>{service.why ?? service.tags.join("・")}</dd><dt>注意点</dt><dd>{service.watch ?? "料金・対象地域・利用条件は公式サイトで最新情報を確認"}</dd><dt>料金</dt><dd>{service.price}</dd><dt>始め方</dt><dd>{service.access}</dd></dl><div className="app-links">{destinations.official && <a className="official-link" href={destinations.official} target="_blank" rel={service.sponsored || service.affiliate ? "noreferrer nofollow sponsored" : "noreferrer"} onClick={() => trackOutbound(service, "official")}>公式サイト <span>↗</span></a>}{destinations.ios && <a className="store-link" href={destinations.ios} target="_blank" rel={service.sponsored ? "noreferrer sponsored" : "noreferrer"} onClick={() => trackOutbound(service, "app-store")}>App Store <span>↗</span></a>}{destinations.android && <a className="store-link" href={destinations.android} target="_blank" rel={service.sponsored ? "noreferrer sponsored" : "noreferrer"} onClick={() => trackOutbound(service, "google-play")}>Google Play <span>↗</span></a>}</div>{service.affiliateImpression && <img className="affiliate-impression" width="1" height="1" src={service.affiliateImpression} alt="" aria-hidden="true" />}</div>
                </div>;
                })}</div>
                {disasterKitProblemIds.has(selected.id) && <aside className="contextual-affiliate" aria-label="この困りごとに関連する広告">
                  <span>広告</span>
                  <div><b>ふたり分の備えを、ひとつのリュックに。</b><p>水・保存食から、ラジオライト、エアベッド、携帯トイレまで。家族で一つずつ集める手間を減らせる、2人用の防災セットです。</p><small>商品の内容・価格・在庫は販売ページでご確認ください。広告はアプリの掲載順位に影響しません。</small></div>
                  <a href={disasterKitAffiliateUrl} target="_blank" rel="noreferrer nofollow sponsored">セット内容を確認する ↗</a>
                  <img className="affiliate-impression" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BA39A+BFEJSI+2HOM+BW8O1" alt="" aria-hidden="true" />
                </aside>}
                <div className="verified-note"><span>✓</span> 掲載内容は公式サイト・公式ストアをもとに編集しています <b>最終確認 2026.08.12</b></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="principles" id="about"><span className="overline">OUR PRINCIPLES</span><h2>迷わず選べるための、3つの約束。</h2><div className="principle-grid">
        <div><b>01</b><span>広告より、相性</span><p>掲載料ではなく、目的・利用条件との相性が分かる順番で紹介します。</p></div>
        <div><b>02</b><span>できる・できないを明確に</span><p>個人で使えるか、契約や導入が必要かまで、始め方を整理します。</p></div>
        <div><b>03</b><span>情報の鮮度を見える化</span><p>公式情報への導線と最終確認日を表示し、古い情報の報告を受け付けます。</p></div>
      </div></section>
      <aside className="sponsor-slot has-affiliate" aria-label="広告掲載枠">
        <span>広告</span>
        <div><b>防災用品を、一つずつ集める手間を減らす。</b><p>水・保存食やラジオライトなど、ふたり分の備えをまとめた防災セットです。商品内容・価格・在庫は販売ページでご確認ください。アプリの掲載順位には影響しません。</p></div>
        <a href={disasterKitAffiliateUrl} target="_blank" rel="noreferrer nofollow sponsored">セット内容を確認する ↗</a>
        <img className="affiliate-impression" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4BA39A+BFEJSI+2HOM+BW8O1" alt="" aria-hidden="true" />
      </aside>
      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><i /><i /><i /></span><span>コトナビ</span></a><p>困りごとから、次の一歩へ。</p><div><a href="#guide">アプリを探す</a><a href="/problems">確認手順一覧</a><a href="/guides">解決ガイド</a><a href="/info#editorial">編集方針</a><a href="/info#advertising">広告掲載方針</a><a href="/info#privacy">プライバシー</a><a href="/info#contact">お問い合わせ</a></div><small>© 2026 Kotonavi.</small></footer>
    </main>
  );
}
