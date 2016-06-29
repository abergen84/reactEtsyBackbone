import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'


var ListingDetailView = React.createClass({
	render: function(){
		console.log(this.props.listingMod)
		return (
			<div class="indie-item">
			<img src={this.props.listingMod.attributes[0].Images[0].url_170x135} />
			<h4>{this.props.listingMod.attributes[0].title}</h4>
			<p>{this.props.listingMod.attributes[0].description}</p>
			</div>
		)
	}
})





export default ListingDetailView  //this name is coming from the top level component