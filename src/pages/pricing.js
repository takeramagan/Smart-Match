

import PricingSection from "../features/pricingPage/pricingSection";

export default function PricingPage () {

    const tiers = [
        {
            title: 'Sourcer',
            titleSubHeader: "Get targeted applicants with detailed profiles for all your open roles.",
            price: '0',
            description: [
                '**********************************************testtest',
                '**********************************************testestestsetset',
                '**********************************************setsetsetset',
                '**********************************************setsetsete',
            ],
            buttonText: 'Sign up for free',
            buttonVariant: 'outlined',
        },
        {
            title: 'Recruiter',
            titleSubHeader: "Turbocharge your sourcing, screen talent, track hiring & power collaboration.",
            subheader: 'Most popular',
            price: '400',
            description: [
                '**********************************************testtest',
                '**********************************************testestestsetset',
                '**********************************************setsetsetset',
                '**********************************************setsetsete',
            ],
            buttonText: 'Get started',
            buttonVariant: 'contained',
        },
        {
            title: 'Teams',
            titleSubHeader: "For integrated solutions across your talent acquisition team.",
            description: [
                '**********************************************testtest',
                '**********************************************testestestsetset',
                '**********************************************setsetsetset',
                '**********************************************setsetsete',
                '**********************************************testtest',
                '**********************************************testestestsetset',
                '**********************************************setsetsetset',
                '**********************************************setsetsete',
            ],
            buttonText: 'Contact us',
            buttonVariant: 'outlined',
        },
    ];

    return (
        <div>
            <PricingSection tiers={tiers}/>
        </div>
        
    )
}