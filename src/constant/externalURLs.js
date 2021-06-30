export const DK_LINK = 'https://www.dk-education.com/book-online'

export const LINK_TRACK = 'https://ai.smartmatch.app/member/hytz.php'  //跟踪访问信息入口

export const FACEBOOK = 'https://www.facebook.com/DK-105342934694333'
export const TWITTER = 'https://twitter.com/DK48655550'
export const INSTAGRAM = 'https://www.instagram.com/dk_ca_dk/'
export const LINKEDIN = 'https://www.linkedin.com/company/dkedu/'
export const METISIGN_WEBSITE = 'https://www.metisign.com/find-job'

// export const APP_END_POINT = process.env.NODE_ENV === 'production' ?  "https://production-api.metisign.com/koios/v1/market_value/" : "https://api.metisign.com/koios/v1/market_value/"
// export const X_API_KEY = process.env.NODE_ENV === 'production' ? 'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v' : '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861'
export const APP_END_POINT = process.env.ENV_FLAG === 'production' ?  "https://production-api.metisign.com/koios/v1/market_value/" : "https://api.metisign.com/koios/v1/market_value/"
export const X_API_KEY = process.env.ENV_FLAG === 'production' ? 'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v' : '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861'
console.log('envflag = ', process.env.ENV_FLAG )