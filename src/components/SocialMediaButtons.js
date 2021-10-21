import React from "react";
import {FacebookShareButton, FacebookIcon, LinkedinIcon, TwitterIcon, LinkedinShareButton} from "react-share";


export default function SocialMediaButtons({title, reportPicture, url}) {
    let quote = title ?? "SmartMatch - A Better World For AI Career Match";
    let link = url ?? "https://ai.smartmatch.app/member/login.php";
    const hashtag = '#SmartMatch';
    const linkedInTitle = 'My SmartMatch Report';
    const twitterUrl = `https://twitter.com/share?url=
    ${link}&text=${quote}&hashtags=${hashtag}`;
    // console.log('from social buttons: ', quote);
    const linkedInUrl =
        `https://www.linkedin.com/shareArticle?url=
        ${link}&title=${quote}&summary=${linkedInTitle}`;
    console.log('link', link);
    return (
        <div
            style={{
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                padding: 10,
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                position: 'fixed',
                top: '50%',
                right: 10,
                borderRadius: 5
            }}>
            <FacebookShareButton
                url={link}
                quote={quote}
                hashtag="#SmartMatch">
                <FacebookIcon size={36}/>
            </FacebookShareButton>

            {/* facebook share button */}
            {/*<a href="`https://www.facebook.com/sharer.php?u=${link}`">*/}
            {/*    <FacebookIcon size={36}/>*/}
            {/*</a>*/}

            {/* twitter share button */}
            {/* for  future username @ {data - via = "dkedu"}*/}
            {/*<a className="twitter-share-button"*/}
            {/*   data-hashtags={"#SmartMatch"}*/}
            {/*   data-text={quote}*/}
            {/*   data-url={link}*/}
            {/*   href="https://twitter.com/intent/tweet"><TwitterIcon size={36}/>*/}
            {/*</a>*/}
            <a href={twitterUrl}>
                <TwitterIcon size={36}/>
            </a>

            {/*<LinkedinShareButton*/}
            <a href={linkedInUrl}>
                <LinkedinIcon size={36}/>
            </a>
            {/*    title={linkedInTitle}*/}
            {/*    summary={quote}*/}
            {/*    source={link}>*/}
            {/*    <LinkedinIcon size={36}/>*/}
            {/*</LinkedinShareButton>*/}
        </div>

    );
}