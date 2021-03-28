import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import "../static/css/InfoBox.css";


function InfoBox({ title, cases, total, active, isRed, ...props }) {
    return (
        <div>
            <Card className={`infoBox ${active && 'infoBox_selected'} ${isRed && 'infoBox_red'}`} onClick={props.onClick}>
                <CardContent>
                    
                    <Typography className="infoBox_title" color="textSecondary">
                        {title}
                    </Typography>
                    
                    <h2 className={`infoBox_cases ${!isRed && 'infoBox_cases_green'}`}>{cases}</h2>
                    
                    <Typography className="infoBox_total" color="textSecondary">
                        {total} total
                    </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
