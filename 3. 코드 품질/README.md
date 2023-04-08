(모던 JavaScript에 [코드 품질 파트](https://ko.javascript.info/code-quality)에서 새롭게 알게 된 내용을 정리한 것입니다.)

## 3.2 코딩 스타일

### 스타일 가이드

코딩 스타일 가이드는 코드를 어떻게 짤 지에 대한 규칙을 담은 문서이다. 스타일 가이드를 하나 정한 상태로 협업을 시작하면 누가 작성했는냐와 관계 없이 동일한 코드를 생산해낼 수 있다.
유명 스타일 가이드에는 아래의 스타일 가이드가 있다.

- [Google의 자바스크립트 스타일 가이드](https://google.github.io/styleguide/jsguide.html)
- [Airbnb의 자바스크립트 스타일 가이드](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)

### Linter

내가 작성한 코드가 코딩 스타일 가이드를 잘 지키고 있는지 자동으로 체크해주고 제안해주는 도구이다.

코딩 스타일 뿐만 아니라 오타 같은 것도 알려주기 때문에 코딩 스타일을 정하지 않더라고 버그 예방을 위해 사용하는 것이 좋다.

유명한 Linter에는 아래와 같은 것들이 있다.

- [JSLint](https://www.jslint.com/) – 역사가 오래된 linter
- [JSHint](https://jshint.com/) – JSLint보다 세팅이 좀 더 유연한 linter
- [ESLint](https://eslint.org/) – 가장 최근에 나온 linter

ESLint를 예로 만약 linter를 사용하려면

1. Node.js를 설치한다.
2. npm을 사용해 다음 명령어로 eslint를 설치한다 `npm install -g eslint`
3. ESLint를 사용하려는 프로젝트의 폴더에 `.eslintrc` 라는 설정 파일을 만든다.
4. 주요 에디터에 ESLint 플러그인을 설치하거나 활성화한다.

자세한 건 [https://eslint.org/docs/latest/use/getting-started](https://eslint.org/docs/latest/use/getting-started)에서 확인할 수 있다.

### 3.2 과제

1.

```js
function pow(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

let x = prompt("x?", ""),
  n = prompt("n?", "");
if (n <= 0) {
  alert(
    `Power ${n} is not supported, please enter an integer number greater than zero`
  );
} else {
  alert(pow(x, n));
}
```

위 코드가 어떤 점에서 좋지 않은지 생각해보세요.

```js
// 개인적으로 여는 중괄호는 한 조건문, 함수, 반복문에 첫째줄에 같이 쓰는 게 괜찮은 것 같다.
function pow(x, n) {
  // 쉼표 뒤에 띄어쓰기가 필요해보인다.
  let result = 1; // 대입 연산자 양쪽에 띄어쓰기가 필요해보인다.
  // 세미콜론 뒤에 띄어쓰기, 대입 연산자, 비교 연산자 양 옆에 띄어쓰기가 필요해보이고
  // 반복문 내 코드 블럭은 한 칸 아래로, 닫는 중괄호는 두 칸 아래로 내리고
  // result 변수에 할당 연산자 양쪽에 띄어쓰기가 필요해보인다.
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
// 얘도 대입연산자 양쪽에 띄어쓰기가 필요해보이고, 변수 n은 한번더 let으로 밑에 줄에 선언해도 될 것 같다. 그리고 n 변수 선언부분에 대입 연산자 양쪽에 띄어쓰기가 필요해보인다.
let x = prompt("x?", ""),
  n = prompt("n?", "");
if (n <= 0) {
  // 비교 연산자 양쪽에 띄어쓰기가 필요해보인다.
  // 문자열이 너무 긴데 문자열을 나눠서 alert() 함수를 두 번 실행해도 괜찮을 것 같다.
  alert(
    `Power ${n} is not supported, please enter an integer number greater than zero`
  );
} else {
  alert(pow(x, n)); // 쉼표 뒤에 띄어쓰기가 필요해보인다.
}
```

2. 더 낫게 코드를 고쳐보세요.

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Power ${n} is not supported`);
  alert("please enter an integer number greater than zero");
} else {
  alert(pow(x, n));
}
```

---

## 3.3 주석

### 좋지 않은 주석

아래처럼 코드에서 무슨 일이 일어나는지에 대한 내용을 주석에 적는 건 좋지 않다.

```js
// 이 함수는 ~~~한 기능과 ~~~한 동작을 수행하며, ~~~한 형식으로 값을 반환합니다.
function f() {
  ...
}
```

설명이 담긴 주석이 많아서도 안된다. 코드 자체만으로도 무슨 일을 하는지 쉽게 알 수 있어야 한다.
코드가 불분면하다면 주석을 작성하기보단 코드를 뜯어고쳐야 하는 것일 수도 있다.

### 리팩토링 팁

- #### 1. 함수 분리하기

```js
function getPerfectSquares(until) {
  let PSList = [];

  for (let i = 1; i <= number; i++) {
    // 제곱수인지 확인하는 조건문
    if (i === parseInt(i ** (1 / 2)) ** 2) {
      PSList.push(i);
    }
  }

  return PSList;
}
```

위 함수 함수에서 if 문 부분이 많이 복잡한데 이를 isPerfectSquare() 함수로 떼어낼 수 있다.

```js
function isPerfectSquare(number) {
  return number === parseInt(number ** (1 / 2)) ** 2;
}

function getPerfectSquares(until) {
  let PSList = [];

  for (let i = 1; i <= number; i++) {
    if (isPerfectSquare(i)) {
      PSList.push(i);
    }
  }

  return PSList;
}
```

함수 이름 자체가 주석 역할을 하게 되어 보다 쉽게 알 수 있게 되었다.
이런 코드를 자기 설명적인(self-descriptive) 코드라고 부른다.

- #### 2. 함수 만들기

```js
// 간장계란밥 레시피
const indegredients1 = [];
indegredients1.push(getCooked("rice"));
...
const food1 = getMixedFood(indegredients1);

// 비빔밥 레시피
const indegredients2 = [];
indegredients2.push(getCooked("rice"));
...
const food2 = getMixedFood(indegredients2);
```

위 같이 아래로 죽 늘어진 코드는 새로 함수를 만들어 옮기는게 좋다.

```js
const food1 = getGanjangGyeranBap();
const food2 = getBibimBap();

function getGanjangGyeranBap() {
  const indegredients = [];
  indegredients.push(getCooked("rice"));
  ...
  return getMixedFood(indegredients);
}
function getBibimBap() {
  const indegredients = [];
  indegredients.push(getCooked("rice"));
  ...
  return getMixedFood(indegredients);
}
```

함수는 존재 자체가 무슨 역할을 하는지 설명할 수 있어야 한다. 이렇게 코드를 분리하는 등 이런 가이드를 지키며 코딩을 하면 함수가 어떤 동작을 하는지, 무엇을 받고 반환하는지 명확해진다.

그러나 실무에서 불가피하게 알고리즘이 복잡한 코드를 작성하거나 최적화를 위해 코드를 비틀어 작성할 때는 설명을 해주어야한다. 이런 경우를 제외하곤 간결하게 코드 자체로 설명이 가능한 코딩을 해야한다.

### 좋은 주석

설명이 담긴 주석이 좋지 않다.
아래와 같은 주석이 좋은 주석이다.

- 아키텍처를 설명하는 주석
  아키텍처를 설명하는 주석은 소스코드에 작성된 주석과 달리, 시스템의 아키텍처에 대한 정보를 담고 있다.
  시스템의 구조와 구성요소, 그리고 이들 간의 상호작용 방식을 설명하는 것으로 시스템의 구조를 파악하고 유지보수할 때 유용하다.
  또한 새로운 개발자들이 시스템의 구조를 빠르게 이해하고 개발에 참여할 수 있도록 도와준다.
  다음과 같이 주석을 쓸 수 있다.
  ```js
  /**
   * 이 클래스는 사용자 인증을 담당하는 모듈입니다.
   *
   * 이 모듈은 다음과 같은 구성요소로 구성됩니다:
   * - 로그인 폼: 사용자 이름과 비밀번호를 입력받습니다.
   * - 사용자 인증: 입력된 사용자 이름과 비밀번호를 인증하고, 세션을 생성합니다.
   * - 권한 확인: 생성된 세션을 사용하여 사용자의 권한을 확인합니다.
   *
   * 이 모듈은 사용자 인증과 권한 확인을 위한 서비스를 제공합니다.
   */
  ```
  위 주석에서는 해당 클래스가 어떤 기능을 수행하는지와 이를 위한 구성 요소들이 무엇인지에 대해 설명하고 있다.
  아키텍쳐 패턴을 설명할 때도 쓸 수 있다. MVC(Model-View-Controller) 아키텍처 패턴을 사용하는 코드에서 Model에 다음과 같은 주석을 달 수 있다.
  ```js
  /**
   * 이 클래스는 MVC 아키텍처 패턴에서 Model 역할을 수행합니다.
   *
   * 이 클래스는 다음과 같은 책임을 가집니다:
   * - 데이터를 저장하고 관리합니다.
   * - 데이터 변경을 감지하고 View에 알립니다.
   * - Controller에서 전달받은 데이터를 처리합니다.
   */
  ```
- 함수 사용 예와 매개변수 정보를 담고 있는 주석
  [JSDoc](https://jsdoc.app/)을 사용하면 함수에 대한 문서(주석)을 쉽게 작성할 수 있다. 여기엔 함수의 사용 예, 매개변수 정보, 반환 값 정보가 들어간다.
  ```js
  /**
   * 배열에서 최대값을 찾습니다.
   *
   * @param {number[]} arr 최대값을 찾을 배열입니다.
   * @returns {number} 배열에서 최대값입니다.
   */
  function findMax(arr) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  ```
- 왜 이런 방법으로 문제를 해결했는지를 설명하는 주석
  문제 해결 방법은 왜 하필 이런 방법을 택했는지 나중에 의문이 들 수 있다.
  이때 코드는 아무런 답을 해줄 수 없다.
  때문에 왜 이런 방법으로 문제를 해결했는지를 설명하는 주석이 필요하다.

  나중에 시간이 지나고 어떤 코드를 봤을 때 비효율적이라고 느껴 코드를 수정하다가 작동이 안된다면 오히려 시간 낭비가 되기 때문에 이런 방법을 사용한 이유에 대해 적어놓으면 나중에 봤을 때 시간 낭비를 하는 위험을 줄일 수 있다.

- 뚜렷하지 않거나 분명하지 않은 기능이 있고, 이 기능이 어디에 쓰이는지를 설명하는 주석

  ```js
  function multiplyList(numbers, factor) {
    /*
      주어진 배열의 모든 숫자를 주어진 인자(factor)로 곱한 결과를 새로운 배열로 반환합니다.
  
      매개변수:
          numbers (배열): 곱셈을 할 대상인 숫자 배열입니다.
          factor (숫자): 각 숫자를 곱할 인자입니다.
  
      반환값:
          배열: 각 숫자가 factor로 곱해진 새로운 배열을 반환합니다.
      */
    let result = [];
    for (let i = 0; i < numbers.length; i++) {
      result.push(numbers[i] * factor);
    }
    return result;
  }
  ```

  위 같이 코드를 예시로 들 수 있다.

---

## 3.5 테스트 자동화와 Mocha

### 테스트, 왜 해야하는가?

특정 기능을 만든다고 할 때 실제 실행 결과 기대했던 결과 같을 때까지 수동으로 수정했다가 실행했다가를 반복할 것이다. 이렇게 수동으로 코드를 재실행하는 건 오타가 일어날 위험도 있고 시간이 많이 든다.
또한 테스트 케이스의 누락으로 무언가를 놓치기 쉽다.

이때 테스트 코드를 이용하면 함수를 다양한 조건에서 실행해볼 수 있어 실행 결과와 기대 결과를 비교해볼 수 있다.

### Behavior Driven Development(BDD) 방법론

BDD는 테스트(test), 문서(documentation), 예시(example)를 한데 모아놓은 개념이다.

예시

- 팩토리얼 함수와 명세서
  n 팩토리얼을 반환하는 함수가 있다고 할 때 만들어지는 산출물을 BDD에선 명세서(specification), spec이라고 부른다.
  명세서엔 유스 케이스에 대한 설명과 테스트가 담겨있다.
  예시
  ```js
  describe("factorial", function () {
    it("주어진 숫자의 n!", function () {
      assert.equal(factorial(4), 24);
    });
  });
  ```
  `describe("제목", function() {...})`엔 구현하고자 하는 기능에 대한 설명이 들어간다. 예에서는 factorial의 설명이 들어간다. it불록은 한데 모아주는 역할도 한다.
  `it("유스 케이스 설명", function() {...})`엔 유스케이스에 대한 설명이 들어가는데 이때 사람들이 이해하는 자연어를 쓴다. 두번째 인자에 테스트할 코드가 함수에 들어간다.
  `assert.equal(값1, 값2)`엔 에러가 터지지 않으면 정상작동 한거다.
  `assert.*`은 특정함수가 예상대로 움직이는지 확인해준다.
  위 코드는 Mocha 테스팅 프레임워크와 다양한 assertion은 제공해주는 Chai 라이브러리를 사용하여 실행시킬 수 있다.

개발 순서

1. 명세서 초안을 작성한다. 초안엔 기본적인 테스트도 들어간다.
2. 명세서 초안을 보고 코드를 작성한다.
3. Mocha 프레임워크를 통해 해당 명세서를 실행한다. 에러가 출력되지 않을 때까지 코드를 수정한다.
4. 모든 테스트를 통과했다면 명세서에 지금까지 고려하지 않았던 유스케이스를 작성한다.
5. 기능이 완료될 때까지 3 ~ 4단계를 반복한다.

위 명세서 예제에서 테스트를 추가하는 방법은 아래와 같다.

1. it 블록에 assert 추가하기

```js
describe("factorial", function () {
  it("주어진 숫자의 n!", function () {
    assert.equal(factorial(4), 24);
    assert.equal(factorial(5), 120);
  });
});
```

2. 테스트(it 블록)를 하나 더 추가하기

```js
describe("factorial", function () {
  it("4 팩토리얼은 24입니다.", function () {
    assert.equal(factorial(4), 24);
  });
  it("5 팩토리얼은 120입니다.", function () {
    assert.equal(factorial(5), 120);
  });
});
```

참고로 테스트에서 연관 없는 두가지를 같이 점검하고 있다면 분리하는게 좋다.

for문을 이용해 자동으로 it 블록을 만들어낼 수도 있다.

```js
describe("factorial", function () {
  function makeTest(x) {
    let expected = 1;
    for (let i = 2; i <= x; i++) expected *= i;

    it(`${x} 팩토리얼은 ${expected}입니다.`, function () {
      assert.equal(factorial(x), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }
});
```

### 중첩 describe

describe안에 describe를 쓸 수 있다.
위에서 반복문을 사용해 it 블록을 생성한 예제에서 makeText() 함수는 for문 내에서만 쓰이므로 describe로 묶을 수도 있다.

```js
  describe("factorial", function() {
    describe("x 팩토리얼을 테스트 합니다.", fucntion() {
      function makeTest(x) {
        let expected = 1;
        for(let i = 2; i <= x; i++) expected *= i;

        it(`${x} 팩토리얼은 ${expected}입니다.`, function() {
          assert.equal(factorial(x), expected);
        });
      }

      for (let x = 1; x <= 5; x++) {
        makeTest(x);
      }
	});
	...
  });
```

### before / after와 beforeEach / afterEach

before() 함수는 전체 테스트가 실행되기 전에 실행되고, after() 함수는 전체 테스트가 실행된 후 실행된다.
beforeEach() 함수는 it 블록이 실행되기 전에 실행되고, afterEach() 함수는 it 블록이 실행된 후 실행된다.

```js
describe("test", function () {
  before(() => console.log("테스트를 시작합니다."));
  after(() => console.log("테스트를 끝냅니다."));
  beforeEach(() => console.log("단일 테스트를 시작합니다."));
  afterEach(() => console.log("단일 테스트를 끝냅니다."));

  it("test1", () => console.log("테스트1 시작..."));
  it("test1", () => console.log("테스트2 시작..."));
});
```

출력

```
테스트를 시작합니다.
단일 테스트를 시작합니다.
테스트1 시작...
단일 테스트를 끝냅니다.
단일 테스트를 시작합니다.
테스트2 시작...
단일 테스트를 끝냅니다.
테스트를 끝냅니다.
```

### assertion 종류

- assert.equal(value1, value2): value1과 value2가 동일한지 체크합니다. (value1 == value2)
- assert.strictEqual(value1, value2): value1과 value2가 일치하는지 체크합니다. (value1 === value2)
- assert.notEqual(value1, value2): value1과 value2가 동일하지 않고 일치하지 않은지 체크합니다.
- assert.isTrue(value): value가 true인지 체크합니다. (value === true)
- assert.isFalse(value): value가 false인지 체크합니다. (value === false)
- assert.isNaN(value): value가 NaN인지 체크합니다.

### 3.5 과제

1. 함수 pow의 테스트 코드를 보고 무엇이 잘못됐는지 알아보세요.

```js
it("주어진 숫자의 n 제곱", function () {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

먼저 it 블록은 describe 블록 내에 들어있어야한다. 또한 각각의 assert.equal()은 각각의 it 블록에 나눠 넣는게 낫다.

**잘못된 부분이 있으면 알려주세요😁**

## 3.6 폴리필

폴리필(Polyfill)이란? 최신 자바스크립트 코드를 구식 자바스크립트 코드로 구현하는 것을 의미한다.

주목해볼 만한 폴리필에는 아래 두가지가 있다.

- [core js](https://github.com/zloirock/core-js)
- [polyfill.io](https://polyfill.io/v3/)

### 바벨

바벨은 트랜스파일러로 모던 자바스크립트를 구 표준을 준수하는 코드로 바꿔준다.
예시로 바벨은 `a ?? b` 이 코드를 `a !== null && a !== undefined ? a : b`로 트랜스파일한다.

모던 자바스크립트로 코드를 짜려면 트랜스파일러와 폴리필은 필수이다.![](https://velog.velcdn.com/images/arkk200/post/47e96812-a604-4709-9aa7-82b0dc028733/image.png)
