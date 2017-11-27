project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Pelajari cara mengambil adegan WebGL di Three.js dan menambahkan kemampuan WebVR.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# Memulai dengan WebVR {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}
{% include "web/_shared/contributors/mscales.html" %}

Caution: WebVR masih eksperimental dan bisa berubah.

Dalam panduan ini kami akan mengeksplorasi WebVR API, dan menggunakannya untuk meningkatkan adegan WebGL sederhana yang dibangun dengan [Three.js](https://threejs.org/). Namun, untuk tugas produksi, Anda mungkin ingin memulai dengan solusi yang ada, seperti [WebVR Boilerplate](https://github.com/borismus/webvr-boilerplate). Jika Anda benar-benar baru mengenal Three.js, Anda bisa menggunakan [panduan mulai berguna](https://aerotwist.com/tutorials/getting-started-with-three-js/) ini. Komunitas ini juga sangat mendukung, jadi jika Anda menemui jalan buntu, cukup beri tahu mereka.

Mari kita mulai dengan [adegan yang meletakkan kotak di dalam ruang wireframe](https://googlechrome.github.io/samples/web-vr/hello-world/), kode yang ada di [repo Google Chrome sample](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world).

![WebGL Scene yang berjalan di desktop Chrome](./img/desktop.jpg)

### Catatan kecil tentang dukungan

WebVR yang tersedia pada Chrome 56+ di belakang flag waktu proses. Mengaktifkan flag (menuju `chrome://flags` dan mencari "WebVR") akan memungkinkan Anda membangun dan menguji pekerjaan VR secara lokal. Jika Anda ingin mendukung WebVR untuk pengunjung, Anda dapat memilih [Uji Coba Sumber](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md), yang memungkinkan Anda untuk memiliki WebVR aktif untuk asal Anda.

Anda juga dapat menggunakan [Web VR polyfill](https://github.com/googlevr/webvr-polyfill), namun perlu diingat bahwa ada penalti kinerja yang signifikan jika menggunakan polyfill. Anda harus benar-benar menguji perangkat target Anda, dan hindari mengirimkan apa pun yang tidak bisa mengikuti laju penyegaran perangkat. Laju bingkai yang buruk atau variabel dapat mengakibatkan ketidaknyamanan yang besar bagi orang-orang yang menggunakan pengalaman Anda!

Untuk informasi selengkapnya, lihat laman [Status WebVR](../status/).

## Mendapatkan akses ke Tampilan VR

Jadi dengan adegan WebGL, apa yang perlu kami kerjakan dengan WebVR? Pertama-tama, kita perlu membuat kueri browser guna menemukan apakah ada tampilan VR yang tersedia, yang kami bisa lakukan dengan navigator.getVRDisplays().

    navigator.getVRDisplays().then(displays => {
      // Filter down to devices that can present.
      displays = displays.filter(display => display.capabilities.canPresent);

      // If there are no devices available, quit out.
      if (displays.length === 0) {
        console.warn('No devices available able to present.');
        return;
      }

      // Store the first display we find. A more production-ready version should
      // allow the user to choose from their available displays.
      this._vr.display = displays[0];
      this._vr.display.depthNear = DemoVR.CAMERA_SETTINGS.near;
      this._vr.display.depthFar = DemoVR.CAMERA_SETTINGS.far;
    });

Ada beberapa hal yang perlu diperhatikan di kode ini.

1. **Tidak setiap perangkat bisa "disajikan" ke Head Mounted Display.** Ada perangkat yang memungkinkan untuk — katakanlah — penggunaan akselerometer, atau pengalaman pseudo-VR, namun tidak memanfaatkan HMD. Untuk perangkat-perangkat tersebut, boolean canPresent akan keliru, dan perlu diperiksa.

2. **Mungkin tidak ada perangkat VR yang tersedia.** Kita harus berupaya untuk membuat pengalaman yang benar-benar cocok untuk setelan non-VR, dan memperlakukan ketersediaan VR sebagai Peningkatan Progresif.

3. **Mungkin ada beberapa perangkat VR yang tersedia. **Hal serupa, sangat dimungkinkan bahwa seseorang akan memiliki beberapa perangkat VR yang tersedia, dan kita harus mengizinkannya jika memang memungkinkan, untuk memilih yang paling tepat.

## Memasang WebVR Emulation Chrome DevTools Extension

Mungkin Anda tidak memiliki perangkat berkemampuan VR untuk diuji. Jika demikian, di sini tersedia bantuan! Jaume Elias telah membuat [Chrome DevTools Extension yang mengemulasi perangkat VR](https://chrome.google.com/webstore/detail/webvr-api-emulation/gbdnpaebafagioggnhkacnaaahpiefil).

![Mengemulasi WebVR dengan Ekstensi Chrome Jaume Elias](./img/webvr-emulation.jpg)

Sementara, memang akan lebih baik untuk menguji pada perangkat nyata (terutama untuk pengujian kinerja!) yang memiliki ekstensi ini dapat membantu Anda dengan cepat men-debug selama Anda membangun.

## Meminta presentasi dari perangkat

Untuk mulai melakukan presentasi di "mode VR", kami harus memintanya dari perangkat:

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }]);

`requestPresent` mengambil larik yang [spesifikasi Web VR](https://w3c.github.io/webvr/#vrlayer) sebut "VRLayer", yang utamanya merupakan pembungkus di sekitar elemen Canvas yang diberikan untuk perangkat VR. Di cuplikan kode di atas, kami mengambil elemen Canvas — `WebGLRenderer.domElement` — yang disediakan oleh Three.js dan meneruskannya sebagai properti sumber VRLayer tunggal. Sebagai balasannya, `requestPresent` akan memberi Anda [Promise](/web/fundamentals/getting-started/primers/promises), yang akan diselesaikan jika permintaan berhasil, dan akan menolak jika tidak berhasil.

## Menggambar adegan VR Anda

Terakhir, kita siap untuk mengajikan adegan VR kepada pengguna, yang benar-benar menarik!

![Adegan WebVR berjalan dalam Piksel](../img/getting-started-with-webvr.jpg)

Pertama-tama, mari kita bicara tentang apa yang harus dilakukan.

* Pastikan kita menggunakan callback `requestAnimationFrame` perangkat.
* Minta informasi orientasi, arah, dan mata dari perangkat VR.
* Bagi materi WebGL menjadi dua bagian, satu untuk setiap mata, dan gambar masing-masing mata.

Mengapa kita harus menggunakan `requestAnimationFrame` berbeda dari yang disediakan dengan objek jendela? Karena kita bekerja dengan tampilan yang laju penyegarannya mungkin berbeda dari mesin host! Jika headset memiliki laju penyegaran 120Hz, kita perlu menghasilkan bingkai menurut laju tersebut, bahkan jika mesin host menyegarkan layarnya pada 60Hz. WebVR API mempertimbangkan hal itu dengan memberi kita `requestAnimationFrame` API berbeda untuk dipanggil. Dalam hal perangkat seluler, biasanya hanya ada satu layar (dan pada Android saat ini, laju penyegarannya adalah 60Hz), meski demikian, kita harus menggunakan API yang tepat agar kode kita tak mudah usang dan sedapat mungkin kompatibel.

    _render () {
      // Use the VR display's in-built rAF (which can be a diff refresh rate to
      // the default browser one).  _update will call _render at the end.

      this._vr.display.requestAnimationFrame(this._update);
      …
    }

Berikutnya kita perlu meminta informasi tentang kepala seseorang berada, putarannya, dan informasi lainnya yang kita butuhkan agar dapat menggambar dengan benar, yang kita lakukan dengan `getFrameData()`.

    // Get all the latest data from the VR headset and dump it into frameData.
    this._vr.display.getFrameData(this._vr.frameData);

`getFrameData()` akan mengambil objek yang dapat menempatkan informasi yang dibutuhkan. Objeknya harus berupa objek `VRFrameData`, yang kita dapat buat dengan `new VRFrameData()`.

    this._vr.frameData = new VRFrameData();

Ada banyak informasi menarik dalam data bingkai, jadi, mari kita lihat sekilas.

* **stempel waktu**. Stempel waktu pembaruan dari perangkat. Nilai ini dimulai dengan 0 pada waktu pertama getFrameData dipanggil pada layar VR.

* **leftProjectionMatrix** dan **rightProjectionMatrix**. Ada matriks untuk kamera yang mempertimbangkan sudut pandang mata dalam adegan. Kita akan berbicara lebih banyak tentang hal ini sebentar lagi.

* **leftViewMatrix** dan **rightViewMatrix**. Ada dua matriks yang menyediakan tentang lokasi setiap mata di adegan.

Jika Anda baru mengenal matriks Proyeksi kerja 3D dan matriks Model-View bisa terlihat menakutkan. Sementara ada sedikit matematika di balik yang kita lakukan ini, kita secara teknis tidak perlu mengetahui cara kerjanya, lebih ke apa yang dikerjakan.

* **Matriks Proyeksi.** Matriks ini digunakan untuk membuat tayangan sudut pandang dalam adegan. Hal ini biasanya dilakukan dengan men-distorsi skala objek dalam adegan saat bergerak menjadi dari mata.

* **Matriks Model-View.** Matriks ini digunakan untuk memosisikan objek di ruang 3D. Karena cara matriks bekerja, Anda bisa membuat grafik adegan dan menggarap grafik, mengalikan setiap simpul matriks, sampai pada matriks model-vie final untuk objek yang bersangkutan.

Ada banyak panduan yang bagus di web yang menjelaskan matriks Proyeksi dan Model-View dengan amat mendalam, untuk itu, google-lah jika Anda ingin mendapatkan lebih banyak informasi latar belakang.

## Mengendalikan rendering adegan

Karena kita memiliki matriks yang dibutuhkan, mari kita menggambar tampilan untuk mata kiri. Untuk memulai, kita perlu memberi tahu Three.js untuk tidak mengosongkan materi WebGL setiap saat kita memanggil render, karena kita harus menggambar dua kali dan kita tidak ingin kehilangan gambar untuk mata kiri saat kita menggambarnya untuk mata kanan.

    // Make sure not to clear the renderer automatically, because we will need
    // to render it ourselves twice, once for each eye.
    this._renderer.autoClear = false;

    // Clear the canvas manually.
    this._renderer.clear();

Berikutnya, mari kita buat renderer hanya untuk menggambar setengah yang kiri:

    this._renderer.setViewport(
        0, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

Kode ini mengasumsikan bahwa konteks GL itu layar penuh (`window.inner*`), yang merupakan taruhan yang baik untuk VR. Sekarang kita dapat memasukkan dua matriks untuk mata kiri.

    const lViewMatrix = this._vr.frameData.leftViewMatrix;
    const lProjectionMatrix = this._vr.frameData.leftProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(lProjectionMatrix);
    this._scene.matrix.fromArray(lViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

Ada sepasang detail implementasi yang penting.

* **Kita menggerakkan sekitar, bukan kamera.** Tampaknya sedikit aneh jika Anda tidak mengalami hal itu sebelumnya, tapi dalam pekerjaan grafis, merupakan hal umum menetapkan kamera pada sumber (0, 0, 0) dan menggerakkan sekitarnya. Tanpa terlalu filosofis, jika saya bergerak 10 meter ke depan, apakah saya bergerak 10 meter ke depan atau bumi bergerak 10 meter ke belakang? Hal ini tergantung pada sudut pandang Anda, dan bukan masalah perspektif matematika mana yang kita lakukan. Karena WebVR API mengembalikan "*kebalikan* matriks model mata", kami diharapkan untuk menerapkannya ke dunia (`this._scene` di kode kita) bukan kamera itu sendiri.

* **Secara manual, kita harus memperbarui matriks setelah mengubah nilainya.** Three.js meng-cache nilai dengan sangat berat (dan ini bagus untuk kinerja!), namun itu berarti Anda *harus* memberitahukannya bahwa sesuatu telah berubah agar dapat melihat perubahan itu. Ini dilakukan dengan metode `updateMatrixWorld()`, yang mengambil boolean untuk memastikan penghitungan menyebar ke bawah grafik adegan.

Kita hampir selesai! Langkah terakhir adalah mengulang proses untuk mata kanan. Di sini kita akan menghapus penghitungan kedalaman renderer setelah menggambar pandangan untuk mata kiri, karena kita tidak ingin memengaruhi rendering pandangan mata kanan. Kemudian kita memperbarui tampilan yang terlihat menjadi sisi kanan, dan menggambar adegan lagi.

    // Ensure that left eye calcs aren't going to interfere with right eye ones.
    this._renderer.clearDepth();
    this._renderer.setViewport(
        window.innerWidth * 0.5, // x
        0, // y
        window.innerWidth * 0.5,
        window.innerHeight);

Sekarang kita dapat memasukkan dua matriks untuk mata kanan.

    const rViewMatrix = this._vr.frameData.rightViewMatrix;
    const rProjectionMatrix = this._vr.frameData.rightProjectionMatrix;

    // Update the scene and camera matrices.
    this._camera.projectionMatrix.fromArray(rProjectionMatrix);
    this._scene.matrix.fromArray(rViewMatrix);

    // Tell the scene to update (otherwise it will ignore the change of matrix).
    this._scene.updateMatrixWorld(true);
    this._renderer.render(this._scene, this._camera);

Dan, sekarang selesai! Sebenarnya, belum....

## Memberi tahu perangkat untuk memperbarui

Jika Anda menjalankan segala hal seperti ini, Anda akan melihat bahwa tampilan tidak pernah diperbarui. Ini karena kita bisa melakukan banyak rendering ke konteks WebGL, dan HMD tidak tahu kapan sebenarnya untuk memperbarui tampilannya sendiri. Tidak efisien untuk memperbarui setelah — katakanlah — setiap gambar mata individu dirender. Jadi, kita mengontrol diri kita sendiri dengan memanggil submitFrame.

    // Call submitFrame to ensure that the device renders the latest image from
    // the WebGL context.
    this._vr.display.submitFrame();

Dengan kode itu, kita benar-benar *memang* selesai sekarang. Jika Anda menginginkan versi final, jangan lupa Anda bisa melihat [repo Google Chrome sample](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/hello-world).

## Menutup pemikiran dan sumber daya

WebVR benar-benar cara yang luar biasa untuk menambahkan pencelupan ke materi Anda, dan menggunakan pustaka seperti Three.js memudahkan untuk berjalan dengan WebGL. Ada beberapa hal penting untuk diingat.

* **Bangun di Peningkatan Progresif dari awal.** Sebagaimana telah kita sebutkan beberapa kali di panduan ini, penting untuk membangun pengalaman level dasar yang bagus, ke tempat yang Anda bisa lapisi WebVR. Banyak pengalaman yang bisa diimplementasikan dengan kontrol mouse/sentuh, dan bisa ditingkatkan versinya melalui kontrol akselerometer, ke pengalaman VR yang sepenuhnya matang. Memaksimalkan pengguna Anda selalu bermanfaat.

* **Ingatlah, Anda akan merender adegan dua kali.** Anda mungkin perlu memikirkan tentang Level of Detail (LOD) dan teknis-teknis lainnya guna memastikan bahwa saat Anda merender adegan dua kali, beban kerja komputasi akan diturunkan untuk CPU dan GPU. Di atas segalanya Anda harus mempertahankan laju bingkai yang solid! Dunia pertunjukan tidak dapat dinikmati oleh orang yang sedang pening!

* **Menguji di perangkat sungguhan.** Proses ini terkait dengan poin sebelumnya. Anda harus mencoba dan merasakan perangkat sungguhan yang Anda bisa uji dalam hal yang Anda sedang bangun, terutama jika Anda sedang menargetkan perangkat seluler. Seperti kata pepatah, ["laptop Anda kebohongan yang kotor"](https://youtu.be/4bZvq3nodf4?list=PLNYkxOF6rcIBTs2KPy1E6tIYaWoFcG3uj&t=405).

Selagi kita di sini, ada banyak sumber daya di luar sana untuk memberi Anda awal yang menjanjikan dalam hal membuat materi WebVR:

* **[VRView](https://github.com/googlevr/vrview)**. Pustaka ini membantu Anda menyematkan foto panoramik 360-derajat dan video.

* **[WebVR Boilerplate](https://github.com/borismus/webvr-boilerplate)**. Untuk memulai dengan WebVR dan Three.js

* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill)**. Untuk melakukan back-fill API yang diperlukan untuk WebVR. Harap diingat bahwa ada penalti kinerja untuk menggunakan polyfill, jadi sementara fungsionalitas disediakan, pengguna akan lebih baik dengan pengalaman non-VR Anda.

* **[Ray-Input](https://github.com/borismus/ray-input)**. Pustaka akan membantu Anda menangani berbagai jenis masukan untuk perangkat VR dan non-VR, seperti mouse, pengontrol sentuh, dan VR Gamepad.

Sekarang, masuk dan buat VR yang bagus!


{# wf_devsite_translation #}
