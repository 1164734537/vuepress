---
showSponsor: true
title: javascript常用字符串方法
date: 2021-07-05
sidebar: 'auto'
categories:
  - javascript
tags:
  - javascript
  - 字符串方法
---
## 常用字符串方法 

### 1. charAt(x)

`charAt(x)`返回字符串中`x`位置的字符，下标从 `0` 开始。

```javascript
//charAt(x)
var myString = 'jQuery FTW!!!';
console.log(myString.charAt(7));
//output: F
```

### 2. charCodeAt(x)

`charCodeAt() `方法可返回指定位置的字符的 Unicode 编码，返回值是 0 - 65535 之间的整数，表示给定索引处的 UTF-16 代码单元。

字符串中第一个字符的位置为 0， 第二个字符位置为 1，以此类推。

```javascript
var str = "HELLO WORLD";
var n = str.charCodeAt(0);
```

### 3. concat(v1,v2..)

`concat()` 方法用于连接两个或多个字符串，此方法不改变现有的字符串，返回拼接后的新的字符串。

```javascript
//concat(v1, v2,..)
var message="Sam"
var final=message.concat(" is a"," hopeless romantic.")
//alerts "Sam is a hopeless romantic."
alert(final)
```

### 4. fromCharcode(c1,c2)

fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。

**注意：**该方法是 String 的静态方法，字符串中的每个字符都由单独的 Unicode 数字编码指定。使用语法： String.fromCharCode()。

```javascript
var n = String.fromCharCode(72,69,76,76,79);
// HELLO
```

### 5. indexOf(substr, [start])

`indexOf`方法搜索并(如果找到)返回字符串中搜索到的字符或子字符串的索引。如果没有找到，则返回`-1`。`Start`是一个可选参数，指定字符串中开始搜索的位置，默认值为`0`。

```javascript
//indexOf(char/substring)
var sentence="Hi, my name is Sam!"
if (sentence.indexOf("Sam")!=-1)
alert("Sam is in there!")

```

### 6. lastIndexOf(substr, [start])

`lastIndexOf()` 方法返回指定文本在字符串中最后一次出现的索引, 如果未找到，则返回`-1`。 “`Start`”是一个可选参数，指定字符串中开始搜索的位置, 默认值为`string.length-1`。

```javascript
//lastIndexOf(substr, [start])
var myString = 'javascript rox';
console.log(myString.lastIndexOf('r'));
//output: 11
```

### 7. match(regexp)

根据正则表达式在字符串中搜索匹配项。如果没有找到匹配项，则返回一个信息数组或`null`。

```javascript
//match(regexp) //select integers only
var intRegex = /[0-9 -()+]+$/; 
var myNumber = '999';
var myInt = myNumber.match(intRegex);console.log(isInt);
//output: 999 
var myString = '999 JS Coders';
var myInt = myString.match(intRegex);console.log(isInt);
//output: null
```

### 8. replace(regexp/substr, replacetext)

`replace()` 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

```javascript
//replace(substr, replacetext)
var myString = '999 JavaScript Coders';
console.log(myString.replace(/JavaScript/i, "jQuery"));
//output: 999 jQuery Coders
 
//replace(regexp, replacetext)
var myString = '999 JavaScript Coders';
console.log(myString.replace(new RegExp( "999", "gi" ), "The"));
//output: The JavaScript Coders

```

### 9. search(regexp)

`search()` 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，如果找到，返回与 `regexp` 相匹配的子串的起始位置，否则返回 `-1`。

```javascript
//search(regexp)
var intRegex = /[0-9 -()+]+$/;  
 
var myNumber = '999';
var isInt = myNumber.search(intRegex);
console.log(isInt);
//output: 0
```

### 10. slice(start, [end])

`slice()` 方法可提取字符串的某个部分，返回一个新的字符串。包括字符串从 `start` 开始（包括 start）到 `end` 结束（不包括 `end`）为止的所有字符。

```javascript
//slice(start, end)
var text="excellent"
text.slice(0,4) //returns "exce"
text.slice(2,4) //returns "ce"

```

### 11. split(delimiter, [limit])

`split()` 方法用于把一个字符串分割成字符串数组，返回一个字符串数组返回的数组中的字串不包括 `delimiter`自身。 可选的“`limit`”是一个整数，允许各位指定要返回的最大数组的元素个数。

### 12. substr(start, [length])

`substr()` 方法可在字符串中抽取从 `start` 下标开始的指定数目的字符。返回一个新的字符串，包含从 `start`（包括 start 所指的字符） 处开始的 `length` 个字符。如果没有指定 `length`，那么返回的字符串包含从 `start` 到该字符串的结尾的字符。

```javascript
//substring(from, to)
var text="excellent"
text.substring(0,4) //returns "exce"
text.substring(2,4) //returns "ce"

```

### 13. substring(from, [to])

`substring()` 方法用于提取字符串中介于两个指定下标之间的字符，方返回的子串包括 `start` 处的字符，但不包括 `stop` 处的字符，`to` 可选，如果省略该参数，那么返回的子串会一直到字符串的结尾。

```javascript
//substring(from, [to])
var myString = 'javascript rox';
myString = myString.substring(0,10);
console.log(myString)
//output: javascript

```

### 14. toLowerCase()

`toLowerCase()` 方法用于把字符串转换为小写。

```javascript
//toLowerCase()
var myString = 'JAVASCRIPT ROX';
myString = myString.toLowerCase();
console.log(myString)
//output: javascript rox
```

### 15. toUpperCase()

`toUpperCase()` 方法用于把字符串转换为大写。

```javascript

//toUpperCase()
var myString = 'javascript rox';
myString = myString.toUpperCase();
console.log(myString)
//output: JAVASCRIPT ROX

```

### 16. includes()

`includes()` 方法用于检查字符串是否包含指定的字符串或字符。

```javascript
//includes()
var mystring = "Hello, welcome to edureka";
var n = mystring.includes("edureka");
//output: True

```

### 17. endsWith()

`endsWith()`函数检查字符串是否以指定的字符串或字符结束。

```javascript
//endsWith()
var mystr = "List of javascript functions";
var n = mystr.endsWith("functions");
//output: True

```

### 18. repeat()

`repeat()` 构造并返回一个新字符串，该字符串包含被连接在一起的指定数量的字符串的副本。

```javascript
//repeat()
var string = "Welcome to Edureka";
string.repeat(2);
//output: Welcome to Edureka Welcome to Edureka

```

### 19. valueOf()

`valueOf()` 方法返回一个`String`对象的原始值（primitive value），该值等同于`String.prototype.toString()`。

```javascript
//valueOf()
var mystr = "Hello World!";
var res = mystr.valueOf();
//output: Hello World!
```

### 20. trim()

`trim()` 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR）

```javascript
//trim()
var str = "     Hello Edureka!     ";
alert(str.trim());

```