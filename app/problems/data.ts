export type ProblemPage = {
  slug: string;
  problemId: string;
  category: string;
  title: string;
  description: string;
  intro: string;
  steps: { title: string; body: string }[];
  options: { name: string; kind: string; body: string; fit: string; caution: string; url: string }[];
  notes: string[];
  related: string[];
  reviewedAt: string;
};

export const problemPages: ProblemPage[] = [
  {
    slug: "scam-call-check", problemId: "digital-scam", category: "デジタル・安全",
    title: "詐欺電話か確認したいときにすること｜怪しい着信への対処手順",
    description: "知らない番号や不審な電話を受けたときに、折り返す前に確認すること、相談先、詐欺対策サービスの選び方を整理します。",
    intro: "電話口で急かされたり、警察・役所・金融機関を名乗られたりしても、その場で個人情報や暗証番号を伝える必要はありません。まず通話を切り、相手が示した番号ではなく、組織の公式窓口を自分で調べて確認します。",
    steps: [
      { title: "通話を切り、要求内容を記録する", body: "相手の名乗り、電話番号、要求、期限をメモします。SMSのリンクは開かず、認証コードも伝えません。" },
      { title: "公式窓口を自分で調べる", body: "相手から教えられた連絡先ではなく、警察・役所・金融機関などの公式サイトに掲載された番号へ確認します。" },
      { title: "相談・報告して着信対策をする", body: "不安があれば警察相談専用電話 #9110 や消費者ホットライン188へ。端末や通信会社の迷惑電話対策も有効にします。" },
    ],
    options: [
      { name: "詐欺バスターLITE", kind: "詐欺電話対策アプリ", body: "通話内容をもとに詐欺の可能性を確認するための選択肢です。", fit: "電話中や通話後に、怪しい内容か判断する材料がほしい", caution: "判定だけを過信せず、金銭や個人情報を求められた場合は公式窓口へ確認してください。", url: "https://apps.apple.com/jp/app/id6743839168" },
      { name: "警察相談専用電話 #9110", kind: "警察庁・相談窓口", body: "緊急ではない生活上の安全や犯罪被害の不安について、地域の警察相談窓口につながります。", fit: "詐欺の可能性や今後の対応を警察へ相談したい", caution: "事件・事故が発生中など緊急の場合は110を利用します。", url: "https://www.gov-online.go.jp/useful/article/201309/3.html" },
    ],
    notes: ["警察や金融機関が電話で暗証番号を尋ねることはありません。", "画面共有アプリの導入やATM操作を求められたら中断してください。"],
    related: ["digital-account", "money-trouble"], reviewedAt: "2026-08-12",
  },
  {
    slug: "ambulance-or-hospital", problemId: "health-urgent", category: "健康・介護",
    title: "救急車を呼ぶべきか迷ったときの確認方法｜Q助と相談窓口",
    description: "急な病気やけがで、救急車・早めの受診・経過観察のどれが必要か迷ったときの判断材料を案内します。",
    intro: "意識がない、呼吸が苦しい、突然の激しい痛みなど明らかな緊急症状がある場合は、案内サービスを操作する前に119へ連絡してください。迷う状況では、公的な判定支援や電話相談を利用できます。",
    steps: [
      { title: "意識・呼吸・強い痛みを確認する", body: "反応がない、普段どおり呼吸していない、突然の激痛などがあれば119へ。" },
      { title: "症状と年齢から緊急度を確認する", body: "発症時刻、持病、服薬、アレルギーも一緒に整理します。" },
      { title: "案内された受診手段を確認する", body: "自力受診の場合も、医療機関へ出発前に受付可否を電話で確認します。" },
    ],
    options: [
      { name: "全国版救急受診ガイド Q助", kind: "総務省消防庁", body: "画面上で症状を選択すると、緊急度に応じた必要な対応と受診手段を案内します。", fit: "救急車か受診かを判断する材料がほしい", caution: "診断を行うものではありません。明らかな緊急時は119へ連絡してください。", url: "https://www.fdma.go.jp/mission/enrichment/appropriate/appropriate003.html" },
    ],
    notes: ["地域によっては救急安心センター #7119も利用できます。", "子どもの急な症状は小児救急電話相談 #8000も確認できます。"],
    related: ["health-clinic", "family-medical-share"], reviewedAt: "2026-08-12",
  },
  {
    slug: "find-open-clinic", problemId: "health-clinic", category: "健康・介護",
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
      { name: "Google デバイスを探す", kind: "Android", body: "Android端末の位置確認、音を鳴らす、ロック、初期化などを行えます。", fit: "Googleアカウントに紐づくAndroid端末を探したい", caution: "端末の電源・通信・事前設定により位置が表示されない場合があります。", url: "https://support.google.com/android/answer/6160491?hl=ja" },
    ],
    notes: ["パスワード変更前に、位置確認や紛失モードの利用条件を確認します。", "拾得者と直接会う場合も、安全を優先してください。"],
    related: ["digital-account", "digital-backup"], reviewedAt: "2026-08-12",
  },
  {
    slug: "check-disaster-risk", problemId: "daily-emergency", category: "日常生活",
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
    related: ["family-basics", "family-absence"], reviewedAt: "2026-08-12",
  },
  {
    slug: "moving-procedures", problemId: "home-utilities", category: "引越し・住まい",
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
    title: "粗大ごみ・家電を正しく処分する方法｜捨て方を調べる順番",
    description: "家具や家電の品目、サイズ、家電リサイクル対象、自治体のルールを確認し、安全に処分する手順です。",
    intro: "テレビ、エアコン、冷蔵庫・冷凍庫、洗濯機・衣類乾燥機は、通常の粗大ごみと異なる家電リサイクルの手続きが必要です。無許可の回収業者による高額請求や不適正処理にも注意します。",
    steps: [
      { title: "品目・大きさ・製造年を確認する", body: "家電はメーカーと型番も控え、まだ使用可能か確認します。" },
      { title: "自治体とリサイクル対象のルールを確認する", body: "粗大ごみ、小型家電、家電4品目など、正しい区分を調べます。" },
      { title: "費用・搬出方法・日程を確認して申し込む", body: "自力搬出が難しい場合は、正規の許可や提携がある事業者を選びます。" },
    ],
    options: [
      { name: "環境省 家電リサイクル案内", kind: "公的案内", body: "家電4品目、小型家電、粗大ごみの区分と、無許可回収業者への注意点を確認できます。", fit: "処分方法の区分から確認したい", caution: "実際の収集方法や料金は自治体・販売店の案内を確認してください。", url: "https://www.env.go.jp/recycle/kaden/tvrecycle.html" },
    ],
    notes: ["冷蔵庫や洗濯機は中身と水抜きを事前に確認します。", "個人情報が残る機器は初期化とデータ消去を行います。"],
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
    ],
    notes: ["薬の量や回数は獣医師の指示を優先してください。", "誤食や呼吸困難など緊急性がある場合は記録より受診を優先します。"],
    related: ["pets-hospital", "pets-sitter"], reviewedAt: "2026-08-12",
  },
];

export const problemPageBySlug = (slug: string) => problemPages.find((item) => item.slug === slug);
export const problemPageById = (problemId: string) => problemPages.find((item) => item.problemId === problemId);
