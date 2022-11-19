const readline = require('readline');
var fs = require('fs');
var sanitize = require("sanitize-filename");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var allshit='';
rl.on('line', (line) => {
    //console.log(line);
//	console.log("■■■■■■■■■■■■■■■■■■■■");
allshit+=String(line);
});

rl.once('close', () => {
     // end of input
//console.log(allshit);
	var aa=bvid(allshit);
var bb=vidname(allshit);

if(aa.length===bb.length)
	{
function rrrr(idx){
//console.log(aa[idx],bb[idx])
fs.writeFile('./todo/'+sanitize(bb[idx])+'.txt',String(aa[idx]),function (error) {
  if (error) {
    console.log('文件寫入失敗')
  } else {
    console.log('寫入成功')
  }
	if(idx+1<bb.length){
	rrrr(idx+1);
	}
	else{
console.log("end of ~");
	}
});
}
rrrr(0);
}else{
console.log("[array length error]");
}

}
);


function bvid(strin){

var list2=[];
	const regex = /bvid[^:]+:[^']+'([^']+)/g;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('bvid[^:]+:[^\']+\'([^\']+)', 'g')
var str=strin;
//const str = `is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 26, 'pic': 'http://i0.hdslb.com/bfs/archive/cf09dee9a9f6010acdce644bb06d349230f8cc1d.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'CGM48 - The making of ⇢ MAESHIKA MUKANEE ⇠  Episode 1 - Dance Training', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655562949, 'length': '07:00', 'video_review': 0, 'aid': 555049340, 'bvid': 'BV1gv4y1g7pX', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 60, 'pic': 'http://i1.hdslb.com/bfs/archive/5dd92f000bd56c0ea7eb0ac8351903b7e2beb930.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'AKB48 Team TP 董子瑄 RESET專輯合照會 mini vlog', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655562080, 'length': '00:24', 'video_review': 1, 'aid': 342541856, 'bvid': 'BV1894y1272V', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 40, 'pic': 'http://i2.hdslb.com/bfs/archive/a2dd2a285160726e4f78f1f015d4c676d0a02a42.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'AKB48 Team TP 王逸嘉 - 最高８つテール #最強雙馬尾', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655562059, 'length': '00:15', 'video_review': 1, 'aid': 812539885, 'bvid': 'BV1n34y157DG', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 238, 'pic': 'http://i0.hdslb.com/bfs/archive/4f2eefe4fff99445756cc21e258ed98c9d2a9aa6.png', 'subtitle': '', 'description': 'BY 前田幻羽', 'copyright': '2', 'title': 'AKB48 Team TP RESET專輯 發售紀念合照會 見送 220618', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655556914, 'length': '07:02', 'video_review': 1, 'aid': 555057301, 'bvid': 'BV1pv4y1g7tM', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 78, 'pic': 'http://i2.hdslb.com/bfs/archive/d2a6487f7a9f6f8236d9783d143e367f9389dbca.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'AKB48 Team SH B站直播回放 沈莹 220617', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655498042, 'length': '70:23', 'video_review': 0, 'aid': 257607317, 'bvid': 'BV1EY411T7XY', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}]}, 'page': {'pn': 60, 'ps': 25, 'c`;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        //console.log(`Found match, group ${groupIndex}: ${match}`);
    if(groupIndex===1){
    list2.push(String(match))
    }

    });
}

return list2;
}


function vidname(s){
const regex = /title[^:]+:[^']+'([^']+)/g;
var l=[];
// Alternative syntax using RegExp constructor
// const regex = new RegExp('title[^:]+:[^\']+\'([^\']+)', 'g')
var str=s;
//const str = `is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 26, 'pic': 'http://i0.hdslb.com/bfs/archive/cf09dee9a9f6010acdce644bb06d349230f8cc1d.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'CGM48 - The making of ⇢ MAESHIKA MUKANEE ⇠  Episode 1 - Dance Training', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655562949, 'length': '07:00', 'video_review': 0, 'aid': 555049340, 'bvid': 'BV1gv4y1g7pX', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 60, 'pic': 'http://i1.hdslb.com/bfs/archive/5dd92f000bd56c0ea7eb0ac8351903b7e2beb930.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'AKB48 Team TP 董子瑄 RESET專輯合照會 mini vlog', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655562080, 'length': '00:24', 'video_review': 1, 'aid': 342541856, 'bvid': 'BV1894y1272V', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 40, 'pic': 'http://i2.hdslb.com/bfs/archive/a2dd2a285160726e4f78f1f015d4c676d0a02a42.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'AKB48 Team TP 王逸嘉 - 最高８つテール #最強雙馬尾', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655562059, 'length': '00:15', 'video_review': 1, 'aid': 812539885, 'bvid': 'BV1n34y157DG', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 238, 'pic': 'http://i0.hdslb.com/bfs/archive/4f2eefe4fff99445756cc21e258ed98c9d2a9aa6.png', 'subtitle': '', 'description': 'BY 前田幻羽', 'copyright': '2', 'title': 'AKB48 Team TP RESET專輯 發售紀念合照會 見送 220618', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655556914, 'length': '07:02', 'video_review': 1, 'aid': 555057301, 'bvid': 'BV1pv4y1g7tM', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}, {'comment': 0, 'typeid': 137, 'play': 78, 'pic': 'http://i2.hdslb.com/bfs/archive/d2a6487f7a9f6f8236d9783d143e367f9389dbca.png', 'subtitle': '', 'description': '-', 'copyright': '2', 'title': 'AKB48 Team SH B站直播回放 沈莹 220617', 'review': 0, 'author': 'bclradio', 'mid': 13837532, 'created': 1655498042, 'length': '70:23', 'video_review': 0, 'aid': 257607317, 'bvid': 'BV1EY411T7XY', 'hide_click': False, 'is_pay': 0, 'is_union_video': 0, 'is_steins_gate': 0, 'is_live_playback': 0, 'meta': None, 'is_avoided': 0, 'attribute': 0}]}, 'page': {'pn': 60, 'ps': 25, 'c`;
let m;

while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
    //    console.log(`Found match, group ${groupIndex}: ${match}`);
    if(groupIndex===1)
	    l.push(String(match));
    });
}
return l;
}
