(모던 JavaScript에 [자료구조와 자료형 파트](https://ko.javascript.info/data-types)에서 새롭게 알게 된 내용을 정리한 것입니다.)

## 5.1 원시값의 메서드

원시형의 종류에는 `문자(string)`, `숫자(number)`, `BigInt`, `불린(boolean)`, `심볼(symbol)`, `null`, `undefined`로 총 7가지가 있다.

객체는 프로퍼티에 다양한 종류의 값을 저장할 수 있는 자료형이다. 함수도 객체의 일종이다.

### 원시값을 객체처럼 사용하기

자바스크립트 만든 개발자가 원시값에 메서드를 붙여 작업을 수월하게 하고 싶어서 "원시 래퍼 객체(object wrapper)"를 만들었다.
"원시 래퍼 객체(object wrapper)"는 원시값에 메서드나 프로퍼티로 접근을 할 때 만들어졌다가 사라지는 특수한 객체이다.

래퍼 객체는 원시 타입에 따라 종류가 다양한데, 원시형의 이름을 따서 String(), Number(), Boolean(), Symbol()가 존재한다. 래퍼 객체마다 제공하는 메서드 역시 다르다. 예를 들어, string형에는 문자 전체를 대문자로 바꿔주는 `.toUpperCase()`라는 메서드가 존재한다.

.toUpperCase()를 호출했는 때 내부에선 아래와 같이 작동한다.

1. string은 원시값이므로 원시값의 프로퍼티에 접근하는 순간 래퍼 객체가 만들어지는데, 이 객체는 원시값을 알고 있으면서, toUpperCase() 같은 메서드들을 가지고 있다.
2. 메서드가 실행되고, 새로운 원시값이 반환되면 래퍼 객체는 파괴되고, 원시값만 남게된다.

> 래퍼 객체는 생성자로는 사용하지 않는게 좋다.
> 몇몇 상황에서 혼동을 일으키기 때문이다.

```js
let num = new Number(0);
>
if (num) alert("num은 0이 아닌 값입니다.");
```

num은 객체기에 위 alert()가 실행되는 헷갈리는 상황이 발생한다.

추가로 null, undefined에는 메서드가 없다.

### 5.1 과제

1. 문자열에 프로퍼티를 추가할 수 있을까요?
   ![](./images/1.png)
   안될 것 같다. 래퍼 객체에 특정 메소드나 프로퍼티를 덮어쓰려고 하면 자바스크립트 내에서 에러를 발생시킬 것 같기 때문이다.
   (답: 래퍼 객체의 test 프로퍼티에 5를 넣을 순 있지만, 래퍼 객체는 그 후에 바로 파괴되기 때문에 엄겨 모드에선 에러, 비엄격 모드에선 undefined가 출력된다고 한다. -> 원시값에 추가적인 데이터를 저장할 수 없다.)

---

## 5.2 숫자형

자바스크립트는 숫자를 나타낼 때 두가지 자료형을 제공한다.

1. 배정밀도 부동소수점 숫자(double precision floating point number)라 알려진 64비트 형식의 IEEE-754에 저장되는 일반적인 숫자
2. 숫자가 2^53 이상이거나 -2^53 이하일 때 사용하는 BigInt
   가 있다.

### 숫자를 입력하는 다양한 방법

자바스크립트에선 십억을 나타낼 때 `1000000000`이라고 나타낼 수도 있지만 `1e9`처럼 사용할 수도 있다. e는 왼쪽 숫자에다가 10의 오른쪽 숫자만큼의 거듭제곱한 수를 곱해준다.
반대로 `0.0001`을 표현할 때도 e를 사용해서 `1e-4`라고 표현할 수도 있다.

```js
alert(1.2e9); // 12억
alert(1.2e-4); // 12앞에 0이 4개인 소수: 1.2 / 10000
```

### 2진수, 8진수, 16진수

2, 8, 16진수는 각각 0b, 0o, 0x를 앞에 붙여 사용할 수 있다.
16진수에서 알파벳은 대, 소문자를 가리지 않는다.

```js
let a = 0xff;
let b = 0xff;
let c = 0o377;
let d = 0x11111111;
let e = 255;
// 모두 같은 255이다.
```

### .toString(base)

`.toString(base)`는 base 진법으로 숫자를 표현한 후 문자형으로 반환해준다.

```js
alert((123456).toString(36)); // 2n9c
```

위에서 점 두개를 사용했는데, 숫자형인 값에 직접 메서드와 프로퍼티를 사용할 때 숫자 뒤에 .을 하나만 붙이면 자바스크립트가 소수점으로 인식해 에러가 발생하기 때문에 저렇게 해줘야한다. `(123456).toString(36)`도 가능하다.

### 어림수 구하기

어림수 구하는 건 숫자 연산에서 제일 많이 사용되는 연산이다.

Math 객체를 사용하면 어림수를 구할 수 있다.
Math.floor(), Math.ceil(), Math.round()는 각각 소수부 첫째자리에서 내림, 올림, 반올림으로, 인자 숫자를 토대로 값을 반환한다.
Math.trunc()는 정수부 값만 반환한다.

|      | Math.floor() | Math.ceil() | Math.round() | Math.trunc() |
| ---- | ------------ | ----------- | ------------ | ------------ |
| 2.1  | 2            | 2           | 2            | 2            |
| 2.6  | 2            | 3           | 3            | 2            |
| -2.1 | -3           | -2          | -2           | -2           |
| -2.6 | -3           | -2          | -3           | -2           |

`.toFixed()` 메서드도 Math.round() 와 같은 역할을 수행한다.

```js
alert((1.23).toFixed(1)); // 1.2
```

`.toFixed()`에 인자 값이 숫자의 소수 길이보다 크다면 0으로 채워진다.

```js
alert((1.23).toFixed(5)); // 1.23000
```

### 부정확한 계산

숫자는 64비트 형식인 IEEE-754로 표현되기에 만약 숫자가 64비트를 넘어가면 Infinity로 처리된다.
이때 64비트 중 52비트는 숫자를 저장하는데 사용되고, 11비트는 소수점 위치를(정수는 0비트), 1비트는 부호를 저장하는데 사용된다.

표현 가능한 범위는 대략 최대 ±1.79e308에서 최소 ±5e-324 정도 된다.

꽤 자주 발생하는 정밀도 손실 현상도 있다.

```js
alert(0.1 + 0.2 === 0.3); // false
```

위 코드에서 `0.1 + 0.2`는 `0.30000000000000004`으로 처리된다.

IEEE-754에선 가능한 가장 가까운 숫자로 반올림하는 방법으로 이 문제를 해결한다.
때문에 아래와 같은 방법으로 정밀도 손실을 확인해볼 수 있다.

```js
alert((0.1).toFixed(20)); // 0.10000000000000000555
```

때문에 소수를 더하면 더할 수록 정밀도 손실도 더해진다.
이게 0.1 + 0.2가 0.3이 아닌 이유이다.
PHP, Java, C, Perl, Ruby에서도 자바스크립트와 똑같은 형식을 사용하기에 같은 결과가 나온다.

이 문제를 해결하는 방법에는 다음이 있다.

- `.toFixed()` 사용하기
  `0.1 + 0.2`를 예로 다음과 같이 코드를 짜면 된다.
  ```js
  let sum = 0.1 + 0.2;
  alert(+sum.toFixed(2)); // 0.3
  ```
  `toFixed()`로 특정 소수점 까지 반올림한 값을 만들고 + 로 숫자형으로 변환한다.
- 정수로 치화한 후 계산하기
  똑같이 `0.1 + 0.2`를 예시로
  ```js
  let sum = (0.1 * 10 + 0.2 * 10) / 10;
  alert(sum); // 0.3
  ```
  이 방법은 오류를 줄여주긴 하지만 완전히 없애진 못한다.

> 9999999999999999는 1이 더해진 10000000000000000와 같다.

```js
alert(9999999999999999 === 10000000000000000); // true
```

실제 숫자를 저장하는 52비트에 위 숫자를 담기엔 너무 작아서 최소 유효 숫자가 손실돼 버렸기 때문이다. 자바스크립트는 숫자 손실이 나도 오류를 발생시키지 않는다.

> 자바스크립트에는 0과 -0이 존재한다. 부호비트를 사용하기 때문에 그렇다. 두 0을 일치 연산해보면 true가 출력된다.

```js
alert(0 === -0); // true
```

### isNaN()과 isFinite()

`isNaN()`은 인자값을 숫자로 변환한 후, NaN인지 체크해준다.
`NaN`은 동등/일치 연산하면 false를 반환하기에 필요한 함수이다.

`isFinite()`는 인자값을 숫자로 변환한 후, NaN/Infinity/-Inifinity를 제외한 숫자인지 체크해준다.
값이 일반 숫자인지 검사할 때 사용된다.

> Object.is()는 === 와 비슷하지만 아래 두가지 케이스에서 차이를 보인다.

```js
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
```

이 케이스 외에는 Object.is(a, b)는 a === b와 같다. 이것때문에 Object.is()는 비교가 정확해야할 때 === 대신 사용된다.

### parseInt()와 parseFloat()

parseInt()와 parseFloat()은 문자열에서 정수, 실수를 파싱해 반환하는 함수이다.
CSS 문법이나 통화 기호가 붙은 문자에서 숫자만 뽑아낼 때 사용할 수 있다.

```js
alert(parseInt("123px")); // 123
alert(parseInt("12.3px")); // 12 (정수부분만 반환됨)

alert(parseFloat("12.3px")); // 12.3
alert(parseFloat("1.2.3")); // 1.2 (두번째 점에서 읽기를 끝냄)
```

parseInt()의 두번째 인자에는 진수가 들어가는데 첫번째 인자값의 진수를 설정해줄 수 있다.

```js
alert(parseInt("0xff", 16)); // 255
alert(parseInt("ff", 16)); // 255 (0x가 없어도 동작함)
alert(parseInt("2n9c", 36)); // 123456
```

### 5.2 과제

1. 수를 입력받아 덧셈하기
   사용자에게 두 수를 입력받고, 두 수의 합을 출력해주는 스크립트를 작성해보세요.

```js
let a = +prompt("첫번째 숫자를 입력하세요");
let b = +prompt("두번째 숫자를 입력하세요");
alert(a + b);
```

2. 6.35.toFixed(1) == 6.3인 이유는 무엇일까요?
   6.35.toFixed(16)을 출력해보니 "6.3499999999999996"가 출력돼었다.
   이것때문에 `6.35.toFixed(1)`가 올림이 안돼고 내림이 된 것 같다.
   6.35에 1e-15를 더하니 해결되었다.

```js
alert((6.35 + 1e-15).toFixed(1)); // 6.4
```

해답
![](./images/2.png)

3. 숫자를 입력할 때까지 반복하기
   ![](./images/3.png)
   isFinite()는 인자값이 일반 숫자이거나 일반 숫자로 변환가능한 문자열일 때 true를 반환하므로 이 함수를 활용해 구현할 수 있다.

```js
function readNumber() {
  let num;

  do {
    num = prompt("숫자를 입력하세요");

    if (num === null) return null;
  } while (!isFinite(num));

  return +num;
}
```

4. An occasional infinite loop
   ![](./images/4.png)
   `0.2.toFixed(20)`을 살펴보면 `0.2`의 실제 값은 `0.20000000000000001110`인 것을 알 수 있다. 이런 정밀도 손실 문제 때문에 위 반복문은 끝나지 않는 것이다.

5. A random number from min to max
   ![](./images/5.png)

```js
function random(min, max) {
  return Math.random() * (max - min) + min;
}
```

6. A random integer from min to max
   ![](./images/6.png)

```js
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## 5.3 문자열

### 특수기호

| 특수 문자      | 설명                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| \b, \f, \v     | 각각 백스페이스(Backspace), 폼 피드(Form Feed), 세로 탭(Vertical Tab)을 나타내며 호환성 유지를 위해 남아있는 기호로 요즘엔 사용하지 않는 문자이다.   |
| \xXX           | 16진수 유니코드 XX로 표현한 특수 문자이다. (알파벳 z는 \x7A와 같다.)                                                                                 |
| \uXXXX         | UTF-16 인코딩 규칙을 사용하는 16진수 코드 XXXX로 표현한 유니코드 문자이다. 반드시 4개의 16진수로 구성되어 있어야 한다. (저작권 기호 ⓒ는 \u00A9이다.) |
| \u{X ~ XXXXXX} | UTF-32로 표현할 수 있는 유티코드 문자이다. 몇몇 특수문자는 두 개의 유티코드 기호를 사용하기에 4바이트를 차지한다. (웃는 얼굴 😍는 \u{1F60D}이다.)    |

### 특정 글자에 접근하기

str.charAt(idx)은 하위 호환성을 위해 남아 있는 메서드로 str\[idx]와 똑같은 역할을 한다. 두 개의 차이는 .charAt()은 문자열 범위를 벗어난 인덱스엔 빈 문자열을, str\[ ]은 undefined를 반환한다.

for..of 반분문의 반복자에 문자열을 넣으면 문자가 하나씩 변수에 대입한다.

```js
for (let char of "asdf") alert(char);
// 출력
// a
// s
// d
// f
```

문자열은 불변성의 성질을 가지고 있다.

```js
let name = "James";
name[0] = "G"; // Uncaught TypeError: Cannot assign to read only property '0' of string 'James'
alert(str); // 비엄격 모드에선 James가 출력되고, 엄격 모드에선 동작하지 않는다.
```

### 부분 문자열 추출하기

| 메서드                   | 추출할 부분 문자열           | 음수 허용 여부(인수) |
| ------------------------ | ---------------------------- | -------------------- |
| slice(start\[, end])     | start부터 (end까지)          | 음수 허용            |
| substring(start\[, end]) | start부터 / start와 end 사이 | 음수는 0으로 취급    |

(substr은 브라우저 이외의 호스트 환경에선 동작하지 않을 수 있다하여 안적었습니다.)

### 문자열 비교하기

`str.codePointAt(pos)`는 문자열의 pos에 위치한 문자의 아스키 코드를 반환한다.

```js
let str = "asdf";
alert(str.codePointAt(0)); // 97
alert(str.codePointAt(3)); // 102
```

`String.fromCodePoint(code)`은 code에 해당하는 아스키 코드 문자를 반환한다.

```js
alert(String.fromCodePoint(97)); // a
alert(String.fromCodePoint(102)); // f
```

### 문자열 제대로 비교하기

str.localeCompare(str2)로 문자열을 비교할 수 있는데
str이 str2보다 작으면 음수,
str이 str2보다 크면 양수,
같으면 0을 반환한다.

### 문자열 심화

#### 서로게이트 쌍

문자의 대다수는 2바이트 코드를 사용하고 있지만, 현존하는 모든 기호를 표현하기엔 2바이트 코드, 65,536개는 충분하지 못했다.
때문에 서로게이트 쌍이라는 2바이트 글자들의 쌍을 이용해 인코딩한다.

```js
alert("😀".length); // 2
```

자바스크립트가 나왔을 당시엔 서로게이트 쌍이라는 개념이 존재하지 않았기 때문에 서로게이트 쌍으로 표현되 글자는 제대로 처리하지 못한다.
위 예시에 웃는 이모티콘의 길이가 2인 까닭이 그렇다.

서로게이트 쌍은 구성하는 글자들이 붙어있을 때만 의미가 있으므로 따로 출력해보면 쓰레기 기호가 출력된다.

```js
alert("😀"[0]); // �
alert("😀"[1]); // �
```

글자의 코드가 0xd800~0xdbff 사이에 있으면 서로게이트 쌍에서의 첫번째 글자라는 것을 나타낸다. 이 경우에 두번째 글자의 코드는 0xdc00~0xdfff 사이에 있어야 한다.
0xd800~0xdbff와 0xdc00~0xdfff는 표준에서 서로게이트 쌍을 위해 일부러 비워둔 코드이다.

```js
alert("😀".charCodeAt(0).toString(16)); // d83d : 0xd800~0xdbff 사이에 있음
alert("😀".charCodeAt(1).toString(16)); // de00 : 0xdc00~0xdfff 사이에 있음
```

#### 발음 구별 기호와 유니코드 정규화

발음 구별 기호같은 합성 글자는 UTF-16 테이블에서 독자적인 코드를 갖는다. 조합 가능한 수가 너무 많기에 모든 합성 글자에 부여되진 않는다.
유니코드 문자 \u0307를 붙이면 윗 점을 만들 수 있다.

```js
alert("A\u0307"); // Ȧ
```

여기서 또다른 합성 글자를 붙일 수 있다.
\u0323를 붙이면 아래 점을 추가할 수 있다.

```js
alert("S\u0307\u0323"); // Ṩ
```

단점도 존재하는데, `'S\u0307\u0323'`와 `'S\u0323\u0307'`는 윗 점과 아래 점의 위치가 달라 동등 비교하면 false가 반환된다.

```js
alert("S\u0307\u0323" == "S\u0323\u0307"); // false
```

이런 문제를 해결하려면 유니코드 정규화라는 알고리즘으로 각 문자를 동일한 형태로 정규화 해야한다.
`str.normalize()`를 사용하면 된다.

```js
alert("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true
```

`'S\u0307\u0323'`를 .normilize()로 하면 세 글자가 하나로 합쳐진다. 이때 합쳐진 `Ṩ`는 유니코드로 `\u1e68`인데 동등연산 해보면 true가 나오는 것을 볼 수 있다.

```js
alert("S\u0307\u0323".normalize() == "\u1e68"); // true
```

근데 항상 .normalize()가 한글자로 만들어주는 건 아니고, UTF-16 테이블을 만드는데 기여한 사람들이 해당 글자가 충분히 나타날 수 있을 것 같다고 판단해 넣은 글자만 그렇다.

### 5.3 과제

1. 첫 글자를 대문자로 변경하기

![](./images/7.png)

```js
function ucFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}
```

2. 스팸 문자열 걸러내기

![](./images/8.png)

```js
function checkSpam(str) {
  const lowerStr = str.toLowerCase();
  if (lowerStr.includes("viagra") || lowerStr.includes("xxx")) return true;
  return false;
}
```

3. 문자열 줄이기

![](./images/9.png)

```js
function truncate(str, len) {
  if (str.length > len) {
    return str.slice(0, len - 1) + "…";
  } else {
    return str;
  }
}
```

4. 숫자만 추출하기

![](./images/10.png)

```js
function extractCurrencyValue(str) {
  let num = "";

  for (let char of str) {
    if ("0" <= char && char <= "9") num += char;
  }

  return +num;
}
```

해답:
![](./images/11.png)
(너무 방대하게 생각한 것 같다...)

---

## 5.4 배열

배열은 특별한 종류의 '객체'이다. 대괄호를 이용하는 것도 객체에서 왔다. 숫자를 사용해 접근한다는 점만 다르다.

배열은 원시 자료형이 아닌 객체에 속하기에 객체처럼 행동한다.

```js
let a = [1, 2, 3];

let b = a;

b.push(4);

alert(a); // 1,2,3,4
```

배열도 객체이기에 프로퍼티를 추가할 수 있지만, 그러면 배열을 다룰 때만 작동하는 최적화 기법이 동작하지 않아 배열의 이점이 사라진다.

배열엔 .toString()이 구현돼 있어 문자열로 출력하면 요소가 쉼표로 구분된 문자열이 출력된다.

```js
alert([1, 2, 3]); // 1,2,3
```

new Array()로 배열을 선언하는 것보다 대괄호를 사용하는 방식보다 많이 쓰인다.

### 5.4 과제

1. 배열은 복사가 될까요?
   ![](./images/12.png)
   fruits엔 `["사과", "배", "오렌지", "바나나"]`가 들어있기에 fruits.length는 4가 된다.

2. 배열과 관련된 연산
   ![](./images/13.png)

```js
// 1.
const styles = ["Jazz", "Blues"];

// 2.
styles.push("Rock-n-Roll");

// 3.
function changeCenterTo(str, arr) {
  const center = Math.floor((arr.length - 1) / 2);
  arr[center] = str;
}
changeCenterTo("Classics", styles);

// 4.
alert(styles.shift());

// 5.
styles.unshift("Rap", "Reggae");
```

3. 배열 컨텍스트에서 함수 호출하기
   ![](./images/14.png)
   배열이 출력될 것 같다. this는 메서드를 호출한 객체 자신을 가리키기 때문이다.
   해답:
   ![](./images/15.png)

4. 입력한 숫자의 합 구하기
   ![](./images/16.png)

```js
function sumInput() {
  const arr = [];
  let num;
  while (true) {
    num = prompt("숫자를 입력해주세요");
    if (num === null || num === "" || !isFinite(num)) break;
    arr.push(+num);
  }
  return arr.reduce((acc, cur) => acc + cur, 0);
}
```

5. 최대합 부분 배열
   ![](./images/17.png)

```js
function getMaxSubSum(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    arr[i] = Math.max(arr[i], arr[i] + arr[i - 1]);
    if (max < arr[i]) max = arr[i];
  }
  return max < 0 ? 0 : max;
}
```

해답:
![](./images/18.png)

잘못된 부분이 있으면 알려주세요😁
