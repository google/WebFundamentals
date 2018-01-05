project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: "欢迎您将Web Fundamentals翻译去其他的语言。"

{# wf_updated_on: 2017-10-10 #}
{# wf_published_on: 2016-09-13 #}

# 翻译 {: .page-title }

<!--div class="attempt-right">
  <figure>
    <img src="/web/images/gitlocalize_image0.png">
  </figure>
</div-->

我们现在在尝试一个翻译工具叫做[GitLocalize](https://gitlocalize.com/)。您可以跟着以下的步骤来翻译Web Fundementals。

1. 去[GitLocalize中的Web Fundamentals软件库(repository)](https://gitlocalize.com/repo/107).
2. 使用您的GitHub帐户开启新的GitLocalize帐户。
3. 寻找您想要翻译的文章。
4. 开始翻译。
5. 当翻译完毕，请发送您的翻译以进行审查。
6. 检查完毕的文章将会被语言管理员作为Pull Request发送到GitHub。

您可以从GitLocalize的[帮助页面](https://docs.gitlocalize.com/)学到GitLocalize是如何操作的。

如果您遇到任何问题或者有功能请求，您可以在[GitLocalize的issue tracker](https://github.com/gitlocalize/feedback/issues)提供建议。

与其他翻译贡献者聊天，您可以[注册ChromiumDev的Slack](https://chromiumdev-slack.herokuapp.com/)并加入#l10n频道。

Note: 让别人来审查你的翻译是非常重要的。[如果您翻译的语言没有版主](https://gitlocalize.com/repo/107/roles)，您可以在Slack的#l10n频道寻找可以帮助您审查文章的人。 如果您有兴趣当版主，您可以在#l10n找@agektmr。

这是目前所支持的语言：阿拉伯文 (AR), 德文 (DE), 西班牙文 (ES),
法文 (FR), 希伯来文 (HE), 印尼文 (ID), 义大利文 (IT), 日文 (JA),
韩文 (KO), 荷兰文 (NL), 波兰文 (PL), 葡萄牙文 (PT-BR), 俄文 (RU),
土耳其文 (TR), 繁体中文 (ZH-TW) 和 简体中文 (ZH-CN).

## 功劳

我们希望您能得到翻译文章的功劳。

将您的资料添加到`src/data/_contributors.yaml`，并将`- translator` 添加到 `role` 属性。 我们使用这资料以让您的资料出现在[贡献者页面](/web/resources/contributors)以及您翻译的文章。 例如：


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

由于GitLocalize中无法添加新的一段，请将以下这行加在文章的最后一段：


![](/web/images/gitlocalize_image1.png)

## 许可证

所有的内容是使用创作共用3.0。我们非常欢迎您的贡献及翻译，但是您必须签署我们的[贡献者许可协议](https://github.com/google/WebFundamentals/blob/master/CONTRIBUTING.md)。