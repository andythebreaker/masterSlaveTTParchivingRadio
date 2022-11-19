# 摘要

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
npm i puppeteer
```

> 大概吧

## main-downloader

[lux](https://github.com/iawia002/lux)

go find your os version!

# PARTS

## fetch 頻道 all video

```bash=
python3 biliCHall.py | node stdregex.js
```

## download videos

```bash=
for file in ../todo/*.txt; do echo $file && ../lux "https://www.bilibili.com/video/$(cat "${file}")"; done
```

# 檔案架構

 
