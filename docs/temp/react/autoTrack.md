# 自动埋点

方案一：
<TrackerClick name='namespace.click'>
    <CustomerComp logKey>
        <button>点击</button>
    </CustomerComp>
</TrackerClick>

优势：
<TrackerExposure>

https://zhuanlan.zhihu.com/p/270189082

方案二：

const handleClick = after(() => { })(() => {log}})

https://github.com/Qquanwei/trackpoint-tools

方案三：

改写React.createElement 

original = React.createElement 
warper

https://github.com/azoth1991/autoTrack/blob/master/AutoTrack.js


<div >

