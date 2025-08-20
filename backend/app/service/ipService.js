const Service = require('egg').Service;

class IpService extends Service {
  async getLocation(ip) {
    const { ctx } = this;
    const ak = 'bvUGGL4o9SBDEl7JXP657EHvVJ5jt2dG';
    const url = `http://api.map.baidu.com/location/ip?ip=${ip}&coor=bd09ll&ak=${ak}`;
    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    return {
      province: res.content.province,
      city: res.content.city,
      district: res.content.district,
    };
  }
}

module.exports = IpService;
