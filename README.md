# 摘要

2025

1. index.
2. d.
3. g.

## 來源

- [bclradio](https://space.bilibili.com/13837532/video)
- [社長](https://space.bilibili.com/32863673)

## OS

`ubunut22`

## 前置

- ffmpeg
- python3(not using conda / venv; version`3.10.6`)
- node(w/ npm; version`16.18.0`)

### python 需前置安裝 (pip install)

```bash=
pip3 install you-get
```

### node 需前置安裝 (npm install)

```bash=
npm i sanitize-filename
```

> 大概吧

## main-downloader

[lux](https://github.com/iawia002/lux)

go find your os version!

# PARTS

## fetch 頻道 all video

那串數字隨使用者換成頻道id(參:"來源" 章節)

```bash=
python3 biliCHall.py 32863673 | node stdregex.js
```

## download videos

`cd vid`

```bash=
for file in ../todo/*.txt; do echo $file && ../lux "https://www.bilibili.com/video/$(cat "${file}")" && mv "${file}" ../fin; done
```

## to mp3

`cd vid`

```bash=
for file in *.mp4; do echo $file && ffmpeg -n -i "${file}" "../aud/${file}.mp3"; done
```

# 檔案架構

- `./`
 - todo
 - fin
 - vid
 - aud
