// 游戏事件数据
const events = [
  // 基础事件（无特殊条件）
  {
    id: 1,
    description: "大臣们建议增加赋税以充实国库，但这可能会引起民众不满。",
    choices: [
      {
        text: "同意增加赋税",
        effects: {
          player: { morality: -5 },
          nation: { treasury: 10, popularity: -10 }
        }
      },
      {
        text: "拒绝增加赋税",
        effects: {
          player: { morality: 5 },
          nation: { treasury: -5, popularity: 5 }
        }
      },
      {
        text: "只对富商增加赋税",
        effects: {
          player: { intelligence: 3 },
          nation: { treasury: 5, popularity: -3 }
        }
      }
    ]
  },
  {
    id: 2,
    description: "边境发生小规模冲突，将军请求增派兵力。",
    choices: [
      {
        text: "同意增派兵力",
        effects: {
          player: { health: -3 },
          nation: { military: 8, treasury: -8 }
        }
      },
      {
        text: "拒绝增派，寻求和平解决",
        effects: {
          player: { intelligence: 5, health: 2 },
          nation: { military: -5, popularity: 5 }
        }
      },
      {
        text: "亲自前往边境视察",
        effects: {
          player: { health: -10, charm: 10 },
          nation: { popularity: 10, military: 5 }
        }
      }
    ]
  },
  {
    id: 3,
    description: "一位美丽的宫女引起了你的注意。",
    choices: [
      {
        text: "封她为妃",
        effects: {
          player: { charm: 5, morality: -3 },
          nation: { popularity: -2 }
        }
      },
      {
        text: "保持距离，不予理会",
        effects: {
          player: { morality: 5, health: 2 },
          nation: {}
        }
      },
      {
        text: "秘密接近她",
        effects: {
          player: { health: -2, morality: -5 },
          nation: { popularity: -5 }
        }
      }
    ]
  },
  {
    id: 4,
    description: "朝中大臣之间发生了激烈争执，请你评判。",
    choices: [
      {
        text: "支持主战派",
        effects: {
          player: { intelligence: -2 },
          nation: { military: 5, treasury: -5 }
        }
      },
      {
        text: "支持主和派",
        effects: {
          player: { intelligence: 3 },
          nation: { popularity: 5, military: -3 }
        }
      },
      {
        text: "不偏不倚，要求双方和解",
        effects: {
          player: { charm: 5, intelligence: 5 },
          nation: { popularity: 2 }
        }
      }
    ]
  },
  {
    id: 5,
    description: "民间发生了饥荒，百姓们请求朝廷救济。",
    choices: [
      {
        text: "开仓放粮",
        effects: {
          player: { morality: 10 },
          nation: { treasury: -10, popularity: 15 }
        }
      },
      {
        text: "置之不理",
        effects: {
          player: { morality: -15 },
          nation: { popularity: -20 }
        }
      },
      {
        text: "适量救济，同时鼓励自救",
        effects: {
          player: { intelligence: 8, morality: 5 },
          nation: { treasury: -5, popularity: 8 }
        }
      }
    ]
  },
  
  // 需要特定条件的事件
  {
    id: 6,
    description: "一位才华横溢的谋士请求觐见，他声称有治国良策。",
    conditions: { "player.intelligence": 40 },
    choices: [
      {
        text: "任命他为谋士",
        effects: {
          player: { intelligence: 10 },
          nation: { treasury: 5, military: 5 }
        }
      },
      {
        text: "婉拒他的请求",
        effects: {
          player: {},
          nation: { popularity: -3 }
        }
      },
      {
        text: "考验他的才能",
        effects: {
          player: { intelligence: 5 },
          nation: { treasury: 3 }
        }
      }
    ]
  },
  {
    id: 7,
    description: "邻国派来使者，希望与我国建立友好关系。",
    conditions: { "nation.military": 60 },
    choices: [
      {
        text: "接受邀请，建立同盟",
        effects: {
          player: { charm: 5 },
          nation: { popularity: 5, military: 5 }
        }
      },
      {
        text: "拒绝邀请，保持警惕",
        effects: {
          player: { intelligence: 3 },
          nation: { military: 3, treasury: -3 }
        }
      },
      {
        text: "表面接受，暗中防备",
        effects: {
          player: { morality: -5, intelligence: 8 },
          nation: { military: 2, treasury: -2 }
        }
      }
    ]
  },
  {
    id: 8,
    description: "一位名医进献长生不老药，声称可延年益寿。",
    conditions: { "player.health": 30 },
    choices: [
      {
        text: "立即服用",
        effects: {
          player: { health: -10, intelligence: -5 },
          nation: { treasury: -5 }
        }
      },
      {
        text: "让侍卫先试药",
        effects: {
          player: { morality: -5, intelligence: 5 },
          nation: {}
        }
      },
      {
        text: "婉拒并赏赐",
        effects: {
          player: { charm: 5, morality: 5 },
          nation: { treasury: -3, popularity: 2 }
        }
      }
    ]
  },
  {
    id: 9,
    description: "民间出现了反对你统治的言论，大臣建议严厉镇压。",
    conditions: { "nation.popularity": 30 },
    choices: [
      {
        text: "下令镇压",
        effects: {
          player: { morality: -10 },
          nation: { popularity: -10, military: -5 }
        }
      },
      {
        text: "了解民意，改善政策",
        effects: {
          player: { intelligence: 10, charm: 5 },
          nation: { popularity: 15, treasury: -5 }
        }
      },
      {
        text: "无视这些言论",
        effects: {
          player: {},
          nation: { popularity: -5 }
        }
      }
    ]
  },
  {
    id: 10,
    description: "国库空虚，大臣们提出了多种增加收入的方法。",
    conditions: { "nation.treasury": 30 },
    choices: [
      {
        text: "增加赋税",
        effects: {
          player: { morality: -5 },
          nation: { treasury: 15, popularity: -15 }
        }
      },
      {
        text: "削减开支",
        effects: {
          player: { intelligence: 5 },
          nation: { treasury: 10, military: -5, popularity: -5 }
        }
      },
      {
        text: "发展商业",
        effects: {
          player: { intelligence: 10, charm: 5 },
          nation: { treasury: 8, popularity: 5 }
        }
      }
    ]
  },
  
  // 高级事件（需要较高属性）
  {
    id: 11,
    description: "一位外国使者带来了先进的技术，但要求高额的交换条件。",
    conditions: { "player.intelligence": 60, "nation.treasury": 60 },
    choices: [
      {
        text: "接受条件，获取技术",
        effects: {
          player: { intelligence: 15 },
          nation: { treasury: -20, military: 10 }
        }
      },
      {
        text: "拒绝条件，自主研发",
        effects: {
          player: { intelligence: 8, health: -5 },
          nation: { treasury: -10, military: 5 }
        }
      },
      {
        text: "派人偷学技术",
        effects: {
          player: { morality: -10, intelligence: 10 },
          nation: { treasury: -5, military: 8 }
        }
      }
    ]
  },
  {
    id: 12,
    description: "你发现皇宫中有人密谋造反。",
    conditions: { "player.intelligence": 70 },
    choices: [
      {
        text: "立即处决所有嫌疑人",
        effects: {
          player: { morality: -15, health: -5 },
          nation: { popularity: -10, military: -5 }
        }
      },
      {
        text: "秘密调查，找出主谋",
        effects: {
          player: { intelligence: 10, health: -8 },
          nation: { treasury: -5 }
        }
      },
      {
        text: "假装不知，设下陷阱",
        effects: {
          player: { intelligence: 15, morality: -5 },
          nation: { military: 5 }
        }
      }
    ]
  },
  {
    id: 13,
    description: "一场严重的瘟疫在国内爆发。",
    conditions: { "nation.popularity": 50 },
    choices: [
      {
        text: "隔离疫区，严控人口流动",
        effects: {
          player: { health: -5, morality: 5 },
          nation: { popularity: -10, treasury: -10 }
        }
      },
      {
        text: "投入大量资源研制解药",
        effects: {
          player: { intelligence: 10, health: -5 },
          nation: { treasury: -20, popularity: 15 }
        }
      },
      {
        text: "祈求神灵保佑",
        effects: {
          player: { morality: -5 },
          nation: { popularity: -15 }
        }
      }
    ]
  },
  {
    id: 14,
    description: "邻国突然宣战，大军压境。",
    conditions: { "nation.military": 40 },
    choices: [
      {
        text: "全力应战",
        effects: {
          player: { health: -15, intelligence: 10 },
          nation: { military: -15, treasury: -20, popularity: 10 }
        }
      },
      {
        text: "寻求和平，割地赔款",
        effects: {
          player: { morality: -10, charm: -10 },
          nation: { military: -5, treasury: -15, popularity: -15 }
        }
      },
      {
        text: "联合其他国家共同对抗",
        effects: {
          player: { charm: 15, intelligence: 10 },
          nation: { military: -10, treasury: -10, popularity: 5 }
        }
      }
    ]
  },
  {
    id: 15,
    description: "你已年过半百，大臣们开始讨论继承人问题。",
    conditions: { "player.age": 50 },
    choices: [
      {
        text: "立长子为太子",
        effects: {
          player: { health: 5, morality: 5 },
          nation: { popularity: 5 }
        }
      },
      {
        text: "选择最有才能的儿子",
        effects: {
          player: { intelligence: 10, health: -5 },
          nation: { popularity: 10, treasury: 5 }
        }
      },
      {
        text: "暂不决定，继续观察",
        effects: {
          player: { health: -10 },
          nation: { popularity: -5, military: -5 }
        }
      }
    ]
  }
];

export default events;