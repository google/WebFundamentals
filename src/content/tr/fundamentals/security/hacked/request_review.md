project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# İnceleme Talep Edin {: .page-title }

Sayfanızın veya sitenizin
tehlikeli veya kullanıcılar açısından yanıltıcı olabileceğini belirten işareti kaldırtmak için Google'dan bir inceleme talep etmelisiniz.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## İhtiyacınız olanlar:

*   Kabuk/terminal komutlarının bilgisi

## Yapacaklarınız:

### 1. Önkoşullar

Bir inceleme talep etmeden önce aşağıdaki adımları uyguladığınızdan emin olun:

* Sitenizin Search Console'daki sahipliğinin doğrulanması
* Sitenizin, korsanın vandalist faaliyetlerinden temizlenmesi
* Güvenlik açığının düzeltilmesi
* Sitenizin temiz bir şekilde çevrimiçi ortama döndürülmesi

### 2. Sayfalarınızın erişilebilir ve temiz olup olmadığını yeniden kontrol edin

Güvenliği sağlamak için sitenizdeki sayfaları, örneğin
ana sayfayı ve korsan tarafından değiştirilmiş bir URL'yi görüntülemek için Wget veya cURL kullanın; bu sayfalar artık temiz olmalıdır. Bu sayfalar temizse
ve aynısının sitenizdeki diğer sayfalar için de geçerli olduğundan eminseniz
inceleme talep etme vakti gelmiştir.

Not: Sayfalarınızın temiz olduğundan emin olunabilmesi için
Googlebot tarafından gezinilebilir durumda olmaları gerekir. Sayfalarınızın robot yönlendirmesinin iptal edilmediğinden veya dizinlenmesinin
`noindex` robotları, META etiketler veya dizinler tarafından engellenmediğinden emin olun.

### 3. Bir inceleme talep edin

Bir inceleme talep etmeden önce:

* **sorunun gerçekten çözüldüğünden emin olun**;
sorun hâlâ devam ederken inceleme talep etmek, yalnızca sitenizin
tehlikeli olarak işaretleneceği süreyi uzatacaktır.

* **inceleme talep etmeniz gereken aşamayı yeniden kontrol edin**; inceleme süreci,
sitenizin karşı karşıya olduğu soruna bağlı olarak özel bir araç dahilinde yürütülecektir.
Lütfen aşağıdaki kanallara başvurun.


#### A. Korsan saldırısına uğramış site

*Search Console'un
[**Manual Actions raporunda**](https://www.google.com/webmasters/tools/manual-action)
korsan saldırısına uğramış site bildirimi aldınız:*

1. Temizleme sürecinin birbirini takip eden adımlarını uyguladığınıza göre tekrar
  [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
  raporuna giderek sorunu site geneli bir eşleştirme veya kısmi bir eşleştirme olarak
  bulun.
2. **Request a review** öğesini seçin.

    İnceleme gönderebilmek için siteyi temizlemek üzere neler yaptığınıza ilişkin olarak
    daha fazla bilgi vermenizi rica ediyoruz. Korsan saldırısına uğramış her bir istenmeyen posta kategorisi için sitenin nasıl temizlendiğini açıklayan bir
    cümle yazabilirsiniz (örneğin, "İçerik
    eklenmek üzere korsan saldırısına uğramış URL'ler için istenmeyen posta içeren içerikleri kaldırdım ve güvenlik açığını
    düzelttim: güncel olmayan bir eklentiyi güncelleme.").


#### B. İstenmeyen yazılım (kötü amaçlı yazılım dahil)

*Search Console'un
[**Security Issues raporunda**](https://www.google.com/webmasters/tools/security-issues)
kötü amaçlı yazılım veya istenmeyen yazılım bildirimi aldınız:*

1. Search Console'da tekrar
  [**Security Issues raporunu**](https://www.google.com/webmasters/tools/security-issues)
  açın. Rapor önceden gördüğünüz uyarıları ve saldırıdan etkilenen örnek
  URL'leri hâlâ gösteriyor olabilir.
2. **Request a review** öğesini seçin.

    İnceleme gönderebilmek için sitenizden ilke ihlalini kaldırmak üzere neler yaptığınıza ilişkin olarak
    daha fazla bilgi vermenizi rica ediyoruz. Örneğin,
    "Web sitemde
    kötü amaçlı yazılım dağıtan 3. taraf kodunu kaldırdım ve onun yerinde kodun daha modern bir versiyonunu koydum".


*Search Console'un
[**Security Issues raporunda**](https://www.google.com/webmasters/tools/security-issues)
kötü amaçlı yazılım veya istenmeyen yazılım bildirimi almadınız, ancak AdWords hesabınızda bir bildirim aldınız:*

1. 
  [AdWords destek merkezi](https://support.google.com/adwords/contact/site_policy) aracılığıyla inceleme talep edin.


#### C. Kimlik Avı veya Sosyal Mühendislik

*Search Console'un
[**Security Issues raporunda**](https://www.google.com/webmasters/tools/security-issues)
kimlik avı bildirimi aldınız:*

1. Search Console'da tekrar
  [**Security Issues raporunu**](https://www.google.com/webmasters/tools/security-issues)
  açın. Rapor önceden gördüğünüz uyarıları ve saldırıdan etkilenen örnek
  URL'leri hâlâ gösteriyor olabilir.
2. **Request a review** öğesini seçin.

    İnceleme gönderebilmek için sitenizden ilke ihlalini kaldırmak üzere neler yaptığınıza ilişkin olarak
    daha fazla bilgi vermenizi rica ediyoruz. Örneğin,
    "Kullanıcılardan kişisel bilgiler girmelerini isteyen sayfayı kaldırdım".

3. Şu adresten de inceleme talep edebilirsiniz:
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Bu rapor, sayfalarının
  yanlışlıkla kimlik avı için işaretlendiğine inanan site sahipleri için bir raporlama aracı olarak işlev görmesinin yanı sıra, uyarıların kaldırılması için temizlenen kimlik avı sayfalarının
  incelenme sürecini de başlatacaktır.

### 4. İncelemenin işlenmesini bekleyin

* **İstenmeyen postayla korsan saldırısına uğrama incelemesinin işlem süresi:** İstenmeyen postayla
  korsan saldırısına uğramış siteler için hazırlanan incelemelerin işlenmesi birkaç hafta kadar sürebilir. Bunun nedeni, istenmeyen posta
  incelemelerinin manuel araştırmayı veya korsan saldırısına uğramış sayfaların
  tümüyle yeniden işlenmesini gerektirebilmesidir. İnceleme onaylanırsa Güvenlik Sorunları
  artık korsan saldırısına uğramış kategori türlerini veya korsan saldırısına uğramış örnek URL'leri göstermeyecektir.
* **Kötü amaçlı yazılım incelemesinin işlem süresi:** Kötü amaçlı yazılımdan
  etkilenen siteler için hazırlanan incelemelerin işlenmesi birkaç gün sürer. İnceleme tamamlandığında
  yanıt, Search Console'un **Messages** bölümünde olacaktır.
* **Kimlik avı incelemesinin işlem süresi:** Kimlik avı incelemelerinin işlenmesi
  yaklaşık bir gün sürer. İşlem başarılı olursa kullanıcının gördüğü kimlik avı uyarısı
  kaldırılacak ve sayfanız tekrar arama sonuçlarında çıkabilecektir.

Google, sitenizin temiz olduğunu öğrenirse uyarıların tarayıcılardan ve
arama sonuçlarından 72 saat içinde kaldırılması gerekir.

Google, sorunu çözmediğinize karar verirse Search Console'daki Güvenlik
Sorunları raporu, örneğin bir sonraki araştırmanızda size yardımcı olmak için saldırıdan etkilenen
daha fazla örnek URL gösterebilir. Kötü amaçlı yazılım, kimlik avı veya istenmeyen postayla saldırıya uğramaya
ilişkin uyarılar, kullanıcıları koruma amaçlı bir
önlem olarak arama sonuçlarında ve/veya tarayıcılarda görünmeye devam edecektir.

### Son adımlar

* **Talebiniz onaylandıysa** sitenizin beklendiği gibi çalıştığını doğrulayın:
  sayfalar düzgün bir biçimde yükleniyor ve bağlantılar tıklanabilir durumda. Sitenizi güvende tutmak için
  tüm site sahiplerine [Sitenizi temizleyin ve bakımını yapın](clean_site) sayfasında oluşturulan
  bakım ve güvenlik planını uygulamalarını öneriyoruz.

    Daha fazla bilgi için
    [StopBadware](https://www.stopbadware.org) sitesinde bulunan aşağıdaki kaynaklara başvurmayı deneyin:

      * [Kötü amaçlı yazılımları önleme: temel bilgiler](https://www.stopbadware.org/prevent-badware-basics)
      * [Ek kaynaklar: korsan saldırısına uğramış siteler](https://www.stopbadware.org/hacked-sites-resources)

* **Talebiniz onaylanmadıysa** sitenizde
  [kötü amaçlı yazılım](hacked_with_malware), [istenmeyen posta](hacked_with_spam) veya
  korsan tarafından oluşturulmuş herhangi bir değişiklik ya da yeni bir dosya olup olmadığını yeniden değerlendirin. Alternatif olarak da
  [destek ekibinizdeki uzmanlardan](support_team) daha fazla
  yardım talep etmeyi düşünebilirsiniz.
