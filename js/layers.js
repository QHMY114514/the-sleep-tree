addLayer("a", {
    name: "进度",
    symbol: "🥇​",
    resource: "进度",
    color: "#AA7BF2",
    row: "side",
    tooltip: "",
    position: 0,
    layerShown() { return true },
    infoboxes: {
        introBox: {
            title: "进度",
            body() {
                return `
                这里是你所达成的所有进度<br>
                也许有一些隐藏的特殊成就在等你发现?<br>
                成就前缀说明:<br>
                [隐藏]正常游戏流程中不一定会解锁的成就<br>
                [限定]有一定条件,当条件不满足则永久无法获取的成就,完成后会给予奖励<br>
                [时间]由游玩时间获得的成就<br>
                [小游戏]由小游戏获得的成就
                ` },
        },
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "虚假的梦境<br>真实的我",
            tooltip: "现在就去睡觉还来得及<br>获得第一个思维",
            done() { return player.m.points.gte(_D1) }
        },
        12: {
            name: "真实的梦境<br>虚假的我",
            tooltip: "醒来,但不是在现实里<br>游戏时间达到06:00:00",
            done() { return hasMilestone("m", 0) && player.gameTime.gte(_D(21600)) }
        },
        13: {
            name: "在那以前<br>要多想",
            tooltip: '"想了以后呢?"<br>这一次我变回孩子了',
            done() { return hasUpgrade("m", 12) }
        },
        14: {
            name: "我买了<br>一只手表",
            tooltip: '你终于能够看到时间了<br>',
            done() { return hasUpgrade("m", 13) }
        },
        15: {
            name: "该吃午饭了<br>今天吃鸡架",
            tooltip: "如果没有在获得第一个成就前获得这个成就,一个隐藏成就将永远无法获得",
            done() { return player.gameTime.gte(_D(43200)) }
        },
        16: {
            name: "别睡了<br>起来重睡",
            tooltip: "游戏时间达到一天3:00:00",
            done() { return player.gameTime.gte(_D(97200)) }
        },
        21: {
            name: "正弦波发生器",
            tooltip: "拥有变量Mv1",
            done() { return hasMilestone("m", 2) }
        },
        //特殊成就
        1001: {
            name: "🦊 Fox Style",
            tooltip: "[隐藏]使用狐狸主题",
            done() { return options.theme == "fox" },
            unlocked() { return hasAchievement("a", 1001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
        },
        1002: {
            name: "🤥 Never Gonna Give You Up",
            tooltip: "[隐藏]你被骗了!",
            done() { return player.nevergonnagiveyouup },
            unlocked() { return hasAchievement("a", 1002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
        },
        1003: {
            name: "🔗 请15分钟后再登录",
            tooltip: "[隐藏]喵~喵~<br>咕噜咕噜~",
            done() { return options.badWeb },
            unlocked() { return hasAchievement("a", 1003) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
        },
        1004: {
            name: "❌ 诡谲的设计",
            tooltip: "[隐藏]发现醒着时梦境获取大于睡着时梦境获取,如果你为了这个找我反馈,它是设计的一部分",
            done() { return getPointGen().gt(sleepGain()) },
            unlocked() { return hasAchievement("a", 1004) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
        },
        1005: {
            name: "👑 双冠王",
            tooltip: "[隐藏]通关2次等价交换",
            done() { return player.P.Clear >= 2 },
            unlocked() { return hasAchievement("a", 1005) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#FFD700"
            },
        },
        2001: {
            name: "😪 完全睡过头",
            tooltip: "[限定]一觉睡了12小时<br>为了补偿你的挂机,时间流速×1.1",
            done() { return !hasAchievement("a", 11) && hasAchievement("a", 15) },
            unlocked() { return hasAchievement("a", 2001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
        },
        2002: {
            name: "🔴 等价交换大师",
            tooltip: "[限定]你没有听我说的去睡觉,而是在玩等价交换小游戏<br>为你的健康着想,时间流速×1.1",
            done() { return !hasAchievement("a", 11) && hasAchievement("a", 4024) },
            unlocked() { return hasAchievement("a", 2002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
        },
        3001: {
            name: "⌛ 我想跳过",
            tooltip: "[时间]游戏时间达到8小时",
            done() { return player.timePlayed > 28800 },
            unlocked() { return hasAchievement("a", 3001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#0e776d"
            },
        },
        4001: {
            name: "等价交换",
            tooltip: "[小游戏]解锁等价交换<br>你明明知道这里只能等,为什么还愿意等5分钟?",
            done() { return player.gameTime.gte(_D(300)) },
            unlocked() { return hasAchievement("a", 4001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4002: {
            name: "等价交换恶心",
            tooltip: "[小游戏]安装等价交换EX,解锁你所需的下一步!",
            done() { return hasUpgrade("p", 13) },
            unlocked() { return hasAchievement("a", 4002) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4003: {
            name: "它变快了",
            tooltip: "[小游戏]在能量收集器附近使用EMC",
            done() { return hasUpgrade("p", 14) },
            unlocked() { return hasAchievement("a", 4003) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4004: {
            name: "合成器合成合成器",
            tooltip: "[小游戏]用收集收集器的收集器可以收集收集器",
            done() { return hasUpgrade("p", 21) },
            unlocked() { return hasAchievement("a", 4004) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4005: {
            name: "终极收集器",
            tooltip: "[小游戏]获得能量收集器MK16",
            done() { return getBuyableAmount("p", 11).gte(_D(16)) },
            unlocked() { return hasAchievement("a", 4005) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4006: {
            name: "等价交换更恶心",
            tooltip: "[小游戏]安装等价交换EX+,正式开始你的下一步!",
            done() { return hasUpgrade("p", 23) },
            unlocked() { return hasAchievement("a", 4006) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4011: {
            name: "它要变慢了",
            tooltip: "[小游戏]同样的把戏再玩一次就不好玩了",
            done() { return hasUpgrade("p", 24) },
            unlocked() { return hasAchievement("a", 4011) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4012: {
            name: "它根本没变慢!",
            tooltip: "[小游戏]达到1e35EMC",
            done() { return player.p.points.gte(_D("1e35")) },
            unlocked() { return hasAchievement("a", 4012) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4013: {
            name: "加速器不加速加速器",
            tooltip: "[小游戏]一切都好可怕...",
            done() { return hasUpgrade("p", 31) },
            unlocked() { return hasAchievement("a", 4013) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4014: {
            name: "两倍于一",
            tooltip: "[小游戏]时间加速为双倍",
            done() { return player.P.TS.gte(_D2) },
            unlocked() { return hasAchievement("a", 4014) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4015: {
            name: "我们正在膨胀",
            tooltip: "[小游戏]您的收集器将被升级多次,请坐和放宽",
            done() { return hasUpgrade("p", 34) },
            unlocked() { return hasAchievement("a", 4015) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4016: {
            name: "古戈尔EMC",
            tooltip: "[小游戏]达到1e100EMC",
            done() { return player.p.points.gte(_D("1e100")) },
            unlocked() { return hasAchievement("a", 4016) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4021: {
            name: "收集收集器收集器",
            tooltip: "[小游戏]获得能量收集器收集器LK100",
            done() { return getBuyableAmount("p", 11).gte(_D(100)) },
            unlocked() { return hasAchievement("a", 4021) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4022: {
            name: "顶点",
            tooltip: "[小游戏]...",
            done() { return player.p.points.gte(_D("1e135")) },
            unlocked() { return hasAchievement("a", 4022) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4023: {
            name: "刚刚发生了什么???",
            tooltip: "[小游戏]达到1e300EMC",
            done() { return player.p.points.gte(_D("1e300")) },
            unlocked() { return hasAchievement("a", 4023) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4024: {
            name: "无限燃料",
            tooltip: "[小游戏]获得1无限燃料",
            done() { return player.P.Inf.gte(_D1) },
            unlocked() { return hasAchievement("a", 4024) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4025: {
            name: "等价交换无穷",
            tooltip: "[小游戏]安装最后的等价交换,即将见证,太初有为",
            done() { return hasUpgrade("p", 44) },
            unlocked() { return hasAchievement("a", 4025) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4026: {
            name: "是达嘿不是大黑",
            tooltip: "[小游戏]斯哈斯哈我的达嘿~",
            done() { return hasUpgrade("p", 46) },
            unlocked() { return hasAchievement("a", 4026) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4031: {
            name: "结束了",
            tooltip: "[小游戏]完全通关等价交换",
            done() { return hasUpgrade("p", 51) },
            unlocked() { return hasAchievement("a", 4031) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
        4032: {
            name: "下一世代",
            tooltip: "[小游戏]开启新一轮等价交换",
            done() { return player.P.Clear >= 1 },
            unlocked() { return hasAchievement("a", 4032) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#b8306d"
            },
        },
    },
    startData() {
        return {
            unlocked: true,
            points: _D0
        }
    },
    tabFormat: [
        ["infobox", "introBox"],
        "blank",
        "achievements"
    ],
})

// Mind
addLayer("m", {
    name: "思维",
    symbol: "🧠",
    resource: "思维",
    row: 0,
    position: 0,
    color: "#D89536",
    startData() {
        return {
            unlocked: false,
            points: _D0
        }
    },
    type: "static",
    baseResource: "梦境",
    baseAmount() {
        return player.points
    },
    requires: function () {
        return !hasMilestone("m", 0) ? _D50 :
            _D(35)
                .div(hasUpgrade("m", 21) ? upgradeEffect("m", 21)[0] : _D1)
    },
    exponent: function () {
        return _D(1)
    },
    base: function () {
        return _D2
            .sub(hasUpgrade("m", 21) ? upgradeEffect("m", 21)[1] : _D0)
    },
    roundUpCost: false,
    canBuyMax() {
        return hasUpgrade("m", 21)
    },
    tabFormat: [
        "main-display",
        "blank",
        "prestige-button",
        "resource-display",
        ["display-text", function () {
            return hasMilestone("m", 2) ?
                `Mv1 = <h3 class="overlayThing" id="points">${format(player.M.Mv[1])}</h3>` :
                ""
        }],
        "blank",
        ["clickable", 11],
        "blank",
        "upgrades",
        "milestones",
    ],
    clickables: {
        11: {
            title: "时间加速",
            display() { return `<h3>将时间加速 ${format(clickableEffect("m", 11)[0])} 倍<br>但梦境获取速度变为 1/${format(divNum(clickableEffect("m", 11)[1]))} 倍<br>目前状态 : ${Boolean(getClickableState("m", 11)) ? "开" : "关"}</h3>` },
            style: {
                width: "240px",
                height: "60px",
                backgroundColor: "#D89536",
                border: "4px solid",
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.125)",
            },
            canClick() {
                return hasUpgrade("m", 15)
            },
            unlocked() {
                return hasUpgrade("m", 15)
            },
            onClick() {
                setClickableState("m", 11, !Boolean(getClickableState("m", 11)))
            },
            effect() {
                return [
                    (hasUpgrade("m", 15) ? upgradeEffect("m", 15) : _D1)
                    ,
                    (hasUpgrade("m", 15) ? upgradeEffect("m", 15).pow(_D2.neg()) : _D1)
                ]
            }
        }
    },
    upgrades: {
        11: {
            title: "时间洪流怀表<br>[永不重置]",
            description: "台座效果:基础时间流速变为60倍",
            effect: function () {
                return _D60
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 11))}`
            },
            tooltip: "等价交换平衡破坏者<br>但在这里只是刚刚开始",
            cost: _D1,
        },
        12: {
            title: "重新思索",
            description: "使用我寻思之力,思维以降低倍率增加梦境获取",
            effect: function () {
                return _D1
                    .add(
                        _D1.add(player[this.layer].points).log2()
                    )
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 12))}`
            },
            tooltip: "要多想",
            cost: _D1,
            unlocked() {
                return hasUpgrade("m", 11)
            }
        },
        13: {
            title: "洞察真实",
            description: "显示当前游戏时间<br>并将时间流速×1.01",
            effect: function () {
                return _D(1.01)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 13))}`
            },
            tooltip: "",
            cost: _D2,
            unlocked() {
                return hasUpgrade("m", 12)
            }
        },
        14: {
            title: "幻想沉溺",
            description: "醒着时获得睡眠时获取量^0.5的梦境<br>并开启这个机制",
            effect: function () {
                return divNum(_D2)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("m", 14))}`
            },
            tooltip: "",
            cost: _D3,
            unlocked() {
                return hasUpgrade("m", 13)
            }
        },
        15: {
            title: "天堂制造",
            description: "解锁一个选项<br>你可以加速时间至5倍<br>但代价是期间点数获取变为其平方倒数倍",
            effect: function () {
                return _D5
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 15))}`
            },
            tooltip: "",
            cost: _D1,
            unlocked() {
                return hasUpgrade("m", 14)
            }
        },
        21: {
            title: "无限天堂",
            description: "是时候打破僵局了,大幅降低思维获取成本,且能一次汲取多个思维",
            effect: function () {
                return [
                    _D2
                    ,
                    divNum(_D2)
                ]
            },
            effectDisplay: function () {
                return `<br>/${format(upgradeEffect("m", 21)[0])}<br>-^${format(upgradeEffect("m", 21)[1])}`
            },
            tooltip: "",
            cost: _D3,
            unlocked() {
                return hasUpgrade("m", 14)
            }
        },
        22: {
            title: "",
            description: "",
            effect: function () {
                return _D1
            },
            effectDisplay: function () {
                return ``
            },
            tooltip: "",
            cost: _D3,
            unlocked() {
                return hasUpgrade("m", 14)
            }
        },
    },
    milestones: {
        0: {
            requirementDescription: "1灵感 | 一觉醒来我一觉醒来,而我不变 [永不重置]",
            effectDescription: '回家吧,孩子,回家吧,躺在床上做一个春秋大梦,猪怎么过你就怎么过<br>略微降低汲取思维所需梦境,你每日的睡眠时间限制为6小时,也就是每天的0:00~6:00<br>非睡眠时间你是不会做梦的,也许生活方式的改变可以增加你的睡眠时间...',
            done() { return player[this.layer].points.gte(_D1) }
        },
        1: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',0)", "v", "randomString(v.length)", `"2灵感 | 敌人比我们想象中的要弱,吗?"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    `"你也许也意识到了这件事,旅船是掩盖未来的虚像,后面忘了"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    "`由于你被梗侵蚀过多,你睡觉时脑子里充斥着各种奇异的内容`"
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    `"解锁一系列新的新闻,且点击新闻栏可将游戏速度+棍母倍"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D2) }
        },
        2: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)", `"3灵感 | Are You Lost?"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)",
                    `"梦核是一种超现实主义美学,以媒体为介质,描绘与梦境有关的情景"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)",
                    "`恍惚之间,你进入了奇异的${randomString(4)},有人在看着你...你由不可名状处汲取力量`"
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)",
                    `"受此影响,你的梦境获取乘以一个新的变量Mv1"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D3) }
        },
        3: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',2)", "v", "randomString(v.length)", `"100灵感 | 和我一起做梦,好么"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)",
                    `"解锁一个思维挑战"`
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)",
                    "`你将会在挑战中得到你想知道的答案`"
                )}
                    <br>
                    ${ifElseVirable("hasMilestone('m',3)", "v", "randomString(v.length)",
                    `"——Napper Rinator"`
                )}
                    `
            },
            done() { return player[this.layer].points.gte(_D100) }
        },
    },
    onPrestige(gain) {
        player.gameTime = _D0
    },
    doReset(resettingLayer) {
        if (resettingLayer == "m") {

        } else {
            layerDataReset("m");

            player.m.upgrades.push(11);
            player.m.milestones.push(0);
        }
    },
    layerShown() { return true },
});


// 小游戏
addLayer("p", {
    name: "等价交换",
    symbol: "🔴​",
    resource: "EMC",
    color: "#b8306d",
    row: "side",
    tooltip: "",
    position: 1,
    layerShown() { return hasAchievement("a", 4001) },
    infoboxes: {
        introBox1: {
            title: "等价交换",
            body() { return "这是一个小游戏,你也许知道等价交换中有一种叫做能量收集器的方块,它们可以产生EMC,而EMC可以购买能量收集器<br>很难不把这个写成游戏对吧?<br>尽管如此,这只是一个小游戏,而不会对原游戏流程产生任何影响<br>如果收集器和升级的价格差不多,你也许就该思考一下先买哪个~<br>放心,你有充足的时间(指时间墙)<br>而且它将不会有新层级,所以这可能是无聊的" },
        },
        introBox2: {
            title: "后日谈(不是日后谈)",
            body() { return "等价交换小游戏到这里就基本结束了<br>感谢你的游玩<br>后面的内容没做平衡,爽就行了" },
        },
    },
    startData() {
        return {
            unlocked: true,
            points: _D(0)
        }
    },
    tabFormat: {
        "EMC": {
            content: [
                ["infobox", "introBox1"],
                ["display-text", "按P购买最大机器"],
                "main-normal-display",
                ["display-text", function () {
                    return `(${format(layers.p.getEMCGen())}/秒)`
                }],
                ["display-text", function () {
                    return hasUpgrade("p", 36) ? `你有 <h2 class="overlayThing" id="super-points">${format(player.P.Inf)}</h2> 无限燃料` : ""
                }],
                ["display-text", function () {
                    return hasUpgrade("p", 36) ? `(${formatSmall(layers.p.getInfGen())}/秒)` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 12).neq(_D0) ? `你有 <h3 class="overlayThing" id="points">${format(player.P.Mk)}</h3> 收集器MK` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 12).neq(_D0) ? `(${formatSmall(layers.p.getMKGen())}/秒)` : ""
                }],
                ["display-text", function () {
                    return layers.p.getSpeed().neq(_D1) ? `时间以 <h3 class="overlayThing" id="points">x${format(layers.p.getSpeed())}</h3> 倍的速度流逝` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 13).neq(_D0) ? `(${formatSmall(layers.p.getTimeGen()
                        .mul(hasUpgrade("p", 15) ? upgradeEffect("p", 15) : _D1)
                        .mul(hasUpgrade("p", 35) ? upgradeEffect("p", 35) : _D1)
                        .mul(hasUpgrade("p", 41) ? upgradeEffect("p", 41) : _D1))}/秒)` : ""
                }],
                "blank",
                "buyables",
                "blank",
                ["clickable", 11],
                "blank",
                ["upgrades", [1, 2, 3]],
            ]
        },
        "INF.": {
            content: [
                ["infobox", "introBox2"],
                "main-normal-display",
                ["display-text", function () {
                    return player.P.Inf.neq(_D1) ? `你有 <h2 class="overlayThing" id="super-points">${format(player.P.Inf)}</h2> 无限燃料` : ""
                }],
                ["display-text", function () {
                    return getBuyableAmount("p", 12).neq(_D0) ? `(${formatSmall(layers.p.getInfGen())}/秒)` : ""
                }],
                "blank",
                "buyables",
                "blank",
                ["clickable", 11],
                "blank",
                ["upgrades", [4, 5]],
                ["clickable", 12],
                "blank",
            ],
            unlocked() {
                return hasUpgrade("p", 36)
            }
        }
    },
    update(diff) {
        player.P.TS = player.P.TS
            .add(layers.p.getTimeGen().mul(diff))

        player.P.Mk = player.P.Mk
            .add(layers.p.getMKGen().mul(diff))

        player[this.layer].points = player[this.layer].points
            .add(layers.p.getEMCGen().mul(diff))

        const trans = Boolean(getClickableState("p", 11)) ? Decimal.min(_D1.sub(_D(0.9).pow(diff)), _D(0.9)) : _D0 // EMC转化量

        player.P.Inf = player.P.Inf
            .add(
                player[this.layer].points
                    .mul(trans)
                    .div(_DInf)
            )

        player[this.layer].points = Decimal.max(
            _D1,
            player[this.layer].points
                .mul(_D1.sub(trans))
        )
    },
    getSpeed() {
        return player.P.TS
            .mul(hasUpgrade("p", 15) ? upgradeEffect("p", 15) : _D1)
            .mul(hasUpgrade("p", 35) ? upgradeEffect("p", 35) : _D1)
            .mul(hasUpgrade("p", 41) ? upgradeEffect("p", 41) : _D1)
    },
    getEMCGen() {
        return buyableEffect("p", 11)
            .mul(layers.p.getSpeed())
            .mul(player.P.Mk)
    },
    getMKGen() {
        return buyableEffect("p", 12)
            .mul(layers.p.getSpeed())
    },
    getTimeGen() {
        return buyableEffect("p", 13)
    },
    getInfGen() {
        return upgradeEffect("p", 36)
            .div(_DInf)
            .mul(Boolean(getClickableState("p", 11)) ? _D1 : _D0)
    },
    buyables: {
        11: {
            title: function () {
                return `能量收集器<br>MK${getBuyableAmount("p", 11)}`
            },
            display() {
                return `
                    <h3>获得 ${format(buyableEffect("p", 11))} EMC/秒</h3><br><br><h3>开销: ${format(this.cost())} EMC<h3>
                `
            },
            cost() {
                let amount = getBuyableAmount("p", 11)
                if (amount.eq(_D0)) return _D0
                else return _D(300).mul((
                    _D4
                        .add(
                            Decimal.max(amount, _D(500))
                                .sub(_D(500))
                                .div(_D(35))
                        )
                ).pow(amount))
                    .div(hasUpgrade("p", 42) ? upgradeEffect("p", 42) : _D1)
            },
            effect(x) {
                return (_D(1.5)
                    .add(hasUpgrade("p", 14) ? upgradeEffect("p", 14) : _D0)
                    .add(hasUpgrade("p", 24) ? upgradeEffect("p", 24) : _D0)
                    .add(hasUpgrade("p", 34) ? upgradeEffect("p", 34) : _D0)
                )
                    .pow(x).sub(_D1)
                    .mul(hasUpgrade("p", 11) ? upgradeEffect("p", 11) : _D1)
                    .mul(hasUpgrade("p", 12) ? upgradeEffect("p", 12) : _D1)
                    .mul(hasUpgrade("p", 16) ? upgradeEffect("p", 16) : _D1)
                    .mul(hasUpgrade("p", 26) ? upgradeEffect("p", 26) : _D1)
                    .mul(hasUpgrade("p", 43) ? upgradeEffect("p", 43) : _D1)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                if (getBuyableAmount("p", 11).gte(this.purchaseLimit())) return;
                player[this.layer].points = (player[this.layer].points).sub(this.cost())
                addBuyables("p", 11, _D1)
            },
            purchaseLimit: function () {
                if (hasUpgrade("p", 44)) {
                    return Decimal.dInf
                } else if (hasUpgrade("p", 23)) {
                    return _D(500)
                } else if (hasUpgrade("p", 23)) {
                    return _D(100)
                } else if (hasUpgrade("p", 13)) {
                    return _D(16)
                }

                return _D3
            }
        },
        12: {
            title: function () {
                return `能量收集器收集器<br>LK${getBuyableAmount("p", 12)}`
            },
            display() {
                return `
                    <h3>获得 ${format(buyableEffect("p", 12))} 收集器/秒</h3><br><br><h3>开销: ${format(this.cost())} EMC<h3>
                `
            },
            unlocked() {
                return hasUpgrade("p", 21)
            },
            cost() {
                let amount = getBuyableAmount("p", 12)
                if (amount.eq(_D0)) return _D0
                else return _D(1.25e9).mul((
                    _D8
                        .add(
                            Decimal.max(amount, _D100)
                                .sub(_D100)
                                .div(_D(24))
                        )
                ).pow(amount))
                    .div(hasUpgrade("p", 42) ? upgradeEffect("p", 42) : _D1)
            },
            effect(x) {
                return _D2.pow(x).div(_D10).sub(_D(0.1))
                    .mul(hasUpgrade("p", 22) ? upgradeEffect("p", 22) : _D1)
                    .mul(hasUpgrade("p", 25) ? upgradeEffect("p", 25) : _D1)
                    .mul(hasUpgrade("p", 32) ? upgradeEffect("p", 32) : _D1)
                    .mul(hasUpgrade("p", 43) ? upgradeEffect("p", 43) : _D1)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                player[this.layer].points = (player[this.layer].points).sub(this.cost())
                addBuyables("p", 12, _D1)
            }
        },
        13: {
            title: function () {
                return `时间加速器<br>TK${getBuyableAmount("p", 13)}`
            },
            display() {
                return `
                    <h3>获得 ${format(buyableEffect("p", 13))} 时间流速/秒</h3><br><br><h3>开销: ${format(this.cost())} EMC<h3>
                `
            },
            unlocked() {
                return hasUpgrade("p", 31)
            },
            cost() {
                let amount = getBuyableAmount("p", 13)
                if (amount.eq(_D0)) return _D0
                else return _D(2e44).mul((
                    _D5
                        .add(amount.div(_D30))
                        .add(
                            Decimal.max(amount, _D100)
                                .sub(_D100)
                                .div(_D30)
                        )
                ).pow(amount))
                    .div(hasUpgrade("p", 42) ? upgradeEffect("p", 42) : _D1)
            },
            effect(x) {
                return x.pow(_D2).div(_D(1000))
                    .mul(hasUpgrade("p", 43) ? upgradeEffect("p", 43) : _D1)
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                if (!this.canAfford()) return;
                player[this.layer].points = (player[this.layer].points).sub(this.cost())
                addBuyables("p", 13, _D1)
            }
        }
    },
    clickables: {
        11: {
            title: "无限物质熔炉",
            display() { return `<h3>每秒将10%EMC转化为无限燃料<br>目前状态 : ${Boolean(getClickableState("p", 11)) ? "开" : "关"}</h3>` },
            style: {
                width: "240px",
                height: "60px",
                backgroundColor: "#D89536",
                border: "4px solid",
                borderRadius: "4px",
                borderColor: "rgba(0, 0, 0, 0.125)",
            },
            canClick() {
                return hasUpgrade("p", 36)
            },
            unlocked() {
                return hasUpgrade("p", 36)
            },
            onClick() {
                setClickableState("p", 11, !Boolean(getClickableState("p", 11)))
            },
            effect() {
                return [
                    hasUpgrade("p", 36) ? pow10(-1) : _D0
                ]
            }
        },
        12: {
            title: function () {
                return `<h2 style="color:hsl(${(player.timePlayed * 80) % 360}, 100%, 30%);text-shadow: 0 0 10px hsl(${(player.timePlayed * 80+180) % 360}, 100%, 70%);">硬重置等价交换小游戏</h2>`
            },
            style: function () {
                return {
                    width: "360px",
                    height: "60px",
                    background: `linear-gradient(90deg, hsl(${(player.timePlayed * 30) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 30) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 60) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 90) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 120) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 150) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 180) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 210) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 240) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 270) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 300) % 360}, 50%, 50%), hsl(${(player.timePlayed * 30 + 330) % 360}, 50%, 50%)`,
                    border: "4px solid",
                    borderRadius: "4px",
                    borderColor: "rgba(0, 0, 0, 0.125)"
                }
            },
            canClick() {
                return hasUpgrade("p", 51)
            },
            unlocked() {
                return hasUpgrade("p", 51)
            },
            onClick() {
                doReset("p", true);
            }
        }
    },
    upgrades: {
        11: {
            title: "强效收集器",
            description: "EMC获取×50",
            tooltip: "现在它比MK2强了一倍!",
            effect: function () {
                return _D(50)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 11))}`
            },
            cost: _D10
        },
        12: {
            title: "买一些,再买一些",
            description: "MK购买数量平方倍增EMC获取",
            tooltip: "买的越多,赚的越多!",
            effect: function () {
                return getBuyableAmount("p", 11).pow(_D2)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 12))}`
            },
            cost: pow10(3),
            unlocked() {
                return hasUpgrade("p", 11)
            }
        },
        13: {
            title: "等价交换EX",
            description: "解锁MK3以后的收集器",
            tooltip: "你应该知道等价交换只有MK3收集器吧?",
            cost: _D(5e4),
            unlocked() {
                return hasUpgrade("p", 12)
            }
        },
        14: {
            title: "获得进度",
            description: "获得一个等价交换进度<br>并将MK生产指数+0.2",
            tooltip: "我们势不可挡!",
            effect: function () {
                return _D(0.2)
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("p", 14))}`
            },
            cost: _D(1.25e6),
            unlocked() {
                return hasUpgrade("p", 13)
            }
        },
        15: {
            title: "加速火把 I",
            description: "时间流速×5",
            tooltip: "时间逐渐开始加速?",
            effect: function () {
                return _D(5)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 15))}`
            },
            cost: _D(8e7),
            unlocked() {
                return hasUpgrade("p", 14)
            }
        },
        16: {
            title: "割圆术",
            description: "EMC获取×π",
            tooltip: "我的世界里不存在圆",
            effect: function () {
                return _D(Math.PI)
                    .pow(hasUpgrade("p", 45) ? upgradeEffect("p", 45) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 16))}`
            },
            cost: _D(314159265),
            unlocked() {
                return hasUpgrade("p", 15)
            }
        },
        21: {
            title: "收集器收集收集器",
            description: "解锁收集器收集器LK",
            tooltip: "你在干什么!",
            cost: _D(1e10),
            unlocked() {
                return hasUpgrade("p", 16)
            }
        },
        22: {
            title: "EMC收集收集器",
            description: "EMC对数倍增MK获取",
            tooltip: "很好,熟悉的感觉又回来了",
            effect: function () {
                return (player[this.layer].points.add(_D1)).log10()
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 22))}`
            },
            cost: pow10(13),
            unlocked() {
                return hasUpgrade("p", 21)
            }
        },
        23: {
            title: "等价交换EX^2",
            description: "解锁MK16以后的收集器",
            tooltip: "你应该知道等价交换只有终极收集器吧?",
            cost: pow10(17),
            unlocked() {
                return hasUpgrade("p", 22)
            }
        },
        24: {
            title: "获得进度 II",
            description: "获得一个等价交换进度<br>并将MK生产指数+0.2",
            tooltip: "我们势不可挡...吗?",
            effect: function () {
                return _D(0.2)
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("p", 24))}`
            },
            cost: pow10(22),
            unlocked() {
                return hasUpgrade("p", 23)
            }
        },
        25: {
            title: "我们需要买更多",
            description: "LK购买数量倍增自身产量",
            tooltip: "如果买更多,还会赚更多吗?",
            effect: function () {
                return getBuyableAmount("p", 12)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 25))}`
            },
            cost: pow10(28),
            unlocked() {
                return hasUpgrade("p", 24)
            }
        },
        26: {
            title: "Rush E",
            description: "EMC获取×e",
            tooltip: "准备好指数爆炸了吗?",
            effect: function () {
                return _D(Math.E)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 26))}`
            },
            cost: pow10(35),
            unlocked() {
                return hasUpgrade("p", 25)
            }
        },
        31: {
            title: "加速器加速收集器",
            description: "解锁时间加速器TK",
            tooltip: "没话说了...",
            cost: pow10(43),
            unlocked() {
                return hasUpgrade("p", 26)
            }
        },
        32: {
            title: "强效收集器收集器",
            description: "MK获取×50",
            tooltip: "现在它比LK不知道多少强了一倍!",
            effect: function () {
                return _D(50)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 32))}`
            },
            cost: pow10(52),
            unlocked() {
                return hasUpgrade("p", 31)
            }
        },
        33: {
            title: "等价交换EX↑EX",
            description: "解锁MK100以后的收集器",
            tooltip: "你应该知道等价交换只有等价交换吧?",
            cost: pow10(66),
            unlocked() {
                return hasUpgrade("p", 32)
            }
        },
        34: {
            title: "获得进度 III",
            description: "获得一个等价交换进度<br>并将MK生产指数依据EMC提升",
            tooltip: "我们真的势不可挡!",
            effect: function () {
                return _D(0.6).div(
                    _D1.add(
                        _D2.pow(
                            _D(138.3985).sub(player[this.layer].points.log10()).div(_D(20))
                        )
                    )
                );
            },
            effectDisplay: function () {
                return `+^${format(upgradeEffect("p", 34))}`
            },
            cost: pow10(75),
            unlocked() {
                return hasUpgrade("p", 33)
            }
        },
        35: {
            title: "加速火把 II",
            description: "时间加速器产量加速时间流速",
            tooltip: "时间已经加速起来了!",
            effect: function () {
                return buyableEffect("p", 13)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 35))}`
            },
            cost: pow10(100),
            unlocked() {
                return hasUpgrade("p", 34)
            }
        },
        36: {
            title: "结束了?",
            description: "解锁无限燃料",
            tooltip: "如结",
            effect: function () {
                return player[this.layer].points.div(_D10)
            },
            cost: _DInf,
            unlocked() {
                return hasUpgrade("p", 35)
            }
        },
        // 无限燃料升级
        41: {
            title: "T = 101%",
            description: "无限燃料按一定倍率增幅时间流速",
            tooltip: "第一日,赐以时间",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D2)
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 41))}`
            },
            cost: _D1,
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 36)
            }
        },
        42: {
            title: "η = 101%",
            description: "无限燃料按一定倍率降低机器价格",
            tooltip: "第二日,赐以价格",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D10)
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 42))}`
            },
            cost: pow10(3),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 41)
            }
        },
        43: {
            title: "P = 101%",
            description: "无限燃料按一定倍率倍增机器产量",
            tooltip: "第三日,赐以产量",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D3)
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("p", 43))}`
            },
            cost: pow10(9),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 42)
            }
        },
        44: {
            title: "等价交换Final",
            description: "MK不再有购买上限",
            tooltip: "第四日,赐以机器",
            cost: pow10(64),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 43)
            }
        },
        45: {
            title: "3.141592653589",
            description: "无限燃料提升割圆术的效果",
            tooltip: "第五日,赐以原神",
            effect: function () {
                return (_D2.add(player.P.Inf)).log2().pow(_D(0.75))
                    .pow(hasUpgrade("p", 46) ? upgradeEffect("p", 46) : _D1)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("p", 45))}`
            },
            cost: pow10(100),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 44)
            }
        },
        46: {
            title: "嘿嘿嘿达嘿的赐福",
            description: "无限燃料升级提升^1.031415926",
            tooltip: "第六日,赐以达嘿",
            effect: function () {
                return _D(1.031415926)
            },
            effectDisplay: function () {
                return `^${format(upgradeEffect("p", 46))}`
            },
            cost: pow10(250),
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 45)
            }
        },
        51: {
            title: "结束了",
            description: "解锁重置按钮",
            tooltip: "即将见证,太初有为",
            cost: _DInf,
            currencyDisplayName: "无限燃料",
            currencyInternalName: "Inf",
            currencyLocation: () => player.P,
            unlocked() {
                return hasUpgrade("p", 46)
            }
        },
    },
    doReset(resettingLayer) {
        console.log(1)
        if (resettingLayer == "p") {
            player.P.Clear += 1;
            player.P = {
                TS: _D1,
                Mk: _D1,
                Inf: _D0,
                Clear: player.P.Clear++,
            },
                console.log(2)
            layerDataReset("p");
        }
    },
    type: "null",
    hotkeys: [
        {
            key: "p",
            onPress() {
                while (layers.p.buyables[11].canAfford()) {
                    if (getBuyableAmount("p", 11).gte(layers.p.buyables[11].purchaseLimit())) break;
                    layers.p.buyables[11].buy()
                }
                if (hasUpgrade("p", 21)) {
                    while (layers.p.buyables[12].canAfford()) {
                        layers.p.buyables[12].buy()
                    }
                }
                if (hasUpgrade("p", 31)) {
                    while (layers.p.buyables[13].canAfford()) {
                        layers.p.buyables[13].buy()
                    }
                }
            },
            unlocked() { return layers.p.layerShown() }
        }
    ],
})