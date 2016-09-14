---
title: "Mulailah dengan Pemuatan Pertama yang Cepat"
description: "Pemutan Pertama yang Cepat dengan Progressive Web Apps dan model App Shell."
translators:
  - abdshomad
notes:
  extra-credit: "Untuk kredit tambahan, gantikan implementasi <code>localStorage</code> dengan <a href='https://www.npmjs.com/package/idb'>idb</a>"
---

<p class="intro">
Progressive Web Apps harus dimuat dengan cepat dan dapat digunakan seketika. 
Pada saat ini, App Cuaca telah bisa dimulai dengan cepat, akan tapi masih belum bisa digunakan. 
Tidak ada data. Kita bisa membuat permintaan AJAX untuk mendapatkan data, 
tapi hal ini akan mengakibatkan permintaan tambahan dan menjadikan pemuatan awal menjadi lebih lama. 
Oleh karena itu, berikan data sebenarnya pada pemuatan pertama.

</p>

{% include shared/toc.liquid %}

## Suntikkan data Perkiraan Cuaca

Untuk Code Lab berikut, kita akan menyuntikkan data ramalan cuaca secara statis, 
namun dalam aplikasi aslinya, data Prakiraan Cuaca terbaru akan disuntikkan oleh server 
berdasarkan geolokasi alamat IP pengguna.

Tambahkan kode berikut ke dalam ekspresi fungsi yang dijalankan:

{% highlight javascript %}  
var initialWeatherForecast = {  
  key: 'newyork',  
  label: 'New York, NY',  
  currently: {  
    time: 1453489481,  
    summary: 'Clear',  
    icon: 'partly-cloudy-day',  
    temperature: 52.74,  
    apparentTemperature: 74.34,  
    precipProbability: 0.20,  
    humidity: 0.77,  
    windBearing: 125,  
    windSpeed: 1.52  
  },  
  daily: {  
    data: [  
      {icon: 'clear-day', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'rain', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'snow', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'sleet', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'fog', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'wind', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'partly-cloudy-day', temperatureMax: 55, temperatureMin: 34}  
    ]  
  }  
};
{% endhighlight %}

Berikutnya, hapus data `fakeForecast` yang sebelumnya kita buat untuk pengujian karena kita 
sudah tidak memerlukannya lagi.

## Membuat perbedaan saat aplikasi pertama kali berlari

Namun, bagaimana kita mengetahui kapan waktu yang tepat untuk menampilkan informasi ini, yang bisa saja tidak relevan 
pada pemuatan berikutnya ketika aplikasi cuaca ditarik dari cache? Ketika pengguna 
akan memuat aplikasi pada kunjungan berikutnya, mereka mungkin telah berpindah kota, sehingga kita perlu untuk
memuat nama-nama kota tersebut, tidak selalu kota pertama yang sekarang mereka 
lihat.

Preferensi pengguna seperti daftar kota yang sering disinggahi pengguna harus disimpan 
secara lokal menggunakan IndexedDB atau mekanisme penyimpanan lokal lainnya. Untuk menyederhanakan contoh ini 
semaksimal mungkin, kami menggunakan `localStorage` yang tidak ideal untuk 
aplikasi sebenarnya, karena pada saat penulisan data menerapkan mekanisme penyimpanan synchronous, menghalangi proses lain, sehingga 
bisa berpotensi sangat lambat pada beberapa perangkat.

{% include shared/note.liquid list=page.notes.extra-credit %}

Pertama, mari kita menambahkan kode untuk menyimpan preferensi pengguna dalam `app.js`: 

{% highlight javascript %}
// Menyimpan daftar kota ke localStorage, lihat catatan di bawah tentang localStorage.
app.saveSelectedCities = function() {
  var selectedCities = JSON.stringify(app.selectedCities);
  // PENTING: Lihat catatan tentang penggunaan localStorage.
  localStorage.selectedCities = selectedCities;
};
{% endhighlight %}

Selanjutnya, mari kita menambahkan kode untuk memeriksa apakah pengguna berlangganan ke suatu kota 
dan menampilkannya, atau gunakan data yang disuntikkan. Tambahkan kode berikut ke 
`app.js`:

{% highlight javascript %}
/****************************************************************************   
 *
 * Kode yang diperlukan untuk memulai aplikasi
 *
 * CATATAN: Untuk mempermudah panduan untuk memulai ini, kita menggunakan localStorage.
 *   localStorage adalah synchronous API dan kinerjamya yang sangat lambat.
 *   Tidak disarankan untuk digunakan dalam aplikasi sebenarnya!
 *   Sebaiknya, gunakan IDB (https://www.npmjs.com/package/idb) atau 
 *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
 *
 ****************************************************************************/

app.selectedCities = localStorage.selectedCities;
if (app.selectedCities) {
  app.selectedCities = JSON.parse(app.selectedCities);
  app.selectedCities.forEach(function(city) {
    app.getForecast(city.key, city.label);
  });
} else {
  app.updateForecastCard(initialWeatherForecast);
  app.selectedCities = [
    {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
  ];
  app.saveSelectedCities();
}
{% endhighlight %}

Terakhir, jangan lupa untuk menyimpan daftar kota saat pengguna menambahkan dengan 
menuliskan: `app.saveSelectedCities();` ke event handler `butAddCity`.

## Pengujian

* Saat pertama kali dijalankan, aplikasi Anda harus segera menampilkan Prakiraan Cuaca 
  dari `InitialWeatherForecast`. 
* Tambahkan satu kota baru dan pastikan bahwa aplikasi menampilkan dua kartu. 
* Refresh browser dan periksa bahwa aplikasi menampilkan informasi 
  terbaru.

<a href="https://weather-pwa-sample.firebaseapp.com/step-05/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Cobalah</a>
