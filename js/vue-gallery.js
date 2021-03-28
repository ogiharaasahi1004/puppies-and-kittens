// Flickr API key
const API_KEY = '53d5bef78a6de4899137254d64610b01';

/**
 * ※参考：コードのひな形
 * ここまで学習した内容を基に、Vueのコードを書くときの「ひな形」を用意しました。課題に取り組む際の参考にしてください。
 */
  const getRequestURL = (searchText) => {
  const parameters = $.param({
    method: 'flickr.photos.search',
    api_key: API_KEY ,
    text: searchText, // 検索テキスト
    sort: 'interestingness-desc', // 興味深さ順
    per_page: 4, // 取得件数
    license: '4', // Creative Commons Attributionのみ
    extras: 'owner_name,license', // 追加で取得する情報
    format: 'json', // レスポンスをJSON形式に
    nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
  });
  const url = `https://api.flickr.com/services/rest/?${parameters}`;
  return url;
};
 
 const getFlickrImageURL = (photo, size) => {
  let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }`;
  if (size) {
    // サイズ指定ありの場合
    url += `_${size}`;
  }
  url += '.jpg';
  return url;
};

// Flickr画像の元ページのURLを返す
const getFlickrPageURL = photo => `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;

// Flickr画像のaltテキストを返す
const getFlickrText = (photo) => {
  let text = `"${photo.title}" by ${photo.ownername}`;
  if (photo.license === '4') {
    // Creative Commons Attribution（CC BY）ライセンス
    text += ' / CC BY';
  }
  return text;
};

const getRequestURL2 = (searchText) => {
const parametersdog = $.param({
  method: 'flickr.photos.search',
  api_key: API_KEY,
  text: searchText, // 検索テキスト
  sort: 'interestingness-desc', // 興味深さ順
  per_page: 4, // 取得件数
  license: '4', // Creative Commons Attributionのみ
  extras: 'owner_name,license', // 追加で取得する情報
  format: 'json', // レスポンスをJSON形式に
  nojsoncallback: 1, // レスポンスの先頭に関数呼び出しを含めない
});
const urldog = `https://api.flickr.com/services/rest/?${parametersdog}`;
return urldog;
};
 
  const getFlickrImageURL2 = (photo, size) => {
  let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
    photo.secret
  }`;
  if (size) {
    // サイズ指定ありの場合
    url += `_${size}`;
  }
  url += '.jpg';
  return url;
};

// Flickr画像の元ページのURLを返す
const getFlickrPageURL2 = photo => `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;

// Flickr画像のaltテキストを返す
const getFlickrText2 = (photo) => {
  let text = `"${photo.title}" by ${photo.ownername}`;
  if (photo.license === '4') {
    // Creative Commons Attribution（CC BY）ライセンス
    text += ' / CC BY';
  }
  return text;
};

   Vue.directive('tooltip', {
  bind(el, binding) {
    $(el).tooltip({
      title: binding.value,
      placement: 'bottom',
    });
  },
  unbind(el) {
    $(el).tooltip('dispose');
  },
});

new Vue({
  el: '#gallery', // elオプションの値に '#gallery' を設定

  data: {
    // 利用するデータを設定※主に表示するためのデータ
    total: 0,
    photoscats: [],
    photosdogs: [],
  },

  created() {
    // Vueが読み込まれたときに実行する処理を定義
    const url = getRequestURL('cat');
     $.getJSON(url, (data) => {
      if (data.stat !== 'ok') {
        return;
      }

      this.total = data.photos.total;
      this.photoscats = data.photos.photo.map(photo => ({
        id: photo.id,
        imageURL: getFlickrImageURL(photo, 'q'),
        pageURL: getFlickrPageURL(photo),
        text: getFlickrText(photo),
      }));
      
      const url2 = getRequestURL2('dog');
     $.getJSON(url2, (data) => {
      if (data.stat !== 'ok') {
        return;
      }

      this.total = data.photos.total;
      this.photosdogs = data.photos.photo.map(photo => ({
        id: photo.id,
        imageURL: getFlickrImageURL2(photo, 'q'),
        pageURL: getFlickrPageURL2(photo),
        text: getFlickrText2(photo),
      }));
    });
    });
  },
  
});


