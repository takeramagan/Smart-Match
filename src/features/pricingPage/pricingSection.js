import { Grid, Card, CardHeader, CardContent, Box, Typography, CardActions, Button, Link } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';
import { useEffect } from "react";

// use ethers package for mint NFT
// import { ethers } from "ethers";

export default function PricingSection(props) {
    let scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

    useEffect(() => {
        if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
                ShopifyBuyInitMonthlyBuyBt();
                ShopifyYearlyBuyBtInit();
            } else {
                loadScriptMonthlyBuyBt();
                loadScriptYearlyBuyBt();
            }
        } else {
            loadScriptMonthlyBuyBt();
            loadScriptYearlyBuyBt();
        }
    });

    function loadScriptMonthlyBuyBt() {
        let script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInitMonthlyBuyBt;
    }

    function ShopifyBuyInitMonthlyBuyBt() {
        let client = ShopifyBuy.buildClient({
            domain: 'dksmartmatch.myshopify.com',
            storefrontAccessToken: '92aec7f123378b5337a622005d3269f1',
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
                id: '6642418712599',
                node: document.getElementById('product-component-1640830179469'),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
                    "product": {
                        "buttonDestination": "checkout",
                        "styles": {
                            "button": {
                                "font-family": "Lora, serif",
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px",
                                ":hover": {
                                    "background-color": "#406170"
                                },
                                "background-color": "#476c7c",
                                ":focus": {
                                    "background-color": "#406170"
                                },
                                "border-radius": "6px"
                            },
                            "quantityInput": {
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px"
                            }
                        },
                        "contents": {
                            "img": false,
                            "title": false,
                            "price": false
                        },
                        "text": {
                            "button": "Buy"
                        },
                        "googleFonts": [
                            "Lora"
                        ]
                    }
                },
            });
        });
    }

    function loadScriptYearlyBuyBt() {
        let script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyYearlyBuyBtInit;
    }

    function ShopifyYearlyBuyBtInit() {
        let client = ShopifyBuy.buildClient({
            domain: 'dksmartmatch.myshopify.com',
            storefrontAccessToken: '92aec7f123378b5337a622005d3269f1',
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
                id: '6642419433495',
                node: document.getElementById('product-component-1640830557448'),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
                    "product": {
                        "buttonDestination": "checkout",
                        "styles": {
                            "options": {
                                "max-width": "100% !important"
                            },
                            "button": {
                                "font-family": "Lora, serif",
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px",
                                ":hover": {
                                    "background-color": "#282f32"
                                },
                                "background-color": "#2c3438",
                                ":focus": {
                                    "background-color": "#282f32"
                                },
                                "border-radius": "6px"
                            }
                        },
                        "contents": {
                            "img": false,
                            "title": false,
                            "price": false
                        },
                        "text": {
                            "button": "Buy"
                        },
                        "googleFonts": [
                            "Lora"
                        ]
                    }
                },
            });
        });
    }

    // use ethers with metamask extendsion to mint smart contract with some general information to create NFT token
    // if (typeof window !== "undefined") {
    //     // check for metamask extendsion
    //     if (window.ethereum) {
    //         const provider = new ethers.providers.Web3Provider(window.ethereum)
    //         const signer = provider.getSigner()
    //         ethers.Contract(address, abi, signer).send("safeMint", [owner_address, tokenURL]);
    //     }
    //     else {
    //         if (window.confirm('If you click "ok" you would be redirected to install matamask extendsion. Cancel will load this website ')) {
    //             window.open(
    //                 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    //                 '_blank'
    //             );
    //         }
    //     }
    // }

    return (
        // Grid section shows available options
        <div style={{ margin: 'auto' }}>
            <br /><br /><br />
            <Grid container spacing={0} alignItems="stretch">
                {props.tiers.map((tier) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid
                        item
                        key={tier.title}
                        xs={12}
                        sm={tier.title === 'Enterprise' ? 12 : 6}
                        md={6}
                    >
                        <Card variant="outlined" style={{ height: "100%", position: "relative" }}>
                            {/* Card header section */}
                            <CardHeader
                                title={tier.title}
                                titleTypographyProps={{ align: "left" }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                subheader={tier.titleSubHeader}
                                subheaderTypographyProps={{
                                    align: 'left',
                                    variant: "body2",
                                    color: "inherit"
                                }}
                                style={{ backgroundColor: "#00d6d6", padding: "32px", color: "#ffffff" }}
                            />
                            <CardContent>
                                {/* Card content section 1*/}
                                {/* Card content section 1: Free account */
                                    (tier.price === "0" &&
                                        < Box
                                            style={{
                                                height: "100px",
                                                padding: "24px"
                                            }}
                                            borderColor={"grey.500"}
                                            borderBottom={1}
                                        >
                                            <Typography component="h3" variant="h3" color="textPrimary">
                                                Free
                                            </Typography>
                                        </Box>
                                    )
                                    /* Card content section 1: Undefined () */
                                    || (tier.price === undefined &&
                                        < Box
                                            style={{
                                                height: "100px",
                                                padding: "16px"
                                            }}
                                            borderColor={"grey.500"}
                                            borderBottom={1}
                                        >
                                            <Button color="primary" variant="contained">
                                                Request a demo
                                            </Button>
                                            <br />
                                            <Typography component="paragraph" variant="body1" style={{ color: "grey" }}>
                                                Ideal for multiple recruiters
                                            </Typography>
                                        </Box>
                                    )
                                    /* Card content section 1: Price tier */
                                    ||
                                    < Box style={{
                                        height: "100px",
                                    }}
                                        borderColor={"grey.500"}
                                        borderBottom={1}
                                    >
                                        < Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline'
                                            }}
                                        >
                                            <Typography component="div" variant="body1" color="textPrimary"
                                                display="inline" style={{ marginInline: "20px" }}>
                                                SMT (SmartMatch Token)
                                            </Typography>
                                            <Typography component="h4" variant="h4" color="textPrimary"
                                                display="inline">
                                                {tier.price}
                                            </Typography>
                                            <Typography variant="body1" color="textSecondary" display="inline">
                                                /{tier.period}
                                            </Typography>
                                            {tier.subheader === undefined ? null :
                                                <Box component="span" p={1} m={1}
                                                    style={{ backgroundColor: "#00FF00", borderRadius: "5px" }}>
                                                    <Typography variant="body2">{tier.subheader}</Typography>
                                                </Box>
                                            }
                                        </Box>
                                        {/*<Typography component="paragraph" variant="body1"*/}
                                        {/*            style={{color: "grey", marginInline: "20px"}}>*/}
                                        {/*    /!*billed as CAD 1,200 quarterly*!/*/}
                                        {/*</Typography>*/}
                                    </Box>
                                }

                                {/* Card content section 2*/}
                                <List style={{ height: 160 }}>
                                    {tier.description.map((line) => (
                                        <ListItem key={line} variant="subtitle1">
                                            <ListItemIcon>
                                                <CheckIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={line}
                                                primaryTypographyProps={{
                                                    style: {
                                                        wordWrap: "break-word"
                                                    }
                                                }} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <div style={{
                                margin: "auto",
                                paddingLeft: "100px",
                                paddingRight: "100px",
                                marginBottom: "40px"
                            }}>
                                {tier.buyButton !== undefined &&
                                    tier.buyButton
                                    // <CardActions style={{ position: "absolute", bottom: "8px", width: "100%" }}>
                                    //     <Button fullWidth color={"primary"} variant={tier.buttonVariant}>
                                    //         {tier.buttonText}
                                    //     </Button>
                                    // </CardActions>
                                }
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* <b>** Please make sure to enter your username as the contact information so we can process your order
                correctly! **</b> */}
            <Link href="/jobmanagement" onClick={() => {
                if (typeof window !== "undefined") {
                    localStorage.setItem("isVIPTempValue", true);
                }
            }}>
                <a>** Redirecting --------------------------- if the redirection fails, please click this to continue</a>
            </Link>
        </div>
    );
}
