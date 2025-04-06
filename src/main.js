import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

// 创建Vuex存储
const store = createStore({
  state() {
    return {
      // 玩家属性
      player: {
        age: 18, // 初始年龄
        year: 1, // 在位年数
        health: 0, // 体力
        intelligence: 0, // 智力
        charm: 0, // 魅力
        morality: 0, // 道德
      },
      // 国家状态
      nation: {
        popularity: 50, // 民心
        treasury: 50, // 国库
        military: 50, // 军力
      },
      // 游戏状态
      gameState: {
        isGameOver: false,
        currentEvent: null,
        eventHistory: [],
        endingMessage: '',
      }
    }
  },
  mutations: {
    // 初始化玩家属性（随机生成）
    initializePlayer(state) {
      state.player.health = Math.floor(Math.random() * 50) + 30; // 30-80范围
      state.player.intelligence = Math.floor(Math.random() * 50) + 30;
      state.player.charm = Math.floor(Math.random() * 50) + 30;
      state.player.morality = Math.floor(Math.random() * 50) + 30;
    },
    // 更新玩家属性
    updatePlayerStats(state, payload) {
      for (const [key, value] of Object.entries(payload)) {
        if (state.player[key] !== undefined) {
          state.player[key] += value;
          // 确保属性值在0-100之间
          state.player[key] = Math.max(0, Math.min(100, state.player[key]));
        }
      }
    },
    // 更新国家状态
    updateNationStats(state, payload) {
      for (const [key, value] of Object.entries(payload)) {
        if (state.nation[key] !== undefined) {
          state.nation[key] += value;
          // 确保属性值在0-100之间
          state.nation[key] = Math.max(0, Math.min(100, state.nation[key]));
        }
      }
    },
    // 设置当前事件
    setCurrentEvent(state, event) {
      state.gameState.currentEvent = event;
    },
    // 添加事件到历史记录
    addEventToHistory(state, event) {
      state.gameState.eventHistory.push(event);
    },
    // 增加年龄和在位年数
    increaseAge(state) {
      state.player.age++;
      state.player.year++;
    },
    // 游戏结束
    gameOver(state, message) {
      state.gameState.isGameOver = true;
      state.gameState.endingMessage = message;
    },
    // 重置游戏
    resetGame(state) {
      state.player.age = 18;
      state.player.year = 1;
      state.nation.popularity = 50;
      state.nation.treasury = 50;
      state.nation.military = 50;
      state.gameState.isGameOver = false;
      state.gameState.currentEvent = null;
      state.gameState.eventHistory = [];
      state.gameState.endingMessage = '';
      // 重新随机初始化玩家属性
      this.commit('initializePlayer');
    }
  },
  actions: {
    // 开始新游戏
    startNewGame({ commit }) {
      commit('resetGame');
      commit('initializePlayer');
    },
    // 处理玩家选择
    handleChoice({ commit, state }, { choice }) {
      // 应用选择的效果
      if (choice.effects.player) {
        commit('updatePlayerStats', choice.effects.player);
      }
      if (choice.effects.nation) {
        commit('updateNationStats', choice.effects.nation);
      }
      
      // 增加年龄
      commit('increaseAge');
      
      // 添加事件到历史
      commit('addEventToHistory', {
        ...state.gameState.currentEvent,
        choiceMade: choice
      });
      
      // 检查游戏是否结束
      this.dispatch('checkGameOver');
      
      // 如果游戏未结束，生成新事件
      if (!state.gameState.isGameOver) {
        this.dispatch('generateRandomEvent');
      }
    },
    // 生成随机事件
    generateRandomEvent({ commit, state }) {
      import('./data/events.js').then(module => {
        const events = module.default;
        // 根据当前状态筛选适用的事件
        const applicableEvents = events.filter(event => {
          // 检查事件的条件是否满足
          if (!event.conditions) return true;
          
          for (const [key, condition] of Object.entries(event.conditions)) {
            const [stat, value] = key.split('.');
            if (stat === 'player') {
              if (state.player[value] < condition) return false;
            } else if (stat === 'nation') {
              if (state.nation[value] < condition) return false;
            }
          }
          return true;
        });
        
        // 随机选择一个事件
        const randomEvent = applicableEvents[Math.floor(Math.random() * applicableEvents.length)];
        commit('setCurrentEvent', randomEvent);
      });
    },
    // 检查游戏是否结束
    checkGameOver({ commit, state }) {
      // 检查属性是否为0
      if (state.player.health <= 0) {
        commit('gameOver', '你的体力耗尽，驾崩了！');
        return;
      }
      
      // 检查国家状态是否为0
      if (state.nation.popularity <= 0) {
        commit('gameOver', '民心尽失，你被推翻了！');
        return;
      }
      if (state.nation.treasury <= 0) {
        commit('gameOver', '国库空虚，国家破产了！');
        return;
      }
      if (state.nation.military <= 0) {
        commit('gameOver', '军力衰竭，国家被入侵了！');
        return;
      }
      
      // 检查年龄是否达到上限
      if (state.player.age >= 80) {
        // 根据最终状态计算结局
        const totalStats = state.player.health + state.player.intelligence + 
                          state.player.charm + state.player.morality + 
                          state.nation.popularity + state.nation.treasury + 
                          state.nation.military;
        
        let ending = '';
        if (totalStats >= 500) {
          ending = '你是一位伟大的皇帝，将被后世永远铭记！';
        } else if (totalStats >= 350) {
          ending = '你是一位贤明的君主，治下国泰民安。';
        } else if (totalStats >= 250) {
          ending = '你是一位平庸的统治者，没有特别的功过。';
        } else {
          ending = '你是一位昏庸的君主，你的统治将成为历史的警示。';
        }
        
        commit('gameOver', `你寿终正寝，享年${state.player.age}岁，在位${state.player.year}年。${ending}`);
      }
    }
  }
});

const app = createApp(App);
app.use(store);
app.mount('#app');