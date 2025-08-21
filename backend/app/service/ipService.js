const Service = require('egg').Service;

class IpService extends Service {
  async getLocation(ip) {
    const { ctx } = this;
    const ak = '6IW4lSX3RwG80Kmyh2UW8WU7Yso5JxeS';
    const url = `http://api.map.baidu.com/location/ip?ip=${ip}&coor=bd09ll&ak=${ak}`;
    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    const data = res && res.data ? res.data : null;
    const content = data && data.content ? data.content : {};
    const detail = content.address_detail || {};
    return {
      province: detail.province || '',
      city: detail.city || '',
      district: detail.district || '',
    };
    // return res;
  }
}

module.exports = IpService;
