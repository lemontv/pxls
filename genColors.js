var colors = ["#FFFFFF","#E4E4E4","#888888","#222222","#FFA7D1","#E50000","#E59500","#A06A42","#E5D900","#94E044","#02BE01","#00D3DD","#0083C7","#0000EA","#CF6EE4","#820080"];
var json = [];
for(var i = 0; i < colors.length; i++) {
  var R = parseInt('0x'+colors[i][1]+colors[i][2]);
  var G = parseInt('0x'+colors[i][3]+colors[i][4]);
  var B = parseInt('0x'+colors[i][5]+colors[i][6]);
  json.push({
    R,
    G,
    B
  })
}
console.log(JSON.stringify(json))
