export type ProblemPage = {
  slug: string;
  problemId: string;
  category: string;
  title: string;
  description: string;
  intro: string;
  steps: { title: string; body: string }[];
  options: { name: string; kind: string; body: string; fit: string; caution: string; url: string }[];
  seoContent?: { heading: string; body: string }[];
  notes: string[];
  related: string[];
  reviewedAt: string;
  contentType?: "app" | "information";
};

export const problemPages: ProblemPage[] = [
  {
    slug: "scam-call-check", problemId: "digital-scam", category: "デジタル・安全",
    contentType: "information",
    title: "詐欺電話か確認したいときにすること｜怪しい着信への対処手順",
    description: "知らない番号や不審な電話を受けたときに、折り返す前に確認すること、相談先、詐欺対策サービスの選び方を整理します。",
    intro: "電話口で急かされたり、警察・役所・金融機関を名乗られたりしても、その場で個人情報や暗証番号を伝える必要はありません。まず通話を切り、相手が示した番号ではなく、組織の公式窓口を自分で調べて確認します。",
    steps: [
      { title: "通話を切り、要求内容を記録する", body: "相手の名乗り、電話番号、要求、期限をメモします。SMSのリンクは開かず、認証コードも伝えません。" },
      { title: "公式窓口を自分で調べる", body: "相手から教えられた連絡先ではなく、警察・役所・金融機関などの公式サイトに掲載された番号へ確認します。" },
      { title: "相談・報告して着信対策をする", body: "不安があれば警察相談専用電話 #9110 や消費者ホットライン188へ。端末や通信会社の迷惑電話対策も有効にします。" },
    ],
    options: [
      { name: "詐欺バスターLITE", kind: "詐欺電話対策アプリ", body: "通話内容をもとに詐欺の可能性を確認するための選択肢です。", fit: "電話中や通話後に、怪しい内容か判断する材料がほしい", caution: "判定だけを過信せず、金銭や個人情報を求められた場合は公式窓口へ確認してください。", url: "https://apps.apple.com/jp/app/id6756911225" },
      { name: "警察相談専用電話 #9110", kind: "警察庁・相談窓口", body: "緊急ではない生活上の安全や犯罪被害の不安について、地域の警察相談窓口につながります。", fit: "詐欺の可能性や今後の対応を警察へ相談したい", caution: "事件・事故が発生中など緊急の場合は110を利用します。", url: "https://www.gov-online.go.jp/article/201309/entry-7508.html" },
    ],
    notes: ["警察や金融機関が電話で暗証番号を尋ねることはありません。", "画面共有アプリの導入やATM操作を求められたら中断してください。"],
    related: ["digital-account", "money-trouble"], reviewedAt: "2026-08-12",
  },
  {
    slug: "find-open-clinic", problemId: "health-clinic", category: "健康・介護",
    contentType: "information",
    title: "今診てもらえる病院や薬局を探す方法｜診療時間と診療科で検索",
    description: "現在地、診療科、診療時間、対応可能な治療などから医療機関・薬局を探し、受診前に確認する項目を案内します。",
    intro: "検索結果の診療時間は変更されている場合があります。候補を見つけたら、出発前に電話で受付時間、初診の可否、必要な持ち物を確認してください。",
    steps: [
      { title: "症状に合う診療科を整理する", body: "受診科が分からない場合は、救急相談や地域の医療相談を利用します。" },
      { title: "場所・診療時間・条件で検索する", body: "現在診療中だけでなく、対応可能な疾患や治療内容も確認します。" },
      { title: "電話で受診可能か確認する", body: "受付終了時刻、保険証やマイナンバーカード、紹介状の要否を聞きます。" },
    ],
    options: [
      { name: "医療情報ネット ナビイ", kind: "厚生労働省", body: "全国の医療機関・薬局を、診療日、診療科目、対応可能な治療内容などから検索できます。", fit: "公的情報から条件に合う受診先を探したい", caution: "実際の受付状況は医療機関へ直接確認してください。", url: "https://www.iryou.teikyouseido.mhlw.go.jp/" },
    ],
    notes: ["緊急性が高い症状では検索より119を優先してください。", "服薬中の薬とアレルギーを説明できるようにします。"],
    related: ["health-urgent", "health-record"], reviewedAt: "2026-08-12",
  },
  {
    slug: "find-lost-phone", problemId: "digital-phone", category: "デジタル・安全",
    contentType: "information",
    title: "スマホをなくしたときにすぐすること｜位置確認・ロック・回線停止",
    description: "iPhoneやAndroid端末を紛失したときに、別の端末から位置を確認し、情報と決済を守る手順を案内します。",
    intro: "端末を探しに危険な場所へ一人で向かわず、位置情報が不審な場所を示す場合は警察へ相談してください。遠隔でのデータ消去は、位置確認や復旧ができなくなる場合があるため最後の手段です。",
    steps: [
      { title: "別の端末から位置と状態を確認する", body: "Appleの「探す」またはGoogleの端末を探す機能へログインします。" },
      { title: "紛失モードや画面ロックを有効にする", body: "連絡先を表示し、端末内の情報や決済機能を保護します。" },
      { title: "通信会社・警察・決済会社へ連絡する", body: "回線停止、遺失届、必要に応じてカードや決済サービスの停止を進めます。" },
    ],
    options: [
      { name: "Apple『探す』", kind: "iPhone・iPad", body: "Apple製デバイスの位置確認、紛失としてマーク、遠隔消去などを行えます。", fit: "Apple Accountに紐づく端末を探したい", caution: "事前設定や端末の状態によって利用できる機能が異なります。", url: "https://support.apple.com/ja-jp/101593" },
      { name: "Google デバイスを探す", kind: "Android", body: "Android端末の位置確認、音を鳴らす、ロック、初期化などを行えます。", fit: "Googleアカウントに紐づくAndroid端末を探したい", caution: "端末の電源・通信・事前設定により位置が表示されない場合があります。", url: "https://www.google.com/android/find/about?hl=ja&u=0" },
    ],
    notes: ["パスワード変更前に、位置確認や紛失モードの利用条件を確認します。", "拾得者と直接会う場合も、安全を優先してください。"],
    related: ["digital-account", "digital-backup"], reviewedAt: "2026-08-12",
  },
  {
    slug: "check-disaster-risk", problemId: "daily-emergency", category: "日常生活",
    contentType: "information",
    title: "自宅の災害リスクと避難場所を確認する方法｜防災準備の始め方",
    description: "洪水・土砂災害・高潮・津波などのリスクを住所から確認し、避難先、備蓄、家族の連絡方法を整理します。",
    intro: "防災用品を買う前に、自宅や勤務先で想定される災害と避難先を確認すると、必要な備えを絞りやすくなります。自治体の最新情報と現地の避難経路も合わせて確認します。",
    steps: [
      { title: "住所から災害リスクを確認する", body: "洪水、土砂災害、高潮、津波などを確認し、自宅待機が可能か考えます。" },
      { title: "避難先と安全な経路を決める", body: "昼夜や悪天候でも移動できるか、複数の経路を確認します。" },
      { title: "人数に合わせて備蓄と連絡方法を決める", body: "水・食料だけでなく、薬、乳幼児用品、ペット用品、充電手段も確認します。" },
    ],
    options: [
      { name: "ハザードマップポータルサイト", kind: "国土交通省・国土地理院", body: "住所や現在地から災害リスクと自治体のハザードマップを確認できます。", fit: "自宅・勤務先周辺の危険をまとめて確認したい", caution: "実際の避難情報は自治体や気象機関の最新発表を優先してください。", url: "https://disaportal.gsi.go.jp/" },
    ],
    notes: ["避難所へ行くことだけが避難ではありません。安全な場所にいる場合は在宅避難も検討します。", "備蓄は定期的に期限と動作を確認します。"],
    related: ["family-basics", "family-absence", "daily-emergency"], reviewedAt: "2026-08-23",
  },
  {
    slug: "moving-procedures", problemId: "home-utilities", category: "引越し・住まい",
    contentType: "information",
    title: "引越しの電気・ガス・水道手続きを忘れない方法",
    description: "引越し前後の電気、ガス、水道などの停止・開始手続きを整理し、開栓や利用開始の漏れを防ぎます。",
    intro: "ガスの開栓は立会いが必要な場合があり、繁忙期は希望日時が埋まりやすくなります。契約先、お客さま番号、旧住所と新住所、利用日を先に揃えると進めやすくなります。",
    steps: [
      { title: "現在の契約先とお客さま番号を集める", body: "検針票、請求メール、会員ページから確認します。" },
      { title: "停止日と開始日を同じ一覧で管理する", body: "電気・水道・ガスの手続き状況と受付番号を残します。" },
      { title: "ガス開栓の立会い日時を確保する", body: "引越し日が決まったら早めに予約し、必要な機器を確認します。" },
    ],
    options: [
      { name: "引越れんらく帳", kind: "引越し手続き一括サービス", body: "対応する電気、ガス、水道、電話、放送などの住所変更や開始・停止手続きをまとめて進められます。", fit: "対応事業者の手続きを一か所で整理したい", caution: "すべての地域・事業者に対応するとは限らないため、未対応分は個別に手続きしてください。", url: "https://www.hikkoshi-line.com/" },
    ],
    notes: ["賃貸契約や管理会社指定の手続きがある場合はそちらを優先します。", "受付完了メールや番号を入居後まで保存します。"],
    related: ["home-moving", "home-movein-record"], reviewedAt: "2026-08-12",
  },
  {
    slug: "share-family-medication", problemId: "family-medical-share", category: "家族・もしも",
    title: "家族の薬・通院・アレルギー情報を共有する方法",
    description: "急な受診や入院でも家族が説明できるよう、服薬、かかりつけ医、アレルギー、緊急連絡先を整理します。",
    intro: "薬の名前だけでなく、用量、服用時間、処方した医療機関、変更日を一緒に残すと伝わりやすくなります。情報は本人の同意を得て、必要な家族だけが確認できる方法で共有します。",
    steps: [
      { title: "最新のお薬手帳と処方内容を確認する", body: "古い薬や中止した薬と混ざらないよう、更新日を付けます。" },
      { title: "医療機関と緊急連絡先を登録する", body: "診療科、休診日、家族の連絡順も記録します。" },
      { title: "アレルギーと緊急時の注意を共有する", body: "本人が説明できない状況を想定し、定期的に内容を見直します。" },
    ],
    options: [
      { name: "GOOSE", kind: "家族共有・ライフログ", body: "病歴、保険、かかりつけ医など、日常ともしもの情報を家族で共有できます。", fit: "家族が同じ医療・生活情報を確認できるようにしたい", caution: "共有範囲と退会時のデータの扱いを公式案内で確認してください。", url: "https://goose-net.com/" },
    ],
    notes: ["自己判断で薬を中止・変更せず、医師や薬剤師へ相談してください。", "端末の紛失に備えて画面ロックと復旧方法も設定します。"],
    related: ["family-basics", "health-record"], reviewedAt: "2026-08-12",
  },
  {
    slug: "cancel-subscriptions", problemId: "daily-subscriptions", category: "日常生活",
    contentType: "information",
    title: "使っていないサブスクを見つけて整理する方法",
    description: "カードや口座の明細から定額サービスを洗い出し、利用状況、解約条件、データの扱いを確認する手順です。",
    intro: "アプリを削除しただけでは解約にならないサービスがあります。Apple、Google Play、事業者サイトなど、契約した場所を確認して正式な解約手続きを行います。",
    steps: [
      { title: "3〜12か月分の明細を確認する", body: "月払いだけでなく年払い、無料期間後の課金、家族利用分も洗い出します。" },
      { title: "最終利用日と代替手段を確認する", body: "保存データ、ポイント、家族アカウントへの影響を確認します。" },
      { title: "解約完了画面と利用期限を保存する", body: "受付番号、終了日、返金条件を残し、翌月の明細も確認します。" },
    ],
    options: [
      { name: "消費者庁 サブスクリプション注意情報", kind: "公的案内", body: "自動更新や解約方法など、定額サービスを利用する際の注意点を確認できます。", fit: "解約条件や契約表示に不安がある", caution: "個別サービスの解約は契約先の公式手順に従ってください。", url: "https://www.caa.go.jp/policies/policy/consumer_research/international_affairs/icpen_2023/" },
    ],
    notes: ["身に覚えのない請求は、解約だけでなくカード会社や金融機関へ相談します。", "重要データは解約前に書き出します。"],
    related: ["money-budget", "money-trouble"], reviewedAt: "2026-08-12",
  },
  {
    slug: "dispose-large-appliances", problemId: "daily-dispose", category: "日常生活",
    contentType: "information",
    title: "ごみの分別と収集日をスマホで確認する方法",
    description: "住んでいる自治体のルールに合わせて、ごみの分別方法と収集日を確認し、出し忘れを減らす手順です。",
    intro: "ごみの出し方や収集日は自治体・地域によって異なります。アプリを使う前に、住んでいる自治体が対応しているかを確認してください。テレビ、エアコン、冷蔵庫・冷凍庫、洗濯機・衣類乾燥機は通常の粗大ごみと異なる手続きが必要です。",
    steps: [
      { title: "自治体がアプリに対応しているか確認する", body: "住んでいる市区町村と地域を選択できるか確認します。" },
      { title: "品目と収集日を確認する", body: "ごみの名称で検索し、分別区分と出す日を確認します。" },
      { title: "通知と例外ルールを確認する", body: "通知時刻を設定し、粗大ごみ・家電4品目など別手続きの品目も確認します。" },
    ],
    options: [
      { name: "環境省 家電リサイクル案内", kind: "公的案内", body: "家電4品目、小型家電、粗大ごみの区分と、無許可回収業者への注意点を確認できます。", fit: "処分方法の区分から確認したい", caution: "実際の収集方法や料金は自治体・販売店の案内を確認してください。", url: "https://www.env.go.jp/recycle/kaden/tvrecycle.html" },
      { name: "さんあ〜る", kind: "ごみ分別・収集日通知アプリ", body: "対応自治体のごみ収集日、分別方法、品目検索、自治体からのお知らせを確認できます。", fit: "自治体のごみ出し日と分別をスマホで確認したい", caution: "対応自治体と地域設定を確認してください。家電4品目などは別の手続きが必要です。", url: "https://threer.delight-system.co.jp/" },
    ],
    notes: ["通知は地域設定が正しいことを確認してから有効にします。", "個人情報が残る機器は初期化とデータ消去を行います。"],
    related: ["home-moving", "daily-subscriptions"], reviewedAt: "2026-08-12",
  },
  {
    slug: "pet-health-log", problemId: "pets-record", category: "ペット",
    title: "ペットの体重・食事・投薬を家族で記録する方法",
    description: "犬や猫の体重、食事、水分、排泄、投薬を同じ形式で記録し、体調変化や受診時の説明に役立てます。",
    intro: "毎日すべてを細かく記録するより、通常時の基準を作り、変化があった項目を残す方法が続けやすくなります。アプリの記録やAI提案は診断ではないため、異変時は動物病院へ相談してください。",
    steps: [
      { title: "通常時の体重と生活パターンを登録する", body: "食事量、飲水、排泄、活動量など、元気なときの基準を残します。" },
      { title: "変化があった項目と時刻を記録する", body: "嘔吐や便の状態は、可能なら写真も一緒に保存します。" },
      { title: "家族と病院へ履歴を共有する", body: "投薬の重複を防ぎ、受診時に経過を時系列で説明します。" },
    ],
    options: [
      { name: "ぺとログ", kind: "ペット健康管理アプリ", body: "犬猫の体重、食事、投薬などを記録し、家族で共有できる健康ログアプリです。", fit: "家族の誰が世話しても同じ履歴を確認したい", caution: "アプリの提案は診断ではありません。症状がある場合は獣医師へ相談してください。", url: "https://play.google.com/store/apps/details?id=jp.nooon.petlog" },
      { name: "PAWLOG", kind: "犬猫の健康・お世話記録アプリ", body: "ごはん、投薬、トイレ、通院などの日々のお世話を記録し、家族で確認できます。", fit: "毎日のお世話と予防の予定を一緒に残したい", caution: "診断や治療の代わりにはなりません。異変があれば動物病院へ相談してください。", url: "https://pawlog.jp/" },
      { name: "ペットラインウェルネスナビ", kind: "犬猫の健康管理アプリ", body: "質問や日々の記録を通じて、愛犬・愛猫の健康管理を支援するアプリです。", fit: "食事や生活習慣を見直すきっかけがほしい", caution: "利用対象・提供機能は公式案内で確認し、症状がある場合は受診を優先してください。", url: "https://www.petline.co.jp/wellness-app/" },
    ],
    notes: ["薬の量や回数は獣医師の指示を優先してください。", "誤食や呼吸困難など緊急性がある場合は記録より受診を優先します。"],
    related: ["pets-hospital", "pets-sitter"], reviewedAt: "2026-08-12",
  },
];

const moreProblemPages: ProblemPage[] = [
  {
    slug: "suspicious-sms-email", problemId: "digital-scam", category: "デジタル・安全",
    contentType: "information",
    title: "怪しいSMS・メールが届いたときの確認方法｜リンクを開く前にすること",
    description: "配送、不正利用、未払いなどを装うSMSやメールを受け取ったときに、安全に真偽を確認して報告する手順です。",
    intro: "本文のリンク、添付ファイル、記載された電話番号は使わず、公式アプリや自分のブックマークから契約状況を確認します。",
    steps: [{ title: "リンク・添付・返信を使わない", body: "画面を保存し、送信元と要求内容を確認します。" }, { title: "公式アプリから事実を確認する", body: "請求、配送、アカウント通知を公式画面で直接確認します。" }, { title: "入力済みならすぐ保護する", body: "パスワード変更、カード会社への連絡、フィッシング情報の報告を行います。" }],
    options: [{ name: "フィッシング対策協議会", kind: "注意情報・報告窓口", body: "最新事例、対策、フィッシングサイトの報告方法を掲載しています。", fit: "届いたメッセージと既知の詐欺事例を照合したい", caution: "事例にない文面でも安全とは限りません。", url: "https://www.antiphishing.jp/" }],
    notes: ["認証コードや暗証番号を第三者へ伝えないでください。", "被害が発生している場合は警察や金融機関へ相談してください。"], related: ["digital-scam", "digital-account"], reviewedAt: "2026-08-12",
  },
  {
    slug: "prevent-account-takeover", problemId: "digital-account", category: "デジタル・安全",
    title: "アカウント乗っ取りを防ぐ設定｜パスワード・多要素認証・復旧方法",
    description: "メール、金融、SNSなど重要なアカウントを、使い回しや不正ログインから守る基本設定を整理します。",
    intro: "まず、他サービスの復旧にも使われるメールアカウントから保護します。異なる強いパスワードと多要素認証を設定します。",
    steps: [{ title: "重要なアカウントを選ぶ", body: "メール、金融、SNS、通信会社から始めます。" }, { title: "使い回しをやめて多要素認証を設定する", body: "バックアップコードも安全な別の場所へ保存します。" }, { title: "ログイン履歴と復旧先を見直す", body: "見覚えのない端末や不要な外部連携を解除します。" }],
    options: [{ name: "IPA 情報セキュリティ10大脅威", kind: "情報処理推進機構", body: "個人に関係する最新の被害事例と基本対策を確認できます。", fit: "何から対策を始めればよいか知りたい", caution: "各サービス固有の設定手順は公式ヘルプを確認してください。", url: "https://www.ipa.go.jp/security/10threats/index.html" }],
    notes: ["バックアップコードを同じ端末だけに保存しないでください。", "不正利用が疑われる場合は、先に公式窓口へ連絡してください。"], related: ["digital-scam", "digital-phone"], reviewedAt: "2026-08-12",
  },
  {
    slug: "child-fever-night", problemId: "parenting-sick", category: "子育て・学び",
    contentType: "information",
    title: "夜間・休日に子どもが発熱したときの相談先｜#8000を使う前の確認",
    description: "子どもの急な発熱や症状で受診を迷ったときに、状態を整理して電話相談へつなぐ手順です。",
    intro: "意識や呼吸に異常があるなど明らかな緊急時は119へ。迷う場合は、年齢、体温、症状、始まった時刻を整理して相談します。",
    steps: [{ title: "意識・呼吸・水分摂取を確認する", body: "普段と明らかに違う状態があれば緊急対応を優先します。" }, { title: "症状と経過をメモする", body: "服薬、持病、アレルギーも確認します。" }, { title: "#8000または地域の窓口へ相談する", body: "案内された受診先には出発前に受付可否を確認します。" }],
    options: [{ name: "子ども医療電話相談 #8000", kind: "厚生労働省", body: "休日・夜間の子どもの症状を小児科医師・看護師へ相談できる全国共通短縮番号です。", fit: "家庭での対処や受診の必要性を相談したい", caution: "実施時間は地域で異なります。緊急時は119へ。", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/newpage_55223.html" }],
    notes: ["このページは診断を行うものではありません。", "処方薬は医師の指示なく変更しないでください。"], related: ["health-urgent", "health-clinic"], reviewedAt: "2026-08-12",
  },
  {
    slug: "insurance-policy-organize", problemId: "money-insurance", category: "お金・契約",
    title: "加入している保険と請求先を整理する方法｜請求漏れを防ぐ",
    description: "生命保険、損害保険、カード付帯保険などをまとめ、補償、更新、問い合わせ先を家族と確認します。",
    intro: "保険会社名だけでなく、何が起きたときに使える契約か、証券番号の保管場所、請求期限を整理します。",
    steps: [{ title: "紙・PDF・Web証券を集める", body: "生命、医療、火災、自動車、カード付帯を確認します。" }, { title: "補償される場面で分類する", body: "入院、けが、物損、旅行などに分けます。" }, { title: "家族と問い合わせ方法を共有する", body: "更新日と見直し日も登録します。" }],
    options: [{ name: "保険簿", kind: "保険管理アプリ", body: "保険証券を取り込み、複数社の補償内容・更新時期・問い合わせ先をまとめて確認できます。", fit: "保険の内容と請求先を、家族分も含めて確認したい", caution: "実際の補償可否・請求期限は保険会社へ確認してください。", url: "https://hokenbo.com/" }, { name: "GOOSE", kind: "家族情報共有アプリ", body: "保険、病歴、かかりつけ医など、もしものときに家族で確認したい情報を共有できます。", fit: "保険証券だけでなく、家族が見る情報の場所も決めたい", caution: "保険契約の詳細や請求可否は保険会社の公式情報で確認してください。", url: "https://goose-net.com/" }, { name: "Google ドライブ", kind: "書類保管アプリ", body: "保険証券のPDFや写真を、フォルダと共有権限で整理して保管できます。", fit: "すでに持っているPDFを、保管場所から整えたい", caution: "共有設定とアカウントの二段階認証を確認し、機微情報の公開範囲を絞ってください。", url: "https://www.google.com/drive/" }],
    notes: ["保険証券の画像には個人情報が含まれます。共有範囲を確認してください。", "請求期限は契約ごとに確認してください。"], related: ["family-basics", "money-trouble"], reviewedAt: "2026-08-12",
  },
  {
    slug: "consumer-contract-trouble", problemId: "money-trouble", category: "お金・契約",
    contentType: "information",
    title: "契約・請求トラブルを相談したいとき｜証拠の残し方と188",
    description: "解約できない、説明と違う、身に覚えのない請求などの消費者トラブルで、相談前に整理する内容を案内します。",
    intro: "契約画面、注文履歴、請求明細、事業者とのやり取りを消さずに保存し、希望する解決内容を一文で整理します。",
    steps: [{ title: "契約条件と請求を保存する", body: "URL、日時、広告表示、確認画面も残します。" }, { title: "事業者へ記録が残る方法で申し出る", body: "返金・解約など希望内容と回答期限を伝えます。" }, { title: "解決しなければ188へ相談する", body: "最寄りの消費生活センター等につながります。" }],
    options: [{ name: "消費者ホットライン 188", kind: "消費者庁", body: "消費者トラブルを最寄りの消費生活相談窓口へつなぐ全国共通番号です。", fit: "事業者との交渉や解約で困っている", caution: "相談無料でも通話料がかかります。", url: "https://www.caa.go.jp/policies/policy/local_cooperation/local_consumer_administration/hotline/" }],
    notes: ["支払い期限や取消期限がある場合は早めに相談してください。", "カード不正利用はカード会社にも連絡してください。"], related: ["daily-subscriptions", "support-legal"], reviewedAt: "2026-08-12",
  },
  {
    slug: "train-delay-detour", problemId: "mobility-delay", category: "移動・外出",
    title: "電車が遅延・運休したときの迂回ルートの調べ方",
    description: "運行区間と再開見込みを確認し、別路線、バス、徒歩を含めて到着時刻を比較する手順です。",
    intro: "全線運休か一部区間かを鉄道会社の公式情報で確認し、振替輸送の対象と利用条件を優先します。",
    steps: [{ title: "公式の運行区間を確認する", body: "再開見込みと振替輸送の案内を確認します。" }, { title: "遅延を反映して再検索する", body: "乗換回数だけでなく到着の確実性を比べます。" }, { title: "到着見込みを共有する", body: "状況が変わるため再確認する時刻も決めます。" }],
    options: [{ name: "Yahoo!乗換案内", kind: "乗換・運行情報", body: "乗換検索と登録路線の運行情報をまとめて確認できます。", fit: "遅延を見ながら別経路を探したい", caution: "振替輸送と入場規制は鉄道会社の公式案内を優先してください。", url: "https://transit.yahoo.co.jp/" }, { name: "ジョルダン乗換案内", kind: "鉄道・バス乗換アプリ", body: "鉄道・バスの経路を検索し、一本前後の便も比較できます。", fit: "出発時刻を前後させて、混雑を避ける経路も見たい", caution: "遅延・運休の最終確認は交通事業者の公式案内で行ってください。", url: "https://www.jorudan.co.jp/norikae/" }, { name: "乗換NAVITIME", kind: "乗換・時刻表アプリ", body: "経由地やバスを含めた条件で、到着時刻と乗換経路を検索できます。", fit: "経由駅やバスを指定して、別の行き方を比べたい", caution: "利用できる機能と最新の運行情報を確認してください。", url: "https://www.navitime.co.jp/transfer/" }],
    notes: ["無理な乗換や混雑したホームでの移動を避けてください。", "運休証明等が必要な場合は鉄道会社の案内を確認してください。"], related: ["mobility-taxi", "mobility-luggage"], reviewedAt: "2026-08-12",
  },
  {
    slug: "find-missing-pet", problemId: "pets-missing", category: "ペット",
    contentType: "information",
    title: "犬や猫が逃げたときにすぐすること｜連絡先と探し方",
    description: "脱走場所、特徴、写真を整理し、警察、保健所、動物愛護窓口へ連絡しながら捜索する手順です。",
    intro: "最初の数時間から連絡範囲を広げます。マイクロチップはGPSではありませんが、保護された際の所有者確認につながります。",
    steps: [{ title: "直近写真と特徴をまとめる", body: "脱走時刻、場所、首輪、性格、マイクロチップ番号を整理します。" }, { title: "警察・保健所・近隣病院へ連絡する", body: "自治体の境界を越える可能性も考えます。" }, { title: "登録情報を最新にする", body: "連絡先と住所を確認し、捜索記録を残します。" }],
    options: [{ name: "犬と猫のマイクロチップ情報登録", kind: "環境省", body: "マイクロチップと飼い主情報の登録・変更を行う公的制度です。", fit: "装着済みのチップに最新の連絡先を登録したい", caution: "GPS追跡機能ではありません。窓口への連絡と捜索も必要です。", url: "https://reg.mc.env.go.jp/" }],
    notes: ["見つけた人へ自宅住所など不要な個人情報を公開しないでください。", "交通量の多い場所では安全を優先してください。"], related: ["pets-hospital", "pets-record"], reviewedAt: "2026-08-12",
  },
  {
    slug: "where-to-get-legal-help", problemId: "support-legal", category: "相談・支援",
    contentType: "information",
    title: "どこへ法律相談すればよいか分からないとき｜法テラスへの相談準備",
    description: "問題名が分からない段階でも、出来事、相手、期限、資料を整理して適切な制度と相談先を確認します。",
    intro: "法律相談の前に、評価や推測ではなく出来事を日付順に短くまとめると、窓口が状況を把握しやすくなります。",
    steps: [{ title: "出来事を時系列でまとめる", body: "いつ、誰が、何をしたかを3〜5行で整理します。" }, { title: "契約書・通知・やり取りを集める", body: "原本は手元に残し、期限を確認します。" }, { title: "制度と相談窓口の案内を受ける", body: "費用や利用条件も確認します。" }],
    options: [{ name: "法テラス・サポートダイヤル", kind: "法制度・相談窓口案内", body: "内容に応じた法制度や相談機関を無料で案内します。", fit: "弁護士を探す前に問題の種類と窓口を知りたい", caution: "無料法律相談や費用立替には要件があります。", url: "https://www.houterasu.or.jp/site/soudanmadoguchi-houseido/index.html" }],
    notes: ["裁判・申立て等の期限がある場合は早めに相談してください。", "このページは個別の法律判断を提供するものではありません。"], related: ["money-trouble", "support-home"], reviewedAt: "2026-08-12",
  },
  {
    slug: "mental-health-public-help", problemId: "support-mind", category: "相談・支援",
    contentType: "information",
    title: "気持ちがつらいときに公的な相談先へつながる方法",
    description: "ひとりで抱え込まず、今の安全を確認して、地域のこころの相談窓口へつながるための案内です。",
    intro: "今すぐ自分や他人を傷つける危険がある場合は119または110へ。うまく説明できなくても、困っていることを一言から伝えて構いません。",
    steps: [{ title: "今の安全を確認する", body: "一人で危険を避けられない場合は緊急窓口や近くの人へ連絡します。" }, { title: "困っていることを一言で書く", body: "話せる範囲だけで大丈夫です。" }, { title: "地域の公的窓口へ電話する", body: "つながらなければ別の相談方法も試します。" }],
    options: [{ name: "こころの健康相談統一ダイヤル", kind: "厚生労働省・自治体", body: "電話した地域の公的な相談機関につながる全国共通番号です。", fit: "地域の精神保健相談窓口へつながりたい", caution: "受付時間は地域で異なります。緊急時は119・110へ。", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/jisatsu/kokoro_dial.html" }],
    notes: ["相談内容を完璧に整理する必要はありません。", "一つの窓口につながらない場合も、別の方法を試してください。"], related: ["support-alone", "health-clinic"], reviewedAt: "2026-08-12",
  },
  {
    slug: "dv-stalking-safe-consultation", problemId: "support-home", category: "相談・支援",
    contentType: "information",
    title: "パートナーからの暴力・監視を安全に相談する方法",
    description: "DVや端末監視が疑われるときに、現在の安全を優先し、電話・チャット・メールで専門窓口へ相談する手順です。",
    intro: "証拠集めより安全確保を優先します。端末を見られている可能性がある場合は、安全な別端末や場所から相談してください。",
    steps: [{ title: "今すぐ危険なら110へ連絡する", body: "移動できる場合は安全な場所へ移ります。" }, { title: "安全な端末と時間を選ぶ", body: "履歴や通知を見られる可能性を考えます。" }, { title: "専門窓口へ相談する", body: "電話が難しければチャットやメールを選びます。" }],
    options: [{ name: "DV相談プラス", kind: "内閣府 DV相談", body: "電話、チャット、メール、外国語相談に対応する専門窓口です。", fit: "安全な方法を選んでDVについて相談したい", caution: "監視が疑われる場合は閲覧履歴や通知に注意してください。", url: "https://soudanplus.jp/" }],
    notes: ["緊急の危険がある場合は110を優先してください。", "安全な避難先や支援は相談員と一緒に検討できます。"], related: ["support-legal", "support-mind"], reviewedAt: "2026-08-12",
  },
];

const appExpansionProblemPages: ProblemPage[] = [
  {
    slug: "disaster-alert-apps", problemId: "daily-emergency", category: "日常生活",
    contentType: "information",
    title: "地震・豪雨・避難情報をアプリで受け取る方法",
    description: "現在地と家族の地域に合う防災通知アプリを選び、通知・位置情報・登録地点を設定する手順です。",
    intro: "防災アプリを入れただけでは、必要な通知が届かない場合があります。通知権限、位置情報、登録地点を確認し、自治体の避難情報と合わせて使います。",
    steps: [{ title: "知りたい地域を決める", body: "現在地、自宅、勤務先、離れて暮らす家族の地域を整理します。" }, { title: "通知と位置情報を設定する", body: "端末側の通知権限と、アプリ内の通知項目・重大な通知を確認します。" }, { title: "避難先と連絡方法も確認する", body: "通知を受けた後にどこへ行くか、家族とどう連絡するかを決めます。" }],
    options: [
      { name: "Yahoo!防災速報", kind: "防災情報通知アプリ", body: "現在地と登録地点の地震、豪雨、避難情報などを通知します。", fit: "複数地点の防災情報をまとめて受け取りたい", caution: "避難判断は自治体・気象機関の最新発表を優先してください。", url: "https://emg.yahoo.co.jp/" },
      { name: "特務機関NERV防災", kind: "防災気象情報アプリ", body: "地震、津波、大雨などを地図・通知・音声で確認できます。", fit: "災害情報を地図で詳しく確認したい", caution: "位置情報や重大な通知の端末設定を確認してください。", url: "https://nerv.app/" },
      { name: "tenki.jp", kind: "日本気象協会公式アプリ", body: "天気、雨雲、台風、地震、防災情報を地域ごとに確認できます。", fit: "日常の天気と防災情報を一緒に見たい", caution: "警報時は自治体の避難情報も確認してください。", url: "https://tenki.jp/pr/app-lp.html" },
    ],
    notes: ["通知が届くか、平常時に設定を見直してください。", "通信障害に備えて避難先や連絡先はオフラインでも確認できるようにします。"], related: ["slug:check-disaster-risk", "family-basics", "family-absence"], reviewedAt: "2026-08-23",
  },
  {
    slug: "organize-appliance-manuals", problemId: "home-manuals", category: "引越し・住まい",
    title: "家電の説明書をスマホでまとめる方法",
    description: "家電の型番を確認し、取扱説明書、保証期限、消耗品情報をアプリで探せる状態にします。",
    intro: "家電本体の型番ラベルを先に撮影すると、似た製品の説明書を登録する間違いを防げます。",
    steps: [{ title: "メーカーと型番を撮影する", body: "本体ラベルと購入日が分かる情報を残します。" }, { title: "説明書アプリへ製品を登録する", body: "型番が一致することを確認して登録します。" }, { title: "保証と消耗品を追記する", body: "保証期限、購入店、交換部品の型番を一緒に管理します。" }],
    options: [{ name: "トリセツ", kind: "取扱説明書管理アプリ", body: "製品を登録し、取扱説明書や関連情報をまとめて確認できます。", fit: "紙の説明書を探す手間を減らしたい", caution: "未登録製品や提供終了した説明書は表示できない場合があります。", url: "https://torisetsu.biz/" }],
    notes: ["修理や安全に関する案内はメーカー公式情報を優先してください。", "保証書原本や購入証明が必要な製品は別途保管します。"], related: ["record-condition", "moveout-evidence"], reviewedAt: "2026-08-13",
  },
  {
    slug: "online-medical-appointment", problemId: "health-clinic", category: "健康・介護",
    contentType: "information",
    title: "オンライン診療を予約したいときの確認事項",
    description: "オンライン診療に向く症状かを確認し、対応医療機関、費用、薬の受け取り方法を整理します。",
    intro: "呼吸困難、意識障害、突然の激痛など緊急性がある症状では、オンライン診療を待たず119や救急相談を利用してください。",
    steps: [{ title: "緊急性がないか確認する", body: "強い症状や急変では対面受診・救急対応を優先します。" }, { title: "対応医療機関と費用を確認する", body: "初診の可否、予約枠、診察料以外の費用を確認します。" }, { title: "通信環境と薬の受け取りを準備する", body: "本人確認書類、保険情報、服薬情報を手元に置きます。" }],
    options: [{ name: "CLINICS", kind: "オンライン診療アプリ", body: "対応医療機関の予約、オンライン診療、服薬指導や薬の受け取りを支援します。", fit: "対応医療機関を予約してオンラインで相談したい", caution: "診療内容、費用、初診可否は医療機関ごとに異なります。", url: "https://clinics-app.com/" }],
    notes: ["オンライン診療はすべての症状に適するものではありません。", "薬の配送・受取方法と到着時期を確認してください。"], related: ["health-urgent", "health-record"], reviewedAt: "2026-08-13",
  },
  {
    slug: "manage-medication-app", problemId: "health-record", category: "健康・介護",
    title: "薬と服用履歴をスマホで管理する方法",
    description: "処方薬、市販薬、服用時刻、体調変化を電子お薬手帳や体調記録アプリへまとめます。",
    intro: "アプリの記録は診断や処方変更の代わりにはなりません。薬の変更・中止は医師や薬剤師へ相談します。",
    steps: [{ title: "現在の薬を確認する", body: "薬名、用量、回数、処方医療機関を最新の状態にします。" }, { title: "服用と体調を記録する", body: "飲み忘れ、頭痛などの症状、服用後の変化を残します。" }, { title: "受診時に履歴を見せる", body: "市販薬やサプリも含めて医療者へ伝えます。" }],
    options: [{ name: "お薬手帳プラス", kind: "電子お薬手帳アプリ", body: "薬の記録、服用管理、処方箋送信、家族の薬の管理に対応します。", fit: "薬の履歴と飲み忘れをまとめて管理したい", caution: "処方箋送信の対応薬局と会員機能を確認してください。", url: "https://portal.okusuriplus.com/" }, { name: "EPARKお薬手帳", kind: "電子お薬手帳アプリ", body: "薬の情報、家族分の記録、通院記録をまとめて確認でき、対応薬局では調剤予約も利用できます。", fit: "家族分を含む薬の情報と通院予定をまとめたい", caution: "対応薬局と機能の利用条件を確認してください。薬の変更は医師・薬剤師へ相談します。", url: "https://okusuritecho.epark.jp/" }, { name: "頭痛ーる", kind: "気圧・体調記録アプリ", body: "気圧予報と頭痛・服薬の記録を重ねて傾向を確認できます。", fit: "天気と頭痛の関係を記録したい", caution: "予測や分析は診断ではありません。急な強い症状は受診してください。", url: "https://zutool.jp/" }],
    notes: ["薬の記録は定期的に更新してください。", "家族と共有する場合は健康情報の公開範囲を確認します。"], related: ["family-medical-share", "health-clinic"], reviewedAt: "2026-08-13",
  },
  {
    slug: "choose-household-budget-app", problemId: "money-budget", category: "お金・契約",
    title: "毎月のお金を把握したい人の家計簿アプリ比較",
    description: "毎月何にお金を使っているか把握したい人向けに、家計簿アプリの選び方と確認点を整理します。",
    intro: "毎月のお金を把握するには、最初からすべての口座を登録せず、日常利用する口座やカードから始めると、分類や共有範囲を確認しやすくなります。",
    steps: [{ title: "家計簿の目的を一つ決める", body: "支出削減、資産一覧、夫婦共有などから優先目的を選びます。" }, { title: "入力方法と連携先を確認する", body: "手入力、レシート、自動連携のうち続けられる方法を選びます。" }, { title: "一か月試して見直す", body: "分類の手間と見たい情報が合っているか確認します。" }],
    options: [{ name: "マネーフォワード ME", kind: "家計簿・資産管理アプリ", body: "銀行、カード、証券などをまとめ、家計と資産の流れを確認できます。", fit: "複数の明細をまとめて、毎月何にお金を使っているか把握したい", caution: "対応金融機関と無料・有料機能を確認してください。", url: "https://moneyforward.com/me" }, { name: "Zaim", kind: "家計簿・予算管理アプリ", body: "レシート読取、手入力、金融連携を使い分けて家計を記録できます。", fit: "入力方法を選びながら予算も管理したい", caution: "読取結果や自動分類を定期的に確認してください。", url: "https://zaim.net/" }, { name: "Moneytree", kind: "資産管理アプリ", body: "銀行、カード、電子マネー、ポイントなどを一か所で確認できます。", fit: "残高と明細をまとめて見たい", caution: "対応金融機関と無料・有料機能を確認してください。", url: "https://getmoneytree.com/jp/app/about" }, { name: "OsidOri", kind: "共有家計簿アプリ", body: "共有家計と個人のお金を分けて管理できます。", fit: "ふたりの支出だけを共有したい", caution: "共有範囲を確認してから口座を連携してください。", url: "https://www.osidori.co/" }],
    seoContent: [
      { heading: "毎月のお金を把握するために、最初に見る3つの項目", body: "最初は、口座やカードごとの残高、今月の支出、毎月ほぼ同じ金額が出ていく固定費の3つだけを確認します。分類を細かくしすぎると続きにくいため、食費・日用品・交通・固定費などの大分類から始める方法が向いています。" },
      { heading: "家計簿アプリの選び方", body: "複数の銀行・カード・証券をまとめて家計と資産の流れを見たい場合、レシート入力や予算も使い分けたい場合、残高や明細を一か所で確認したい場合、夫婦・カップルで共有するお金と個人のお金を分けたい場合では、向いているアプリが異なります。対応する金融機関や無料・有料の機能は、登録前に公式情報で確認してください。" },
    ],
    notes: ["金融情報を扱うため、端末の画面ロックと復旧方法を設定します。", "広告提携の有無は掲載順位に影響しません。"], related: ["money-insurance", "daily-subscriptions"], reviewedAt: "2026-08-14",
  },
  {
    slug: "baby-care-sharing-app", problemId: "parenting-grow", category: "子育て・学び",
    title: "赤ちゃんの授乳・睡眠・成長を家族で共有する方法",
    description: "授乳、ミルク、睡眠、排泄、写真などを、家族で同じ記録を見られる状態にします。",
    intro: "すべてを細かく記録するより、家族の引き継ぎや受診時に必要な項目から始めると続けやすくなります。",
    steps: [{ title: "共有する記録を決める", body: "授乳、睡眠、排泄、体温など必要な項目を選びます。" }, { title: "家族を正しく招待する", body: "共有相手と権限を確認します。" }, { title: "異変時は記録を受診に活用する", body: "記録だけで判断せず、必要に応じて医療機関へ相談します。" }],
    options: [{ name: "ぴよログ", kind: "育児記録アプリ", body: "授乳、ミルク、睡眠、排泄などを記録し家族で共有できます。", fit: "日々の育児を交代しやすくしたい", caution: "体調判断は記録だけに頼らず医療者へ相談してください。", url: "https://www.piyolog.com/" }, { name: "家族アルバム みてね", kind: "家族写真共有アプリ", body: "子どもの写真や動画を招待した家族へ共有できます。", fit: "離れて暮らす家族にも成長を共有したい", caution: "招待相手と写真の公開範囲を確認してください。", url: "https://mitene.us/" }],
    notes: ["紙の母子健康手帳も保管してください。", "子どもの個人情報が写る写真の共有範囲に注意します。"], related: ["parenting-sick", "parenting-schedule"], reviewedAt: "2026-08-13",
  },
  {
    slug: "set-up-two-factor-authentication", problemId: "digital-account", category: "デジタル・安全",
    title: "2段階認証アプリを設定する方法",
    description: "重要なアカウントへ認証アプリを設定し、機種変更や端末紛失に備えて復旧方法も保存します。",
    intro: "メールや金融など、他サービスの復旧に使われる重要なアカウントから設定します。バックアップコードは同じ端末だけに保存しません。",
    steps: [{ title: "重要なアカウントを選ぶ", body: "メール、金融、SNSなどから始めます。" }, { title: "認証アプリを登録する", body: "公式設定画面のQRコードまたはキーを使います。" }, { title: "復旧方法を別の場所へ保存する", body: "バックアップコードと機種変更手順を確認します。" }],
    options: [{ name: "Google Authenticator", kind: "認証コードアプリ", body: "対応サービスの2段階認証コードをスマホで生成できます。", fit: "Googleアカウントと連携し、認証コードを管理したい", caution: "機種変更前に移行方法とバックアップコードを確認してください。", url: "https://www.google.com/mobile/authenticator/" }, { name: "Microsoft Authenticator", kind: "認証コード・サインイン承認アプリ", body: "対応サービスのワンタイムコードやサインイン承認をスマホで扱えます。", fit: "Microsoftアカウントも使い、承認通知でログインを確認したい", caution: "各サービスの対応方式と、復旧用の連絡先を先に確認してください。", url: "https://www.microsoft.com/ja-jp/security/mobile-authenticator-app" }, { name: "Twilio Authy", kind: "認証コードアプリ", body: "対応サービスの二段階認証コードを端末間で利用できる認証アプリです。", fit: "複数端末で認証コードを扱う方法を検討したい", caution: "利用条件や端末追加時の保護設定を公式案内で確認してください。", url: "https://www.authy.com/" }],
    notes: ["QRコードや設定キーを第三者へ見せないでください。", "不正ログインが疑われる場合は先にパスワードを変更します。"], related: ["digital-scam", "digital-phone"], reviewedAt: "2026-08-13",
  },
  {
    slug: "identify-unknown-phone-number", problemId: "digital-scam", category: "デジタル・安全",
    title: "知らない電話番号からの着信を確認する方法",
    description: "知らない番号へ折り返す前に、発信者識別アプリと公式窓口を使って安全に確認します。",
    intro: "警察、役所、金融機関を名乗られても、電話口で暗証番号や認証コードを伝えず、一度切って公式番号へ確認します。",
    steps: [{ title: "すぐに折り返さない", body: "留守番電話やSMSの要求内容を確認します。" }, { title: "番号識別を判断材料にする", body: "表示名や迷惑電話報告を確認します。" }, { title: "組織の公式番号へ確認する", body: "着信画面に表示された番号ではなく公式サイトから連絡します。" }],
    options: [{ name: "Whoscall", kind: "迷惑電話・SMS対策アプリ", body: "着信番号の識別や迷惑電話・SMS対策を支援します。", fit: "知らない番号へ出る前の判断材料がほしい", caution: "判定だけを過信せず、金銭や個人情報を求められたら公式窓口へ確認してください。", url: "https://whoscall.com/ja" }, { name: "詐欺バスターLITE", kind: "詐欺電話対策アプリ", body: "通話内容をもとに詐欺の可能性を確認する材料を提供します。", fit: "電話内容が怪しいか判断する材料がほしい", caution: "緊急性をあおられてもその場で送金や情報提供をしないでください。", url: "https://apps.apple.com/jp/app/id6756911225" }],
    notes: ["認証コードや暗証番号を電話相手へ伝えないでください。", "被害が疑われる場合は警察や金融機関へ相談します。"], related: ["digital-account", "money-trouble"], reviewedAt: "2026-08-13",
  },
  {
    slug: "compare-train-detour-apps", problemId: "mobility-delay", category: "移動・外出",
    title: "電車遅延時に乗換アプリで迂回ルートを比べる方法",
    description: "運休区間と再開見込みを確認し、鉄道・バス・徒歩を含む代替経路を複数の条件で比較します。",
    intro: "アプリの検索結果だけでなく、振替輸送、入場規制、運休区間は交通事業者の公式案内を優先します。",
    steps: [{ title: "運休区間を確認する", body: "全線か一部区間か、再開見込みを確認します。" }, { title: "一本後・経由駅を変えて検索する", body: "到着時刻だけでなく混雑や乗換回数も比べます。" }, { title: "到着見込みを共有する", body: "状況が変わるため再確認する時刻も決めます。" }],
    options: [{ name: "Yahoo!乗換案内", kind: "乗換・運行情報アプリ", body: "登録路線の運行情報と乗換検索をまとめて確認できます。", fit: "普段使う路線の遅延から迂回したい", caution: "振替輸送は交通事業者の案内を優先してください。", url: "https://transit.yahoo.co.jp/" }, { name: "ジョルダン乗換案内", kind: "鉄道・バス乗換アプリ", body: "一本前後や鉄道・バスの別経路を検索できます。", fit: "再検索条件を変えて比較したい", caution: "有料機能と最新運行情報を確認してください。", url: "https://www.jorudan.co.jp/norikae/" }, { name: "乗換NAVITIME", kind: "乗換・時刻表アプリ", body: "経由駅などの条件を設定して鉄道・バスの経路を検索できます。", fit: "経由地やバスを含めて探したい", caution: "交通事業者の最新運行情報を優先してください。", url: "https://www.navitime.co.jp/transfer/" }],
    notes: ["安全な場所へ移動してから再検索してください。", "終電や代替バスの最終時刻も確認します。"], related: ["mobility-taxi", "mobility-luggage"], reviewedAt: "2026-08-13",
  },
  {
    slug: "choose-recipe-and-flyer-apps", problemId: "food-recipe", category: "食事・家事",
    title: "食材からレシピと買い物を決めるアプリの使い分け",
    description: "冷蔵庫の食材、調理時間、近所のチラシから、作る料理と追加購入を最小限にします。",
    intro: "先に使い切りたい食材を三つまで選ぶと、レシピ候補や特売情報に振り回されにくくなります。",
    steps: [{ title: "使い切る食材と時間を決める", body: "人数、調理時間、追加購入の上限を決めます。" }, { title: "レシピを二つまで比較する", body: "工程、調味料、加熱時間を確認します。" }, { title: "必要な物だけチラシで確認する", body: "移動時間と買いすぎも含めて店舗を選びます。" }],
    options: [{ name: "クックパッド", kind: "レシピ検索アプリ", body: "食材名から多数の投稿レシピを検索できます。", fit: "同じ食材の多様な作り方を比較したい", caution: "投稿ごとに加熱・衛生面を確認してください。", url: "https://cookpad.com/jp" }, { name: "DELISH KITCHEN", kind: "レシピ動画アプリ", body: "料理工程を動画で確認し、食材や献立から探せます。", fit: "手順を動画で見ながら作りたい", caution: "アレルギーと保存条件を確認してください。", url: "https://delishkitchen.tv/" }, { name: "Shufoo!", kind: "デジタルチラシアプリ", body: "近隣店舗のチラシを位置や店舗から探せます。", fit: "必要な食材の価格を近所で比較したい", caution: "在庫と店頭価格は店舗の最新情報を確認してください。", url: "https://www.shufoo.net/" }],
    notes: ["特売を理由に不要な物を増やさないよう買い物リストを作ります。", "食中毒予防のため加熱と保存方法を確認してください。"], related: ["food-shopping", "food-chores"], reviewedAt: "2026-08-13",
  },
];

const createAppProblemPage = (page: Omit<ProblemPage, "steps" | "seoContent" | "notes" | "reviewedAt">): ProblemPage => ({
  ...page,
  steps: [
    { title: "目的と条件を一つ決める", body: "何を減らしたいか、誰と使うか、いつまでに決めるかを先に整理します。" },
    { title: "候補の公式情報と対応OSを確認する", body: "登録前に、料金、共有範囲、対応端末、利用条件を公式情報で確認します。" },
    { title: "一つから試して、必要なら見直す", body: "最初からすべてを移さず、続けられるかを確認してから利用範囲を広げます。" },
  ],
  seoContent: [
    { heading: "アプリを選ぶ前に確認したいこと", body: "同じ目的でも、ひとりで使うか共有するか、手入力か自動連携か、無料で始められるかで向くアプリは変わります。登録前に公式サイト・公式ストアで対応OSと利用条件を確認してください。" },
    { heading: "利用を始めた後の見直し", body: "通知、共有範囲、保存されるデータを定期的に確認します。生活や予定が変わったときは、不要な権限や共有相手も見直します。" },
  ],
  notes: ["料金・対応地域・対応OS・利用条件はリンク先の公式情報で確認してください。", "広告・提携の有無は通常掲載の順位に影響しません。"],
  reviewedAt: "2026-08-23",
});

const additionalAppProblemPages: ProblemPage[] = [
  createAppProblemPage({ slug: "coordinate-schedules", problemId: "leisure-plan", category: "休日・イベント", title: "友人との日程調整アプリの選び方｜候補日をまとめて決める", description: "候補日、参加者、決まった予定を一か所で共有するためのアプリ選びを整理します。", intro: "候補日を増やしすぎず、返答期限を決めて共有すると予定を決めやすくなります。", options: [{ name: "TimeTree", kind: "共有カレンダーアプリ", body: "予定・コメント・通知を共有カレンダーで管理できます。", fit: "決まった予定と担当を同じ場所で共有したい", caution: "共有するカレンダーと相手を確認してください。", url: "https://timetreeapp.com/intl/ja/" }], related: ["parenting-schedule", "leisure-join"] }),
  createAppProblemPage({ slug: "share-event-photos", problemId: "leisure-photos", category: "休日・イベント", title: "旅行やイベントの写真を共有・整理するアプリの選び方", description: "参加者の写真を集め、見返しやすいアルバムとして残すための選び方です。", intro: "共有相手と保存期間を先に決め、位置情報や写り込みを確認してから共有します。", options: [{ name: "Google フォト", kind: "写真管理アプリ", body: "写真や動画をアルバムにまとめ、共有相手を指定して閲覧できます。", fit: "複数人の写真を一つのアルバムに集めたい", caution: "共有範囲とバックアップ設定を確認してください。", url: "https://photos.google.com/" }], related: ["family-basics", "digital-backup"] }),
  createAppProblemPage({ slug: "record-room-condition", problemId: "record-condition", category: "引越し・住まい", title: "入居時の傷・設備不良を記録するアプリの選び方", description: "入居前からある傷や汚れを、写真と部屋名で残して保管する方法です。", intro: "写真は部屋全体と接写をセットで撮り、日付と場所が分かる名前で残します。", options: [{ name: "入退去メモ", kind: "入退去記録アプリ", body: "部屋ごとの写真・メモを残し、入居時と退去時の記録整理を支援します。", fit: "退去時にも比較できる形で写真を残したい", caution: "管理会社への提出方法・期限は契約書を確認してください。", url: "https://apps.apple.com/jp/app/%E5%85%A5%E9%80%80%E5%8E%BB%E3%83%A1%E3%83%A2/id6767765025" }], related: ["moveout-evidence", "home-manuals"] }),
  createAppProblemPage({ slug: "manage-family-information", problemId: "family-basics", category: "家族・もしも", title: "家族の緊急連絡先・重要情報を共有するアプリの選び方", description: "緊急連絡先、医療情報、書類の場所を、必要な家族が確認できる状態に整えます。", intro: "情報の種類ごとに見せる相手を決め、共有範囲を定期的に見直します。", options: [{ name: "GOOSE", kind: "家族情報共有アプリ", body: "病歴、保険、かかりつけ医など、もしものときに必要な情報を家族で共有できます。", fit: "緊急時に必要な生活・医療情報をまとめたい", caution: "共有する相手と情報の範囲を確認してください。", url: "https://goose-net.com/" }, { name: "つなぐノート", kind: "家族情報整理アプリ", body: "家族に残す情報や連絡先を整理するためのアプリです。", fit: "少しずつ情報を整理して、家族へ伝えたい", caution: "端末紛失時の保護設定と共有条件を確認してください。", url: "https://apps.apple.com/jp/app/id6451205576" }], related: ["family-medical-share", "family-access-plan"] }),
  createAppProblemPage({ slug: "share-family-schedule", problemId: "parenting-schedule", category: "子育て・学び", title: "家族の予定・送迎を共有するアプリの選び方", description: "学校行事、習い事、送迎などの予定と担当を、家族で共有する方法です。", intro: "誰がいつ対応するかを予定に書き、変更時の通知先を決めます。", options: [{ name: "TimeTree", kind: "共有カレンダーアプリ", body: "家族の予定、コメント、通知を一つのカレンダーに集められます。", fit: "予定だけでなく担当者も共有したい", caution: "子どもの予定を共有する相手を確認してください。", url: "https://timetreeapp.com/intl/ja/" }], related: ["parenting-grow", "leisure-plan"] }),
  createAppProblemPage({ slug: "back-up-photos-and-data", problemId: "digital-backup", category: "デジタル・安全", title: "写真や大事なデータをバックアップするアプリの選び方", description: "端末の故障・紛失に備え、写真や連絡先を復元できる状態にする方法です。", intro: "失いたくないデータを決めてから、自動バックアップと復元方法を確認します。", options: [{ name: "Google One バックアップ", kind: "クラウドバックアップアプリ", body: "Googleアカウントを使い、端末のデータや写真のバックアップを管理できます。", fit: "Android端末のデータを定期的にバックアップしたい", caution: "保存容量・対象データ・復元方法を公式案内で確認してください。", url: "https://one.google.com/about/" }, { name: "Google フォト", kind: "写真バックアップアプリ", body: "写真・動画のバックアップとアルバム整理を行えます。", fit: "写真を端末以外にも残したい", caution: "バックアップ品質、容量、共有設定を確認してください。", url: "https://photos.google.com/" }], related: ["digital-phone", "leisure-photos"] }),
  createAppProblemPage({ slug: "call-a-taxi-app", problemId: "mobility-taxi", category: "移動・外出", title: "タクシー配車アプリの選び方｜現在地から呼ぶ・予約する", description: "現在地、到着希望時刻、支払い方法を確認してタクシーを呼ぶ方法です。", intro: "安全に乗れる場所を指定し、手配料・キャンセル条件を確認してから依頼します。", options: [{ name: "GO", kind: "タクシー配車アプリ", body: "現在地への配車や支払い方法の設定をアプリで行えます。", fit: "電話せずに現在地からタクシーを呼びたい", caution: "対応地域、手配料金、予約可否を確認してください。", url: "https://go.mo-t.com/" }], related: ["mobility-delay", "mobility-parking"] }),
  createAppProblemPage({ slug: "reserve-parking", problemId: "mobility-parking", category: "移動・外出", title: "駐車場予約アプリの選び方｜目的地近くを事前に確保する", description: "車種、利用時間、入出庫条件を確認して駐車場を事前予約する方法です。", intro: "入口写真と区画の条件を確認し、当日の経路とキャンセル規定を保存します。", options: [{ name: "akippa", kind: "予約制駐車場アプリ", body: "目的地付近の駐車場を検索し、事前予約・オンライン決済できます。", fit: "満車を避けて、目的地近くを事前に確保したい", caution: "車両サイズ、入出庫条件、キャンセル規定を駐車場ごとに確認してください。", url: "https://www.akippa.com/" }], related: ["mobility-taxi", "leisure-join"] }),
  createAppProblemPage({ slug: "store-travel-luggage", problemId: "mobility-luggage", category: "移動・外出", title: "荷物預かりアプリの選び方｜旅行中に店舗で預ける", description: "荷物の大きさと移動経路に合う預け先を検索・予約する方法です。", intro: "受取可能時間、保管条件、店舗の位置を確認してから予約します。", options: [{ name: "ecbo cloak", kind: "荷物預かり予約アプリ", body: "カフェ・店舗などの空きスペースに荷物を預ける予約サービスです。", fit: "コインロッカー以外も含めて預け先を探したい", caution: "荷物サイズ、保管条件、受取時間を店舗ごとに確認してください。", url: "https://cloak.ecbo.io/ja/" }], related: ["leisure-join", "mobility-delay"] }),
  createAppProblemPage({ slug: "find-grocery-deals", problemId: "food-shopping", category: "食事・家事", title: "近所のスーパーのチラシ・特売を比べるアプリの選び方", description: "必要な物だけを買うために、近所の店舗とチラシを比較する方法です。", intro: "先に買い物リストを作り、移動時間を含めて一店舗か二店舗に絞ります。", options: [{ name: "くふう トクバイ", kind: "チラシ・買い物情報アプリ", body: "近隣スーパーのチラシや買い物情報を確認できます。", fit: "行ける範囲の店舗だけを比べたい", caution: "在庫・価格・営業時間は店舗の最新情報を確認してください。", url: "https://tokubai.co.jp/" }, { name: "Shufoo!", kind: "デジタルチラシアプリ", body: "位置や店舗から近隣のデジタルチラシを探せます。", fit: "店舗別に特売情報を見比べたい", caution: "店頭価格や在庫は変動するため、来店前に確認してください。", url: "https://www.shufoo.net/" }], related: ["food-recipe", "food-chores"] }),
  createAppProblemPage({ slug: "pick-up-surplus-food", problemId: "food-rescue", category: "食事・家事", title: "食品ロス削減アプリの選び方｜近所の余剰食品を受け取る", description: "受取時間と内容を確認し、近所の余剰食品を無理なく受け取る方法です。", intro: "受取に行ける時間だけを選び、アレルギー情報と保存方法を確認します。", options: [{ name: "TABETE", kind: "食品ロス削減アプリ", body: "近隣店舗の余剰になりそうな食品を予約し、指定時間に受け取れます。", fit: "近所で受取可能な食品を探したい", caution: "内容・受取時間・アレルギー表示を注文前に確認してください。", url: "https://tabete.me/" }], related: ["food-shopping", "food-recipe"] }),
  createAppProblemPage({ slug: "share-household-chores", problemId: "food-chores", category: "食事・家事", title: "家事分担を見える化するアプリの選び方｜偏りを話し合う", description: "日常の家事を見える化し、分担を感情的にならず話し合うための方法です。", intro: "一度に全部を変えず、負担の大きい家事を一つ選んで担当と期限を決めます。", options: [{ name: "Yieto 2", kind: "家事分担アプリ", body: "家事の見える化と分担の話し合いを支援するアプリです。", fit: "家事の偏りを一覧で確認して話し合いたい", caution: "相手を責める用途ではなく、合意した分担を見直すために使ってください。", url: "https://apps.apple.com/jp/app/id6745941580" }, { name: "Google Keep", kind: "共有メモアプリ", body: "買い物や家事のチェックリストを共有できます。", fit: "まずは少ない家事から共同の一覧にしたい", caution: "通知設定と共有するメモを確認してください。", url: "https://keep.google.com/" }], related: ["food-shopping", "family-basics"] }),
  createAppProblemPage({ slug: "choose-pet-sitter", problemId: "pets-sitter", category: "ペット", title: "ペットシッターを探すアプリの選び方｜旅行中の世話を依頼する", description: "世話内容、健康上の注意、面談、緊急時対応を確認してペットシッターを選ぶ方法です。", intro: "価格だけで決めず、レビュー、事前面談、キャンセル時の対応を確認します。", options: [{ name: "PetBacker", kind: "ペットシッター検索アプリ", body: "地域や条件からペットシッター等を探し、依頼前にやり取りできます。", fit: "旅行中の世話を頼める候補を比較したい", caution: "資格・保険・緊急時の連絡方法・利用条件を個別に確認してください。", url: "https://www.petbacker.com/" }], related: ["pets-record", "pets-hospital"] }),
  createAppProblemPage({ slug: "compare-moving-quotes", problemId: "choose-mover", category: "引越し・住まい", title: "引越し見積もりを比較する方法｜条件をそろえて選ぶ", description: "荷物量と希望日をそろえ、複数の引越し見積もりを比較するための手順です。", intro: "料金だけでなく、訪問見積もりの有無、補償、追加料金、キャンセル条件を確認します。", options: [{ name: "引越し侍", kind: "引越し見積もり比較サービス", body: "複数の引越し会社へ見積もりを依頼する入口として使えます。", fit: "同じ条件で複数社の見積もりを集めたい", caution: "連絡方法・対応地域・見積もり条件を確認してください。", url: "https://hikkoshizamurai.jp/" }], related: ["home-utilities", "moveout-evidence"] }),
  createAppProblemPage({ slug: "manage-project-scope", problemId: "work-scope", category: "仕事・フリーランス", title: "依頼範囲を整理するアプリの選び方｜見積もり・仕様を残す", description: "成果物、修正回数、追加料金を記録して、仕事のすれ違いを減らす方法です。", intro: "口頭の依頼も、期限と担当を確認できる形で残してから着手します。", options: [{ name: "Google Keep", kind: "共有メモアプリ", body: "依頼内容と確認事項を共有メモに整理できます。", fit: "まずは依頼内容を短く残して共有したい", caution: "契約条件は正式な書面・メールでも合意を残してください。", url: "https://keep.google.com/" }], related: ["work-change", "work-delivery"] }),
  createAppProblemPage({ slug: "track-project-changes", problemId: "work-change", category: "仕事・フリーランス", title: "仕様変更を記録するアプリの選び方｜追加作業を見える化する", description: "当初の依頼と変更内容を比較し、料金・納期への影響を残す方法です。", intro: "変更が出た時点で、作業内容・追加費用・新しい期限を確認します。", options: [{ name: "Google Keep", kind: "共有メモアプリ", body: "変更内容を時系列で残し、関係者と共有できます。", fit: "少人数で変更履歴をすぐ残したい", caution: "最終的な合意はメールなど記録性のある方法で確認してください。", url: "https://keep.google.com/" }], related: ["work-scope", "work-delivery"] }),
  createAppProblemPage({ slug: "invoice-after-delivery", problemId: "work-delivery", category: "仕事・フリーランス", title: "納品・請求を管理するアプリの選び方｜請求漏れを防ぐ", description: "納品物、請求書、入金予定日を整理して請求漏れを防ぐ方法です。", intro: "納品前に契約内容と照合し、検収日と請求期限を確認します。", options: [{ name: "Misoca", kind: "請求書作成・管理サービス", body: "見積書・納品書・請求書の作成と請求状況の管理を行えます。", fit: "納品後の請求書作成と入金確認をまとめたい", caution: "料金・電子帳簿保存法への対応・利用条件を公式案内で確認してください。", url: "https://www.misoca.jp/" }], related: ["work-scope", "work-profit"] }),
  createAppProblemPage({ slug: "review-freelance-profit", problemId: "work-profit", category: "仕事・フリーランス", title: "フリーランスの作業時間を記録して利益を振り返るアプリの選び方", description: "実作業時間と報酬を比べ、次の見積もりに活かすための記録方法です。", intro: "作業時間を細かく完璧に取るより、案件ごとの大まかな時間から始めます。", options: [{ name: "Toggl Track", kind: "時間記録アプリ", body: "案件や作業ごとの時間を記録し、後から集計できます。", fit: "実際に使った時間を案件ごとに振り返りたい", caution: "無料・有料機能とデータの共有範囲を確認してください。", url: "https://toggl.com/track/" }], related: ["work-delivery", "money-budget"] }),
  createAppProblemPage({ slug: "plan-family-access", problemId: "family-access-plan", category: "家族・もしも", title: "家族に必要な情報だけを共有するアプリの選び方", description: "重要情報を、必要な人・必要なタイミングで共有するための整理方法です。", intro: "パスワードをそのまま送らず、情報ごとに受け取る人と確認方法を決めます。", options: [{ name: "GOOSE", kind: "家族情報共有アプリ", body: "家族で確認したい生活・医療・保険情報を整理できます。", fit: "共有する情報を家族の状況に合わせて整理したい", caution: "共有範囲と利用条件を確認し、機密性の高い情報の扱いに注意してください。", url: "https://goose-net.com/" }], related: ["family-basics", "family-medical-share"] }),
  createAppProblemPage({ slug: "prepare-family-handover", problemId: "family-absence", category: "家族・もしも", title: "急な入院時に家のことを引き継ぐアプリの選び方", description: "連絡先、日々の世話、支払い、家の鍵などを家族へ引き継ぐための準備です。", intro: "最初の72時間に必要な情報だけを選び、家族に伝わる形で残します。", options: [{ name: "GOOSE", kind: "家族情報共有アプリ", body: "日常ともしもの情報を家族で確認できるように整理できます。", fit: "入院など急な不在でも、家族が必要な情報を確認できるようにしたい", caution: "共有相手と更新方法を定期的に確認してください。", url: "https://goose-net.com/" }], related: ["family-basics", "family-emergency"] }),
  createAppProblemPage({ slug: "find-everyday-lost-items", problemId: "daily-lost", category: "日常生活", title: "鍵や財布を探すアプリの選び方｜忘れ物を見つけやすくする", description: "鍵・財布などの置き場所を記録し、紛失時に探すためのアプリと紛失防止タグを比較します。", intro: "まず最後に使った場所と移動経路を確認し、個人情報が入る物は利用停止などの保護を優先します。", options: [{ name: "MAMORIO", kind: "紛失防止タグアプリ", body: "紛失防止タグとアプリで、持ち物の場所を確認するための選択肢です。", fit: "鍵や財布にタグを付けて普段から探しやすくしたい", caution: "位置の表示精度や通知範囲は端末・通信環境で異なります。", url: "https://mamorio.jp/" }, { name: "Tile", kind: "紛失防止タグアプリ", body: "Bluetoothタグを使い、対応する持ち物をアプリで探せます。", fit: "スマホと持ち物を相互に探したい", caution: "対応機種と電池・利用条件を確認してください。", url: "https://www.tile.com/ja-jp" }, { name: "Apple『探す』", kind: "持ち物を探すアプリ", body: "AirTagなど対応アクセサリをAppleの『探す』ネットワークで確認できます。", fit: "iPhoneで対応アクセサリをまとめて探したい", caution: "共有設定とプライバシーに関する案内を確認してください。", url: "https://www.apple.com/jp/airtag/" }], related: ["digital-phone", "digital-backup"] }),
  createAppProblemPage({ slug: "find-weekend-plans", problemId: "leisure-find", category: "休日・イベント", title: "週末のお出かけ先を探すアプリの選び方｜条件から候補を絞る", description: "エリア、予算、子ども連れなどの条件に合わせて、週末の行き先を探すアプリを比較します。", intro: "営業日・料金・混雑状況は変わるため、候補を決めたら施設や主催者の公式情報を確認します。", options: [{ name: "いこーよ", kind: "お出かけ情報アプリ", body: "子ども連れのお出かけ先やイベントを地域・条件から探せます。", fit: "子どもと行ける候補から探したい", caution: "開催状況・年齢条件は公式情報を確認してください。", url: "https://iko-yo.net/" }, { name: "アソビュー！", kind: "体験予約アプリ", body: "レジャーや体験を地域・日付から探し、予約できる選択肢です。", fit: "体験の空き状況と料金を比べたい", caution: "キャンセル条件と集合場所を確認してください。", url: "https://www.asoview.com/" }, { name: "Google マップ", kind: "地図・施設検索アプリ", body: "現在地・営業時間・経路を確認して、候補の位置関係を比べられます。", fit: "移動時間を含めて行き先を絞りたい", caution: "営業時間や臨時休業は施設の公式案内を優先してください。", url: "https://www.google.com/maps" }], related: ["leisure-plan", "leisure-join"] }),
  createAppProblemPage({ slug: "manage-event-participation", problemId: "leisure-join", category: "休日・イベント", title: "イベント参加を管理するアプリの選び方｜チケットと連絡をまとめる", description: "参加予定、チケット、集合場所を整理してイベント当日の抜け漏れを減らすアプリを比較します。", intro: "購入先の公式案内、入場条件、分配・キャンセル規定を確認してから予定へ登録します。", options: [{ name: "Peatix", kind: "イベント参加アプリ", body: "イベントを探し、参加登録やチケット確認を行えます。", fit: "イベント情報と参加チケットを一つのサービスで管理したい", caution: "主催者情報と返金・キャンセル条件を確認してください。", url: "https://peatix.com/" }, { name: "TimeTree", kind: "共有カレンダーアプリ", body: "集合時刻や担当を参加者と共有できます。", fit: "チケットとは別に、当日の予定と連絡を共有したい", caution: "チケットそのものの入場条件は販売元の案内を確認してください。", url: "https://timetreeapp.com/intl/ja/" }, { name: "Google マップ", kind: "地図・経路検索アプリ", body: "会場までの経路や集合場所を共有できます。", fit: "初めて行く会場の移動を確認したい", caution: "臨時の交通規制や入場口は主催者の案内を優先してください。", url: "https://www.google.com/maps" }], related: ["leisure-plan", "mobility-delay"] }),
  createAppProblemPage({ slug: "keep-moveout-evidence", problemId: "moveout-evidence", category: "引越し・住まい", title: "退去時の写真を保管するアプリの選び方｜原状回復の記録を残す", description: "退去前の室内写真や提出書類を、日付と部屋名が分かる形で保管するアプリを比較します。", intro: "写真は加工せず、全体と接写を撮り、管理会社への連絡・立会い日時と一緒に残します。", options: [{ name: "Google フォト", kind: "写真保管アプリ", body: "写真をアルバムに整理し、端末以外にもバックアップできます。", fit: "部屋ごとの写真をまとめて保管したい", caution: "共有範囲・容量・バックアップ状態を確認してください。", url: "https://photos.google.com/" }, { name: "Dropbox", kind: "ファイル保管アプリ", body: "写真・PDFをフォルダにまとめ、必要な相手へ共有できます。", fit: "写真と書類を同じ場所で保管したい", caution: "共有リンクの公開範囲と保存容量を確認してください。", url: "https://www.dropbox.com/" }, { name: "Adobe Scan", kind: "書類スキャンアプリ", body: "書類をPDFとして取り込み、保管しやすい形にできます。", fit: "退去に関する書類も写真と一緒に残したい", caution: "原本の保管が必要な書類は捨てないでください。", url: "https://www.adobe.com/acrobat/mobile/scanner-app.html" }], related: ["record-condition", "home-utilities"] }),
  createAppProblemPage({ slug: "prepare-family-emergency", problemId: "family-emergency", category: "家族・もしも", title: "家族の緊急時に連絡・情報を共有するアプリの選び方", description: "緊急連絡先、避難場所、必要な医療情報を、家族で確認できる形にするアプリを比較します。", intro: "危険が差し迫る場合はアプリより119・110などの緊急通報を優先し、平時に共有範囲を決めます。", options: [{ name: "GOOSE", kind: "家族情報共有アプリ", body: "医療・保険・連絡先など家族で確認したい情報を整理できます。", fit: "もしもの時に必要な情報の場所を決めたい", caution: "共有相手と情報の更新方法を確認してください。", url: "https://goose-net.com/" }, { name: "TimeTree", kind: "共有カレンダーアプリ", body: "連絡や予定を共有し、担当を確認するために使えます。", fit: "日常の予定と緊急時の連絡ルールを一緒に共有したい", caution: "緊急通報や安否確認の代替ではありません。", url: "https://timetreeapp.com/intl/ja/" }, { name: "Yahoo!防災速報", kind: "防災通知アプリ", body: "地震・豪雨などの情報を登録地域や現在地で受け取れます。", fit: "家族がいる地域の防災情報も確認したい", caution: "自治体や気象庁の最新情報を優先してください。", url: "https://emg.yahoo.co.jp/" }], related: ["daily-emergency", "family-basics"] }),
  createAppProblemPage({ slug: "organize-family-digital-access", problemId: "family-digital", category: "家族・もしも", title: "家族のデジタル情報を整理するアプリの選び方｜端末とアカウントに備える", description: "端末の復旧方法、重要書類の場所、アカウントの管理方法を整理するアプリを比較します。", intro: "パスワードを家族へ平文で共有せず、本人の同意と復旧手順を確認したうえで準備します。", options: [{ name: "Google パスワード マネージャー", kind: "パスワード管理機能", body: "Googleアカウントで保存したパスワードとセキュリティ確認を管理できます。", fit: "AndroidやChromeで使うアカウントを整理したい", caution: "端末ロックと2段階認証を設定してください。", url: "https://passwords.google.com/" }, { name: "1Password", kind: "パスワード管理アプリ", body: "パスワードや重要情報を暗号化して管理し、共有用の保管庫を設定できます。", fit: "家族と必要な情報だけを安全に共有したい", caution: "料金・共有範囲・緊急アクセスの条件を確認してください。", url: "https://1password.com/jp/" }, { name: "Google ドライブ", kind: "書類保管アプリ", body: "復旧手順や重要書類の保管場所を整理できます。", fit: "パスワード以外の手順書を家族と共有したい", caution: "機微情報の共有設定を絞り、アクセス権を定期的に見直してください。", url: "https://www.google.com/drive/" }], related: ["digital-account", "digital-backup"] }),
  createAppProblemPage({ slug: "prepare-tax-records", problemId: "money-tax", category: "お金・契約", title: "確定申告の記録をまとめるアプリの選び方｜収入と経費を整理する", description: "収入・経費・証憑を普段から整理し、確定申告前の作業を減らすアプリを比較します。", intro: "申告の対象・控除・期限は状況で変わるため、国税庁の最新案内や税理士への相談を確認します。", options: [{ name: "マネーフォワード クラウド確定申告", kind: "確定申告アプリ", body: "取引の記録や書類整理を行い、確定申告書作成を支援します。", fit: "日々の取引から申告準備を進めたい", caution: "料金、連携範囲、申告内容の最終確認は公式案内で確認してください。", url: "https://biz.moneyforward.com/tax_return/" }, { name: "やよいの青色申告 オンライン", kind: "確定申告アプリ", body: "帳簿付けと申告書作成を支援するクラウドサービスです。", fit: "青色申告の帳簿をクラウドで管理したい", caution: "申告方式や利用条件に合うか確認してください。", url: "https://www.yayoi-kk.co.jp/shinkoku/aoiroshinkoku/" }, { name: "freee会計", kind: "会計アプリ", body: "取引の記録・帳簿作成・申告準備を支援します。", fit: "会計記録から一元的に管理したい", caution: "税務判断は国税庁の案内や専門家へ確認してください。", url: "https://www.freee.co.jp/" }], related: ["work-profit", "money-budget"] }),
];

const additionalInformationProblemPages: ProblemPage[] = [
  { slug: "start-utilities-after-moving", problemId: "start-utilities", category: "引越し・住まい", contentType: "information", title: "引越し後に電気・ガス・水道を使える状態にする手順", description: "開通・開栓の確認と、連絡先や立会いを整理する方法です。", intro: "契約先の公式窓口で、利用開始日・住所・立会いの要否を確認します。", steps: [{ title: "各社の開始状況を確認する", body: "電気・水道・ガスを分けて、受付番号と開始日を確認します。" }, { title: "ガスの開栓立会いを予約する", body: "立会いが必要な地域では、希望日時を早めに確保します。" }, { title: "使えない場合は公式窓口へ連絡する", body: "建物の管理会社指定や設備不良の可能性も確認します。" }], options: [{ name: "引越れんらく帳", kind: "手続き案内", body: "対応する事業者の住所変更・開始停止手続きを案内します。", fit: "対応する手続きを一か所で整理したい", caution: "未対応の事業者は公式窓口で個別に手続きしてください。", url: "https://www.hikkoshi-line.com/" }], seoContent: [{ heading: "利用開始前に確認すること", body: "ガスの開栓は立会いが必要な場合があります。設備の不具合や契約先不明は、管理会社または事業者の公式窓口へ確認してください。" }], notes: ["緊急時を除き、訪問を名乗る相手の所属は公式窓口で確認してください。"], related: ["home-utilities", "home-moving"], reviewedAt: "2026-08-23" },
  { slug: "find-care-support", problemId: "health-care", category: "健康・介護", contentType: "information", title: "介護の相談先とサービスを探す手順｜地域包括支援センターから始める", description: "介護が必要かもしれないときに、地域の相談先と次に確認することを整理します。", intro: "本人の状態と家族の困りごとを簡単にメモし、住んでいる地域の相談窓口へ連絡します。", steps: [{ title: "困っている場面を整理する", body: "食事、移動、服薬、認知面、介護者の負担を具体的に書き出します。" }, { title: "地域包括支援センターへ相談する", body: "自治体の公式案内から担当窓口を確認します。" }, { title: "必要な手続きとサービスを確認する", body: "要介護認定や利用できるサービスは、案内に沿って進めます。" }], options: [{ name: "厚生労働省 介護サービス情報公表システム", kind: "公的情報", body: "地域・条件から介護サービス事業所を検索できます。", fit: "相談後に地域の事業所情報を確認したい", caution: "空き状況や契約条件は事業所へ直接確認してください。", url: "https://www.kaigokensaku.mhlw.go.jp/" }], seoContent: [{ heading: "まず相談する場所", body: "地域包括支援センターは、高齢者の生活・介護に関する地域の総合相談窓口です。自治体の公式サイトで連絡先を確認してください。" }], notes: ["急な意識障害や呼吸困難などは119を優先します。"], related: ["health-clinic", "family-basics"], reviewedAt: "2026-08-23" },
  { slug: "find-childcare-support", problemId: "parenting-care", category: "子育て・学び", contentType: "information", title: "子どもの預け先や子育て支援を探す手順｜自治体情報を確認する", description: "保育・一時預かり・地域支援の相談先を、自治体の公式情報から確認する方法です。", intro: "対象年齢、希望日時、必要な配慮を整理し、自治体の公式窓口と施設の案内を確認します。", steps: [{ title: "必要な預け方と条件を整理する", body: "定期利用・一時預かり・病児保育など、必要な形を分けます。" }, { title: "自治体の公式案内で対象と申込方法を確認する", body: "空き状況、締切、必要書類は地域ごとに異なります。" }, { title: "施設へ利用条件を確認する", body: "見学、慣らし保育、アレルギー対応などを確認します。" }], options: [{ name: "子ども・子育て支援情報公表システム ここdeサーチ", kind: "公的情報", body: "保育所などの施設情報を検索できます。", fit: "地域の施設情報を比較したい", caution: "申込受付や空き状況は自治体・施設へ確認してください。", url: "https://www.wam.go.jp/kokodesearch/" }], seoContent: [{ heading: "申込み前に確認すること", body: "対象年齢、利用時間、申込期限、必要書類は自治体・施設によって異なります。必ず公式案内を確認してください。" }], notes: ["急な病気の場合は通常保育ではなく、地域の病児保育などの案内を確認します。"], related: ["parenting-sick", "parenting-schedule"], reviewedAt: "2026-08-23" },
  { slug: "find-pet-hospital", problemId: "pets-hospital", category: "ペット", contentType: "information", title: "近くの動物病院を探す手順｜受診前に確認すること", description: "症状と緊急性を整理し、対応できる動物病院を探して受診前に確認する方法です。", intro: "呼吸困難、けいれん、誤食など緊急性があるときは、検索を続けず救急対応の病院へ電話します。", steps: [{ title: "症状と経過を整理する", body: "食事・排泄・誤食の可能性・既往歴をメモします。" }, { title: "診療対象と受付時間を確認する", body: "犬猫以外の動物、夜間、救急対応の可否を確認します。" }, { title: "電話で受診可否を確認する", body: "到着予定、症状、持参する薬や記録を伝えます。" }], options: [{ name: "ペット保険 比較・動物病院検索", kind: "病院検索情報", body: "地域や条件から動物病院情報を探すための入口です。", fit: "近くの候補と診療対象を確認したい", caution: "実際の受付状況・救急対応は必ず病院へ直接確認してください。", url: "https://pet.doctors-me.com/" }], seoContent: [{ heading: "緊急時は電話を優先", body: "病院の検索結果や営業時間は変わることがあります。症状が急な場合は、向かう前に電話で受診可否を確認してください。" }], notes: ["人用の薬を自己判断で与えないでください。"], related: ["pets-record", "pets-sitter"], reviewedAt: "2026-08-23" },
  { slug: "find-support-when-alone", problemId: "support-alone", category: "相談・支援", contentType: "information", title: "一人で抱え込まず相談先を探す手順｜生活の困りごと別に整理する", description: "お金、住まい、健康、法律などの困りごとを整理し、公的な相談窓口へつなぐ方法です。", intro: "今すぐ危険がある、住む場所がない、命に関わる場合は、地域の緊急窓口や119・110を優先します。", steps: [{ title: "困っていることと期限を一つ書き出す", body: "支払い、住まい、健康、家族、安全などに分けます。" }, { title: "公的な相談窓口を確認する", body: "自治体や国の公式サイトから、地域の窓口を探します。" }, { title: "連絡前に伝えたいことをメモする", body: "いつから、何が起きたか、希望する支援を短く整理します。" }], options: [{ name: "よりそいホットライン", kind: "相談窓口", body: "暮らしの困りごとを相談し、必要に応じて支援先につなぐ窓口です。", fit: "どこへ相談すればよいか分からない", caution: "受付時間・相談方法は公式案内で確認してください。緊急時は110・119を優先します。", url: "https://www.since2011.net/yorisoi/" }], seoContent: [{ heading: "相談先を選ぶ目安", body: "契約や請求は188、法律は法テラス、心の不調は自治体や専門窓口など、困りごとに合わせた公的窓口を確認してください。" }], notes: ["個人情報や安全に関する相談は、周囲に見られない安全な端末・場所を選んでください。"], related: ["support-legal", "support-mind"], reviewedAt: "2026-08-23" },
];

problemPages.push(...moreProblemPages, ...appExpansionProblemPages, ...additionalAppProblemPages, ...additionalInformationProblemPages);

// 月次レビューではこの値を確認し、90日を超える記事を優先して公式情報・外部リンクを再確認します。
export const oldestProblemPageReview = problemPages.reduce((oldest, page) => page.reviewedAt < oldest.reviewedAt ? page : oldest);

export const problemPageBySlug = (slug: string) => problemPages.find((item) => item.slug === slug);
export const problemPageById = (problemId: string) => problemPages.find((item) => item.problemId === problemId);
export const relatedProblemPage = (reference: string) => reference.startsWith("slug:")
  ? problemPageBySlug(reference.slice(5))
  : problemPageById(reference);
