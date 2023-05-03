## 6.1 재귀와 스택
재귀는 함수가 자기 자신을 호출하는 것을 의미합니다.

예를 들어 1부터 n까지의 곱을 반환하는 함수 factorial(n)이 있다고 해봅시다.<br>
위 함수를 구현하는 방법에는 아래 두 가지가 있습니다.

1. 반복적인 사고를 통한 방법: for 루프

```js
function factorial(n) {
    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

alert(factorial(4)); // 24
```

2. 재귀적인 사고를 통한 방법: 자기 자신을 호출함

```js
function factorial(n) {
    if (n == 1) {
        return 1;
    } else {
        return n * factorial(n-1);
    }
}

alert(factorial(4)); // 24
```

> 재귀를 용한 코드는 짧습니다.<br>
위 코드에서 if문 대신 삼항 연산자를 사용하면 간결하게 만들 수 있습니다.

```js
function factorial(n) {
    return (n == 1) ? 1 : (n * factorial(n-1));
}
```

### 실행 컨텍스트와 스택

실행 컨텍스트는 함수 실행에 대한 세부 정보를 담고 있는 내부 데이터 구조입니다.<br>
함수 내에서 일어나는 제어 흐름의 현위치, 변수의 현재 값, this의 값 등 상세 정보들이 실행 컨텍스트에 저장됩니다.

함수 호출 1회 당 하나의 실행 컨텍스트가 생성됩니다.

함수 내부에 중첩 호출이 있을 때는 아래와 같은 절차가 수행됩니다.

1. 현재 함수의 실행이 일시 중지됩니다.
2. 중지된 함수와 연관된 실행 컨텍스트는 실행 컨텍스트 스택(execution context stack) 이라는 특별한 자료구조에 저장됩니다.
3. 중첩 호출이 실행됩니다.
4. 중첩 호출 실행이 끝난 이후 실행 컨텍스트 스택에서 일시 중단한 함수의 실행 컨텍스트를 꺼내오고, 중단한 함수의 실행을 다시 이어갑니다.

예를 들어 factorial(4)를 호출했을 때 실행 컨텍스트에서는 아래와 같은 일들이 일어납니다.

#### factorial(4)

```js
function factorial(n) {
    if (n == 1) {
        return 1;
    } else {
        return n * factorial(n-1);
    }
}
```
위 함수를 사용했을 때는 예를 들어 보겠습니다.

factorial(4)를 호출하는 순간, 실행 컨텍스트엔 변수 n = 4가 저장됩니다.<br>
첫 번째 if문을 보고 조건에 맞지 않으므로 실행흐름은 else 문에서 자기자신을 호출하는 위치인 5번째 줄에 위치하게 됩니다.<br>
그럼 실행 컨텍스트는 다음과 같이 생성됩니다.<br>
- `Context: { n: 4, 다섯 번째 줄 } call: factorial(4)`

다섯 번째 줄에 n * factorial(n-1)을 계산하려면 새로운 인수가 들어가는 factorial의 서브호출 `facotrial(3)` 이 만들어져야 합니다.

#### factorial(3)

자바스크립트는 중첩 호출을 하기 위해 실행 컨텍스트 스택에 현재 실행 컨텍스트를 저장 후 호출합니다.

이때 앞으로 일어나는 모든 중첩 함수에 대해 아래 동작이 똑같이 적용됩니다.

1. 스택 최상단에 현재 컨텍스트가 기록됨
2. 서브 호출을 위한 새로운 컨텍스트가 만들어짐
3. 서브 호출이 완료되면 기존 컨텍스트를 스택에서 꺼내 실행을 이어감

`factorial(3)` 서브 호출이 시작될 때 실행 컨텍스트는 다음과 같습니다.

- `Context: { n: 3, 첫 번째 줄 } call: factorial(3)`
- `Context: { n: 4, 다섯 번째 줄 } call: factorial(4)`

이전 컨텍스트에 변수, 일시 중단된 줄에 대한 정보가 저장돼 있기 때문에 서브 호출이 끝났을 때 문제 없이 다시 이어서 실행됩니다.

> 실제로는 줄이라는 단위를 사용하지 않습니다.<br>
한 줄에 여러 서브 호출이 있을 수 있기에 서브 호출 바로 직후에 시작된다고 봐야합니다.

나머지 서브 호출 동작도 위와 유사합니다.

### 6.1 과제

1. 주어진 숫자까지의 모든 숫자 더하기

![](./images/1.png)

```js
// 1. for 반복문 사용하기
function sumTo(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) sum += i;

    return sum;
}

// 2. 재귀 사용하기(n > 1일 때 sumTo(n) = n + sumTo(n-1))
function sumTo(n) {
    if (n > 1) return n + sumTo(n-1);
    return 0;
}

// 3. 등차수열 공식 사용하기
function sumTo(n) {
    return n * (n+1) / 2
}
```

더 생각해보기 1<br>
세가지 방법 중에 가장 빠른 방법은 3번, 가장 느린 방법은 1번일 것 같다.<br>
3번은 O(1)의 실행 속도를 가지기 때문에 가장 빠르고 1번과 2번은 동작하는 실행 횟수는 같지만 변수를 새로 선언한다는 점에서 더 느릴 것 같다고 생각하기 때문이다.

더 생각해보기 2<br>
계산하다가 실행 컨텍스트 스택을 넘어 버려서 에러가 터질 것 같다.

2. 팩토리얼 계산하기

![](./images/2.png)

```js
function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
}
```

3. 피보나치 수 계산하기

```js
let mem = {};

function fib(n) {
    if (mem[n]) return mem[n];
    if (n <= 2) return 1;
    mem[n] = fib(n - 1) + fib(n - 2);
    return mem[n];
}
```

4. 단일 연결 리스트 출력하기

![](./images/4.png)

```js
// 반복문
function printList(list) {
    for (; list; list = list.next) {
        console.log(list.value);
    }
}

// 재귀
function printList(list) {
    console.log(list.value);
    if (list.next) printList(list.next);
}
```

5. 단일 연결 리스트를 역순으로 출력하기

```js
// 반복문
function printList(list) {
    const arr = [];
    for (; list; list = list.next) {
        arr.unshift(list.value);
    }
    arr.forEach(value => console.log(value));
}

// 재귀
function printList(list) {
    if (list.next) printList(list.next);
    console.log(list.value);
}
```