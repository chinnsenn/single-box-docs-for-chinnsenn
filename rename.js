
const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

config.outbounds.map(i => {
    if (['⛳全部节点'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies));
    }
    if (['🇭🇰香港', '🇭🇰香港自动选择'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /港|hk|hongkong|hong kong/i));
    }
    if (['🇹🇼台湾', '🇹🇼台湾自动选择'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /台|tw|taiwan/i));
    }
    if (['🇯🇵日本', '🇯🇵日本自动选择'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /日本|jp|japan/i));
    }
    if (['🇺🇲美国', '🇺🇲美国自动选择'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /美|us|unitedstates|united states/i));
    }
    if (['🇸🇬新加坡', '🇸🇬新加坡自动选择'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /新|sg|singapore/i));
    }
    if (['🇰🇷韩国'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /kr|korea|kor|首尔|韩|韓/i));
    }
    if (['🇬🇧英国'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /uk|英|伦敦/i));
    }
    if (['🇩🇪德国'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /de|德/i));
    }
    if (['🇨🇦加拿大'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /ca|canada|加拿大|枫/i));
    }
    if (['🇧🇷巴西'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /ba|巴西/i));
    }
    if (['🇮🇳印度'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /in|印度/i));
    }
    if (['🇳🇱荷兰'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /nl|荷兰/i));
    }
    if (['🇮🇹意大利'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /it|意大利|意/i));
    }
    if (['🇨🇭瑞士'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /ch|瑞士/i));
    }
    if (['🇫🇷法国'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /fr|法|巴黎/i));
    }
    if (['🇸🇦沙特阿拉伯'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /沙|沙特|阿拉伯/i));
    }
    if (['🇮🇱以色列'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /il|以色列/i));
    }
    if (['🇦🇪迪拜'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /uae|迪拜|杜拜|dubayy/i));
    }
    if (['🇲🇽墨西哥'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /墨西哥|mexico|méxico|mexican/i));
    }
    if (['🇨🇱智利'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /智利|chile|cl/i));
    }
    if (['🇦🇷阿根廷'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /阿根廷|argentina|ar/i));
    }
    if (['🇿🇦南非'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /南非|zuid-afrika/i));
    }
    if (['🇸🇪瑞典'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /瑞典|sweden|sverige/i));
    }
    if (['🇹🇷土耳其'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /tr|土耳其|土/i));
    }
    if (['🇦🇺澳大利亚'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /土澳|澳大利亚|澳|aus/i));
    }
    if (['🇵🇭菲律宾'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /菲|ph/i));
    }
    if (['🇹🇭泰国'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /泰|th/i));
    }
    if (['🇵🇰巴基斯坦'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /巴基斯坦|pk/i));
    }
    if (['🇷🇺俄罗斯'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /俄|俄罗斯|rus|rf/i));
    }
    if (['🇳🇬尼日利亚'].includes(i.tag)) {
      i.outbounds.push(...getTags(proxies, /尼日利亚|ngr/i));
    }
  });

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}