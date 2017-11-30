project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: "歡迎您將Web Fundamentals翻譯去其他的語言。"

{# wf_updated_on: 2017-10-10 #}
{# wf_published_on: 2016-09-13 #}

# 翻譯 {: .page-title }

<!--div class="attempt-right">
  <figure>
    <img src="/web/images/gitlocalize_image0.png">
  </figure>
</div-->

我們現在在嘗試一個翻譯工具叫做[GitLocalize](https://gitlocalize.com/)。您可以跟著以下的步驟來翻譯Web Fundementals。

1. 去[GitLocalize中的Web Fundamentals軟件庫(repository)](https://gitlocalize.com/repo/107).
2. 使用您的GitHub帳戶開啟新的GitLocalize帳戶。
3. 尋找您想要翻譯的文章。
4. 開始翻譯。
5. 當翻譯完畢，請發送您的翻譯以進行審查。
6. 檢查完畢的文章將會被語言管理員作為Pull Request發送到GitHub。

您可以從GitLocalize的[幫助頁面](https://docs.gitlocalize.com/)學到GitLocalize是如何操作的。

如果您遇到任何問題或者有功能請求，您可以在[GitLocalize的issue tracker](https://github.com/gitlocalize/feedback/issues)提供建議。

與其他翻譯貢獻者聊天，您可以[註冊ChromiumDev的Slack](https://chromiumdev-slack.herokuapp.com/)並加入#l10n頻道。

這是目前所支持的語言：阿拉伯文 (AR), 德文 (DE), 西班牙文 (ES),
法文 (FR), 希伯來文 (HE), 印尼文 (ID), 義大利文 (IT), 日文 (JA),
韓文 (KO), 荷蘭文 (NL), 波蘭文 (PL), 葡萄牙文 (PT-BR), 俄文 (RU),
土耳其文 (TR), 繁體中文 (ZH-TW) 和 簡體中文 (ZH-CN).

## 功勞

我們希望您能得到翻譯文章的功勞。

將您的資料添加到`src/data/_contributors.yaml`，並將`- translator` 添加到 `role` 屬性。 我們使用這資料以讓您的資料出現在[貢獻者頁面](/web/resources/contributors)以及您翻譯的文章。 例如：


```
paulkinlan:
  name:
    given: Paul
    family: Kinlan
  org:
    name: Google
      unit: Developer Relations
  country: UK
    role:
    - author
    - engineer
    - translator
  homepage: http://paul.kinlan.me
  google: +PaulKinlan
  twitter: paul_kinlan
  email: paulkinlan@google.com
  description:
    en: "Paul is a Developer Advocate"
```

最後，記得將以下這行加在文章的最後一段。

![](/web/images/gitlocalize_image1.png)

## 许可证

所有的內容是使用创作共用3.0。我們非常歡迎您的貢獻及翻譯，但是您必須簽署我們的[貢獻者許可協議](https://github.com/google/WebFundamentals/blob/master/CONTRIBUTING.md)。
