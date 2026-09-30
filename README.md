# 东方财富 / 同花顺 Loon 去广告

按用户已验证有效的 haixinn/loon 两个插件整理。保留原有接口匹配与处理方式，不扩大拦截范围。未在用户设备上实测这一整理版。

## 文件

- `dfcf.plugin`：东方财富；清空 `data.adpositionidlist`，拦截活动广告图片。
- `ths.plugin`：同花顺；保留原域名拦截、复写和推荐流脚本入口。
- `scripts/tonghuashun.js`：过滤推荐流中 `info.subject === "ad"` 的项目，并更新 `total`。空响应、非 JSON 和异常结构返回原响应；没有外部网络调用。

## 安装

在 Loon 的插件页面分别添加以下地址：

- 东方财富：https://raw.githubusercontent.com/imnq/loon-plugins/main/dfcf.plugin
- 同花顺：https://raw.githubusercontent.com/imnq/loon-plugins/main/ths.plugin

启用插件、复写、脚本和 MITM。已有 Loon CA 证书已安装且完全信任时，不需重新生成证书。

关闭原来 haixinn/loon 的两个插件，避免重复处理；彻底退出两个 App 后重新打开。东方财富原插件说明要求清除缓存后生效，可在 App 内清缓存。

同花顺 JS 使用本仓库的 `scripts/tonghuashun.js`，不再引用 androidcn 仓库中的远程脚本。

## 与原版的差异

- 东方财富：保留两条复写和三个 MITM hostname。
- 同花顺：保留 Rule、Rewrite、MITM 和脚本匹配；移除无效的单独 `png` 行，将 JS 改为自己仓库中的文件。
- JS：广告过滤及 `total` 更新逻辑不变，增加异常处理和结构检查；没有广告时不重新序列化响应。
- 原版含 `iphone.ac.qq.com`，它不是同花顺域名。为保留原版行为，这里仍保留其规则和 MITM 项；若不需要，可同时删除对应复写和该 hostname。

## 维护

这里只覆盖原插件的范围，不承诺移除所有广告。`main` 上的文件修改后，Loon 更新时可能获取新内容。若希望锁定版本，可将 JS URL 中的 `main` 替换为审核后的完整 commit SHA；插件自身也可以使用 commit URL 导入。

## 来源

- https://github.com/haixinn/loon/blob/main/dfcf.plugin
- https://github.com/haixinn/loon/blob/main/ths.plugin
- https://github.com/androidcn/userscripts/blob/main/tonghuashun.js

原规则和过滤逻辑来自上述项目，保留来源归属；这份整理不授予上游代码新的许可。公开再分发前请确认上游适用许可或作者授权。
