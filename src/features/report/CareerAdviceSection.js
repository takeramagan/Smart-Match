import { Box, Chip, Link, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Section } from '../../components/Section'
import { h1, h2} from '../../constant/fontsize'
import i18n from '../../i18n/config'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon:{
    width: '40px',
    height: '40px',
    borderRadius: '20px',
    color:'black'
  }
})

export const CareerAdviceSection = ({ report }) => {
  const { t } = useTranslation()
  const isChinese = (i18n.language.toLowerCase() === 'cn') //current language is Chinese
  const classes = useStyles()

  return (
    <Section >
      <Box p={4} mb={1}>
        <Box fontSize={h1} mb={2} fontWeight='500' color='#024CC3'>
          {t('careeradvice.title')}
        </Box>
        <Box fontSize={h2} fontWeight='500' color='#6A707E'>
        {t('careeradvice.demo')}
        </Box>
        
        <Box mt={1} style={{flexDirection:"column", display:"flex", alignItems:"center"}}>
         <Typography color='primary' style={{fontSize:h2, fontWeight:'500', marginRight:20}}>
            {t('careeradvice.contact')}
          </Typography>
          {
            isChinese && 
            <Box mt={1}>
              <img src='weixin.jpeg' alt="" />
              <img src='weixingongzong.jpeg' alt="" />
            </Box>
          }
          {!isChinese &&
          <div>
            <a href='https://www.facebook.com/DK-105342934694333' target='_blank'>
              <FacebookIcon className={classes.icon}/>
            </a>
            <a href='https://twitter.com/DK48655550' target='_blank'>
              <TwitterIcon className={classes.icon}/>
            </a>
            <a href='https://www.instagram.com/dk_ca_dk/' target='_blank'>
              <InstagramIcon className={classes.icon}/>
            </a>
            <a href='https://www.linkedin.com/company/dkedu/' target='_blank'>
              <LinkedInIcon className={classes.icon}/>  
            </a>
          </div>
          }
        </Box>
      
      </Box>
    </Section>
  )
}