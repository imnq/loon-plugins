/*
 * 同花顺推荐流广告过滤，供 Loon http-response 使用。
 * 逻辑参考：https://github.com/androidcn/userscripts/blob/main/tonghuashun.js
 * 仅处理当前响应，不发出网络请求，不记录请求头或响应内容。
 */
(function () {
  var result = {};
  try {
    if (typeof $response !== "undefined" && $response.body) {
      var body = JSON.parse($response.body);
      if (body && Array.isArray(body.data)) {
        var filtered = body.data.filter(function (item) {
          return !(item && item.info && item.info.subject === "ad");
        });
        if (filtered.length !== body.data.length) {
          body.data = filtered;
          body.total = filtered.length;
          result = { body: JSON.stringify(body) };
        }
      }
    }
  } catch (error) {
    // 返回结构变化或不是 JSON 时，保留原响应。
  }
  $done(result);
})();
