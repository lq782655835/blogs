# Angular

## Module

在 Angular 2 中，一個 Module ( 模組 ) 是`一個把彼此互相關聯的 components、directives、pipes 和 services 整合的機制`。然後這個模組可以再和其他模組結合，最後就形成我們的網頁應用程式。

一個模組又由點像是類別 ( Class )，一樣也有 `public` 和 `private` 的概念。應用程式只能取用公開的部分，私有的部分則看不見。

### 1. root Module

``` ts
//app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CreditCardMaskPipe } from './credit-card-mask.pipe';
import { CreditCardService } from './credit-card.service';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [BrowserModule], // BrowserModule包含了一些最基本的 directives、 pipes 和 services
  providers: [CreditCardService],
  // 重点：需要都放在module里面，否則 Angular 也不會去編譯這些東西。
  // declarations負責定義程式需要甚麼東西，所以也要填入AppComponent
  declarations: [
      AppComponent,
      CreditCardMaskPipe,
      CreditCardComponent
    ],
  bootstrap: [AppComponent] // 入口组件，只有root module才能设置，有且一个
})
export class AppModule { }
```

NgModule 這個裝飾器 ( decorator ) 需要至少三個特性： import、declaration 和 bootstrap。

* import：預期有一個陣列包含要引入的所有陣列。
* declaration：預期有一個陣列包含所有這個模組要用的 components、directives 和 pipes。
* bootstrap：我們用來定義根組件 (root component)，雖然可以是一個陣列，但通常我們只會定義一個而已。`根組件會再引入其他更多的組件`。

## 模組種類

模組有兩種：

* root module
* feature module。

一個程式基本上只會有一個 root module，搭配 0 個或許多個 feature module。要啟動程式一定要有 root module，判別方式是 root module 會有 NgModule 裝飾器，且他會引入 BrowserModule。
若是 feature module 則是會引入 CommonModule。
按照慣例， root module 通常都會命名為 AppModule。

feature module:
``` ts
//credit-card/credit-card.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditCardMaskPipe } from './credit-card-mask.pipe';
import { CreditCardService } from './credit-card.service';
import { CreditCardComponent } from './credit-card.component';

@NgModule({
  imports: [CommonModule], // feature module引入 CommonModule 而非 BrowserModule
  // 定义需要编译的内容
  declarations: [
    CreditCardMaskPipe,
    CreditCardComponent
  ],
  providers: [CreditCardService], // 注入依賴服務
  exports: [CreditCardComponent] // 多了 export，declarations 宣告用到的物件是 private，為了讓我們的 module 在被其他 module 使用的時候也可以動用自己模組裡的物件
})
export class CreditCardModule {}
```

root module：
``` ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CreditCardModule } from '../credit-card/credit-card.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CreditCardModule // 可以拿到CreditCardComponent在当前module中
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

> 简单理解，declarations定义了哪些内容需要编译(`template中自定义组件会从declarations中查找，找不到则从import的子module中declarations找到`)。

> export是表示对外公用。

> module可以重复引用。

## 参考资料
* https://medium.com/@cyrilletuzi/understanding-angular-modules-ngmodule-and-their-scopes-81e4ed6f7407
* https://ithelp.ithome.com.tw/articles/10188095
* https://ithelp.ithome.com.tw/articles/10188188
