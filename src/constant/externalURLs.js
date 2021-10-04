export const DK_LINK = 'https://www.dk-education.com/book-online';
export const DK_RESUME = 'https://www.dk-community.com/resumeservice';
export const DK_IMPROVE = 'https://www.dk-community.com/careerpathservice';
export const DK_CONTACT_US = 'andy@dk.com';
//export const DK_IMPROVE = 'https://www.dk-community.com/career-planning'
// export const DK_SERVICE = 'https://www.dk-education.com/bookings-checkout/%E7%A7%81%E4%BA%BA%E8%AE%A2%E5%88%B6%E5%92%A8%E8%AF%A2%E6%9C%8D%E5%8A%A1/book'
//export const DK_RESUME = 'https://www.dk-community.com/resume-modification'

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
        //"https://api.metisign.com/koios/v1/market_value/"
        "https://staging-api.smartmatch.app/koios/v1/market_value/"
export const X_API_KEY =
    process.env.ENV_FLAG === 'production' ?
        'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v' :
        '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861'
console.log('envflag = ', process.env.ENV_FLAG)

export const APP_END_POINT_HISTORY =
    process.env.ENV_FLAG === 'production' ?
        'https://production-history-reports.metisign.com/get_history_report' :
        'https://staging-history-reports.metisign.com/get_history_report'

export const APP_END_POINT_CUSTOMER_REPORT_ACCURACY =
    process.env.ENV_FLAG === 'production' ?
        'https://production-history-reports.metisign.com/report_accuracy' :
        'https://staging-history-reports.metisign.com/report_accuracy'

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


//For HR 
export const APP_END_POINT_B_AND_C =
    process.env.ENV_FLAG === 'production' ?
        'https://production-business-end.metisign.com/' :
        'https://staging-business-end.metisign.com/';

export const X_API_KEY_B_AND_C =
    process.env.ENV_FLAG === 'production' ?
        '4SGJLsnYxu7kmrWxBHKkj3w2TpDzLLCs7jVqMXhy' :
        '9dYNSaxizl3FVx2AS8X3sIAfgo7xYE81dRtuwu41';

// export const X_API_KEY_B_AND_C =
//     process.env.ENV_FLAG === 'production' ?
//         '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861' :
//         'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v';

export const JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK =
    process.env.ENV_FLAG === 'production' ?
        'https://production-api.smartmatch.app/koios/v1/business_pre_assessment/' :
        'https://staging-api.smartmatch.app/koios/v1/market_value';


export const X_API_KEY_JOB_TITLE_ON_CLICK_TO_APPLICANT_RESUME_CHECK =
    process.env.ENV_FLAG === 'production' ?
        'A?D(G+KbPeShVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A%C*F-JaNdRgUkXp2s5v' :
        '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861';

//For Customer
export const APP_END_POINT_CUSTOMER =
    process.env.ENV_FLAG === 'production' ?
        'https://production-customer-end.metisign.com/' :
        'https://staging-customer-end.metisign.com/'

export const X_API_KEY_CUSTOMER =
    process.env.ENV_FLAG === 'production' ?
        'Q1Ma7fU2rh3b88UgmseB68qqD1DTYET3509AjKLM' :
        'IfN8sdzMjd7H9gAfKObFc6I9y7DuFu862gov3P4N'


/* EndPoint for report issue with link*/
// report expired link
export const APP_END_POINT_CUSTOMER_REPORT_LINK = process.env.ENV_FLAG === 'production' ?
    "https://production-report-expired-job-link.metisign.com/report_expired_jobs" :
    "https://staging-report-expired-job-link.metisign.com/report_expired_jobs"

// API key for report expired link
export const X_API_KEY_REPORT_LINK = process.env.ENV_FLAG === 'production' ?
    "V6pht5zU2T22B1dGzcx52aN0vJftqEfexGxbO3G0" :
    "1z3k9DrxPg1smPrnyfsMm24Wp0dCNrD467dh2gII"
