import {Container} from '@material-ui/core';

import PricingSection from "../features/pricingPage/pricingSection";
// import {PromoSection} from "../features/pricingPage/promoSection";
// import {PromoDialog} from "../features/pricingPage/promoDialog";

import {tiers} from "../constant/constant";

export default function PricingPage() {
    return (
        <Container maxWidth="lg" component="main">
            {/*<PromoDialog status="test"/>*/}
            <PricingSection tiers={tiers}/>
            {/*<PromoSection/>*/}
        </Container>

    )
}
