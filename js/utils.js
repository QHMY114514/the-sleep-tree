// ************ Big Feature related ************

function respecBuyables(layer) {
	if (!layers[layer].buyables) return
	if (!layers[layer].buyables.respec) return
	if (!player[layer].noRespecConfirm && !confirm(tmp[layer].buyables.respecMessage || "Are you sure you want to respec? This will force you to do a \"" + (tmp[layer].name ? tmp[layer].name : layer) + "\" reset as well!")) return
	run(layers[layer].buyables.respec, layers[layer].buyables)
	updateBuyableTemp(layer)
	document.activeElement.blur()
}

function canAffordUpgrade(layer, id) {
	let upg = tmp[layer].upgrades[id]
	if (tmp[layer].deactivated) return false
	if (tmp[layer].upgrades[id].canAfford === false) return false
	let cost = tmp[layer].upgrades[id].cost
	if (cost !== undefined)
		return canAffordPurchase(layer, upg, cost)

	return true
}

function canBuyBuyable(layer, id) {
	let b = temp[layer].buyables[id]
	return (b.unlocked && run(b.canAfford, b) && player[layer].buyables[id].lt(b.purchaseLimit) && !tmp[layer].deactivated)
}



function canAffordPurchase(layer, thing, cost) {
	if (thing.currencyInternalName) {
		let name = thing.currencyInternalName
		if (thing.currencyLocation) {
			return !(thing.currencyLocation[name].lt(cost))
		}
		else if (thing.currencyLayer) {
			let lr = thing.currencyLayer
			return !(player[lr][name].lt(cost))
		}
		else {
			return !(player[name].lt(cost))
		}
	}
	else {
		return !(player[layer].points.lt(cost))
	}
}

function buyUpgrade(layer, id) {
	buyUpg(layer, id)
}

function buyUpg(layer, id) {
	if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
	let upg = tmp[layer].upgrades[id]
	if (!player[layer].unlocked || player[layer].deactivated) return
	if (!tmp[layer].upgrades[id].unlocked) return
	if (player[layer].upgrades.includes(id)) return
	if (upg.canAfford === false) return
	let pay = layers[layer].upgrades[id].pay
	if (pay !== undefined)
		run(pay, layers[layer].upgrades[id])
	else {
		let cost = tmp[layer].upgrades[id].cost

		if (upg.currencyInternalName) {
			let name = upg.currencyInternalName
			if (upg.currencyLocation) {
				if (upg.currencyLocation[name].lt(cost)) return
				upg.currencyLocation[name] = upg.currencyLocation[name].sub(cost)
			}
			else if (upg.currencyLayer) {
				let lr = upg.currencyLayer
				if (player[lr][name].lt(cost)) return
				player[lr][name] = player[lr][name].sub(cost)
			}
			else {
				if (player[name].lt(cost)) return
				player[name] = player[name].sub(cost)
			}
		}
		else {
			if (player[layer].points.lt(cost)) return
			player[layer].points = player[layer].points.sub(cost)
		}
	}
	player[layer].upgrades.push(id);
	if (upg.onPurchase != undefined)
		run(upg.onPurchase, upg)
	needCanvasUpdate = true
}

function buyMaxBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return
	if (!layers[layer].buyables[id].buyMax) return

	run(layers[layer].buyables[id].buyMax, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function buyBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return

	run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function clickClickable(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!tmp[layer].clickables[id].unlocked) return
	if (!tmp[layer].clickables[id].canClick) return

	run(layers[layer].clickables[id].onClick, layers[layer].clickables[id])
	updateClickableTemp(layer)
}

function clickGrid(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!run(layers[layer].grid.getUnlocked, layers[layer].grid, id)) return
	if (!gridRun(layer, 'getCanClick', player[layer].grid[id], id)) return

	gridRun(layer, 'onClick', player[layer].grid[id], id)
}

// Function to determine if the player is in a challenge
function inChallenge(layer, id) {
	let challenge = player[layer].activeChallenge
	if (!challenge) return false
	id = toNumber(id)
	if (challenge == id) return true

	if (layers[layer].challenges[challenge].countsAs)
		return tmp[layer].challenges[challenge].countsAs.includes(id) || false
	return false
}

// ************ Misc ************

var onTreeTab = true

function showTab(name, prev) {
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.tab !== name) clearParticles(function (p) { return p.layer === player.tab })
	if (tmp[name] && player.tab === name && isPlainObject(tmp[name].tabFormat)) {
		player.subtabs[name].mainTabs = Object.keys(layers[name].tabFormat)[0]
	}
	var toTreeTab = name == "none"
	player.tab = name
	if (tmp[name] && (tmp[name].row !== "side") && (tmp[name].row !== "otherside")) player.lastSafeTab = name
	updateTabFormats()
	needCanvasUpdate = true
	document.activeElement.blur()

}

function showNavTab(name, prev) {
	console.log(prev)
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.navTab !== name) clearParticles(function (p) { return p.layer === player.navTab })
	if (tmp[name] && tmp[name].previousTab !== undefined) prev = tmp[name].previousTab
	var toTreeTab = name == "tree-tab"
	console.log(name + prev)
	if (name !== "none" && prev && !tmp[prev]?.leftTab == !tmp[name]?.leftTab) player[name].prevTab = prev
	else if (player[name])
		player[name].prevTab = ""
	player.navTab = name
	updateTabFormats()
	needCanvasUpdate = true
}


function goBack(layer) {
	let nextTab = "none"

	if (player[layer].prevTab) nextTab = player[layer].prevTab
	if (player.navTab === "none" && (tmp[layer]?.row == "side" || tmp[layer].row == "otherside")) nextTab = player.lastSafeTab

	if (tmp[layer].leftTab) showNavTab(nextTab, layer)
	else showTab(nextTab, layer)

}

function layOver(obj1, obj2) {
	for (let x in obj2) {
		if (obj2[x] instanceof Decimal) obj1[x] = new Decimal(obj2[x])
		else if (obj2[x] instanceof Object) layOver(obj1[x], obj2[x]);
		else obj1[x] = obj2[x];
	}
}

function prestigeNotify(layer) {
	if (layers[layer].prestigeNotify) return layers[layer].prestigeNotify()

	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat) {
			if (subtabResetNotify(layer, 'mainTabs', subtab))
				return true
		}
	}
	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]) {
			if (subtabResetNotify(layer, family, subtab))
				return true
		}
	}
	if (tmp[layer].autoPrestige || tmp[layer].passiveGeneration) return false
	else if (tmp[layer].type == "static") return tmp[layer].canReset
	else if (tmp[layer].type == "normal") return (tmp[layer].canReset && (tmp[layer].resetGain.gte(player[layer].points.div(10))))
	else return false
}

function notifyLayer(name) {
	if (player.tab == name || !layerunlocked(name)) return
	player.notify[name] = 1
}

function subtabShouldNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (!subtab.unlocked) return false
	if (subtab.embedLayer) return tmp[subtab.embedLayer].notify
	else return subtab.shouldNotify
}

function subtabResetNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (subtab.embedLayer) return tmp[subtab.embedLayer].prestigeNotify
	else return subtab.prestigeNotify
}

function nodeShown(layer) {
	return layerShown(layer)
}

function layerunlocked(layer) {
	if (tmp[layer] && tmp[layer].type == "none") return (player[layer].unlocked)
	return LAYERS.includes(layer) && (player[layer].unlocked || (tmp[layer].canReset && tmp[layer].layerShown))
}

function keepGoing() {
	player.keepGoing = true;
	needCanvasUpdate = true;
}

function toNumber(x) {
	if (x.mag !== undefined) return x.toNumber()
	if (x + 0 !== x) return parseFloat(x)
	return x
}

function updateMilestones(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].milestones) {
		if (!(hasMilestone(layer, id)) && layers[layer].milestones[id].done()) {
			player[layer].milestones.push(id)
			if (layers[layer].milestones[id].onComplete) layers[layer].milestones[id].onComplete()
			if ((tmp[layer].milestonePopups || tmp[layer].milestonePopups === undefined) && !options.hideMilestonePopups) doPopup("milestone", tmp[layer].milestones[id].requirementDescription, "里程碑达成!", 3, tmp[layer].color);
			player[layer].lastMilestone = id
		}
	}
}

function updateAchievements(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].achievements) {
		if (isPlainObject(layers[layer].achievements[id]) && !(hasAchievement(layer, id)) && layers[layer].achievements[id].done()) {
			player[layer].achievements.push(id)
			if (layers[layer].achievements[id].onComplete) layers[layer].achievements[id].onComplete()
			if (tmp[layer].achievementPopups || tmp[layer].achievementPopups === undefined) doPopup("achievement", tmp[layer].achievements[id].name, "成就达成!", 3, tmp[layer].color);
		}
	}
}

function addTime(diff, layer) {
	let data = player
	let time = data.timePlayed
	if (layer) {
		data = data[layer]
		time = data.time
	}

	//I am not that good to perfectly fix that leak. ~ DB Aarex
	if (time + 0 !== time) {
		console.log("Memory leak detected. Trying to fix...")
		time = toNumber(time)
		if (isNaN(time) || time == 0) {
			console.log("Couldn't fix! Resetting...")
			time = layer ? player.timePlayed : 0
			if (!layer) player.timePlayedReset = true
		}
	}
	time += toNumber(diff)

	if (layer) data.time = time
	else data.timePlayed = time
}

shiftDown = false
ctrlDown = false

document.onkeydown = function (e) {
	if (player === undefined) return;
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
	if (tmp.gameEnded && !player.keepGoing) return;
	let key = e.key
	if (ctrlDown) key = "ctrl+" + key
	if (onFocused) return
	if (ctrlDown && hotkeys[key]) e.preventDefault()
	if (hotkeys[key]) {
		let k = hotkeys[key]
		if (player[k.layer].unlocked && tmp[k.layer].hotkeys[k.id].unlocked)
			k.onPress()
	}
}

document.onkeyup = function (e) {
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
}

var onFocused = false
function focused(x) {
	onFocused = x
}


function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

function isPlainObject(obj) {
	return (!!obj) && (obj.constructor === Object)
}

document.title = modInfo.name

// Converts a string value to whatever it's supposed to be
function toValue(value, oldValue) {
	if (oldValue instanceof Decimal) {
		value = new Decimal(value)
		if (checkDecimalNaN(value)) return decimalZero
		return value
	}
	if (!isNaN(oldValue))
		return parseFloat(value) || 0
	return value
}

// Variables that must be defined to display popups
var activePopups = [];
var popupID = 0;

// Function to show popups
function doPopup(type = "none", text = "This is a test popup.", title = "", timer = 3, color = "") {
	switch (type) {
		case "achievement":
			popupTitle = "成就达成!";
			popupType = "achievement-popup"
			break;
		case "challenge":
			popupTitle = "挑战达成";
			popupType = "challenge-popup"
			break;
		default:
			popupTitle = "Something Happened?";
			popupType = "default-popup"
			break;
	}
	if (title != "") popupTitle = title;
	popupMessage = text;
	popupTimer = timer;

	activePopups.push({ "time": popupTimer, "type": popupType, "title": popupTitle, "message": (popupMessage + "\n"), "id": popupID, "color": color })
	popupID++;
}


//Function to reduce time on active popups
function adjustPopupTime(diff) {
	for (popup in activePopups) {
		activePopups[popup].time -= diff;
		if (activePopups[popup]["time"] < 0) {
			activePopups.splice(popup, 1); // Remove popup when time hits 0
		}
	}
}

function run(func, target, args = null) {
	if (isFunction(func)) {
		let bound = func.bind(target)
		return bound(args)
	}
	else
		return func;
}

function gridRun(layer, func, data, id) {
	if (isFunction(layers[layer].grid[func])) {
		let bound = layers[layer].grid[func].bind(layers[layer].grid)
		return bound(data, id)
	}
	else
		return layers[layer].grid[func];
}

// # 自定义
// 特殊数字简写
let _86400 = new Decimal(86400);
let _3600 = new Decimal(3600);
let _100 = new Decimal(100);
let _60 = new Decimal(60);
let _50 = new Decimal(50);
let _32 = new Decimal(32);
let _30 = new Decimal(30);
let _20 = new Decimal(20);
let _16 = new Decimal(16);
let _10 = new Decimal(10);
let _9 = new Decimal(9);
let _8 = new Decimal(8);
let _7 = new Decimal(7);
let _6 = new Decimal(6);
let _5 = new Decimal(5);
let _4 = new Decimal(4);
let _3 = new Decimal(3);
let _2 = new Decimal(2);
let _1 = new Decimal(1);
let _0 = new Decimal(0);
let _h2 = divNum(_2);

// 工具函数

/**
 * 请用于以1为倒数的数的简便写法
 * @param {Decimal} dividend - 被除数
 * @param {Decimal} [divisor = 1] - 除数 *不推荐使用该参数,乖乖用.div()
 */
function divNum(dividend, divisor = new Decimal(1)) {
	return divisor.div(dividend);
}
// 2的幂次
function pow2(pow) {
	return _2.pow(new Decimal(pow))
}

// 核心函数 - 自定义事件驱动
function myTicking(diff) {
	player.gameTime = (player.gameTime.add(timeSpeed().mul(diff)));
}

// 核心函数 - 时间流速
function timeSpeed() {
	return _1
		.mul(hasUpgrade("m", 11) ? upgradeEffect("1", 11) : _1)
}

// 核心函数 - 睡眠判定
function isSleep() {
	return hasMilestone("m", 0) ? true :
		player.gameTime.gte(player.sleepTime)
}

// 你知道的太多了
// 避免重复定义开销
const randomString_chars = `ABCDEFGHJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz1234567890?!;=+-/@#$%^&*~|\`"'\\()[]{},.乾狐离光          `;
function randomString(length) {
	let result = '';
	
	for (let i = 0; i < length; i++) {
	  result += randomString_chars[Math.floor(Math.random() * randomString_chars.length)];
	}
	
	return result;
}

/**
 * 带变量的if else语句表达式简写版本,例如 a ? "abc".length : "abc" 可表达为 ifElseViarable("a", "v.length", "v", "abc")
 * @param {boolean} exp - 用于判断的表达式,可以是文本
 * @param {text} a - 真分支表达式
 * @param {text} b - 假分支表达式
 * @param {text} vir - 变量值
 * @param {text} [virName="v"] - 变量名
 */
function ifElseVirable(exp, a, b, vir, virName = "v") {
	return eval(`((${virName}) => ${exp} ? ${a} : ${b} )(${vir})`);
}

// 新闻
function getNewsList() {
	return [
		"欢迎来到睡觉树 Made by QHLG",
		"我们听说这里有一个新闻,但突然发现有新闻这件事就是新闻",
		`乾狐离光的网站地址在<a href="https://qhlg.flime.top">https://qhlg.flime.top</a>`,
		"乾狐离光不是💰️🦊🍐🌟也不是雀魂老狗更不是清华理工",
		"你在挂机的时候也在看我吗?",
		"开发者模式已启动,您的游戏速度已提升1e1e4514倍!",
		"为什么要写新闻条来掩饰自己没什么内容(恼)",
		"我们有一点狐币,狐币可以压成石头,石头里有一只狐狸",
		'let jrrp = 101; let jrrptext = "你的运气爆表了!";',
		"There is nobody called Fox. Go to the other side.",
		"如果你付出了你应该付出的,你就会获得你需要的",
		"Only Fox Can Do!!!",
		`点<input type="button" value="我" onclick="alert('你被骗了!');player.nevergonnagiveyouup=true"/>获得10000000000000000000000000000灵感`,
		"其实疯狂点击新闻栏可以为你提供一个速度加成",
		"使用狐狸主题,使用狐狸主题谢谢喵!",
		"我不想让你关闭新闻栏,所以没做这个按钮,绝对不是懒得做",
		"把我加回来是 因为我是树洞? 要继续对我发泄?",
		"Are You Lost?",
		"喵~喵~咕噜咕噜~",
		`This is a <span style="color: hsl(0, 100%, 50%)">R</span><span style="color: hsl(30, 100%, 50%)">A</span><span style="color: hsl(60, 100%, 50%)">I</span><span style="color: hsl(120, 100%, 50%)">N</span><span style="color: hsl(180, 100%, 50%)">B</span><span style="color: hsl(240, 100%, 50%)">O</span><span style="color: hsl(300, 100%, 50%)">W</span>`,
		randomString(20),
		...(hasMilestone("m", 1) ?
			[
				"＜spin＞哈里路大旋风!＜/spin＞",
				"这就叫实力,这就叫背景,这就叫狐狸,狐狸怎么叫?",
				"Ciallo～(∠・ω<)⌒☆",
				"I just wanna JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~ JUMP~",
				"为什么gta6还没做出来,因为现在正在美国加州等地进行线下公测()",
				"生成生成生成器的生成器的生成器生成生成生成器的生成器",
				"本游戏禁止将滚木以及同音或近音词当做空白字符看待,否则禁言滚木小时,持续滚木天",
				"我可以用新闻栏播彩六,对吧!",
			]
			: ["解锁思维层第二里程碑以解锁一系列新的新闻"]
		),
		...(options.badWeb ?
			[
				"400 Bad Request",
				"401 Unauthorized",
				"403 Forbidden",
				"404 Not Found",
				"405 Method Not Allowed",
				"406 Not Acceptable",
				"407 Proxy Authentication Required",
				"408 Request Timeout",
				"409 Conflict",
				"410 Gone",
				"411 Length Required",
				"412 Precondition Failed",
				"413 Payload Too Large",
				"414 URI Too Long",
				"415 Unsupported Media Type",
				"416 Range Not Satisfiable",
				"417 Expectation Failed",
				"418 I'm a teapot",
				"421 Misdirected Request",
				"426 Upgrade Required",
				"428 Precondition Required",
				"429 Too Many Requests",
				"431 Request Header Fields Too Large",
				"451 Unavailable For Legal Reasons",
				"500 Internal Server Error",
				"501 Not Implemented",
				"502 Bad Gateway",
				"503 Service Unavailable",
				"504 Gateway Timeout",
				"505 HTTP Version Not Supported",
				"506 Variant Also Negotiates",
				"510 Not Extended",
				"511 Network Authentication Required",
			]
			: [`如果你在设置中打开了"从互联网获取新闻,你就能够获得一些新的新闻"`]
		)
	]
}

function updateNewsDisplay() {
	if (!player.news) return;

	const newsList = getNewsList();
	const currentNews = newsList[player.news.index];

	if (!player.news.isRotating) {
		player.news.text = getNextCharacter(currentNews, 0);
		player.news.charIndex = 1;
		player.news.isRotating = true;
		player.news.lastUpdate = Date.now();
		player.news.completeTime = 0;
		return;
	}

	const now = Date.now();
	const timeDiff = now - player.news.lastUpdate;

	if (timeDiff >= 125) {
		const charsToAdd = Math.floor(timeDiff / 125);
		let newCharIndex = player.news.charIndex;

		for (let i = 0; i < charsToAdd && newCharIndex < currentNews.length; i++) {
			newCharIndex = getNextCharIndex(currentNews, newCharIndex);
		}

		player.news.charIndex = Math.min(newCharIndex, currentNews.length);
		player.news.text = currentNews.substring(0, player.news.charIndex);
		player.news.lastUpdate = now;

		if (player.news.charIndex >= currentNews.length && player.news.completeTime === 0) {
			player.news.completeTime = now;
		}

		if (player.news.completeTime > 0 && now - player.news.completeTime >= 5000) {
			const oldIndex = player.news.index;
			do {
				player.news.index = Math.floor(Math.random() * newsList.length);
			} while (oldIndex == player.news.index);
			player.news.isRotating = false;
			player.news.completeTime = 0;
		}
	}

	function getNextCharIndex(text, currentIndex) {
		if (currentIndex >= text.length) return currentIndex;

		if (text[currentIndex] === '<') {
			const endIndex = text.indexOf('>', currentIndex);
			return endIndex === -1 ? text.length : endIndex + 1;
		}

		return currentIndex + 1;
	}

	function getNextCharacter(text, startIndex) {
		const endIndex = getNextCharIndex(text, startIndex);
		return text.substring(startIndex, endIndex);
	}
}

