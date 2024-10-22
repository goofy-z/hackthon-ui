import $ from 'jquery'; // 假设你使用的是jQuery

interface AjaxResponse {
  // 定义你的 AJAX 响应类型，这里只是一个示例
  success: (data: any) => void;
  error: (error: any) => void;
}

interface ListMetaParams {
  data?: any; // 如果data是可选的，可以添加 ?
  success: (data: any) => void;
  error: (error: any) => void;
}

const gethaokelaiUrl = (relativeUrl: string) => {
    return '/haokelai' + relativeUrl;
  }

const getzhaiyaoUrl = (relativeUrl: string) => {
    return '/zhaiyao' + relativeUrl;
  }

class Services {
  static listhaokelai({ data, success, error }: ListMetaParams): JQuery.jqXHR {
    return $.ajax(gethaokelaiUrl('/ai_hackmason_leads?biz_name=test&request_id=asdf&asyn=0&routing_key=lyj'), {
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: success,
      error: error,
    });
  }
  static getzhaiyao({ data, success, error }: ListMetaParams): JQuery.jqXHR {
    return $.ajax(getzhaiyaoUrl('/dialogue_summary?asyn=0&request_id=20240624102209038_581&biz_name=qq'), {
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: success,
      error: error,
    });
  }
}

export default Services