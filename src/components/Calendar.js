const shortWeeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const fullWeeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const heavenlyStems = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'];
const earthlyBranches = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午',
  '未'];
const i18n = ['初', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二',
  '廿', '卅'];
const dateMapping = [
  // 2018
  [
    216,
    [[101, 1115], [117, 1201]],
    [[201, 1216], [216, 101]],
    [[301, 114], [317, 201]],
    [[401, 216], [416, 301]],
    [[501, 316], [515, 401]],
    [[601, 418], [614, 501]],
    [[701, 518], [713, 601]],
    [[801, 620], [811, 701]],
    [[901, 722], [910, 801]],
    [[1001, 822], [1009, 901]],
    [[1101, 924], [1108, 1001]],
    [[1201, 1024], [1207, 1101]],
  ],
  // 2019
  [
    205,
    [[101, 1126], [106, 1201]],
    [[201, 1227], [205, 101]],
    [[301, 125], [307, 201]],
    [[401, 226], [405, 301]],
    [[501, 327], [505, 401]],
    [[601, 428], [603, 501]],
    [[701, 529], [703, 601]],
    [[801, 701], [830, 801]],
    [[901, 803], [929, 901]],
    [[1001, 903], [1028, 1001]],
    [[1101, 1005], [1126, 1101]],
    [[1201, 1106], [1226, 1201]]
  ]
];

export default {
  name: 'Calendar',
  functional: true,
  props: ['date'],

  dateOfYear: date => {
    if (!date) {
      date = new Date();
    }
    return (date.getMonth() + 1) + "月" + date.getDate() + "日";
  },

  weekOfDate: (date, full) => {
    if (!date) {
      date = new Date();
    }
    if (full) {
      return fullWeeks[date.getDay()]
    } else {
      return shortWeeks[date.getDay()]
    }
  },

  timeWithoutSecond: date => {
    if (!date) {
      date = new Date();
    }
    let value = date.getHours() + ":";
    let minutes = date.getMinutes();
    if (minutes < 10) {
      value += 0;
    }
    value += minutes;
    return value;
  },

  dateFormatMacOs: function (date) {
    if (!date) {
      date = new Date();
    }
    return [this.dateOfYear(date), this.weekOfDate(date),
      this.timeWithoutSecond(date)].join(" ");
  },

  lunarYear: date => {
    if (!date) {
      date = new Date();
    }
    let year = date.getFullYear();
    let offset = (date.getMonth() + 1) * 100 + date.getDate();
    if (offset < dateMapping[year - 2018][0]) {
      year--;
    }
    return heavenlyStems[year % heavenlyStems.length] + earthlyBranches[year
    % earthlyBranches.length] + '年';
  },

  lunarDateI18n: function (data) {
    let month = ~~(data / 100);
    let lunarMonth = i18n[month] + '月';
    if (month === 1) {
      lunarMonth = '正月';
    }
    let day = data % 100;
    let lunarDay = '';
    if (day === 20) {
      lunarDay = '二十';
    } else if (day === 30) {
      lunarDay = '三十';
    } else if (day < 11) {
      lunarDay = i18n[0] + i18n[day];
    } else if (day < 20) {
      lunarDay = i18n[10] + i18n[day - 10];
    } else if (day < 30) {
      lunarDay = i18n[13] + i18n[day - 20];
    } else {
      lunarDay = i18n[14] + i18n[day - 30]
    }
    return lunarMonth + lunarDay;
  },

  lunarDate: function (date) {
    if (!date) {
      date = new Date();
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateData = dateMapping[year - 2018][month];
    let offset = month * 100 + day;
    if (offset < dateData[1][0]) {
      return this.lunarYear(date) + this.lunarDateI18n(dateData[0][1] + day - 1)
    } else {
      return this.lunarYear(date) + this.lunarDateI18n(
          dateData[1][1] + day - (dateData[1][0] % 100))
    }
  },

  dayAgo: function (time) {
    let date = new Date(time);
    let now = new Date();
    let offset = ~~((now.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    // >3天 返回日期
    if (offset > 3) {
      let result = '';
      if (now.getFullYear() > date.getFullYear()) {
        result += date.getFullYear() + '年';
      }
      result += (date.getMonth() + 1) + '月' + date.getDate() + '日'
      return result;
    } else if (offset > 0) {
      return offset + '天前';
    } else {
      return '今天';
    }
  },

  timeAgo: function (time) {
    let date = new Date(time);
    let now = new Date();
    let text = '';
    if (now.getDate() - date.getDate() === 1) {
      text += '昨天 ';
    }

    let stamp = now.getTime() - date.getTime();
    if (stamp < 1000 * 60) {
      return '刚刚';
    } else if (stamp < 1000 * 60 * 60) {
      return ((stamp / 1000 / 60) | 0) + '分钟前';
    } else if (stamp < 1000 * 60 * 60 * 2) {
      return ((stamp / 1000 / 60 / 60) | 0) + '小时前';
    } else {
      let hour = date.getHours(), mins = date.getMinutes();
      if (hour < 13) {
        text += '上午' + hour + ':' + mins;
      } else {
        text += '下午' + (hour - 12) + ":" + mins;
      }
    }
    return text;
  }

}
