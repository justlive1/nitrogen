import Calendar from '../../components/Calendar'

const state = {
  docks: [],
  frames: [],
  minDocks: [],
  messageNotices: [],
  notificationCenterVisible: false,
  framesOrder: 0,
  framesOffset: 5,
  preferenceVisiable: false,
  safari: {
    id: 'safari',
    active: false,
    isShow: true,
    url: '',
    title: 'safari',
    icon: 'images/safari.png',
    order: 0,
    leftOffset: 8,
    topOffset: 8
  },
  weather: void 0,
  currentDate: new Date()
};

// getters
const getters = {};

// actions
const actions = {
  addFrame({commit}, dframe) {
    commit('addFrame', dframe);
    commit('refreshFrame', dframe);
    commit('addDockDot', dframe.id);
  },
  addMessage({commit}, msg) {
    commit('addMessageNotice', msg);
    commit('sortMessageNotice');
  },
  closeFrame({commit}, item) {
    commit('closeFrame', item);
  },
  removeMessageById({commit}, id) {
    commit('removeMessageById', id);
    commit('sortMessageNotice');
  },
  removeMessageByDate({commit}, dateStr) {
    commit('removeMessageByDate', dateStr);
    commit('sortMessageNotice');
  }
};

// mutations
const mutations = {
  addDock: (state, dock) => {
    let ids = state.docks.map(item => item.id);
    if (ids.indexOf(dock.id) > -1) {
      return;
    }
    dock.isOpen = false;
    state.docks.push(dock);
  },
  addDockDot: (state, id) => {
    state.docks.find(function (it) {
      if (it.id === id) {
        it.isOpen = true;
        return true;
      }
      return false;
    });
  },
  addFrame: (state, dframe) => {
    let ids = state.frames.map(item => item.id);
    if (ids.indexOf(dframe.id) > -1) {
      return;
    }
    let order = state.framesOrder + 1;
    let offset = state.framesOffset;
    if (order >= 10) {
      order = 0;
      offset -= 1;
      if (offset < 0) {
        offset = 5;
      }
    }
    dframe.leftOffset = state.framesOffset + order;
    dframe.topOffset = state.framesOffset + order;
    dframe.order = 0;
    dframe.isShow = true;
    state.framesOrder = order;
    state.framesOffset = offset;
    state.frames.push(dframe);
  },
  addMinDock: (state, dock) => {
    let ids = state.minDocks.map(item => item.id);
    if (ids.indexOf(dock.id) > -1) {
      return;
    }
    state.frames.find(function (it) {
      if (it.id === dock.id) {
        it.isShow = false;
        return true;
      }
      return false;
    });
    state.minDocks.push(dock);
    if (dock.id === 'safari') {
      state.safari.isShow = false;
    }
  },
  addMessageNotice: (state, msg) => {
    let ids = state.messageNotices.map(item => item.id);
    if (ids.indexOf(msg.id) > -1) {
      return;
    }
    state.messageNotices.push(msg);
  },
  addWeather: (state, item) => {
    state.weather = item;
  },
  changeNotificationCenterVisible: (state, visible) => {
    state.notificationCenterVisible = visible;
  },
  closeFrame: (state, item) => {
    state.frames.find(function (it, idx) {
      if (it.id === item.id) {
        state.frames.splice(idx, 1);
        return true;
      }
      return false;
    });
    state.minDocks.find(function (it, idx) {
      if (it.id === item.id) {
        state.minDocks.splice(idx, 1);
        return true;
      }
      return false;
    });
    state.docks.find(function (it) {
      if (it.id === item.id) {
        it.isOpen = false;
        return true;
      }
      return false;
    });
    if (item.id === 'safari') {
      state.safari.active = false;
    }
  },
  openSafari: (state) => {
    state.safari.active = true;
    state.safari.isShow = true;
  },
  refreshFrame: (state, item) => {
    state.frames.forEach(function (it) {
      if (it.id === item.id) {
        it.order = 1;
      } else {
        it.order = 0;
      }
    });
    if (item.id === 'safari') {
      state.safari.order = 1;
    } else {
      state.safari.order = 0;
    }
  },
  refreshTime: (state) => {
    state.currentDate = new Date();
  },
  resetMinFrame: (state, id) => {
    state.frames.find(function (it) {
      if (it.id === id) {
        it.isShow = true;
        return true;
      }
      return false;
    });
    state.minDocks.find(function (it, idx) {
      if (it.id === id) {
        state.minDocks.splice(idx, 1);
        return true;
      }
      return false;
    });
    if (id === 'safari') {
      state.safari.isShow = true;
    }
  },
  removeMessageById: (state, id) => {
    state.messageNotices.find(function (item, idx) {
      if (item.id === id) {
        state.messageNotices.splice(idx, 1);
        return true;
      }
      return false;
    });
  },
  removeMessageByDate: (state, dateStr) => {
    let notices = [];
    state.messageNotices.forEach(function (item) {
      if (Calendar.dateOfYear(new Date(item.time)) !== dateStr) {
        notices.push(item);
      }
    });
    state.messageNotices = notices;
  },
  sortMessageNotice: (state) => {
    state.messageNotices.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    let dateMap = {};
    state.messageNotices.forEach(function (value) {
      let dateStr = Calendar.dateOfYear(new Date(value.time));
      if (dateMap[dateStr]) {
        value.showHeader = false;
      } else {
        dateMap[dateStr] = 1;
        value.showHeader = true;
      }
    });
  },
  togglePreference: (state) => {
    state.preferenceVisiable = !state.preferenceVisiable;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}