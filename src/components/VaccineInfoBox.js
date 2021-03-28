import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectVaccinationData } from '../features/vaccinationsSlice';
import { prettyPrintStat } from '../util';
import "../static/css/VaccineInfoBox.css";

const VaccineInfoBox = ({ title, cases }) => {
    const vaccines = useSelector(selectVaccinationData)
    return (
        <div className="vaccineInfoBox">
            <Card>
                <CardContent>
                    
                    <Typography className="infoBox_title" color="textSecondary">
                        {title}
                    </Typography>
                    
                    <h2 className="vaccineInfoBox__stat">{prettyPrintStat(vaccines)}</h2>
                    
                    <Typography className="infoBox_total" color="textSecondary">
                        
                    </Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default VaccineInfoBox
