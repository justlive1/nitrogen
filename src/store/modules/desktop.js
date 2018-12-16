import Calendar from '../../components/Calendar'

const state = {
  docks: [],
  messageNotices: [],
  notificationCenterVisible: false
};

// getters
const getters = {};

// actions
const actions = {
  addMessage({commit}, msg) {
    commit('addMessageNotice', msg);
    commit('sortMessageNotice');
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
    state.docks.push(dock);
  },
  addMessageNotice: (state, msg) => {
    state.messageNotices.push(msg);
  },
  changeNotificationCenterVisible: (state, visible) => {
    state.notificationCenterVisible = visible;
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}