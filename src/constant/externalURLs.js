export const DK_LINK = 'https://www.dk-education.com/book-online'
export const DK_RESUME = 'https://www.dk-education.com/challenge-page/4660dd37-46ca-4761-b8c9-2d874833ce63/'
export const DK_IMPROVE = 'https://www.dk-education.com/challenge-page/1645657a-6a55-44f8-8db4-3a45b39eead3/'
// export const DK_SERVICE = 'https://www.dk-education.com/bookings-checkout/%E7%A7%81%E4%BA%BA%E8%AE%A2%E5%88%B6%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1/book'

export const LINK_TRACK = 'https://ai.smartmatch.app/member/hytz.php'  //跟踪访问信息入口

export const FACEBOOK = 'https://www.facebook.com/DK-105342934694333'
export const TWITTER = 'https://twitter.com/DK48655550'
export const INSTAGRAM = 'https://www.instagram.com/dk_ca_dk/'
export const LINKEDIN = 'https://www.linkedin.com/company/dkedu/'
export const METISIGN_WEBSITE = 'https://www.metisign.com/find-job'

// export const APP_END_POINT = process.env.NODE_ENV === 'production' ?  "https://production-api.metisign.com/koios/v1/market_value/" : "https://api.metisign.com/koios/v1/market_value/"
// export const X_API_KEY = process.env.NODE_ENV === 'production' ? 'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v' : '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861'
export const APP_END_POINT = 
  process.env.ENV_FLAG === 'production' ?  
  "https://production-api.metisign.com/koios/v1/market_value/" : 
  "https://api.metisign.com/koios/v1/market_value/"
export const X_API_KEY = 
  process.env.ENV_FLAG === 'production' ? 
  'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v' : 
  '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861'
console.log('envflag = ', process.env.ENV_FLAG )

export const APP_END_POINT_HISTORY = 
  process.env.ENV_FLAG === 'production' ?
  'https://production-history-reports.metisign.com/get_history_report' :
  'https://staging-history-reports.metisign.com/get_history_report'

export const X_API_KEY_HISTORY = 
  process.env.ENV_FLAG === 'production' ?
  'YezwSpnUoYajNUJVNb8AV8CjBikAcUSG4107orID' : 
  'RYHufPIBK933TCRmjfk8L2nYUDFEiW9e2i2AVy12'

// export const TEST_USER_ID = process.env.ENV_FLAG === 'production' ? 0 : 1000 //自己测试用 测试环境值是1000

export const APP_END_POINT_GET_HISTORY_IDS = 
  process.env.ENV_FLAG === 'production' ?
  'https://production-history-reports.metisign.com/get_history_report_ids' :
  'https://staging-history-reports.metisign.com/get_history_report_ids'

  export const APP_END_POINT_GET_HISTORY_BY_ID = 
  process.env.ENV_FLAG === 'production' ?
  'https://production-history-reports.metisign.com/get_history_report_by_id' :
  'https://staging-history-reports.metisign.com/get_history_report_by_id'