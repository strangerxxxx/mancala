# Mancala

マンカラのシミュレーターです。  
QuizKnockの動画に触発されて作ってみました。  

## 遊び方

[ここ](https://strangerxxxx.github.io/mancala/)で遊べます。  

## ルール

QuizKnock動画内のルールに準拠しています。  
<https://www.youtube.com/watch?v=DjRoSz2oz-A&t=0s>

- マスは3個×2列とゴールが左右に1つずつ
- 石が両陣のマスそれぞれに3つずつ置かれている[^1]
- 手番の人は石がある自陣のマスを1つ選ぶ
- 選んだマスから石をすべて取り除き、次のマス(反時計回り)に石を1つずつ置いていく
- 最後に石を置いたマスが左右のゴールであれば手番継続、そうでなければ交代
- 先に自陣の石がなくなったほうが勝ち

[^1]:1～6個に変更できるようにしました

## 評価値について

手番が渡らない場合は1手にカウントしていません(最終手を除く)。  

## 解析方法について

具体的なコードは[mancala.cpp](https://github.com/strangerxxxx/mancala/blob/main/mancala.cpp)にあります。  
仕組みを簡単に言えば盤面をハッシュ化[^2]して深さ優先探索しています。  

[^2]:可逆変換なので正確にはハッシュ化ではない

## ToDo

- 候補手すべての評価値を表示する
- マスの数を可変にする
- 石の数を7個以上に増やせるようにする(データ量の関係で躊躇しているが、データベースに持たせる形にしたらできそう)

## その他

html/CSS/JSは初心者なので正確に動く保証はできません。  
何かあれば[@srn/@misskey.io](https://misskey.io/@srn)までお願いします。  

## Bootstrapのライセンス

The MIT License (MIT)

Copyright (c) 2011-2023 The Bootstrap Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
