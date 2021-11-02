export const FacebookShareOnBt = ({ reportPicture, title }) => {
    return (
        <>
            <div id="fb-root"/>
            <script async defer crossOrigin="anonymous"
                    src="https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v12.0" nonce="oDsKzYIc"/>
            <div className="fb-share-button" data-href="https://ai.smartmatch.app/member/login.php" data-layout="button"
                 data-size="small">
                <a target="_blank"
                   href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fai.smartmatch.app%2Fmember%2Flogin.php&amp;src=sdkpreparse"
                   className="fb-xfbml-parse-ignore">Share</a></div>
        </>
    );
}
