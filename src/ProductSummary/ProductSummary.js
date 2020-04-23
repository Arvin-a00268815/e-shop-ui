//typically we create components in a folder using Camel case naming. The .js and .css
//files should have the same name as the folder

//always import the React for components
import React from 'react';
//we can import our styles for this component
import './ProductSummary.css';

const itemSummary = (props) => {
    return <div className='itemSummary' onClick={props.clickHandler}>
        <div class="col-50"> 
    {props.id} &nbsp;&nbsp;&nbsp;
    {props.name} 
    </div>
    <div class="col-50 text-right">
     Rating - {props.rating} &nbsp;&nbsp;| &nbsp; {props.price}&euro; </div>
    
    <br/> 
    </div>
};

export default itemSummary;
