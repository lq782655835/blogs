# DVA

React-Router
* Link
* Switch/Route
* BrowserRouter
* Redirect

* useParams: { id }
* useRouteMatch: { url }

## React跳转方式

### 1. withRouter

官方推荐：https://reactrouter.com/web/api/withRouter

withRouter增强函数：props: { location, history, match, route }

```js
import React, { useState, useEffect } from 'react';
import withRouter from 'umi/withRouter'; // 底层来自react-router
import PropTypes from 'prop-types'; // props

function VipDetail(props) {
    const { location, history, match, route } = props
    history.push(url) // 跳转
    return <div></div>
}


VipDetail.propTypes = {
    location: PropTypes.shape({ query: PropTypes.objectOf(PropTypes.string) }).isRequired,
}

// withRouter增强函数：props: { location, history, match, route }
export default withRouter(VipDetail);
```

> dva中每个page自动带withRouter，可省略手动withRouter

### 2. Link

``` js
import { BrowserRouter as Router,Link} from 'react-router-dom';
<Link to="/home">首页</Link>
```

### 3. Redirect

类似Link

``` js
import { Redirect } from 'react-router-dom';
<Redirect to='/login' />
```

### 4. umi中页面跳转

``` js
// 1 基于 umi/link，通常作为 React 组件使用。
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);

// 2. 基于 umi/router，通常在事件处理中被调用。
import router from 'umi/router';

function goToListPage() {
  router.push('/list');
}
```