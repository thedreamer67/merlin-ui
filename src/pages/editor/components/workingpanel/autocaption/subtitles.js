const text = `1
00:00:00,768 --> 00:00:01,280
Hey guys

2
00:00:01,536 --> 00:00:02,048
Daryl

3
00:00:02,304 --> 00:00:07,680
And I'm going to be a final year student studying in nus

4
00:00:07,936 --> 00:00:12,032
Congratulations on entering the school Computing where you meeting them how to use Google

5
00:00:12,288 --> 00:00:13,056
Can you call Daddy

6
00:00:13,312 --> 00:00:15,616
Today I'm going to be giving you a small.

7
00:00:15,872 --> 00:00:18,432
What is pool Computing has to offer

8
00:00:18,688 --> 00:00:19,456
It's not

9
00:00:20,480 --> 00:00:21,760
But we do have a new building

10
00:00:22,016 --> 00:00:24,064
Thunder video

11
00:00:24,320 --> 00:00:25,344
This is Paul.

12
00:00:25,856 --> 00:00:27,392
So you guys may be wondering

13
00:00:27,648 --> 00:00:28,416
What is video about

14
00:00:28,672 --> 00:00:34,816
Basically what happened was that the Student Life office at the school Computing a push me and commissioned me to do this video

15
00:00:35,072 --> 00:00:39,680
Another precious and even though you're 27 really had a chance to explore the campus of the school

16
00:00:39,936 --> 00:00:40,704
Computing YouTube

17
00:00:41,216 --> 00:00:44,032
Zoom University Student Life office one.

18
00:00:44,288 --> 00:00:44,800
Bucatini

19
00:00:45,056 --> 00:00:45,568
To give y'all

20
00:00:45,824 --> 00:00:46,592
A tour of sorts

21
00:00:47,104 --> 00:00:48,128
The actual Computing building

22
00:00:48,640 --> 00:00:51,712
So before you can deliver the video I just want to thank all of you who have soup

23
00:00:51,968 --> 00:00:52,992
Bottom you so far

24
00:00:53,248 --> 00:00:54,528
You know how make this possible

25
00:00:54,784 --> 00:00:56,320
I think what I've done is goes up already hits

26
00:00:56,576 --> 00:00:57,344
6 km

27
00:00:57,600 --> 00:00:58,368
Super disability

28
00:00:58,624 --> 00:00:59,904
Give me that I only started properly

29
00:01:00,416 --> 00:01:01,184
The end of January

30
00:01:01,440 --> 00:01:06,304
Also I want to thank you so copii verrando hitch for buy me some coffee on microfiber

31
00:01:06,816 --> 00:01:08,096
Sobieski weather cover pictures

32
00:01:08,352 --> 00:01:10,656
This is the exit this page out for anyone that wants to

33
00:01:10,912 --> 00:01:13,216
Disappoint me in Monterey

34
00:01:13,472 --> 00:01:15,520
So basically if you're feeling extra nice

35
00:01:15,776 --> 00:01:17,568
You can go over to this page and just buy me a

36
00:01:18,336 --> 00:01:19,616
You can put any amount

37
00:01:19,872 --> 00:01:20,896
And imma see any amount is

38
00:01:21,152 --> 00:01:21,664
Aradia

39
00:01:21,920 --> 00:01:22,944
And if you want to watch content

40
00:01:23,200 --> 00:01:23,712
Fluffy

41
00:01:23,968 --> 00:01:24,480
That's fine as well

42
00:01:24,736 --> 00:01:25,504
It'll go ahead

43
00:01:25,760 --> 00:01:27,040
I'm not exactly 200

44
00:01:27,296 --> 00:01:27,808
Did the money expect

45
00:01:29,344 --> 00:01:32,928
Taught me and buy me lunch for today you can head over there by we don't want to text

46
00:01:33,184 --> 00:01:34,720
Totally fine as well
`

// credits: https://stackoverflow.com/questions/33145762/parse-a-srt-file-with-jquery-javascript
var PF_SRT = function() {
    var pattern = /(\d+)\n([\d:,]+)\s+-{2}\>\s+([\d:,]+)\n([\s\S]*?(?=\n{2}|=\n{2}))/gm;
    var _regExp;
  
    var init = function() {
      _regExp = new RegExp(pattern);
    };

    var parse = function(f) {
      if (typeof(f) != "string")
        throw "Sorry, Parser accept string only.";
  
      var result = [];
      if (f == null)
        return {};
  
      f = f.replace(/\r\n|\r|\n/g, '\n')
        
      let matches = 0;
      
      while ((matches = pattern.exec(f)) != null) {
        result.push(toLineObj(matches));
      }
      return result;
    }
    var toLineObj = function(group) {
      return {
        line: group[1],
        startTime: group[2],
        endTime: group[3],
        text: group[4]
      };
    }
    init();
    return {
      parse: parse
    }
}();

const subtitle_parsed = PF_SRT.parse(text);

export default subtitle_parsed;