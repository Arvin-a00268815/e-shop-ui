//typically we create components in a folder using Camel case naming. The .js and .css
//files should have the same name as the folder

//always import the React for components
import React from 'react';
//we can import our styles for this component
import './ProductDetails.css';

//here were are using a functional component
//we are using the ES6 arrow function syntax 
//our function takes a single argument 'props' 
//these props are the properties we set on our component
//e.g. <ItemDetails item={this.state.selectedItem}/>
const itemDetails = (props) => {
    //single return value from our function this is what will get 
    //transpiled from JSX to JavaScript which will create and add our elements
    //to the DOM
    return (
        //can only have a single root element returned from each component so usually good
        //to wrap into a container <div> or <section>
        <div id="div-item-details">
            <section>
                {/* This is the syntax for comments inside JSX blocks, need to use block comments
                    wrapped within {}. */}
                {/* We do not want to be able to edit the item Id directly so we disable the input field.
                    Here we are adding a label and a text input field for each property of the item we want to show.
                    We are using two way binding here, the value of the input control is bound to the value
                    passed in via the props, but the onChange event is also bound to the parent handler function
                    which will update the state of the selectedItem causing this component to be re-rendered. 
                */}
                <label>Id:</label><input type='text' name='id' disabled={true} value={props.item.id}/><br/>
                <label>Name:</label><input type='text' name='name' value={props.item.name} onChange={props.valueChanged}/><br/>
                <label>Quantity:</label><input type='text' name='quantity' value={props.item.quantity} onChange={props.valueChanged}/><br/>
                <label>Price:</label><input type='text' name='price' value={props.item.price} onChange={props.valueChanged}/><br/>
                <label>Color:</label><input type='text' name='color' value={props.item.color} onChange={props.valueChanged}/><br/>
                <label>Description:</label><br/><textarea name='description' row='4' cols='50' value={props.item.description} onChange={props.valueChanged}/>
            </section>
            {/* Here we are simply binding the parent handlers passed via the props to the buttons */}
            <section id="action-section">
                <button className='newItem' onClick={props.newClickHander}>New</button>
                <button className='updateItem' onClick={props.saveClickHander}>Save</button>
                <button className='deleteItem' onClick={props.deleteClickHander}>Delete</button>
            </section>
        </div>
    );
}
//make sure we export the function so that it can be imported by other components/modules
export default itemDetails;