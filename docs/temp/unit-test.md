# 单元测试

## 单测类型
1. 测试驱动开发 TDD
2. 行为驱动开发 BDD
``` js
// TDD
suite('Array', function() {
  setup(function() {
  });

  test('equal -1 when index beyond array length', function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });
});

// BDD
describe('Array', function() {
  before(function() {
  });

  it('should return -1 when no such index', function() {
    [1,2,3].indexOf(4).should.equal(-1);
  });
});
```

## 框架选择
提供一套 API 帮助开发者更方便的测试代码。推荐使用Mocha测试框架 + chai断言库。如果需要测试覆盖率，推荐istanbul

断言库	优点	缺点	备注
Node.js 核心库 Assert	无需第三方依赖	语法较弱	-
Should.js	API 非常语义	文档太烂	-
expect.js	-	-	比较中庸
chai	大而全的 API	-	

# 参考文章

[Mocha+Chai单元测试并没有想象中难](http://www.dengzhr.com/node-js/1282)

[Chai.js API](https://www.chaijs.com/api/bdd/#method_ok)
