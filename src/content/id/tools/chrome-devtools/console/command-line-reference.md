project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Referensi Command Line API {: .page-title }

{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Command Line API berisi kumpulan fungsi praktis untuk melaksanakan tugas umum: memilih dan memeriksa elemen DOM, menampilkan data dalam format yang dapat dibaca, menghentikan dan memulai profiler, serta memantau kejadian DOM.

Note: API ini hanya tersedia dari dalam konsol itu sendiri. Anda tidak bisa mengakses Command Line API dari skrip di laman.


## $_

`$_` mengembalikan nilai ekspresi yang terakhir dievaluasi.

Dalam contoh berikut,
sebuah ekspresi sederhana (`2 + 2`) telah dievaluasi.
Properti `$_` kemudian dievaluasi,
yang berisi nilai yang sama:

![$_ adalah ekspresi yang terakhir dievaluasi](images/recently-evaluated-expression-1.png)

Dalam contoh berikutnya,
ekspresi yang dievaluasi mula-mula berisi larik nama.
Mengevaluasi `$_.length` untuk mengetahui panjang larik,
nilai yang tersimpan di `$_` berubah
menjadi ekspresi yang terakhir dievaluasi, 4:

![$_ berubah bila perintah baru telah dievaluasi](images/recently-evaluated-expression-2.png)

## $0 - $4

Perintah `$0`, `$1`, `$2`, `$3` dan `$4` berfungsi sebagai referensi historis ke lima elemen DOM terakhir yang diperiksa dalam panel Elements
atau lima objek heap JavaScript terakhir yang dipilih dalam panel Profiles.
`$0` mengembalikan elemen yang terakhir dipilih atau objek JavaScript,
`$1` mengembalikan elemen yang terakhir dipilih kedua, dan seterusnya.

Dalam contoh berikut,
sebuah elemen dengan kelas `medium` dipilih dalam panel Elements.
Dalam panel samping Console, `$0` telah dievaluasi dan
menampilkan elemen yang sama:

![Contoh $0](images/element-0.png)

Gambar di bawah menampilkan elemen berbeda yang dipilih di laman yang sama.
`$0` sekarang merujuk ke elemen yang baru dipilih,
sementara `$1` mengembalikan elemen yang dipilih sebelumnya:

![Contoh $1](images/element-1.png)

## $(selector)

`$(selector)`  mengembalikan referensi ke elemen DOM pertama
dengan pemilih CSS yang ditetapkan.
Fungsi ini adalah alias untuk fungsi
[document.querySelector()](https://docs.webplatform.org/wiki/css/selectors_api/querySelector).

Contoh berikut mengembalikan referensi
ke elemen `<img>` pertama dalam dokumen:

![Contoh $('img')](images/selector-img.png)

Klik kanan pada hasil yang dikembalikan dan
pilih 'Reveal in Elements Panel' untuk menemukannya dalam DOM,
atau 'Scroll in to View' untuk menampilkannya di laman.

Contoh berikut mengembalikan referensi ke elemen yang saat ini dipilih dan menampilkan properti src-nya:

![Contoh $('img').src](images/selector-img-src.png)

Note: Jika Anda menggunakan pustaka seperti jQuery yang menggunakan <code>$</code>, fungsionalitas ini akan diganti, dan <code>$</code> akan menyesuaikan dengan implementasi pustaka itu.

## $$(selector)

`$$(selector)` mengembalikan larik elemen
yang cocok dengan pemilih CSS yang diberikan.
Perintah ini sama dengan memanggil
[document.querySelectorAll()](https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll).

Contoh berikut menggunakan `$$()` untuk membuat larik
semua elemen `<img>` dalam dokumen saat ini dan
menampilkan nilai setiap properti `src` elemen:

		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![Contoh penggunaan $$() untuk memilih semua gambar dalam dokumen dan menampilkan sumbernya.](images/all-selector.png)

Note: Tekan <kbd class='kbd'>Shift</kbd> + <kbd class='kbd'>Enter</kbd> di konsol untuk memulai baris baru tanpa mengeksekusi skrip.

## $x(path)

`$x(path)` mengembalikan larik elemen DOM
sesuai dengan ekspresi XPath yang diberikan.

Misalnya,
yang berikut ini mengembalikan semua elemen `<p>` di laman:

		$x("//p")

![Contoh penggunaan pemilih XPath](images/xpath-p-example.png)

Contoh berikut mengembalikan semua elemen `<p>` 
yang berisi elemen `<a>`:

		$x("//p[a]")

![Contoh penggunaan pemilih XPath yang lebih rumit](images/xpath-p-a-example.png)

## clear()

`clear()` mengosongkan riwayat di konsol.

		clear();

## copy(object)

`copy(object)` menyalin representasi string objek yang ditetapkan
ke clipboard.

		copy($0);

## debug(function)

Bila fungsi yang telah ditetapkan dipanggil,
debugger akan dipanggil dan berhenti sebentar dalam fungsi
pada panel Sources sehingga memungkinkan penyusuran kode dan melakukan debug.

		debug(getData);

![Berhenti sebentar dalam fungsi dengan debug()](images/debug.png)

Gunakan `undebug(fn)` untuk menghentikan berhenti sebentar pada fungsi,
atau gunakan UI untuk menonaktifkan semua breakpoint.

Untuk informasi selengkapnya mengenai breakpoint,
lihat [Debug dengan Breakpoint](/web/tools/chrome-devtools/javascript/add-breakpoints).

## dir(object)

`dir(object)` menampilkan daftar bergaya objek
dari semua properti objek yang ditetapkan.
Metode ini adalah alias untuk metode `console.dir()` Console API.

Contoh berikut menampilkan perbedaan antara
mengevaluasi `document.body` secara langsung dalam baris perintah,
dan menggunakan `dir()` untuk menampilkan elemen yang sama:

		document.body;
		dir(document.body);

![Mencatat log document.body dengan dan tanpa fungsi dir()](images/dir.png)

Untuk informasi selengkapnya,
lihat entri [`console.dir()`](/web/tools/chrome-devtools/debug/console/console-reference#console.dir(object)) di Console API.

## dirxml(object)

`dirxml(object)` mencetak representasi XML objek yang ditetapkan,
seperti terlihat dalam tab Elements.
Metode ini sama dengan metode [console.dirxml()](https://developer.mozilla.org/en-US/docs/Web/API/Console).

## inspect(object/function) {:#inspect}

`inspect(object/function)` membuka dan memilih elemen atau objek yang ditetapkan
dalam panel yang sesuai: baik panel Elements untuk elemen DOM maupun panel Profiles untuk objek heap JavaScript.

Contoh berikut membuka `document.body` dalam panel Elements:

		inspect(document.body);

![Memeriksa elemen dengan inspect()](images/inspect.png)

Saat meneruskan fungsi untuk memeriksa,
fungsi akan membuka dokumen
di panel Sources untuk Anda periksa.

## getEventListeners(object)

`getEventListeners(object)` mengembalikan event listener yang terdaftar
pada objek yang ditetapkan.
Nilai kembalian adalah objek yang berisi larik
untuk setiap tipe kejadian yang terdaftar ("click" atau "keydown", misalnya).
Anggota setiap larik adalah objek
yang menjelaskan listener yang didaftarkan untuk setiap tipe.
Misalnya,
yang berikut ini menampilkan daftar semua event listener
yang terdaftar pada objek dokumen:

		getEventListeners(document);

![Keluaran penggunaan getEventListeners()](images/get-event-listeners.png)

Jika lebih dari satu listener didaftarkan pada objek yang ditetapkan,
maka larik akan berisi anggota untuk setiap listener.
Dalam contoh berikut,
ada dua event listener yang terdaftar di elemen #scrollingList
untuk kejadian "mousedown":

![Multi-listener](images/scrolling-list.png)

Anda bisa luaskan lebih jauh setiap objek ini untuk mempelajari propertinya:

![Tampilan yang diperluas dari objek listener](images/scrolling-list-expanded.png)

## keys(object)

`keys(object)` mengembalikan larik berisi nama
properti yang dimiliki objek yang ditetapkan.
Untuk mendapatkan nilai terkait dari properti yang sama,
gunakan `values()`.

Misalnya,
anggaplah aplikasi Anda mendefinisikan objek berikut:

		var player1 = { "name": "Ted", "level": 42 }

Anggaplah `player1` telah didefinisikan dalam namespace global (untuk menyederhanakan), mengetikkan `keys(player1)` dan `values(player1)` dalam konsol akan menghasilkan
yang berikut ini:

![Contoh metode keys() dan values()](images/keys-values.png)

## monitor(function)

Bila fungsi yang telah ditetapkan dipanggil,
pesan akan di-log ke konsol yang menunjukkan nama fungsi
bersama argumen yang diteruskan
ke fungsi tersebut saat ia dipanggil.

		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![Contoh metode monitor()](images/monitor.png)

Gunakan `unmonitor(function)` untuk menghentikan pemantauan buat sementara.

## monitorEvents(object[, events])

Bila salah satu kejadian yang ditetapkan terjadi di objek yang ditetapkan,
objek Event akan di-log ke konsol.
Anda bisa menetapkan satu kejadian ke monitor,
satu larik kejadian, atau salah satu kejadian generik "types" yang dipetakan
ke kumpulan kejadian yang telah ditetapkan sebelumnya Lihat contoh di bawah.

Yang berikut ini memantau semua kejadian resize pada objek window.

		monitorEvents(window, "resize");

![Memantau kejadian window resize](images/monitor-events.png)

Yang berikut ini mendefinisikan larik untuk memantau kejadian "resize" dan "scroll" pada objek window:

		monitorEvents(window, ["resize", "scroll"])

Anda juga bisa menetapkan salah satu "types" kejadian,
string yang memetakan ke set kejadian yang telah ditetapkan sebelumnya.
Tabel di bawah ini menampilkan daftar tipe kejadian yang tersedia dan
pemetaan kejadiannya:

<table class="responsive">
	<thead>
		<tr>
			<th colspan="2">Tipe kejadian &amp; Kejadian terkait yang dipetakan</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>"mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"</td>
		</tr>
		<tr>
			<td>key</td>
			<td>"keydown", "keyup", "keypress", "textInput"</td>
		</tr>
		<tr>
			<td>touch</td>
			<td>"touchstart", "touchmove", "touchend", "touchcancel"</td>
		</tr>
		<tr>
			<td>control</td>
			<td>"resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"</td>
		</tr>
	</tbody>
</table>

Misalnya,
yang berikut ini menggunakan tipe kejadian "key" dari semua kejadian key yang bersangkutan
pada bidang teks masukan yang saat ini dipilih dalam panel Elements.

		monitorEvents($0, "key");

Di bawah ini adalah contoh keluaran setelah mengetikkan sebuah karakter dalam bidang teks:

![Memantau kejadian key](images/monitor-key.png)

## profile([name]) dan profileEnd([name])

`profile()` memulai sebuah sesi pembuatan profil CPU JavaScript
dengan nama opsional.
`profileEnd()` mengisi profil dan menampilkan hasilnya
dalam panel Profile.
(Lihat juga [Mempercepat Eksekusi JavaScript](/web/tools/chrome-devtools/rendering-tools/js-execution).)

Untuk memulai pembuatan profil:

		profile("My profile")

Untuk menghentikan pembuatan profil dan menampilkan hasilnya dalam panel Profiles:

		profileEnd("My profile")

Profil juga bisa disarangkan. Misalnya, yang satu ini akan berfungsi dalam urutan apa saja:

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

Hasil di panel Profiles:

![Profil yang dikelompokkan](images/grouped-profiles.png)


Note: Beberapa profil CPU bisa beroperasi secara bersamaan dan Anda tidak harus menutupnya dengan urutan yang sama seperti urutan pembuatannya.

## table(data[, columns])

Me-log data objek dengan pemformatan tabel dengan meneruskan objek data
dalam heading kolom opsional.
Misalnya,
untuk menampilkan daftar nama dengan menggunakan tabel dalam konsol,
Anda melakukan:

		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![Contoh metode table()](images/table.png)

## undebug(function)

`undebug(function)` menghentikan proses debug atas fungsi yang ditetapkan
sehingga bila fungsi tersebut dipanggil,
debugger tidak lagi dipanggil.

		undebug(getData);

## unmonitor(function)

`unmonitor(function)` menghentikan pemantauan atas fungsi yang ditetapkan.
Ini digunakan bersama `monitor(fn)`.

		unmonitor(getData);

## unmonitorEvents(object[, events])

`unmonitorEvents(object[, events])` menghentikan pemantauan kejadian
untuk objek dan kejadian yang ditetapkan.
Misalnya,
yang berikut ini akan menghentikan semua pemantauan kejadian pada objek window:

		unmonitorEvents(window);

Anda juga bisa secara selektif menghentikan pemantauan kejadian tertentu pada sebuah objek.
Misalnya,
kode berikut ini memulai pemantauan semua kejadian mouse
pada elemen yang dipilih saat ini,
kemudian menghentikan pemantauan kejadian "mousemove" (barangkali untuk mengurangi noise di keluaran konsol):

		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

## values(object)

`values(object)` mengembalikan sebuah larik berisi nilai
semua properti yang dimiliki oleh objek yang ditetapkan.

		values(object);




{# wf_devsite_translation #}
