## 7.1 프로퍼티 플래그와 설명자

객체는 단순한 '키-값' 쌍의 프로퍼티를 저장할 뿐 아니라 더 유연하고 강력한 자료구조입니다.

이어지는 내용을 통해 객체 프로퍼티 추가 구성 옵견 몇가지와 손쉽게 게터나 세터 함수를 만드는 방법을 알아봅시다.

### 프로퍼티 플래스

객체 프로퍼티는 '값'과 함께 플래그라 불리는 특별한 속성 세 가지를 갖습니다.

- writable - true이면 값을 수정할 수 있습니다. false이면 읽기만 가능합니다.
- enumerable - true이면 반복문을 사용해 나열할 수 있습니다. false라면 나열할 수 없습니다.
- configurable - true이면 프로퍼티 삭제 / 플래그 수정이 가능합니다. false라면 프로퍼티 삭제 / 플래그 수정이 안됩니다.

지금까지처럼 일반적인 방식으로 프로퍼티를 만들면 해당 플래그는 모두 true가 됩니다.

플래그를 얻는 방법은 다음과 같습니다.

먼저 Object.getOwnPropertyDesciptor() 메서드를 사용하면 특정 프로퍼티의 정보가 담긴 객체를 얻을 수 있습니다.
```js
let descriptor = Object.getOwnPropertyDesciptor(obj, propertyName);
```

obj 정보를 얻고자 하는 객체

propertyName 정보를 얻고자 하는 프로퍼티 이름 문자열

반환받은 desciptor에는 프로퍼티 값과 세 플래그에 대한 정보들이 담겨 있습니다.

```js
let user = { name: "James" };

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(descriptor);
/*
{
    "value": "John",
    "writable": true,
    "enumerable": true,
    "configurable": true
}
*/
```

플래그를 수정하려면 Object.defineProperty() 메서드를 사용하면 됩니다.

```js
Object.defineProperty(obj, propertyName, descriptor);
```

(obj와 propertyName은 .getOwnPropertyDescriptor와 동일합니다)

descriptor 적용하고자 하는 프로퍼티 설명자

descriptor에는 .getOwnPropertyDescriptor에서 반환받은 객체의 형태를 띄는데 이때 플래그의 정보가 없으면 모든 프래그의 값이 자동으로 false가 됩니다.<br>
만약 .defineProperty()의 프로퍼티가 없으면 자동으로 프로퍼티가 생성됩니다.

```js
let user = {};

Object.defineProperty(user, 'name', {
    value: "James"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(descriptor);
/*
{
    "value": "John",
    "writable": false,
    "enumerable": false,
    "configurable": false
}
*/
```

### Object.defineProperties / Object.getOwnPropertyDescriptors

Object.defineProperties / Object.getOwnPropertyDescriptors 로 여러개의 프로퍼티를 정의하거나 가져오거나 여러개의 설명자를 가져올 수 있습니다.<br>

문법은 각각 아래와 같습니다.

```js
Object.defineProperties(obj, {
    prop1: descriptor1,
    prop2: descriptor
});

Object.getOwnPropertyDescriptors(obj);
```

이때 .getOwnPropertyDescriptors() 메서드는 .defineProperties()의 두번째 인자에 들어가는 형태의 객체가 반환됩니다.

이 둘을 활용하면 아래처럼 객체를 복사할 수도 있습니다.

```js
let user = {
    name: "James",
    age: 18
};
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(user));

console.log(user == clone); // false
```

일반적으로 객체를 복사할 때는 아래 방법을 사용했습니다.

```js
for (let key in user) {
    clone[key] = user[key];
}
```

그런데 위 방법은 플래그 정보를 복사하지 못합니다.<br> 모든 정보를 복사하려면 Object.defineProperties를 사용해야 합니다.

추가로 Object.getOwnPropertyDescriptors는 심볼형 프로퍼티의 성명자 또한 반환합니다.

### 객체 수정을 막아주는 다양한 메서드

- Object.preventExtensions(obj) 새로운 프로퍼티를 추가할 수 없게 합니다.

- Object.seal(obj) 새로운 프로퍼티의 추가 / 기존 프로퍼티 삭제를 막아줍니다.

- Object.freeze(obj) 프로퍼티 추가 / 기존 프로퍼티 삭제, 수정을 막아줍니다.

- Object.isExtensible(obj) 새로운 프로퍼티를 추가하는 게 불가능 할 경우 false, 그렇지 않다면 true를 반환합니다.<br>
    (**이 메서드만 그렇다면 객체에 false, 그렇지 않다면 true로 아래 두 메서드와 반대로 동작합니다**)

- Object.isSealed(obj) 프로퍼티를 추가, 삭제가 불가능하고 모든 프로퍼티가 configurable: false이면 true를 반환합니다.

- Object.isFrozen(obj) 프로퍼티 추가, 삭제, 변경이 불가능하고 모든 프르퍼티가 configurable: false, writable: false이면 true를 반환합니다.

## 7.2 프로퍼티 getter와 setter

객체의 프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티 두가지로 나뉩니다.<br>
데이터 프로퍼티는 일반적으로 아는 그 프로퍼티이고<br>
접근자 프로퍼티는 값은 값은 획득하고 설정하는 역할을 담당하는 프로퍼티이다.

### getter와 setter
접근자 프로퍼티는 획득자, 설정자 메서드로 표현됩니다. 객체 리터럴 안에서 getter와 setter 메서드는 `get` 과 `set` 으로 나타냅니다.

```js
let obj = {
    get prop() {
        // obj.prop 을 실행할 때 실행되는 코드
    }
    set prop(value) {
        // obj.prop = value 을 실행할 때 실행되는 코드
    }
}
```

getter 메서드는 obj.prop을 사용할 때 실행되고, setter 메서드는 objl.prop에 값을 할당할 때 실행됩니다.

성과 이름이 있는 프로퍼티에서 fullName이라는 프로퍼티가 '성 이름'을 갖는 프로퍼티가 되도록 할 때<br>
접근자 프로퍼티를 이용하면 다음처럼 바로 짤 수 있습니다.

```js
let user = {
    name: "James",
    surname: "Smith",
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

console.log(user.fullName); // James Smith
```

이때 fullName에는 setter 메서드가 없기 때문에 값을 대입하려고 하면 에러가 납니다.

```js
user.fullName = "Tom Holland"; // Error: Cannot set property fullName of #<Object> which has only a getter
```

fullName의 setter 메서드도 추가하자면 아래처럼 할 수 있습니다.

```js
let user = {
    name: "James",
    surname: "Smith",
    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    set fullName(value) {
        [this.name, this.surname] = value.split(' ');
    }
};

user.fullName = "Tom Holland";
console.log(user.name); // Tom
console.log(user.surname); // Holland
```

### 접근자 프로퍼티 설명자
접근자 프로퍼티 설명자에는 value와 writable이 없고 get과 set이라는 함수가 있습니다.

```js
let user = {
    name: "James",
    surname: "Smith"
};

Object.defineProperty(user, 'fullName', {
    get() {
        return `${this.name} ${this.surname}`;
    },
    set(value) {
        [this.name, this.surname] = value.split(' ');
    },
    enumerable: true
});

// enumerable이 true라 fullName 프로퍼티가 출력됨
for (let key in user) console.log(key); // name, surname, fullName

// configurable이 정의가 안되어 false이기에 에러가 남
Object.defineProperty(user, 'fullName', {
    enumerable: false
}); // Error: Cannot redefine property: fullName
```

프로퍼티를 정의할 때 데이터 프로퍼티에서만 쓰이는 프로퍼티와 접근자 프로퍼티에서만 쓰이는 프로퍼티를 같이 쓰면 에러가 발생합니다.

잘못된 부분이 있으면 알려주세요😁