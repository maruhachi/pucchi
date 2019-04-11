# sync-player

## 遠隔地で動画を楽しく同時再生！！

## 試すには？
```bash
$ npm install -g http-server
$ git clone (ここ)
$ cd sync-play
  # 1.mp4 という名前で動画を配置
$ http-server .
  # http://127.0.0.1:8080/sync-play.html を開く
```

カレントディレクトリにある「1.mp4」という名前のファイルを読み込みます

## 動作概要
* 誰かが行った操作を他クライアントにも伝播させる
* 伝播する対象のイベント
  * 再生
  * シーク
  * 停止
* 伝播する際の付随情報として
  * 現在の動画位置
  
### ハマりどころ
* ブラウザに再生させるにはmp4がやっぱりいいみたい
  * 他の選択肢としては、webm, ogp ?

### Reference site
* [各種基本的なAPI](http://www.htmq.com/video/)
* [動画のコントロール部品を表示](https://www.plusdesign.co.jp/blog/?p=8213)