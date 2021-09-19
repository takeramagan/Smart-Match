import { Box, Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from '@material-ui/core';
import { ArrowDropDown } from "@material-ui/icons";
import { useState, useRef } from "react";

export function MenuButton(props) {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const anchorRef = useRef(null);

    const handleMenuItemClick = (event, index) => {
        props.setSelected(index);
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
        //console.info(`You clicked ${props.options[selectedIndex]}`);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Box>
            <ButtonGroup variant="contained" color="primary" style={{ borderRadius: 20 }} ref={anchorRef} aria-label="split button">
                <Button
                    size="small"
                    onClick={handleToggle}>

                    {props.options[selectedIndex]}
                    <ArrowDropDown />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {props.options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    );
}