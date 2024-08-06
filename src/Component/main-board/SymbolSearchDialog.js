import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tab,
    Tabs,
    TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const categories = ["All", "Stocks", "Funds", "Futures", "Forex", "Crypto", "Indices", "Bonds", "Economy", "Options"];

const useStyles = makeStyles({
    tabsRoot: {
        // borderRadius: '9999px',
        // backgroundColor: '#f3f4f6',
        padding: '0.25rem',
    },
    tabRoot: {
        borderRadius: '100px',
        padding: '0',
        margin: '0',
        minWidth: 'auto',
        '&.Mui-selected': {
            backgroundColor: '#111827',
            color: '#fff',
        },
    },
});

const SymbolSearchDialog = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className="flex justify-start">
            {/*<Tabs value={1} onChange={() => console.log('hehe')} aria-label="basic tabs example">*/}
            {/*    <Tab label="Item One" />*/}
            {/*    <Tab label="Item One" />*/}
            {/*    <Tab label="Item One" />*/}
            {/*</Tabs>*/}
            <Button sx={{ px: 1.25, py: 0.625 }} onClick={handleClickOpen}
                    startIcon={<SearchIcon sx={{ color: '#131722' }} />}>
                <div className="ml-0.5 text-[#131722] font-bold">BTCUSD</div>
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    Symbol Search
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <div className="flex items-center mb-4">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="search"
                            type="text"
                            fullWidth
                            variant="standard"
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        className={classes.tabsRoot}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {categories.map((category, index) => (
                            <Tab
                                key={index}
                                label={category}
                                className={classes.tabRoot}
                            />
                        ))}
                    </Tabs>
                    <div className="mt-4">
                        <ul>
                            {Array.from({ length: 10 }).map((_, index) => (
                                <li key={index} className="flex items-center py-2 border-b">
                                    <div>
                                        {/*<span className="text-blue-500 cursor-pointer">BTCUSD</span>*/}
                                        <span className="ml-2 text-gray-500">BITCOIN / U.S. DOLLAR</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SymbolSearchDialog;
