# immer

无API形式的，把state修改为newState（纯函数），类似Vue可直接修改Object对象（原理也确实使用Proxy和Object.defineProperty）

解释和源码：https://zhuanlan.zhihu.com/p/122187278

## immer 降级方案
``` js
// https://github.com/immerjs/immer/blob/439e4f1d7d/src/core/immerClass.ts
export function createProxy<T extends Objectish>(
	immer: Immer,
	value: T,
	parent?: ImmerState
): Drafted<T, ImmerState> {
	// precondition: createProxy should be guarded by isDraftable, so we know we can safely draft
	const draft: Drafted = isMap(value)
		? getPlugin("MapSet").proxyMap_(value, parent)
		: isSet(value)
		? getPlugin("MapSet").proxySet_(value, parent)
		: immer.useProxies_
		? createProxyProxy(value, parent)
		: getPlugin("ES5").createES5Proxy_(value, parent)

	const scope = parent ? parent.scope_ : getCurrentScope()
	scope.drafts_.push(draft)
	return draft
}
```