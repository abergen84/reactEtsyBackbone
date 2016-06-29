console.log('yolo')
//importing the react and backbone libraries to use on this page
import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//Create a React component called ListingsView, our top level component. Everything
//falls under this now, champagne effect style
var ListingsView = React.createClass({
	//need to call a render method on the object, which will render some jsx for us 
	render: function() {
		return (
			//can call some components here which we define later (header and listingContainer)
			<div className="listingsView">
				<Header />
				<ListingsContainer listingsCollListCont={this.props.listingsColl} />
			</div>
			//at the top level Listing View, has champagne effect. Need to assign 
			//a key:value pair for the collection, so you can access it via
			//listingsColl. this.props.xxxxx (xxxxx is coming from the react.render)
			//on the app.js file. can name the key whatever you want.
			)
	}
})

var Header = React.createClass({
	
	_handleClick: function(e){
		console.log(e.keyCode)
		if(e.keyCode === 13) {
			return location.hash = `search/${e.target.value}`
		}
	},

	render: function(){
		return (
			<header className="headerContainer">
				<div id="title">
					<span>search</span><h1>etsy</h1><span>app</span>
				</div>
				<div id="search">
					<input type="text" placeholder="search items" onKeyDown={this._handleClick} />
				</div>
			</header>
		)
	}
})


var ListingsContainer = React.createClass({
//can create methods on the Component (aside from render)
//here, we are creating getListingsArray, which takes as input a parameter of
//some array
	_getListingsArray: function(listingsArray){
		var arr = [];  //creating an empty array
		listingsArray.forEach(function(model){  //for each model on listingsArray,
			arr.push(<Listing arrayModels={model} />) //push model into Listing componenent
		})										//with key:value pair arrayModels:{each model}
		return arr
	},

	render: function(){
		// console.log(this.props.listingsColl.models)
		//Render will run first (before _getListingsArray), so its creating a listing
		//container that is putting all the models from the array in it
		return (
			<div className="listingsContainer">
				{this._getListingsArray(this.props.listingsCollListCont.models)}
				{/* Line above basically does this: [<Listing />,
				<Listing />,
				<Listing />
				... * 10] */}
			</div>
			//the listingsCollListCont above comes from the key we named on Line 16
			)
	}
})

var Listing = React.createClass({
	
	//creating a click method as this is where we have the individual listings to click on
	_handleClick: function(){
		//simply set the location hash to trigger the router
		return location.hash = `detail/${this.props.arrayModels.get('listing_id')}`
	},

	render: function(){
		var listingModel = this.props.arrayModels //arrayModels oming from key:value
		//pair we named in the _getListingsArray method (line 45ish)
		console.log(listingModel)
		return (
			//place the onClick here like you would in regular JavaScript
			<div className="item-box" onClick={this._handleClick} >
				<h3>{listingModel.get('title').substring(0,30)}</h3> {/*get the attribute for title*/}
				<img src={listingModel.attributes.Images[0].url_170x135} />
				<p>${listingModel.get('price')}</p>
			</div>
			)
	}
})



export default ListingsView //need to export the file so you can import it on app.js