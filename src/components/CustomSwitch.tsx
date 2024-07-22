import { Typography, Switch } from "@mui/joy";
import React from "react";

type CustomSwitchProps = {
    label: string;
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    onChange?: (checked: boolean) => void
}

export default function CustomSwitch({ label, checked, setChecked, onChange }: CustomSwitchProps) {

    return (
        <Typography component="label" endDecorator={
            <Switch
                checked={checked}
                onChange={(event) => {
                    setChecked(event.target.checked);
                    if (onChange) onChange(event.target.checked);
                }}
                slotProps={{
                    track: {
                        children: (
                            <React.Fragment>
                                <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                                    On
                                </Typography>
                                <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                                    Off
                                </Typography>
                            </React.Fragment>
                        ),
                    },
                }}
                sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                }}
            />
        }>
            {label}
        </Typography>
    );
}
