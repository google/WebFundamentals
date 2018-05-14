project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Temukan cara menggunakan pustaka Ray Input untuk menambahkan masukan ke adegan WebVR.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# Menambahkan Masukan ke Adegan WebVR {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

Caution: WebVR masih eksperimental dan dapat berubah.

Di [bagian Memulai WebVR](../getting-started-with-webvr/) kita mengamati cara mengambil adegan WebGL dan menambahkan fungsionalitas WebVR padanya. Walaupun hal itu berhasil, dan Anda bisa melihat-lihat adegan VR, ada banyak hal yang lebih menyenangkan bila Anda bisa berinteraksi dengan entitas dalam adegan tersebut.

![Berkas sinar yang menampilkan masukan dalam Adegan WebVR](./img/ray-input.jpg)

Dengan WebVR (dan 3D pada umumnya) boleh jadi ada beragam masukan, dan idealnya kita ingin agar tidak hanya mempertimbangkan semua itu, melainkan beralih di antara masukan tersebut saat konteks pengguna berubah.

Survei cepat mengenai tipe masukan yang tersedia saat ini antara lain:

<img class="attempt-right" src="../img/touch-input.png" alt="Ikon masukan sentuh">

* **Mouse.**
* **Sentuh.**
* **Akselerometer & Giroskop.**
* **Pengontrol tanpa tingkat kebebasan** (seperti Cardboard). Inilah pengontrol yang sepenuhnya terikat pada tampilan yang terlihat, dan umumnya interaksi dianggap berasal dari pusat tampilan yang terlihat.
* **Pengontrol dengan 3 tingkat kebebasan** (seperti pengontrol Daydream). Pengontrol dengan 3 tingkatan menyediakan informasi orientasi, namun bukan informasi lokasi. Umumnya pengontrol tersebut dianggap dipegang di tangan kiri atau kanan seseorang, dan posisinya di ruang 3D telah diperkirakan.
* **Pengontrol dengan 6 tingkat kebebasan** (seperti Oculus Rift atau Vive). Pengontrol dengan 6 tingkat kebebasan akan menyediakan informasi orientasi dan lokasi. Ini umumnya di ujung atas jangkauan kemampuan, dan memiliki akurasi terbaik.

Nantinya, bila WebVR semakin matang, kita bahkan dapat melihat tipe masukan baru, ini berarti kode kita sebisa mungkin tidak boleh menjadi usang. Akan tetapi, menulis kode untuk menangani semua permutasi masukan bisa menjadi rumit dan sulit dilakukan. Pustaka [Ray Input](https://github.com/borismus/ray-input) oleh Boris Smus sudah menyediakan awal yang baik, yang mendukung sebagian besar tipe masukan yang tersedia saat ini, jadi kita akan mulai dari sana.

Mulai dari adegan sebelumnya, mari kita [tambahkan penangan masukan dengan Ray Input](https://googlechrome.github.io/samples/web-vr/basic-input/). Jika ingin melihat kode akhir, Anda harus memeriksa [repo contoh Google Chrome](https://github.com/GoogleChrome/samples/tree/gh-pages/web-vr/basic-input/).

## Tambahkan pustaka Ray Input ke laman

Untuk mudahnya, kita bisa menambahkan Ray Input secara langsung dengan tag skrip:

    <!-- Must go after Three.js as it relies on its primitives -->
    <script src="third_party/ray.min.js"></script>

Jika menggunakan Ray Input sebagai bagian dari sistem pembangunan yang lebih besar, maka Anda juga bisa mengimpornya dengan cara itu. [Ray Input README memiliki informasi selengkapnya](https://github.com/borismus/ray-input/blob/master/README.md), jadi Anda harus memeriksanya.

## Dapatkan akses ke masukan

Setelah mendapatkan akses ke Tampilan VR, kita bisa meminta akses ke masukan yang tersedia. Dari sana kita bisa menambahkan event listener, dan memperbarui adegan ke keadaan default kotak kita sebagai "deselected".

    this._getDisplays().then(_ => {
      // Get any available inputs.
      this._getInput();
      this._addInputEventListeners();

      // Default the box to 'deselected'.
      this._onDeselected(this._box);
    });

Let’s take a look inside both the `_getInput` and `_addInputEventListeners` functions.

    _getInput () {
      this._rayInput = new RayInput.default(
          this._camera, this._renderer.domElement);

      this._rayInput.setSize(this._renderer.getSize());
    }

Pembuatan Ray Input melibatkan penerusannya ke kamera Three.js dari adegan, dan elemen yang akan digunakannya untuk mengikat mouse, sentuhan, dan event listener lainnya yang dibutuhkan. Jika Anda tidak meneruskan elemen sebagai parameter kedua, maka default-nya adalah mengikat ke `window`, yang mungkin mencegah sebagian Antarmuka Pengguna (‘UI’) menerima kejadian masukan!

Hal lain yang perlu Anda lakukan adalah memberitahukannya seberapa besar area yang dibutuhkan untuk bekerja, yang pada kebanyakan kasus merupakan area elemen kanvas WebGL.

## Aktifkan interaktivitas untuk entitas adegan

Berikutnya, kita perlu memberi tahu Ray Input apa yang harus dilacak, dan kejadian apa yang ingin kita terima.

    _addInputEventListeners () {
      // Track the box for ray inputs.
      this._rayInput.add(this._box);

      // Set up a bunch of event listeners.
      this._rayInput.on('rayover', this._onSelected);
      this._rayInput.on('rayout', this._onDeselected);
      this._rayInput.on('raydown', this._onSelected);
      this._rayInput.on('rayup', this._onDeselected);
    }

As you interact with the scene, whether by mouse, touch, or other controllers, these events will fire. In the scene we can make our box’s opacity change based on whether the user is pointing at it.

    _onSelected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 1;
    }

    _onDeselected (optMesh) {
      if (!optMesh) {
        return;
      }

      optMesh.material.opacity = 0.5;
    }

Agar berhasil, perlu dipastikan kita memberi tahu Three.js bahwa materi kotak harus mendukung transparansi.

    this._box.material.transparent = true;

Kini hal itu harus mencakup interaksi mouse dan sentuh. Mari kita lihat apa yang dilibatkan dalam penambahan pengontrol dengan 3 tingkat kebebasan, seperti pengontrol Daydream.

## Aktifkan ekstensi Gamepad API

Ada dua catatan penting untuk dipahami tentang penggunaan Gamepad API di WebVR sekarang ini:

* Di Chrome 56, Anda perlu mengaktifkan flag Gamepad Extensions di `chrome://flags`. Jika Anda memiliki [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md) Gamepad Extensions sudah diaktifkan bersama WebVR API. **Untuk development lokal, Anda perlu mengaktifkan flag**.

* Informasi pose untuk gamepad (yaitu cara Anda mengakses 3 tingkat kebebasan itu) **hanya diaktifkan setelah pengguna menekan tombol di pengontrol VR**.

Karena pengguna perlu berinteraksi sebelum kita bisa menampilkan kepada mereka pointer dalam adegan, kita perlu meminta mereka untuk menekan tombol pada pengontrol. Waktu terbaik untuk melakukannya adalah setelah kita mulai menyajikan ke Head Mounted Display (‘HMD’).

    this._vr.display.requestPresent([{
      source: this._renderer.domElement
    }])
    .then(_ => {
      **this._showPressButtonModal();**
    })
    .catch(e => {
      console.error(`Unable to init VR: ${e}`);
    });

Biasanya Anda mungkin berharap menggunakan Elemen HTML untuk menampilkan informasi demikian kepada pengguna, namun HMD menampilkan konteks WebGL (dan bukan yang lain), sehingga kita harus menggambar pesan di sana. Three.js memiliki [primitif Sprite](https://threejs.org/docs/#Reference/Objects/Sprite) yang akan selalu menghadap ke depan kamera (biasanya disebut "Billboarding"), dan ke situlah kita bisa menggambar.

![Menampilkan pesan "Press Button" kepada pengguna](./img/press-a-button.jpg)

Kode yang harus dibuat mirip dengan ini.

    _showPressButtonModal () {
      // Get the message texture, but disable mipmapping so it doesn't look blurry.
      const map = new THREE.TextureLoader().load('./images/press-button.jpg');
      map.generateMipmaps = false;
      map.minFilter = THREE.LinearFilter;
      map.magFilter = THREE.LinearFilter;

      // Create the sprite and place it into the scene.
      const material = new THREE.SpriteMaterial({
        map, color: 0xFFFFFF
      });

      this._modal = new THREE.Sprite(material);
      this._modal.position.z = -4;
      this._modal.scale.x = 2;
      this._modal.scale.y = 2;
      this._scene.add(this._modal);

      // Finally set a flag so we can pick this up in the _render function.
      this._isShowingPressButtonModal = true;
    }

Terakhir, di fungsi `_render` kita bisa mengamati interaksi, dan menggunakannya untuk menyembunyikan modal. Kita juga perlu memberi tahu Ray Input kapan harus memperbarui, seperti cara kita memanggil `submitFrame()` terhadap HMD untuk mengalirkan kanvas ke sana.

    _render () {
      if (this._rayInput) {
        if (this._isShowingPressButtonModal &&
            this._rayInput.controller.wasGamepadPressed) {
          this._hidePressButtonModal();
        }

        this._rayInput.update();

      }
      …
    }

## Tambahkan mesh pointer ke adegan

Selain memungkinkan interaksi, besar kemungkinan kita perlu menampilkan sesuatu kepada pengguna dengan menampilkan tempat yang mereka tunjuk. Ray Input menyediakan mesh yang bisa Anda tambahkan ke adegan untuk melakukannya.

    this._scene.add(this._rayInput.getMesh());

Dengan ini, kita mendapatkan retikel untuk HMD tanpa kebebasan bergerak di pengontrolnya (seperti Cardboard), dan sinar seperti berkas untuk HMD yang memiliki kebebasan bergerak. Untuk mouse dan sentuh, tidak ada retikel yang ditampilkan.

![Berkas sinar yang menampilkan masukan dalam Adegan WebVR](./img/ray-input.jpg)

## Pendapat penutup

Ada beberapa hal yang perlu diingat saat Anda menambahkan masukan ke pengalaman.

* **Anda harus menerapkan Penyempurnaan Progresif.** Karena seseorang bisa saja mendapati apa yang telah Anda bangun dengan permutasi masukan tertentu dari daftar, Anda harus berusaha merencanakan UI sedemikian rupa agar bisa beradaptasi dengan benar di antara berbagai tipe. Bila memungkinkan, ujilah beragam perangkat dan masukan untuk memaksimalkan jangkauan.

* **Masukan tersebut mungkin tidak sepenuhnya akurat.** Khususnya, pengontrol Daydream memiliki 3 tingkat kebebasan, namun beroperasi dalam ruang yang mendukung 6 tingkat kebebasan. Ini berarti walaupun orientasinya sudah benar, posisinya di ruang 3D harus ditentukan. Untuk mempertimbangkannya, Anda mungkin perlu membuat target masukan yang lebih besar dan memastikan ruang yang baik agar tidak membingungkan.

Menambahkan masukan ke adegan amatlah penting untuk menjadikan pengalaman yang mendalam, dan dengan [Ray Input](https://github.com/borismus/ray-input), jadi lebih mudah melakukannya.

Mari kita lihat cara Anda melakukannya!



{# wf_devsite_translation #}
