## toRefs

``` js
function useMousePosition() {
  const pos = reactive({
    x: 0,
    y: 0
  })

  // ...
  return toRefs(pos)
}

// x & y are now refs!
const { x, y } = useMousePosition()

// 以下是丢失响应式方式
// reactivity lost!
const { x, y } = useMousePosition()
return {
    x,
    y
}

// reactivity lost!
return {
    ...useMousePosition()
}

// this is the only way to retain reactivity.
// you must return `pos` as-is and reference x and y as `pos.x` and `pos.y`
// in the template.
return {
    pos: useMousePosition()
}
```

``` js
// 源码：object rest会丢失响应式，使用toRefs
export function toRefs<T extends object>(
  object: T
): { [K in keyof T]: Ref<T[K]> } {
  const ret: any = {}
  for (const key in object) { // for in 展开一层
    ret[key] = toProxyRef(object, key)
  }
  return ret
}

function toProxyRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): Ref<T[K]> {
  return {
    _isRef: true,
    get value(): any {
      return object[key]
    },
    set value(newVal) {
      object[key] = newVal
    }
  }
}
```

## Composition API

``` js
const count = reactive({ num: 0 }) // state
const num = ref(0)
// computed依赖于count.num,也意味着该computed是count.num的依赖项
const computedNum = computed(() => 2 * count.num))
count.num = 7

// effect默认没带lazy参数，先会执行effect
effect(() => {
  // effect用到对应响应式数据时，count.num get就已经收集好了该effect依赖
  // 同理，使用computed api时，
  console.log(count.num)
})

function increment() { // methods
    count.value++
}

watchEffect(() => console.log(count.value)) // watch

onMounted(() => console.log('mounted!')) // life cycle
onUnMounted(() => console.log('unmounted!'))
```