addLayer("a", {
    name: "进度",
    symbol: "🏅",
    resource: "进度",
    color: "#AA7BF2",
    row: "side",
    tooltip: "",
    position: 0,
    layerShown() { return true },
    infoboxes: {
        introBox: {
            title: "进度",
            body() { return "这里是你所达成的所有进度<br>也许有一些隐藏的特殊成就在等你发现?" },
        },
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "虚假的梦境<br>真实的我",
            tooltip: "现在就去睡觉还来得及<br>获得第一个思维",
            done() { return player["m"].points.gte(1) }
        },
        12: {
            name: "真实的梦境<br>虚假的我",
            tooltip: "醒来,但不是在现实里<br>游戏时间达到06:00:00",
            done() { return hasMilestone("m", 0) && player.gameTime.gte(21600) }
        },
        13: {
            name: "该吃午饭了<br>今天吃鸡架",
            tooltip: "如果没有在获得第一个成就前获得这个成就,一个隐藏成就将永远无法获得",
            done() { return player.gameTime.gte(43200) }
        },
        14: {
            name: "在那以前<br>要多想",
            tooltip: '"想了以后呢?"<br>这一次我变回孩子了',
            done() { return hasUpgrade("m", 12) }
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
        2001: {
            name: "😪 完全睡过头",
            tooltip: "[限定]一觉睡了12小时",
            done() { return !hasAchievement("a", 11) && hasAchievement("a", 13) },
            unlocked() { return hasAchievement("a", 2001) },
            style: {
                color: "#FFFFFF",
                backgroundColor: "#eb72ff"
            },
        },
    },
    startData() {
        return {
            unlocked: true,
            points: _0
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
            unlocked: true,
            points: _0
        }
    },
    type: "static",
    baseResource: "梦境",
    baseAmount() {
        return player.points
    },
    requires: function () {
        return _50
    },
    exponent: function () {
        return _1
    },
    base: function () {
        return _2
    },
    roundUpCost: false,
    canBuyMax() {
        return false
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "resource-display",
        "blank",
        "upgrades",
        "milestones",
    ],
    upgrades: {
        11: {
            title: "时间洪流怀表<br>[永不重置]",
            description: "台座效果:基础时间流速变为60倍",
            effect: function () {
                return _60
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 11))}`
            },
            tooltip: "等价交换平衡破坏者<br>但在这里只是刚刚开始",
            cost: _1,
        },
        12: {
            title: "思索",
            description: "还没想出效果",
            effect: function () {
                return _0
            },
            effectDisplay: function () {
                return `×${format(upgradeEffect("m", 12))}`
            },
            tooltip: "要多想",
            cost: _1,
            unlocked() {
                return hasUpgrade("m", 11)
            }
        },
    },
    milestones: {
        0: {
            requirementDescription: "1灵感 | 一觉醒来我一觉醒来,而我不变 [永不重置]",
            effectDescription: '回家吧,孩子,回家吧,躺在床上做一个春秋大梦,猪怎么过你就怎么过<br>你每日的睡眠时间限制为6小时,也就是每天的0:00~6:00<br>非睡眠时间你是不会做梦的,你没看错,这是一个减益里程碑',
            done() { return player[this.layer].points.gte(1) }
        },
        1: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',0)", "v", "randomString(v.length)", `"2灵感 | 敌人比我们想象中的要弱,吗?"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',0)", "v", "randomString(v.length)",
                    `"你也许也意识到了这件事,旅船是掩盖未来的虚像,后面忘了"`)}
                    <br>
                    ${ifElseVirable("hasMilestone('m',0)", "v", "randomString(v.length)",
                        "`由于你被梗侵蚀过多,你睡觉时脑子里充斥着各种奇异的内容`")}
                    <br>
                    ${ifElseVirable("hasMilestone('m',0)", "v", "randomString(v.length)",
                            `"解锁一系列新的新闻,且点击新闻栏可将游戏速度+棍母倍"`)}
                    `
            },
            done() { return player[this.layer].points.gte(2) }
        },
        2: {
            requirementDescription: function () {
                return ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)", `"3灵感 | Are You Lost?"`)
            },
            effectDescription: function () {
                return `${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                    `"梦核是一种超现实主义美学,以媒体为介质,描绘与梦境有关的情景"`)}
                    <br>
                    ${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                        "`恍惚之间,你进入了奇异的${randomString(2)},有人在看着你...`")}
                    <br>
                    ${ifElseVirable("hasMilestone('m',1)", "v", "randomString(v.length)",
                            `"你由不可名状处汲取力量,受此影响,梦境获取×(1+想法)"`)}
                    `
            },
            done() { return player[this.layer].points.gte(3) }
        },
    },
    layerShown() { return true },
});
