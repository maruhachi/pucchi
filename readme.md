# sync-player

## 遠隔地で動画を楽しく同時再生！！

## 試すには？
```bash
$ npm install -g http-server
$ git clone (ここ)
$ cd sync-play
$ http-server .
  # http://127.0.0.1:8080/sync-play.html を開く
```

カレントディレクトリにある「1.mp4」という名前のファイルを読み込みます


### ハマりどころ
* ブラウザに再生させるにはmp4がやっぱりいいみたい
  * 他の選択肢としては、webm, ogp ?

### Reference site
* [各種基本的なAPI](http://www.htmq.com/video/)
* [動画のコントロール部品を表示](https://www.plusdesign.co.jp/blog/?p=8213)