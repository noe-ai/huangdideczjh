<template>
  <div class="emperor-game">
    <div class="game-header">
      <h1>皇帝的成长计划</h1>
    </div>
    
    <div v-if="!$store.state.gameState.isGameOver" class="game-content">
      <!-- 玩家信息面板 -->
      <div class="player-stats">
        <h2>皇帝信息</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">年龄:</span>
            <span class="stat-value">{{ $store.state.player.age }}岁</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">在位年数:</span>
            <span class="stat-value">{{ $store.state.player.year }}年</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">体力:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.player.health + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.player.health }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">智力:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.player.intelligence + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.player.intelligence }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">魅力:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.player.charm + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.player.charm }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">道德:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.player.morality + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.player.morality }}</span>
          </div>
        </div>
      </div>
      
      <!-- 国家信息面板 -->
      <div class="nation-stats">
        <h2>国家状态</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">民心:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.nation.popularity + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.nation.popularity }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">国库:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.nation.treasury + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.nation.treasury }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">军力:</span>
            <div class="progress-bar">
              <div class="progress" :style="{width: $store.state.nation.military + '%'}"></div>
            </div>
            <span class="stat-value">{{ $store.state.nation.military }}</span>
          </div>
        </div>
      </div>
      
      <!-- 事件面板 -->
      <div v-if="$store.state.gameState.currentEvent" class="event-panel">
        <h2>当前事件</h2>
        <div class="event-content">
          <p>{{ $store.state.gameState.currentEvent.description }}</p>
        </div>
        <div class="event-choices">
          <button 
            v-for="(choice, index) in $store.state.gameState.currentEvent.choices" 
            :key="index"
            @click="makeChoice(choice)"
            class="choice-button"
          >
            {{ choice.text }}
          </button>
        </div>
      </div>
      
      <!-- 开始游戏按钮 -->
      <div v-if="!$store.state.gameState.currentEvent" class="start-game">
        <button @click="startGame" class="start-button">开始新游戏</button>
      </div>
    </div>
    
    <!-- 游戏结束面板 -->
    <div v-else class="game-over">
      <h2>游戏结束</h2>
      <p class="ending-message">{{ $store.state.gameState.endingMessage }}</p>
      <button @click="startGame" class="restart-button">重新开始</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.commit('initializePlayer');
  },
  methods: {
    startGame() {
      this.$store.dispatch('startNewGame');
      this.$store.dispatch('generateRandomEvent');
    },
    makeChoice(choice) {
      this.$store.dispatch('handleChoice', { choice });
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

body {
  background-color: #f5f5f5;
  color: #333;
}

.emperor-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 100vh;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.game-header h1 {
  color: #c9302c;
  font-size: 2.5em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.game-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.player-stats, .nation-stats {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-label {
  font-weight: bold;
  color: #555;
}

.progress-bar {
  height: 15px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  flex-grow: 1;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.event-panel {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.event-content {
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 1.1em;
}

.event-choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-button {
  padding: 12px 15px;
  background-color: #4a76a8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  text-align: left;
  transition: background-color 0.2s;
}

.choice-button:hover {
  background-color: #3a5a78;
}

.start-game, .game-over {
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.start-button, .restart-button {
  padding: 15px 30px;
  background-color: #c9302c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.2s;
}

.start-button:hover, .restart-button:hover {
  background-color: #a82824;
}

.ending-message {
  margin: 20px 0;
  font-size: 1.2em;
  line-height: 1.6;
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .emperor-game {
    padding: 10px;
  }
}
</style>