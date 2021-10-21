import { Grid, Card, CardHeader, CardContent, Box, Typography, CardActions, Button } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { BorderStyle } from '@material-ui/icons';

import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';

export default function PricingSection(props) {
    return (
        // Grid section shows available options
        <Grid container spacing={0} alignItems="stretch">
            {props.tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid
                    item
                    key={tier.title}
                    xs={12}
                    sm={tier.title === 'Enterprise' ? 12 : 6}
                    md={4}
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
                        <CardContent style={{ marginBottom: "52px" }}>
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
                                        <br></br>
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
                                        <Typography component="body1" variant="body1" color="textPrimary" display="inline" style={{ marginInline: "20px" }}>
                                            USD
                                            </Typography>
                                        <Typography component="h4" variant="h4" color="textPrimary" display="inline">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" display="inline">
                                            /month
                                            </Typography>
                                        {tier.subheader === undefined ? null :
                                            <Box component="span" p={1} m={1} style={{ backgroundColor: "#00FF00", borderRadius: "5px" }}>
                                                <Typography variant="body2">{tier.subheader}</Typography>
                                            </Box>
                                        }
                                    </Box>
                                    <Typography component="paragraph" variant="body1" style={{ color: "grey", marginInline: "20px" }}>
                                        billed as USD 1,200 quarterly
                                        </Typography>
                                </Box>
                            }

                            {/* Card content section 2*/}
                            <List >
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
                        {tier.buttonText !== undefined &&
                            <CardActions style={{ position: "absolute", bottom: "8px", width: "100%" }}>
                                <Button fullWidth color={"primary"} variant={tier.buttonVariant}>
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        }
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
};