export function timestampToTime(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000]
  let Y,M,D,h,m,s;
  Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
  h = date.getHours() + ':';
  m = date.getMinutes() + ':';
  s = date.getSeconds();
  return Y+M+D;
}

export function format(timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d';

  var zero = function (value) {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  };

  var myDate = timestamp ? new Date(timestamp) : new Date();

  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());

  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
    return ({
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    })[matches];
  });
}

// 返回套餐处理结果
export function returnPackages(i){
	if(i == 1){
		return '月'
	}else if(i == 2){
		return '半年'
	}else if(i == 3){
		return '季度'
	}else if(i ==4){
		return '年'
	}else {
		return ''
	}
}

// 返回运营商的处理结果
export function returnOperator(i){
	if(i == 1){
		return '中国移动'
	}else if(i == 2){
		return '中国联通'
	}else if(i == 3){
		return '中国电信'
	}else {
		return ''
	}
}

// 返回卡种类的处理结果
export function returnCardKind(i){
	if(i == 1){
		return '大卡'
	}else if(i == 2){
		return '双切'
	}else if(i == 3){
		return '三切'
	}else if(i == 4){
		return '2*2贴片'
	}else if(i == 5){
		return '5*6贴片'
	}else if(i == 6){
		return 'eSim'
	}else if(i == 7){
		return 'NB'
	}else {
		return '其他'
	}
}

// 返回付款方式的处理结果
export function returnPayWay(i){
	if(i == 1){
		return '年付'
	}else if(i == 2){
		return '半年付'
	}else if(i == 3){
		return '季付'
	}else if(i == 4){
		return '月付'
	}else if(i == 5){
		return '后付'
	}else {
		return ''
	}
}

// 返回行业卡的处理结果
export function returnIndustryCard(i){
	if(i == 1){
		return '普通卡'
	}else if(i == 2){
		return '车联卡'
	}else if(i == 3){
		return 'NB'
	}else if(i == 4){
		return '预付充值卡'
	}else {
		return ''
	}
}

// 返回充值状态的处理结果
export function returnRechargeStatus(i){
	if(i == 1){
		return '未支付'
	}else if(i == 2){
		return '支付成功'
	}else if(i == 3){
		return '取消订单'
	}else {
		return ''
	}
}

// 返回充值方式的处理结果
export function returnRechargeWay(i){
	if(i == 1){
		return '平台充值'
	}else if(i == 2){
		return '支付宝'
	}else if(i == 3){
		return '线下转账'
	}else {
		return ''
	}
}

// 返回卡片等级的处理结果
export function returnCardLevel(i){
	if(i == 1){
		return '消费级'
	}else if(i == 2){
		return '工业级'
	}else if(i == 3){
		return '车规级'
	}else {
		return ''
	}
}